/* LabCheck — 界面与交互 */
(function () {
  'use strict';

  const LC = window.LabCheck;
  const PROJECT = window.LabCheckProject;
  const $ = function (id) { return document.getElementById(id); };

  let state = { scene: 'ab', result: null, text: '' };

  const STATION_NAMES = {
    topic: '选方向', framing: '定框', design: '设计', batch: '跑批',
    analysis: '分析', writing: '写作', submit: '投稿'
  };

  /* ------------------------- 站点路由 ------------------------- */

  function currentStation() {
    const h = location.hash.replace('#', '');
    return PROJECT.STATIONS.indexOf(h) >= 0 ? h : 'analysis';
  }

  function hasContent(v, d) {
    for (const k in d) if (JSON.stringify(v[k]) !== JSON.stringify(d[k])) return true;
    for (const k in v) if (!(k in d)) return true;
    return false;
  }

  function updateRail() {
    const p = PROJECT.get();
    Array.prototype.forEach.call(document.querySelectorAll('.rail li'), function (li) {
      const s = li.dataset.station;
      const v = p[s];
      const content = hasContent(v, PROJECT.DEFAULTS[s]);
      const red = (v.red || 0) > 0;
      li.querySelector('.dot').className = 'dot' + (content ? (red ? ' red' : ' ok') : '');
      li.querySelector('a').setAttribute('aria-label',
        STATION_NAMES[s] + '：' + (content ? (red ? '有内容，查出红牌' : '有内容，无红牌') : '还没内容'));
    });
  }

  function route() {
    if (!location.hash) history.replaceState(null, '', '#analysis');
    const id = currentStation();
    Array.prototype.forEach.call(document.querySelectorAll('.station'), function (s) {
      s.hidden = s.dataset.station !== id;
    });
    Array.prototype.forEach.call(document.querySelectorAll('.tab'), function (t) {
      const on = t.dataset.station === id;
      t.classList.toggle('active', on);
      if (on) t.setAttribute('aria-current', 'page'); else t.removeAttribute('aria-current');
    });
    Array.prototype.forEach.call(document.querySelectorAll('.rail li'), function (li) {
      li.classList.toggle('active', li.dataset.station === id);
    });
    updateRail();
  }

  window.addEventListener('hashchange', function () {
    route();
    window.scrollTo({ top: 0, behavior: 'auto' });
  });

  /* ------------------------- 输入框自适应 ------------------------- */

  function fitArea(t) {
    t.style.height = 'auto';
    t.style.height = Math.min(t.scrollHeight + 2, 420) + 'px';
  }
  ['data-input', 'note-input'].forEach(function (id) {
    $(id).addEventListener('input', function () { fitArea(this); });
  });
  function fitAreas() { fitArea($('data-input')); fitArea($('note-input')); }

  const SAMPLE = {
    data: '对照组: 412, 398, 405\n方法A: 356, 341, 349\n方法B: 388, 372, 395',
    note: '三组各跑 3 次，两两做了 t 检验，方法A 比对照快 13%，准备写进摘要。'
  };

  /* ------------------------- 场景选择 ------------------------- */
  $('scene-chips').addEventListener('click', function (e) {
    const btn = e.target.closest('.chip');
    if (!btn) return;
    Array.prototype.forEach.call(this.querySelectorAll('.chip'), function (c) {
      c.classList.toggle('active', c === btn);
      c.setAttribute('aria-pressed', c === btn ? 'true' : 'false');
    });
    state.scene = btn.dataset.scene;
  });

  /* ------------------------- 载入示例 ------------------------- */
  $('btn-sample').addEventListener('click', function () {
    $('data-input').value = SAMPLE.data;
    $('note-input').value = SAMPLE.note;
    fitAreas();
    const multi = document.querySelector('.chip[data-scene="multi"]');
    if (multi) multi.click();
    run();
  });

  /* ------------------------- 体检 ------------------------- */
  $('btn-run').addEventListener('click', function () { run(); });

  document.addEventListener('keydown', function (e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') run();
  });

  const FLAG_IDS = {
    correction: 'f-correction',
    effect: 'f-effect',
    baseline: 'f-baseline',
    repeat: 'f-repeat',
    tune: 'f-tune',
    seed: 'f-seed',
    errbar: 'f-errbar',
    power: 'f-power'
  };

  function readFlags() {
    const flags = {};
    for (const k in FLAG_IDS) flags[k] = $(FLAG_IDS[k]).checked;
    return flags;
  }

  function run(opts) {
    const err = $('parse-error');
    const groups = LC.parseData($('data-input').value);
    if (!groups.length) {
      err.hidden = false;
      err.textContent = '没读到数字。至少写一行，像这样：对照组: 412, 398, 405';
      return;
    }
    err.hidden = true;

    state.result = LC.evaluate({
      groups: groups,
      scene: state.scene,
      metric: $('metric').value,
      note: $('note-input').value,
      flags: readFlags()
    });

    if (!(opts && opts.skipHistory)) {
      recordHistory();
      $('demo-note').hidden = true;
    }
    if (!(opts && opts.demo)) {
      PROJECT.save({ analysis: { red: state.result.counts.red, amber: state.result.counts.amber, at: Date.now() } });
      updateRail();
    }

    $('empty-state').hidden = true;
    $('report').hidden = false;

    renderSummary(state.result);
    renderTable(state.result);
    renderScatter(state.result);
    renderFindings(state.result);
    renderPrescription(LC.prescription(state.result));
    $('expand-hint').textContent = '';
    if (!(opts && opts.noScroll)) {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      $('report-panel').scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    }
  }

  /* ------------------------- 渲染 ------------------------- */

  function el(tag, cls, text) {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text !== undefined) n.textContent = text;
    return n;
  }

  function scoreOf(r) {
    return Math.max(0, Math.min(100, 100 - 18 * r.counts.red - 7 * r.counts.amber));
  }

  function renderSummary(r) {
    const box = $('summary');
    box.innerHTML = '';
    const score = scoreOf(r);
    const level = r.counts.red > 0 ? 'red' : (r.counts.amber > 0 ? 'amber' : 'green');
    box.className = 'verdict ' + level;

    const num = el('div', 'verdict-num', String(score));
    const lbl = el('span', '', '体检分');
    num.appendChild(lbl);
    box.appendChild(num);

    const text = el('div', 'verdict-text');
    const title = el('strong');
    if (r.counts.red) {
      title.textContent = '有 ' + r.counts.red + ' 处硬伤，现在投出去会被打回';
    } else if (r.counts.amber) {
      title.textContent = '没有硬伤，还有 ' + r.counts.amber + ' 处建议补';
    } else {
      title.textContent = '按现有判据没查出问题';
    }
    text.appendChild(title);
    text.appendChild(el('span', '', '红牌 ' + r.counts.red + ' · 黄牌 ' + r.counts.amber + ' · 通过 ' + r.counts.green));
    text.appendChild(renderMeter(r.counts));
    box.appendChild(text);
  }

  function renderMeter(counts) {
    const total = counts.red + counts.amber + counts.green;
    const meter = el('div', 'meter');
    meter.setAttribute('role', 'img');
    meter.setAttribute('aria-label', '红牌 ' + counts.red + ' 项，黄牌 ' + counts.amber + ' 项，通过 ' + counts.green + ' 项');
    ['red', 'amber', 'green'].forEach(function (level) {
      const seg = el('i', level);
      seg.style.width = (total ? counts[level] / total * 100 : 0) + '%';
      meter.appendChild(seg);
    });
    return meter;
  }

  function renderTable(r) {
    const wrap = $('stat-table');
    wrap.innerHTML = '';

    const t1 = el('table');
    const h1 = el('tr');
    ['组', 'n', '均值', '标准差', '95% CI'].forEach(function (h) { h1.appendChild(el('th', '', h)); });
    t1.appendChild(h1);
    r.groups.forEach(function (g, i) {
      const n = g.values.length;
      const ci = n > 1 ? 1.96 * r.sds[i] / Math.sqrt(n) : NaN;
      const tr = el('tr');
      tr.appendChild(el('td', '', g.name));
      tr.appendChild(el('td', 'num', String(n)));
      tr.appendChild(el('td', 'num', LC.fmt.num(r.means[i], 2)));
      tr.appendChild(el('td', 'num', LC.fmt.num(r.sds[i], 2)));
      tr.appendChild(el('td', 'num', isFinite(ci) ? '± ' + LC.fmt.num(ci, 2) : '—'));
      t1.appendChild(tr);
    });
    wrap.appendChild(t1);

    if (r.pairStats.length) {
      const t2 = el('table');
      t2.style.marginTop = '14px';
      const h2 = el('tr');
      ['对比', '差值', '相对', 'p', '置换 p', 'Holm p', "Cohen's d"].forEach(function (h) { h2.appendChild(el('th', '', h)); });
      t2.appendChild(h2);
      r.pairStats.forEach(function (p) {
        const tr = el('tr');
        tr.appendChild(el('td', '', r.groups[p.i].name + ' vs ' + r.groups[p.j].name));
        tr.appendChild(el('td', 'num', LC.fmt.num(p.diff, 2)));
        tr.appendChild(el('td', 'num', isFinite(p.rel) ? LC.fmt.pct(p.rel, 1) : '—'));
        tr.appendChild(el('td', 'num', LC.fmt.pval(p.p)));
        tr.appendChild(el('td', 'num', isFinite(p.permP) ? LC.fmt.pval(p.permP) : '—'));
        tr.appendChild(el('td', 'num', LC.fmt.pval(p.pAdj)));
        tr.appendChild(el('td', 'num', LC.fmt.num(p.d, 2)));
        t2.appendChild(tr);
      });
      wrap.appendChild(t2);
    }
  }

  const SVG_NS = 'http://www.w3.org/2000/svg';

  function svgEl(tag, attrs) {
    const n = document.createElementNS(SVG_NS, tag);
    for (const k in attrs) n.setAttribute(k, attrs[k]);
    return n;
  }

  function renderScatter(r) {
    const box = $('scatter');
    box.innerHTML = '';
    if (!r.groups.length) return;

    const all = r.groups.reduce(function (a, g) { return a.concat(g.values); }, []);
    const dataMin = Math.min.apply(null, all);
    const dataMax = Math.max.apply(null, all);
    let lo = dataMin, hi = dataMax;
    if (lo === hi) { lo -= 1; hi += 1; }
    const pad = (hi - lo) * 0.08;
    lo -= pad; hi += pad;

    const W = 150, H = 200, TOP = 12, BOTTOM = 10, LEFT = 46, RIGHT = 12;
    const plotW = W - LEFT - RIGHT, plotH = H - TOP - BOTTOM;
    const y = function (v) { return TOP + (hi - v) / (hi - lo) * plotH; };

    box.appendChild(el('div', 'scatter-title', '每个点是一次重复，横线是均值'));

    r.groups.forEach(function (g, gi) {
      const col = el('div', 'scatter-col');
      const svg = svgEl('svg', {
        viewBox: '0 0 ' + W + ' ' + H,
        role: 'img',
        'aria-label': g.name + ' 的重复测量散点图'
      });

      [dataMax, (dataMin + dataMax) / 2, dataMin].forEach(function (v) {
        svg.appendChild(svgEl('line', {
          x1: LEFT, x2: W - RIGHT, y1: y(v), y2: y(v),
          stroke: '#E2E5E2', 'stroke-width': 1
        }));
        const t = svgEl('text', {
          x: LEFT - 6, y: y(v) + 3.5,
          'text-anchor': 'end', 'font-size': 9, fill: '#6B747C'
        });
        t.textContent = LC.fmt.num(v, 1);
        svg.appendChild(t);
      });

      const n = g.values.length;
      g.values.forEach(function (v, i) {
        const cx = LEFT + (i + 0.5) * plotW / n;
        const dot = svgEl('circle', {
          cx: cx, cy: y(v), r: 3.5,
          fill: '#101214', 'fill-opacity': 0.75
        });
        const title = svgEl('title', {});
        title.textContent = g.name + ' 第 ' + (i + 1) + ' 次：' + LC.fmt.num(v, 2);
        dot.appendChild(title);
        svg.appendChild(dot);
      });

      svg.appendChild(svgEl('line', {
        x1: LEFT, x2: W - RIGHT, y1: y(r.means[gi]), y2: y(r.means[gi]),
        stroke: '#A22B1B', 'stroke-width': 2
      }));

      col.appendChild(svg);
      col.appendChild(el('div', 'scatter-name', g.name));
      col.appendChild(el('div', 'scatter-meta', 'n = ' + n + ' · 均值 ' + LC.fmt.num(r.means[gi], 2)));
      box.appendChild(col);
    });
  }

  const LEVEL_LABEL = { red: '红牌', amber: '黄牌', green: '通过' };

  function renderFindings(r) {
    const box = $('findings');
    box.innerHTML = '';

    r.findings.forEach(function (f) {
      const card = el('div', 'finding ' + f.level);
      const h = el('h4');
      h.appendChild(el('span', 'tag ' + f.level, LEVEL_LABEL[f.level]));
      h.appendChild(document.createTextNode(f.title));
      card.appendChild(h);

      card.appendChild(el('p', '', f.why));
      const fix = el('p', 'fix');
      fix.appendChild(el('strong', '', '怎么改：'));
      fix.appendChild(document.createTextNode(f.fix));
      card.appendChild(fix);
      if (f.cite) card.appendChild(el('div', 'cite', '出处：' + f.cite));
      box.appendChild(card);
    });

    r.passed.forEach(function (text) {
      const card = el('div', 'finding green');
      const h = el('h4');
      h.appendChild(el('span', 'tag green', '通过'));
      h.appendChild(document.createTextNode(text));
      card.appendChild(h);
      box.appendChild(card);
    });
  }

  function renderPrescription(text) {
    state.text = text;
    $('prescription-text').textContent = text;
  }

  /* ------------------------- 复制 / 下载 ------------------------- */

  $('btn-copy').addEventListener('click', function () {
    const btn = this;
    const done = function () {
      btn.textContent = '已复制';
      setTimeout(function () { btn.textContent = '复制'; }, 1500);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(state.text).then(done, function () { fallbackCopy(state.text); done(); });
    } else {
      fallbackCopy(state.text);
      done();
    }
  });

  function fallbackCopy(text) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); } catch (e) { /* 忽略 */ }
    document.body.removeChild(ta);
  }

  $('btn-download').addEventListener('click', function () {
    const blob = new Blob([state.text], { type: 'text/markdown;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = '实验体检报告.md';
    a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
  });

  /* ------------------------- 设置 ------------------------- */

  const CFG_KEY = 'labcheck.config';
  function getConfig() {
    try {
      return JSON.parse(localStorage.getItem(CFG_KEY) || '{}');
    } catch (e) { return {}; }
  }
  function setConfig(cfg) {
    localStorage.setItem(CFG_KEY, JSON.stringify(cfg));
  }

  $('btn-settings').addEventListener('click', function () {
    const cfg = getConfig();
    $('cfg-key').value = cfg.key || '';
    $('cfg-base').value = cfg.base || 'https://dashscope.aliyuncs.com/compatible-mode/v1';
    $('cfg-model').value = cfg.model || 'qwen-plus';
    $('modal-settings').hidden = false;
  });
  $('btn-settings-cancel').addEventListener('click', function () {
    $('modal-settings').hidden = true;
  });
  $('btn-settings-save').addEventListener('click', function () {
    setConfig({
      key: $('cfg-key').value.trim(),
      base: $('cfg-base').value.trim() || 'https://dashscope.aliyuncs.com/compatible-mode/v1',
      model: $('cfg-model').value.trim() || 'qwen-plus'
    });
    $('modal-settings').hidden = true;
    $('expand-hint').textContent = '设置已保存。';
  });
  $('modal-settings').addEventListener('click', function (e) {
    if (e.target === this) this.hidden = true;
  });

  /* ------------------------- 本地历史 ------------------------- */

  const HIST_KEY = 'labcheck.history';
  const HIST_MAX = 20;

  function getHistory() {
    try {
      const list = JSON.parse(localStorage.getItem(HIST_KEY) || '[]');
      return Array.isArray(list) ? list : [];
    } catch (e) { return []; }
  }

  function recordHistory() {
    const r = state.result;
    const list = getHistory();
    list.unshift({
      time: Date.now(),
      score: scoreOf(r),
      red: r.counts.red,
      data: $('data-input').value,
      note: $('note-input').value,
      scene: state.scene,
      metric: $('metric').value,
      flags: readFlags()
    });
    try {
      localStorage.setItem(HIST_KEY, JSON.stringify(list.slice(0, HIST_MAX)));
    } catch (e) { /* 存不进去就不存，不影响体检 */ }
  }

  function fmtTime(t) {
    const d = new Date(t);
    const p = function (x) { return (x < 10 ? '0' : '') + x; };
    return p(d.getMonth() + 1) + '-' + p(d.getDate()) + ' ' + p(d.getHours()) + ':' + p(d.getMinutes());
  }

  function renderHistory() {
    const box = $('history-list');
    box.innerHTML = '';
    const list = getHistory();
    if (!list.length) {
      box.appendChild(el('p', 'muted', '还没有历史。体检一次就会记一条。'));
      return;
    }
    list.forEach(function (h) {
      const item = el('button', 'hist-item');
      item.type = 'button';
      item.appendChild(el('span', 'hist-time', fmtTime(h.time)));
      const score = el('span', 'hist-score');
      score.appendChild(el('span', 'dot ' + (h.score >= 80 ? 'green' : h.score >= 55 ? 'amber' : 'red')));
      score.appendChild(document.createTextNode('体检分 ' + h.score));
      item.appendChild(score);
      item.appendChild(el('span', 'hist-red', '红牌 ' + h.red));
      item.addEventListener('click', function () { restoreHistory(h); });
      box.appendChild(item);
    });
  }

  function restoreHistory(h) {
    $('data-input').value = h.data || '';
    $('note-input').value = h.note || '';
    $('metric').value = h.metric || 'other';
    const chip = document.querySelector('.chip[data-scene="' + h.scene + '"]');
    if (chip) chip.click();
    const flags = h.flags || {};
    for (const k in FLAG_IDS) $(FLAG_IDS[k]).checked = !!flags[k];
    fitAreas();
    $('modal-history').hidden = true;
    run({ skipHistory: true });
  }

  $('btn-history').addEventListener('click', function () {
    renderHistory();
    $('modal-history').hidden = false;
  });
  $('btn-history-close').addEventListener('click', function () {
    $('modal-history').hidden = true;
  });
  $('modal-history').addEventListener('click', function (e) {
    if (e.target === this) this.hidden = true;
  });

  /* ------------------------- 用模型展开 ------------------------- */

  $('btn-expand').addEventListener('click', expand);

  async function expand() {
    const cfg = getConfig();
    const hint = $('expand-hint');
    const btn = $('btn-expand');

    if (!cfg.key) {
      hint.textContent = '还没填 API Key。点右上角「设置」填一个，或者直接用上面这份模板。';
      return;
    }

    btn.disabled = true;
    btn.textContent = '生成中…';
    hint.textContent = '';

    const prompt = [
      '下面是一份实验体检报告。请写两段中文：',
      '第一段，《投稿前必须补的》，只列红牌和黄牌，每条一句，说清楚补什么实验或统计。',
      '第二段，《可以直接写进 Method 的话》，100 字以内，客观陈述，不要形容词。',
      '不要开场白，不要总结，直接给正文。',
      '',
      LC.prescription(state.result)
    ].join('\n');

    try {
      const res = await fetch(cfg.base.replace(/\/+$/, '') + '/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + cfg.key
        },
        body: JSON.stringify({
          model: cfg.model,
          temperature: 0.3,
          messages: [
            { role: 'system', content: '你是论文方法学审稿人。只输出正文，不要客套话。' },
            { role: 'user', content: prompt }
          ]
        })
      });
      if (!res.ok) {
        const body = await res.text();
        throw new Error('HTTP ' + res.status + ' ' + body.slice(0, 160));
      }
      const data = await res.json();
      const text = data && data.choices && data.choices[0] && data.choices[0].message
        ? data.choices[0].message.content
        : '';
      if (!text) throw new Error('模型返回是空的');
      renderPrescription(text.trim());
      hint.textContent = '已用 ' + cfg.model + ' 重写。原始模板还在，刷新或重新体检可恢复。';
    } catch (e) {
      hint.textContent = '调用失败：' + (e && e.message ? e.message : e) + '。检查 Key、Base URL 和网络。';
    } finally {
      btn.disabled = false;
      btn.textContent = '用模型展开成段落';
    }
  }

  /* ------------------------- 判据库 ------------------------- */

  function renderKnowledge(filter) {
    const box = $('kb-list');
    box.innerHTML = '';
    const q = (filter || '').trim().toLowerCase();
    LC.KNOWLEDGE.filter(function (k) {
      if (!q) return true;
      return (k.title + k.why + k.fix + k.src).toLowerCase().indexOf(q) >= 0;
    }).forEach(function (k) {
      const item = el('div', 'kb-item');
      item.appendChild(el('h4', '', k.title));
      item.appendChild(el('p', '', k.why));
      const fix = el('p');
      fix.appendChild(el('strong', '', '怎么改：'));
      fix.appendChild(document.createTextNode(k.fix));
      item.appendChild(fix);
      item.appendChild(el('div', 'cite', '出处：' + k.src));
      box.appendChild(item);
    });
    if (!box.children.length) box.appendChild(el('p', 'muted', '没搜到。'));
  }

  $('btn-knowledge').addEventListener('click', function () {
    $('kb-search').value = '';
    renderKnowledge('');
    $('modal-knowledge').hidden = false;
  });
  $('btn-knowledge-close').addEventListener('click', function () {
    $('modal-knowledge').hidden = true;
  });
  $('modal-knowledge').addEventListener('click', function (e) {
    if (e.target === this) this.hidden = true;
  });
  $('kb-search').addEventListener('input', function () {
    renderKnowledge(this.value);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      $('modal-settings').hidden = true;
      $('modal-knowledge').hidden = true;
      $('modal-history').hidden = true;
    }
  });

  /* ------------------------- 站 1 · 选方向 ------------------------- */

  const CORPUS = window.LABCHECK_CORPUS || [];
  const CN_MAP = {
    '推理': 'inference', '调度': 'scheduling', '缓存': 'cache', '量化': 'quantization',
    '训练': 'training', '网络': 'network', '攻击': 'attack', '检测': 'detection',
    '视频': 'video', '卫星': 'satellite', '传输': 'transmission', '带宽': 'bandwidth',
    '延迟': 'latency', '吞吐': 'throughput', '批处理': 'batching', '分布式': 'distributed',
    '并行': 'parallel', '显存': 'memory', '压缩': 'compression', '安全': 'security',
    '隐私': 'privacy', '服务': 'serving', '解码': 'decoding', '预填充': 'prefill'
  };
  const REAL_WORDS = ['real system', 'trace', 'production', 'deployment', 'testbed'];
  let topicState = { domain: '', query: '', picked: [] };

  function topicTokens(q) {
    return q.trim().toLowerCase().split(/\s+/).filter(Boolean).map(function (t) { return CN_MAP[t] || t; });
  }
  function topicScore(p, tokens) {
    const T = (p.title || '').toLowerCase(), P = (p.problem || '').toLowerCase(),
      M = (p.mechanism || '').toLowerCase(), V = (p.move || '').toLowerCase();
    let s = 0;
    tokens.forEach(function (t) {
      if (T.indexOf(t) >= 0) s += 3;
      if (P.indexOf(t) >= 0) s += 2;
      if (M.indexOf(t) >= 0) s += 1;
      if (V.indexOf(t) >= 0) s += 1;
    });
    return s;
  }
  function topicMatches() {
    const base = topicState.domain ? CORPUS.filter(function (p) { return p.domain === topicState.domain; }) : CORPUS.slice();
    const tokens = topicTokens(topicState.query);
    if (!tokens.length) return base;
    return base.map(function (p) { return { p: p, s: topicScore(p, tokens) }; })
      .filter(function (x) { return x.s > 0; })
      .sort(function (a, b) { return b.s - a.s; })
      .map(function (x) { return x.p; });
  }
  function paperCard(p) {
    const picked = topicState.picked.indexOf(p.title) >= 0;
    const card = el('article', 'paper' + (picked ? ' picked' : ''));
    const head = el('div', 'paper-head');
    head.appendChild(el('h3', '', p.title));
    head.appendChild(el('span', 'paper-meta', p.venue + ' · ' + p.year));
    card.appendChild(head);
    [['问题', p.problem], ['证据', p.evidence], ['边界', p.boundary], ['可借的招', p.move]].forEach(function (pair) {
      const row = el('p', 'paper-field');
      row.appendChild(el('span', 'paper-label', pair[0]));
      row.appendChild(document.createTextNode(String(pair[1] || '').replace(/\s*\n\s*/g, ' ')));
      card.appendChild(row);
    });
    const btn = el('button', 'ghost small pick', picked ? '已在文献里 · 点击移除' : '加入我的文献');
    btn.type = 'button';
    btn.setAttribute('aria-pressed', picked ? 'true' : 'false');
    btn.addEventListener('click', function () { togglePick(p.title); });
    card.appendChild(btn);
    return card;
  }
  function renderTopic() {
    const list = topicMatches();
    const box = $('topic-list');
    box.innerHTML = '';
    if (!list.length) {
      $('topic-stats').textContent = '';
      if ($('topic-venue')) $('topic-venue').innerHTML = '';
      $('topic-empty').hidden = false;
      return;
    }
    $('topic-empty').hidden = true;
    const M = list.filter(function (p) {
      const e = (p.evidence || '').toLowerCase();
      return REAL_WORDS.some(function (w) { return e.indexOf(w) >= 0; });
    }).length;
    const K = list.filter(function (p) {
      return !String(p.boundary || '').trim().toLowerCase().startsWith('not stated');
    }).length;
    $('topic-stats').innerHTML =
      '<span>命中 <b>' + list.length + '</b> 篇</span>' +
      '<span>摘要里写了真实系统或 trace <b>' + M + '</b> 篇</span>' +
      '<span>明确写了边界 <b>' + K + '</b> 篇</span>';
    if (window.LabCheckVenue && $('topic-venue')) {
      window.LabCheckVenue.render($('topic-venue'), list);
    }
    list.forEach(function (p) { box.appendChild(paperCard(p)); });
  }
  function persistTopic() {
    PROJECT.save({ topic: { domain: topicState.domain, query: topicState.query, picked: topicState.picked } });
  }
  function togglePick(title) {
    const i = topicState.picked.indexOf(title);
    if (i >= 0) topicState.picked.splice(i, 1); else topicState.picked.push(title);
    persistTopic(); renderTopic(); updateRail();
  }
  function syncDomainChips() {
    Array.prototype.forEach.call($('domain-chips').querySelectorAll('.chip'), function (c) {
      const on = c.dataset.domain === topicState.domain;
      c.classList.toggle('active', on);
      c.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
  }
  function initTopic() {
    const t = PROJECT.get().topic;
    topicState = { domain: t.domain || '', query: t.query || '', picked: Array.isArray(t.picked) ? t.picked.slice() : [] };
    $('topic-query').value = topicState.query;
    syncDomainChips();
    renderTopic();
  }
  $('domain-chips').addEventListener('click', function (e) {
    const btn = e.target.closest('.chip');
    if (!btn) return;
    topicState.domain = (topicState.domain === btn.dataset.domain) ? '' : btn.dataset.domain;
    syncDomainChips(); persistTopic(); renderTopic(); updateRail();
  });
  $('topic-query').addEventListener('input', function () {
    topicState.query = this.value;
    persistTopic(); renderTopic(); updateRail();
  });

  /* ------------------------- 首屏直接给结果 ------------------------- */
  (function boot() {
    route();
    initTopic();
    if ($('data-input').value.trim()) { fitAreas(); return; }
    $('data-input').value = SAMPLE.data;
    $('note-input').value = SAMPLE.note;
    fitAreas();
    const multi = document.querySelector('.chip[data-scene="multi"]');
    if (multi) multi.click();
    run({ skipHistory: true, noScroll: true });
    $('demo-note').hidden = false;
  })();
})();
