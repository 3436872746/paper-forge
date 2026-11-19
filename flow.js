/* LabCheck — 设计、跑批、投稿三站
 * 纯函数挂在 LabCheckFlow 上，便于单独测；没有 document 时只导出函数。
 */
(function (global) {
  'use strict';

  function lines(t) {
    return String(t || '').split(/\n+/).map(function (s) { return s.trim(); }).filter(Boolean);
  }
  function hasNum(s) { return /\d/.test(s); }

  /* ============================ 设计 ============================ */

  function analyzeDesign(input) {
    const arms = lines(input.arms);
    const control = String(input.control || '').trim();
    const criterion = String(input.criterion || '').trim();
    const vars = lines(input.variables);
    const rounds = Number(input.rounds) || 0;
    const checks = [];

    function add(level, title, why, fix) { checks.push({ level: level, title: title, why: why, fix: fix }); }

    if (!arms.length) {
      add('red', '没有实验组', '只有对照，没有要比较的东西。', '每行写一个实验组。');
    }
    if (!control) {
      add('red', '没有对照组', '没有对照，「提升」就没有参照物。', '写清对照组是什么配置。');
    } else if (arms.indexOf(control) >= 0) {
      add('red', '对照组和实验组写的是同一个', '两边一样，比出来的差就是噪声。', '把对照组改成真正的基线。');
    }
    if (!input.placebo) {
      add('red', '没有空跑组', '没量过噪声，后面所有差异都判不了。', '让两个完全相同的条件各跑一遍，它们之间的差就是地板。');
    }
    if (!criterion) {
      add('red', '成功标准没写死', '跑完再定标准，等于没有标准。', '跑之前写一句：达到什么算成功，达不到算失败。');
    }
    if (!rounds) {
      add('red', '没写轮数', '不知道跑几轮，最后只能拿手上这点数将就。', '至少 3 轮，交错跑 A,B,A,B。');
    } else if (rounds < 3) {
      add('amber', '只跑 ' + rounds + ' 轮', '轮数太少，机器状态一漂就盖过差异。', '补到至少 3 轮。');
    }
    if (vars.length > 1) {
      add('red', '一次变了 ' + vars.length + ' 个变量', '两样一起变，分不清是谁的功劳。', '一次只改一样，其余固定。');
    }
    if (input.unit === 'request') {
      add('amber', '比较单位是一条请求', '请求之间不独立，统计上不成立。', '比较单位改成一次运行。');
    }

    const red = checks.filter(function (c) { return c.level === 'red'; }).length;
    const amber = checks.filter(function (c) { return c.level === 'amber'; }).length;
    const card = [
      '## 实验卡',
      '实验组：' + (arms.join(' / ') || '（空）'),
      '对照组：' + (control || '（空）'),
      '空跑组：' + (input.placebo ? '有' : '无'),
      '比较单位：' + (input.unit === 'request' ? '一条请求' : '一次运行'),
      '成功标准：' + (criterion || '（空）'),
      '计划轮数：' + (rounds || '（空）'),
      '只变的变量：' + (vars.join('、') || '（空）')
    ].join('\n');

    return { checks: checks, red: red, amber: amber, card: card };
  }

  /* ============================ 跑批 ============================ */

  function analyzeBatch(input) {
    const dir = String(input.dir || '').trim();
    const cmd = String(input.cmd || '').trim();
    const version = String(input.version || '').trim();
    const seeds = String(input.seeds || '').trim();
    const machine = String(input.machine || '').trim();
    const checks = [];

    function add(level, title, why, fix) { checks.push({ level: level, title: title, why: why, fix: fix }); }

    if (!dir) {
      add('red', '没有输出目录', '结果写回老地方，上一批会被静默覆盖。', '写一个带日期或版本号的目录。');
    } else if (!/\d{4}[-_./]?\d{2}[-_./]?\d{2}|v\d+|r\d+/.test(dir)) {
      add('red', '输出目录没有日期或版本号', '同名目录第二次跑会覆盖第一次。', '改成 out/2026-11-17-实验名 这种。');
    }

    if (!cmd) {
      add('red', '没有启动命令', '别人没法照着跑。', '把完整命令写进来，包括参数。');
    } else {
      if (dir && cmd.indexOf(dir) < 0 && cmd.indexOf(dir.replace(/^\.?\//, '')) < 0) {
        add('red', '命令里没有写输出目录', '命令不写目录，等于把结果写回默认位置。', '把输出目录原样写进命令的 --out 参数。');
      }
      if (input.dry && !/DRY=1/.test(cmd)) {
        add('red', '勾了试运行，命令里没有 DRY=1', '这会真的发请求、真的写文件。', '加上 DRY=1，并在第一次外部调用前放一个守卫。');
      }
      if (/&\s*$/.test(cmd) && !/(setsid|nohup)/.test(cmd)) {
        add('amber', '命令以 & 结尾', '父进程退出不代表批次结束。', '用 setsid 或 nohup，并且记下 PID。');
      }
    }

    if (!seeds) add('red', '没有种子', '复现不了。', '写清用哪几个种子，比如 1,2,3,4,5。');
    if (!version) add('red', '没有代码版本', '不知道跑的是哪一版。', '写 commit 或分支 + 日期。');
    if (!machine) add('amber', '没写机器', '本机和服务器路径几乎一样，事后分不清。', '写清主机名或 IP。');

    const red = checks.filter(function (c) { return c.level === 'red'; }).length;
    const amber = checks.filter(function (c) { return c.level === 'amber'; }).length;
    const card = [
      '## 批次卡',
      '实验名：' + (input.name || '（空）'),
      '目录：' + (dir || '（空）'),
      '机器：' + (machine || '（空）'),
      '代码版本：' + (version || '（空）'),
      '种子：' + (seeds || '（空）'),
      '命令：' + (cmd || '（空）'),
      '判据：输出目录里的文件时间戳比脚本新，且没有旧字符串残留。'
    ].join('\n');

    return { checks: checks, red: red, amber: amber, card: card };
  }

  /* ============================ 参考文献 ============================ */

  function analyzeRefs(text) {
    const items = lines(text);
    const checks = [];
    function add(level, title, why, fix) { checks.push({ level: level, title: title, why: why, fix: fix }); }

    if (!items.length) {
      add('red', '没有条目', '先贴进来再查。', '一行一条，编号开头。');
      return { checks: checks, red: 1, amber: 0 };
    }

    const placeholder = items.filter(function (l) { return /TODO|\?\?|待补|XXX/i.test(l); });
    if (placeholder.length) {
      add('red', '还有 ' + placeholder.length + ' 条占位符', '投稿前占位符一定会漏。', placeholder.slice(0, 3).map(function (l) { return '· ' + l.slice(0, 40); }).join('\n'));
    }

    const nums = [];
    items.forEach(function (l) {
      const m = l.match(/^\s*\[?(\d+)[\].、)]?/);
      if (m) nums.push(Number(m[1]));
    });
    if (nums.length >= 2) {
      const max = Math.max.apply(null, nums);
      const missing = [];
      for (let i = 1; i <= max; i++) if (nums.indexOf(i) < 0) missing.push(i);
      if (missing.length) {
        add('red', '编号不连续，缺 ' + missing.join('、'), '正文里的 [n] 会对不上。', '补齐编号，或者整篇重排。');
      }
    }

    const seen = {};
    const dup = [];
    items.forEach(function (l) {
      const key = l.replace(/^\s*\[?\d+[\].、)]?\s*/, '').slice(0, 10).toLowerCase();
      if (!key) return;
      if (seen[key]) dup.push(key); else seen[key] = 1;
    });
    if (dup.length) {
      add('amber', '可能有重复条目', '标题开头相同的出现了不止一次。', '核对 DOI，重复的删掉。');
    }

    const noYear = items.filter(function (l) { return !/\b(19|20)\d{2}\b/.test(l); });
    if (noYear.length) {
      add('amber', noYear.length + ' 条没有年份', '可能是缺出版信息。', '补上会议或期刊和年份。');
    }

    const red = checks.filter(function (c) { return c.level === 'red'; }).length;
    const amber = checks.filter(function (c) { return c.level === 'amber'; }).length;
    return { checks: checks, red: red, amber: amber, count: items.length };
  }

  /* ============================ 评审意见 ============================ */

  const MUST_STRONG = /ablation|experiment|实验|消融|补充一组|补充实验|缺少.{0,6}实验|additional experiments?/;
  const MUST_WEAK = /baseline|comparison|compare|benchmark|evaluat|对比|基线|数据/;
  const BOUND = /limitation|scope|generaliz|applicab|适用范围|泛化|局限|范围|无法|不适用/;
  const EASY = /clarify|typo|format|cite|reference|definition|说明|澄清|格式|引用|定义|表述|补充说明|写清/;

  function triageComments(text) {
    let blocks = String(text || '').split(/\n\s*\n/).map(function (s) { return s.trim(); }).filter(Boolean);
    if (blocks.length === 1) {
      blocks = blocks[0].split(/\n(?=\s*\d+[.、)])/).map(function (s) { return s.trim(); }).filter(Boolean);
    }

    const groups = [
      { key: 'must', name: '要补实验', how: '补一组实验，回复里给表格和命令。', items: [] },
      { key: 'bound', name: '只能承认边界', how: '写进 Limitations，说清适用条件，不要辩解。', items: [] },
      { key: 'easy', name: '能立刻答', how: '回复信里一句话说明，必要时改正文。', items: [] }
    ];

    blocks.forEach(function (b) {
      const s = b.toLowerCase();
      let g = groups[2];
      if (MUST_STRONG.test(s)) g = groups[0];
      else if (BOUND.test(s)) g = groups[1];
      else if (EASY.test(s)) g = groups[2];
      else if (MUST_WEAK.test(s)) g = groups[0];
      g.items.push(b);
    });

    return { groups: groups, total: blocks.length };
  }

  global.LabCheckFlow = {
    analyzeDesign: analyzeDesign,
    analyzeBatch: analyzeBatch,
    analyzeRefs: analyzeRefs,
    triageComments: triageComments
  };

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
  function paintFindings(box, checks) {
    box.innerHTML = '';
    if (!checks.length) {
      const row = el('div', 'finding green');
      const h = el('h4');
      h.appendChild(el('span', 'tag green', '通过'));
      h.appendChild(document.createTextNode('这一站没查出问题'));
      row.appendChild(h);
      box.appendChild(row);
      return;
    }
    checks.forEach(function (c) {
      const lv = c.level === 'red' ? 'red' : 'amber';
      const row = el('div', 'finding ' + lv);
      const h = el('h4');
      h.appendChild(el('span', 'tag ' + lv, lv === 'red' ? '红牌' : '黄牌'));
      h.appendChild(document.createTextNode(c.title));
      row.appendChild(h);
      row.appendChild(el('p', '', c.why));
      const fix = el('p', 'fix');
      fix.appendChild(el('strong', '', '改法：'));
      fix.appendChild(document.createTextNode(c.fix));
      row.appendChild(fix);
      box.appendChild(row);
    });
  }
  function verdictOf(r, what) {
    const level = r.red ? 'red' : (r.amber ? 'amber' : 'green');
    return {
      level: level,
      num: r.red + r.amber,
      label: '处问题',
      title: r.red ? r.red + ' 处红牌，先改完再往下走'
        : (r.amber ? r.amber + ' 处可以补' : what + '没查出问题'),
      sub: '红牌 ' + r.red + '　黄牌 ' + r.amber
    };
  }

  /* ---------------- 设计 ---------------- */

  function readDesign() {
    return {
      arms: $('design-arms').value,
      control: $('design-control').value,
      placebo: $('design-placebo').checked,
      unit: $('design-unit').value,
      criterion: $('design-criterion').value,
      rounds: Number($('design-rounds').value) || 0,
      variables: $('design-vars').value
    };
  }

  function runDesign() {
    const input = readDesign();
    const r = analyzeDesign(input);
    const v = verdictOf(r, '设计');
    renderVerdict($('design-verdict'), v.level, v.num, v.label, v.title, v.sub);
    paintFindings($('design-findings'), r.checks);
    $('design-card').textContent = r.card;
    $('design-result').hidden = false;
    PROJECT.save({ design: Object.assign({}, input, { card: r.card }) });
    markRail('design', r.red > 0);
  }

  function fillDesignSample() {
    $('design-arms').value = 'chunked-prefill K=4\nchunked-prefill K=8';
    $('design-control').value = '默认 batching';
    $('design-placebo').checked = false;
    $('design-unit').value = 'run';
    $('design-criterion').value = '吞吐提升 ≥10%，且 p99 延迟不上升';
    $('design-rounds').value = '5';
    $('design-vars').value = 'chunk 大小\n并发数';
    runDesign();
  }
  $('btn-design').addEventListener('click', runDesign);
  $('btn-design-sample').addEventListener('click', fillDesignSample);
  $('btn-design-copy').addEventListener('click', function () {
    copyText($('design-card').textContent, this);
  });

  /* ---------------- 跑批 ---------------- */

  function readBatch() {
    return {
      name: $('batch-name').value,
      dir: $('batch-dir').value,
      cmd: $('batch-cmd').value,
      version: $('batch-version').value,
      seeds: $('batch-seeds').value,
      machine: $('batch-machine').value,
      dry: $('batch-dry').checked
    };
  }

  function runBatch() {
    const input = readBatch();
    const r = analyzeBatch(input);
    const v = verdictOf(r, '批次');
    renderVerdict($('batch-verdict'), v.level, v.num, v.label, v.title, v.sub);
    paintFindings($('batch-findings'), r.checks);
    $('batch-card').textContent = r.card;
    $('batch-result').hidden = false;
    PROJECT.save({ batch: Object.assign({}, input, { card: r.card }) });
    markRail('batch', r.red > 0);
  }

  function fillBatchSample() {
    $('batch-name').value = 'chunked-prefill-ablation';
    $('batch-dir').value = 'out/';
    $('batch-cmd').value = 'python run.py --arm prefilling &';
    $('batch-version').value = '';
    $('batch-seeds').value = '1,2,3,4,5';
    $('batch-machine').value = 'A100 节点';
    $('batch-dry').checked = true;
    runBatch();
  }
  $('btn-batch').addEventListener('click', runBatch);
  $('btn-batch-sample').addEventListener('click', fillBatchSample);
  $('btn-batch-copy').addEventListener('click', function () {
    copyText($('batch-card').textContent, this);
  });

  /* ---------------- 投稿：两个标签页 ---------------- */

  Array.prototype.forEach.call(document.querySelectorAll('.subtab'), function (t) {
    t.addEventListener('click', function () {
      const key = t.dataset.sub;
      Array.prototype.forEach.call(document.querySelectorAll('.subtab'), function (x) {
        const on = x === t;
        x.classList.toggle('active', on);
        x.setAttribute('aria-selected', on ? 'true' : 'false');
      });
      Array.prototype.forEach.call(document.querySelectorAll('.subpane'), function (p) {
        p.hidden = p.dataset.sub !== key;
      });
    });
  });

  function runRefs() {
    const r = analyzeRefs($('refs-text').value);
    const v = verdictOf(r, '参考文献');
    renderVerdict($('refs-verdict'), v.level, v.num, v.label, v.title, v.sub);
    paintFindings($('refs-findings'), r.checks);
    $('refs-result').hidden = false;
    PROJECT.save({ submit: { refs: $('refs-text').value, verdict: { red: r.red, amber: r.amber } } });
    markRail('submit', r.red > 0);
  }

  function fillRefsSample() {
    $('refs-text').value = [
      '[1] Taming Throughput-Latency Tradeoff in LLM Inference with Sarathi-Serve. OSDI 2024.',
      '[2] DistServe: Disaggregating Prefill and Decoding. OSDI 2024.',
      '[3] TODO: add the KV cache paper.',
      '[5] ServerlessLLM: Low-Latency Serverless Inference. OSDI 2024.'
    ].join('\n');
    runRefs();
  }
  $('btn-refs').addEventListener('click', runRefs);
  $('btn-refs-sample').addEventListener('click', fillRefsSample);

  function runComments() {
    const r = triageComments($('comments-text').value);
    const box = $('triage');
    box.innerHTML = '';
    r.groups.forEach(function (g) {
      const col = el('div', 'triage-col');
      const head = el('div', 'triage-head');
      head.appendChild(el('span', 'triage-name', g.name));
      head.appendChild(el('span', 'triage-count', String(g.items.length)));
      col.appendChild(head);
      if (!g.items.length) {
        col.appendChild(el('p', 'triage-empty', '没有这一类。'));
      }
      g.items.forEach(function (t) {
        const item = el('div', 'triage-item');
        item.appendChild(el('p', 'triage-text', t));
        item.appendChild(el('p', 'triage-how', g.how));
        col.appendChild(item);
      });
      box.appendChild(col);
    });
    $('comments-result').hidden = false;
    PROJECT.save({ submit: { comments: $('comments-text').value } });
    const red = r.groups[0].items.length ? 1 : 0;
    markRail('submit', red > 0 || /TODO|\?\?/.test($('refs-text').value));
  }

  function fillCommentsSample() {
    $('comments-text').value = [
      'Reviewer 1: Please clarify the baseline configuration, and fix the typo in Table 2.',
      'Reviewer 2: The paper lacks an ablation on chunk size, and the comparison against vLLM is not convincing without a baseline at the same batch size.',
      'Reviewer 3: The claim does not generalize beyond single-node deployment; the limitation section should discuss the applicable scope.'
    ].join('\n\n');
    runComments();
  }
  $('btn-comments').addEventListener('click', runComments);
  $('btn-comments-sample').addEventListener('click', fillCommentsSample);

  /* ---------------- 投稿清单 ---------------- */

  const CHECK_ITEMS = [
    '用会议当前的模板重新编译，没有手工搬运导言区',
    '在别处解压一份干净副本，能编译通过',
    '页数符合限制，参考文献单独成页',
    'overfull box 为 0，LaTeX 错误为 0',
    '引用编号与首次出现顺序一致，没有未定义的引用',
    '双盲：PDF 里没有作者、单位、致谢、本地路径',
    '字体已嵌入，页面尺寸正确',
    '包内没有旧一轮的 .aux / .log / .bbl'
  ];

  function renderChecklist() {
    const saved = PROJECT.get().submit.checks || {};
    const box = $('checklist');
    box.innerHTML = '';
    let done = 0;
    CHECK_ITEMS.forEach(function (text, i) {
      const label = el('label', 'check-item' + (saved[i] ? ' done' : ''));
      const input = document.createElement('input');
      input.type = 'checkbox';
      input.checked = !!saved[i];
      if (input.checked) done++;
      input.addEventListener('change', function () {
        const cur = PROJECT.get().submit.checks || {};
        cur[i] = input.checked;
        PROJECT.save({ submit: { checks: cur } });
        renderChecklist();
      });
      label.appendChild(input);
      label.appendChild(el('span', '', text));
      box.appendChild(label);
    });
    const left = CHECK_ITEMS.length - done;
    const p = $('checkprogress');
    if (p) {
      p.textContent = left ? ('还剩 ' + left + ' 项没勾。') : '八项全过，可以打包了。';
      p.className = 'checkprogress' + (left ? '' : ' ok');
    }
  }
  renderChecklist();

  /* ---------------- 恢复 ---------------- */

  (function boot() {
    const p = PROJECT.get();
    const d = p.design;
    if (d.arms || d.control) {
      if (d.arms) $('design-arms').value = d.arms;
      if (d.control) $('design-control').value = d.control;
      if (d.criterion) $('design-criterion').value = d.criterion;
      if (d.variables) $('design-vars').value = d.variables;
      if (d.rounds) $('design-rounds').value = d.rounds;
      if (d.unit) $('design-unit').value = d.unit;
      $('design-placebo').checked = !!d.placebo;
      runDesign();
    } else {
      fillDesignSample();
    }

    const b = p.batch;
    if (b.dir || b.cmd) {
      ['name', 'dir', 'cmd', 'version', 'seeds', 'machine'].forEach(function (k) {
        if (b[k]) $('batch-' + k).value = b[k];
      });
      $('batch-dry').checked = !!b.dry;
      runBatch();
    } else {
      fillBatchSample();
    }

    if (p.submit.refs) {
      $('refs-text').value = p.submit.refs;
      runRefs();
    } else {
      fillRefsSample();
    }

    if (p.submit.comments) {
      $('comments-text').value = p.submit.comments;
      runComments();
    } else {
      fillCommentsSample();
    }
  })();
})(window);
