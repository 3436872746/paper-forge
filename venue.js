/* LabCheck — 顶会基线（venue bar）
 * 从 corpus 的 evidence / boundary 字段统计这个方向的惯例。
 */
(function (global) {
  'use strict';

  const DIMENSIONS = [
    { key: 'real', name: '真实系统或原型', test: function (e) { return /real system|prototype|production|deploy|testbed|cluster/i.test(e); } },
    { key: 'trace', name: '生产 trace', test: function (e) { return /trace/i.test(e); } },
    { key: 'sim', name: '模拟', test: function (e) { return /simulat/i.test(e); } },
    { key: 'bench', name: '基准或实证分析', test: function (e) { return /benchmark|empirical|measurement study|analysis/i.test(e); } },
    { key: 'baseline', name: '指名了对比的基线', test: function (e) { return /baseline|compared (with|against)|against [A-Z]|\bvs\.?\b/i.test(e); } },
    { key: 'tail', name: '报告尾部延迟', test: function (e) { return /tail|p99|p95|percentile|SLO/i.test(e); } },
    { key: 'tput', name: '报告吞吐或加速比', test: function (e) { return /throughput|speedup|goodput/i.test(e); } },
    { key: 'ablation', name: '做了消融', test: function (e) { return /ablation|remov/i.test(e); } },
    { key: 'scale', name: '两种及以上模型或负载', test: function (e) { return /models|datasets|workloads|across/i.test(e); } },
    { key: 'code', name: '发布代码或制品', test: function (e) { return /open[- ]source|released|github|publicly available/i.test(e); } }
  ];

  const ASKS = [
    { name: '指名一个真实工作负载，说明数字从哪来', need: 'real', ask: '你的负载就是你的设计假设，结果只是真实情况的上界。' },
    { name: '在两种及以上规模上评测', need: 'scale', ask: '这能撑住上探一个规模吗，还是只是这一档的性质？' },
    { name: '与最近的系统比，并指名它', need: 'baseline', ask: '我这个数字到底该跟哪个系统比？' },
    { name: '报告尾部，而不只是均值', need: 'tail', ask: '我真正在意的慢请求，怎么样了？' },
    { name: '用消融隔离机制', need: 'ablation', ask: '你几项贡献里，是哪一项产生了收益？' },
    { name: '说明过载或判断出错时怎么办', need: 'real', ask: '你的系统只在一切按预期的那段区间里有定义。' }
  ];

  function summarize(list) {
    const total = list.length || 1;
    const rows = DIMENSIONS.map(function (d) {
      const hit = list.filter(function (p) { return d.test(String(p.evidence || '')); });
      return {
        key: d.key,
        name: d.name,
        count: hit.length,
        ratio: hit.length / total,
        examples: hit.slice(0, 2).map(function (p) { return p.title.length > 46 ? p.title.slice(0, 46) + '…' : p.title; })
      };
    });

    const bounded = list.filter(function (p) {
      return !/^not stated/i.test(String(p.boundary || '').trim());
    }).length;
    rows.push({
      key: 'boundary', name: '明确写了边界', count: bounded, ratio: bounded / total,
      examples: []
    });

    const byKey = {};
    rows.forEach(function (r) { byKey[r.key] = r; });

    const asks = ASKS.map(function (a) {
      const r = byKey[a.need];
      return {
        name: a.name,
        count: r ? r.count : 0,
        total: list.length,
        ask: a.ask
      };
    });

    return { total: list.length, rows: rows, asks: asks };
  }

  global.LabCheckVenue = { summarize: summarize, DIMENSIONS: DIMENSIONS };

  if (typeof document === 'undefined') return;

  function el(tag, cls, text) {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text !== undefined) n.textContent = text;
    return n;
  }

  function render(box, list) {
    box.innerHTML = '';
    if (!list.length) return;
    const s = summarize(list);

    const h = el('h3', 'section-title', '这个方向的基线');
    box.appendChild(h);

    const wrap = el('div', 'table-wrap');
    const table = el('table');
    const head = el('tr');
    ['维度', '篇数', '占比', '例子'].forEach(function (t) { head.appendChild(el('th', '', t)); });
    table.appendChild(head);
    s.rows.forEach(function (r) {
      const tr = el('tr');
      tr.appendChild(el('td', '', r.name));
      tr.appendChild(el('td', 'num', String(r.count)));
      tr.appendChild(el('td', 'num', Math.round(r.ratio * 100) + '%'));
      tr.appendChild(el('td', 'venue-ex', r.examples.length ? r.examples.join('；') : '—'));
      table.appendChild(tr);
    });
    wrap.appendChild(table);
    box.appendChild(wrap);

    box.appendChild(el('h3', 'section-title', '审稿人会问的六件事'));
    const ol = el('ol', 'venue-ask');
    s.asks.forEach(function (a) {
      const li = el('li');
      li.appendChild(el('strong', '', a.name));
      li.appendChild(el('span', 'venue-count', a.count + '/' + a.total + ' 篇这么做'));
      li.appendChild(el('span', 'venue-q', '缺了会被问：' + a.ask));
      ol.appendChild(li);
    });
    box.appendChild(ol);
  }

  global.LabCheckVenue.render = render;
})(window);
