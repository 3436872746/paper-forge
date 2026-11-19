/* LabCheck — 写作站与定框站的判据
 * 纯函数放在 LabCheckCraft 上，方便单独测；DOM 绑定在没有 document 时跳过。
 */
(function (global) {
  'use strict';

  /* ============================ 写作 ============================ */

  const OVER = /首次|证明|完全|任何|所有|显著|大幅|远超|彻底/;
  const CLAIM = /优于|提升|降低|更好|更快|更准|改善|超过|领先/;
  const HAS_NUM = /\d/;
  const CMP = /比|vs|VS|相比|相对|对比|较/;

  function splitSentences(text) {
    return String(text || '')
      .replace(/\r/g, '')
      .split(/(?<=[。！？!?；;])|\n+/)
      .map(function (s) { return s.trim(); })
      .filter(function (s) { return s.replace(/[\s。！？!?；;]/g, '').length > 1; });
  }

  function judgeSentence(s) {
    if (OVER.test(s) && !HAS_NUM.test(s)) {
      return { state: 'over', fix: '删掉「首次 / 证明 / 显著」这类绝对措辞，或者补上支撑它的数字。' };
    }
    if (CLAIM.test(s) && !HAS_NUM.test(s) && !CMP.test(s)) {
      return { state: 'noev', fix: '补一组对照数字，或者把这句改成描述，不要下判断。' };
    }
    if (HAS_NUM.test(s) && !CMP.test(s)) {
      return { state: 'weak', fix: '数字有了，但没写和谁比。补上对照对象和比较口径。' };
    }
    return { state: 'ok', fix: '' };
  }

  const FIVE = [
    { name: '问题', re: /问题|挑战|现有|瓶颈|难以|不足|冲突/, hint: '读者得知道你要解决什么。' },
    { name: '发现', re: /我们发现|结果表明|结果显示|观察到|提升|降低|达到/, hint: '一句话说清你发现了什么。' },
    { name: '机制', re: /因为|机制|通过|利用|归因|原因/, hint: '说清为什么会这样。' },
    { name: '回应', re: /我们提出|本文|设计|方法|系统|we propose/, hint: '说清你做了什么。' },
    { name: '边界', re: /条件|前提|限制|适用于|在.{0,12}下|范围内/, hint: '说清结论在什么条件下成立。' }
  ];

  function analyzeWriting(text) {
    const sentences = splitSentences(text).map(function (s) {
      const j = judgeSentence(s);
      return { text: s, state: j.state, fix: j.fix };
    });

    const counts = { over: 0, noev: 0, weak: 0, ok: 0 };
    sentences.forEach(function (s) { counts[s.state]++; });

    const five = FIVE.map(function (f) {
      return { name: f.name, present: f.re.test(text), hint: f.hint };
    });

    const lines = [];
    sentences.forEach(function (s) {
      if (s.state === 'ok') return;
      const label = { over: '说过头', noev: '无证据', weak: '证据不足' }[s.state];
      lines.push('【' + label + '】' + s.text + '\n    ' + s.fix);
    });
    const missing = five.filter(function (f) { return !f.present; })
      .map(function (f) { return f.name; });
    if (missing.length) lines.push('\n摘要还缺：' + missing.join('、') + '。');

    return {
      sentences: sentences,
      counts: counts,
      five: five,
      fixList: lines.join('\n') || '没查出问题。仍然建议把每个数字都追回原始文件核一遍。'
    };
  }

  /* ============================ 定框 ============================ */

  const COMPARE = /比|高于|低于|降低|提升|提高|优于|达到|减少|增加|下降|改善/;
  const METRIC_WORD = /延迟|吞吐|准确率|内存|成本|时间|分数|性能/;
  const ABSOLUTE = /首次|证明|完全|任何|所有|一定会|必然/;

  function analyzeFraming(input) {
    const claim = String(input.claim || '').trim();
    const falsifier = String(input.falsifier || '').trim();
    const metric = input.metric || 'other';
    const checks = [];

    function add(level, title, why, fix) {
      checks.push({ level: level, title: title, why: why, fix: fix });
    }

    if (!claim) {
      add('red', '没有主张', '一句话都没有，后面全是白做。', '用一句话写清：在什么条件下，做了什么，指标变成多少。');
    } else {
      if (claim.length < 10) {
        add('red', '太短，说不清', '不到 10 个字，读者看不出你改了什么、量的是什么。', '补上变量、对照和指标。');
      }
      if (claim.length > 60) {
        add('amber', '太长了', '一句话超过 60 字，读者记不住，你自己也核不动。', '压到 40 字以内，只留变量和指标。');
      }
      if (!COMPARE.test(claim)) {
        add('amber', '没说要和什么比', '没有比较对象的「更好」不是主张。', '把对照组写进来：比谁、高多少。');
      }
      if (!METRIC_WORD.test(claim)) {
        add('red', '没有指标', '没有指标的句子无法判定真假。', '补上指标，比如尾部延迟、吞吐、准确率。');
      }
      if (ABSOLUTE.test(claim)) {
        add('red', '说过头了', '「首次 / 证明 / 完全」这类词，审稿人第一件事就是让你举证。', '删掉绝对化措辞，换成限定条件下的说法。');
      }
    }

    if (falsifier.length < 10) {
      add('red', '不可证伪', '没有说清什么结果会推翻你，这不是科研主张。', '写一句：如果 X 低于/高于 Y，主张不成立。');
    } else {
      if (!HAS_NUM.test(falsifier)) {
        add('amber', '反例没有数', '「没有提升」只有方向没有量，到时候怎么算都行。', '给一个阈值，比如「提升低于 5%」。');
      }
    }

    const red = checks.filter(function (c) { return c.level === 'red'; }).length;
    const amber = checks.filter(function (c) { return c.level === 'amber'; }).length;

    const card = [
      '## 框定卡',
      '主张：' + (claim || '（还没写）'),
      '指标：' + ({ latency: '延迟', throughput: '吞吐', accuracy: '准确率', other: '其他' }[metric] || '其他'),
      '反例：' + (falsifier || '（还没写）'),
      '',
      red ? '状态：不可证伪（' + red + ' 处红牌）' : '状态：可证伪'
    ].join('\n');

    return { checks: checks, red: red, amber: amber, card: card, verdict: red ? '不可证伪' : '可证伪' };
  }

  global.LabCheckCraft = { analyzeWriting: analyzeWriting, analyzeFraming: analyzeFraming, splitSentences: splitSentences };

  /* ============================ 界面 ============================ */

  if (typeof document === 'undefined') return;

  const PROJECT = global.LabCheckProject;
  const $ = function (id) { return document.getElementById(id); };

  function el(tag, cls, text) {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text !== undefined) n.textContent = text;
    return n;
  }

  function markRail(station, red) {
    const li = document.querySelector('.rail li[data-station="' + station + '"]');
    if (li) li.querySelector('.dot').className = 'dot ' + (red ? 'red' : 'ok');
  }

  function renderVerdict(box, level, num, label, title, sub) {
    box.className = 'verdict ' + level;
    box.innerHTML = '';
    const n = el('div', 'verdict-num', String(num));
    n.appendChild(el('span', '', label));
    box.appendChild(n);
    const t = el('div', 'verdict-text');
    t.appendChild(el('strong', '', title));
    t.appendChild(el('span', '', sub));
    box.appendChild(t);
  }

  function copyText(text, btn) {
    const done = function () {
      const old = btn.textContent;
      btn.textContent = '已复制';
      setTimeout(function () { btn.textContent = old; }, 1400);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done, done);
    } else {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); } catch (e) { /* 忽略 */ }
      document.body.removeChild(ta);
      done();
    }
  }

  /* ---------------- 写作 ---------------- */

  const WRITING_SAMPLE = '我们的方法显著优于现有方案，首次实现了端到端加速。在 A100 上，相比 vLLM，吞吐提升 1.8 倍（n=5），尾部延迟下降 12%。';

  function runWriting() {
    const text = $('writing-text').value;
    const r = analyzeWriting(text);
    const bad = r.counts.over + r.counts.noev;
    const level = bad > 0 ? 'red' : (r.counts.weak > 0 ? 'amber' : 'green');

    renderVerdict($('writing-verdict'), level,
      bad + r.counts.weak, '句要改',
      bad ? bad + ' 句说过头或没有证据' : (r.counts.weak ? r.counts.weak + ' 句缺对照' : '每句都有数字和对照'),
      '说过头 ' + r.counts.over + '　无证据 ' + r.counts.noev + '　证据不足 ' + r.counts.weak + '　对齐 ' + r.counts.ok
    );

    const box = $('writing-sentences');
    box.innerHTML = '';
    r.sentences.forEach(function (s) {
      const cls = { over: 'red', noev: 'red', weak: 'amber', ok: 'green' }[s.state];
      const label = { over: '说过头', noev: '无证据', weak: '证据不足', ok: '对齐' }[s.state];
      const row = el('div', 'sentence ' + cls);
      const head = el('div', 'sentence-head');
      head.appendChild(el('span', 'tag ' + cls, label));
      head.appendChild(el('span', 'sentence-text', s.text));
      row.appendChild(head);
      if (s.fix) row.appendChild(el('p', 'sentence-fix', s.fix));
      box.appendChild(row);
    });

    const five = $('writing-five');
    five.innerHTML = '';
    r.five.forEach(function (f) {
      const row = el('div', 'five-row' + (f.present ? ' ok' : ' missing'));
      row.appendChild(el('span', 'five-name', f.name));
      row.appendChild(el('span', 'five-state', f.present ? '有' : '缺'));
      row.appendChild(el('span', 'five-hint', f.present ? '' : f.hint));
      five.appendChild(row);
    });

    $('writing-fix').textContent = r.fixList;
    $('writing-result').hidden = false;
    PROJECT.save({ writing: { text: text, claims: r.sentences, verdict: { level: level, bad: bad } } });
    markRail('writing', level === 'red');
  }

  $('btn-writing').addEventListener('click', runWriting);
  $('btn-writing-sample').addEventListener('click', function () {
    $('writing-text').value = WRITING_SAMPLE;
    runWriting();
  });
  $('btn-writing-copy').addEventListener('click', function () {
    copyText($('writing-fix').textContent, this);
  });

  /* ---------------- 定框 ---------------- */

  const FRAMING_SAMPLE = {
    claim: 'chunked-prefill 在不抬高尾部延迟的前提下提高吞吐',
    falsifier: '如果吞吐提升低于 5%，或者 p99 延迟上升超过 10%，这个主张就不成立。',
    metric: 'throughput'
  };

  function runFraming() {
    const input = {
      claim: $('framing-claim').value,
      falsifier: $('framing-falsifier').value,
      metric: $('framing-metric').value
    };
    const r = analyzeFraming(input);
    const level = r.red ? 'red' : (r.amber ? 'amber' : 'green');

    renderVerdict($('framing-verdict'), level,
      r.red || r.amber || 0, r.red ? '处红牌' : (r.amber ? '处黄牌' : ''),
      r.verdict,
      r.red ? '先把红牌清掉，再去做实验' : (r.amber ? '可以开跑，黄牌记着' : '两条都齐了')
    );

    const box = $('framing-findings');
    box.innerHTML = '';
    if (!r.checks.length) {
      const row = el('div', 'finding green');
      const h = el('h4');
      h.appendChild(el('span', 'tag green', '通过'));
      h.appendChild(document.createTextNode('主张可证伪，反例带数'));
      row.appendChild(h);
      box.appendChild(row);
    }
    r.checks.forEach(function (c) {
      const level2 = c.level === 'red' ? 'red' : 'amber';
      const row = el('div', 'finding ' + level2);
      const h = el('h4');
      h.appendChild(el('span', 'tag ' + level2, level2 === 'red' ? '红牌' : '黄牌'));
      h.appendChild(document.createTextNode(c.title));
      row.appendChild(h);
      row.appendChild(el('p', '', c.why));
      const fix = el('p', 'fix');
      fix.appendChild(el('strong', '', '改法：'));
      fix.appendChild(document.createTextNode(c.fix));
      row.appendChild(fix);
      box.appendChild(row);
    });

    $('framing-card').textContent = r.card;
    $('framing-result').hidden = false;
    PROJECT.save({ framing: { claim: input.claim, falsifier: input.falsifier, metric: input.metric, verdict: r.verdict } });
    markRail('framing', r.red > 0);
  }

  $('btn-framing').addEventListener('click', runFraming);
  $('btn-framing-sample').addEventListener('click', function () {
    $('framing-claim').value = FRAMING_SAMPLE.claim;
    $('framing-falsifier').value = FRAMING_SAMPLE.falsifier;
    $('framing-metric').value = FRAMING_SAMPLE.metric;
    runFraming();
  });
  $('btn-framing-copy').addEventListener('click', function () {
    copyText($('framing-card').textContent, this);
  });

  /* ---------------- 首次进入：恢复 + 写作站给个例子 ---------------- */

  (function boot() {
    const p = PROJECT.get();
    if (p.framing.claim) $('framing-claim').value = p.framing.claim;
    if (p.framing.falsifier) $('framing-falsifier').value = p.framing.falsifier;
    if (p.framing.metric) $('framing-metric').value = p.framing.metric;
    if (p.framing.claim && p.framing.falsifier) runFraming();

    if (p.writing.text) {
      $('writing-text').value = p.writing.text;
      runWriting();
    } else {
      $('writing-text').value = WRITING_SAMPLE;
      runWriting();
    }
  })();
})(window);
