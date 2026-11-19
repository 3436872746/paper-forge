/* LabCheck — 判据引擎
 * 纯函数，不碰 DOM。所有数字都在这里算完。
 */
(function (global) {
  'use strict';

  /* ------------------------------------------------------------------ */
  /* 解析                                                                 */
  /* ------------------------------------------------------------------ */

  function parseData(text) {
    const lines = String(text || '')
      .split(/\r?\n/)
      .map(function (s) { return s.trim(); })
      .filter(function (s) { return s && s[0] !== '#'; });

    const groups = [];
    const index = {};
    function add(name, values) {
      name = String(name).trim();
      if (!name) return;
      if (!(name in index)) { index[name] = groups.length; groups.push({ name: name, values: [] }); }
      for (let i = 0; i < values.length; i++) {
        const v = Number(values[i]);
        if (isFinite(v)) groups[index[name]].values.push(v);
      }
    }

    // 1) 组名: 1, 2, 3
    let hit = 0;
    for (let i = 0; i < lines.length; i++) {
      const m = lines[i].match(/^(.+?)\s*[:：]\s*(.+)$/);
      if (m && /^[\s,\t\-+0-9.eE]+$/.test(m[2])) {
        add(m[1], m[2].split(/[\s,\t]+/));
        hit++;
      }
    }
    if (hit) return groups.filter(function (g) { return g.values.length; });

    const rows = lines.map(function (l) { return l.split(/[,\t]+/).map(function (s) { return s.trim(); }); });

    // 2) Excel 表：第一行组名，下面每行一次重复
    const head = rows[0] || [];
    const headIsNames = head.length > 1 && head.every(function (h) { return h !== '' && !isFinite(Number(h)); });
    const body = rows.slice(1);
    const bodyOk = body.length > 0 && body.every(function (r) {
      return r.length === head.length && r.every(function (x) { return x !== '' && isFinite(Number(x)); });
    });
    if (headIsNames && bodyOk) {
      head.forEach(function (name, i) {
        add(name, body.map(function (r) { return r[i]; }));
      });
      return groups;
    }

    // 3) 组名,数值 —— 每行一个观测
    for (let i = 0; i < rows.length; i++) {
      const r = rows[i];
      if (r.length >= 2 && isFinite(Number(r[r.length - 1]))) {
        add(r.slice(0, -1).join(' '), [r[r.length - 1]]);
      }
    }
    return groups.filter(function (g) { return g.values.length; });
  }

  /* ------------------------------------------------------------------ */
  /* 统计                                                                 */
  /* ------------------------------------------------------------------ */

  function mean(a) {
    let s = 0;
    for (let i = 0; i < a.length; i++) s += a[i];
    return a.length ? s / a.length : 0;
  }
  function variance(a) {
    if (a.length < 2) return 0;
    const m = mean(a);
    let s = 0;
    for (let i = 0; i < a.length; i++) s += (a[i] - m) * (a[i] - m);
    return s / (a.length - 1);
  }
  function sd(a) { return Math.sqrt(variance(a)); }

  function gammaln(x) {
    const c = [76.18009172947146, -86.50532032941677, 24.01409824083091,
      -1.231739572450155, 0.1208650973866179e-2, -0.5395239384953e-5];
    let y = x, tmp = x + 5.5;
    tmp -= (x + 0.5) * Math.log(tmp);
    let ser = 1.000000000190015;
    for (let j = 0; j < 6; j++) ser += c[j] / ++y;
    return -tmp + Math.log(2.5066282746310005 * ser / x);
  }

  function betacf(a, b, x) {
    const MAXIT = 200, EPS = 3e-12, FPMIN = 1e-300;
    const qab = a + b, qap = a + 1, qam = a - 1;
    let c = 1, d = 1 - qab * x / qap;
    if (Math.abs(d) < FPMIN) d = FPMIN;
    d = 1 / d;
    let h = d;
    for (let m = 1; m <= MAXIT; m++) {
      const m2 = 2 * m;
      let aa = m * (b - m) * x / ((qam + m2) * (a + m2));
      d = 1 + aa * d; if (Math.abs(d) < FPMIN) d = FPMIN;
      c = 1 + aa / c; if (Math.abs(c) < FPMIN) c = FPMIN;
      d = 1 / d; h *= d * c;
      aa = -(a + m) * (qab + m) * x / ((a + m2) * (qap + m2));
      d = 1 + aa * d; if (Math.abs(d) < FPMIN) d = FPMIN;
      c = 1 + aa / c; if (Math.abs(c) < FPMIN) c = FPMIN;
      d = 1 / d;
      const del = d * c; h *= del;
      if (Math.abs(del - 1) < EPS) break;
    }
    return h;
  }

  function ibeta(a, b, x) {
    if (x <= 0) return 0;
    if (x >= 1) return 1;
    const bt = Math.exp(gammaln(a + b) - gammaln(a) - gammaln(b) + a * Math.log(x) + b * Math.log(1 - x));
    if (x < (a + 1) / (a + b + 2)) return bt * betacf(a, b, x) / a;
    return 1 - bt * betacf(b, a, 1 - x) / b;
  }

  function tTwoTailP(t, df) {
    if (!isFinite(t) || !isFinite(df) || df <= 0) return 1;
    return ibeta(df / 2, 0.5, df / (df + t * t));
  }

  function welch(a, b) {
    const n1 = a.length, n2 = b.length;
    if (n1 < 2 || n2 < 2) return { t: 0, df: 0, p: NaN, se: NaN };
    const v1 = variance(a) / n1, v2 = variance(b) / n2;
    const se = Math.sqrt(v1 + v2);
    const diff = mean(a) - mean(b);
    if (se === 0) return { t: diff === 0 ? 0 : (diff > 0 ? Infinity : -Infinity), df: n1 + n2 - 2, p: diff === 0 ? 1 : 0, se: 0 };
    const t = diff / se;
    const df = Math.pow(v1 + v2, 2) / (Math.pow(v1, 2) / (n1 - 1) + Math.pow(v2, 2) / (n2 - 1));
    return { t: t, df: df, p: tTwoTailP(t, df), se: se };
  }

  function cohenD(a, b) {
    const n1 = a.length, n2 = b.length;
    if (n1 + n2 <= 2) return 0;
    const sp = Math.sqrt(((n1 - 1) * variance(a) + (n2 - 1) * variance(b)) / (n1 + n2 - 2));
    if (sp === 0) return 0;
    return (mean(a) - mean(b)) / sp;
  }

  function choose(n, k) {
    if (k < 0 || k > n) return 0;
    let r = 1;
    for (let i = 1; i <= k; i++) r = r * (n - k + i) / i;
    return Math.round(r);
  }

  function popcount(x) {
    let c = 0;
    while (x) { x &= x - 1; c++; }
    return c;
  }

  /* 置换检验：把两臂标签打乱，看真实差异在纯随机下有多常见。
     组合数不大时穷举，否则随机抽 20000 次。 */
  function permutationP(a, b) {
    const n1 = a.length, n2 = b.length;
    if (n1 < 1 || n2 < 1) return NaN;
    const all = a.concat(b);
    const n = all.length;
    const total = all.reduce(function (s, x) { return s + x; }, 0);
    const obs = Math.abs(mean(a) - mean(b));
    const trialsMax = 20000;
    let hits = 0, trials = 0;

    if (choose(n, n1) <= trialsMax && n < 24) {
      const limit = Math.pow(2, n);
      for (let mask = 0; mask < limit; mask++) {
        if (popcount(mask) !== n1) continue;
        let s = 0;
        for (let i = 0; i < n; i++) if (mask & (1 << i)) s += all[i];
        const d = Math.abs(s / n1 - (total - s) / n2);
        trials++;
        if (d >= obs - 1e-12) hits++;
      }
    } else {
      const idx = [];
      for (let i = 0; i < n; i++) idx.push(i);
      for (let k = 0; k < trialsMax; k++) {
        for (let i = n - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          const t = idx[i]; idx[i] = idx[j]; idx[j] = t;
        }
        let s = 0;
        for (let i = 0; i < n1; i++) s += all[idx[i]];
        const d = Math.abs(s / n1 - (total - s) / n2);
        trials++;
        if (d >= obs - 1e-12) hits++;
      }
    }
    return trials ? hits / trials : NaN;
  }

  function holm(ps) {
    const order = ps.map(function (p, i) { return i; })
      .sort(function (i, j) { return ps[i] - ps[j]; });
    const out = new Array(ps.length);
    let prev = 0;
    for (let rank = 0; rank < order.length; rank++) {
      const i = order[rank];
      const raw = isFinite(ps[i]) ? ps[i] * (ps.length - rank) : 1;
      const adj = Math.min(1, Math.max(prev, raw));
      out[i] = adj;
      prev = adj;
    }
    return out;
  }

  /* ------------------------------------------------------------------ */
  /* 工具                                                                 */
  /* ------------------------------------------------------------------ */

  function num(x, digits) {
    if (!isFinite(x)) return '—';
    const d = digits === undefined ? 2 : digits;
    return Number(x.toFixed(d)).toString();
  }
  function pct(x, digits) {
    return num(x * 100, digits === undefined ? 1 : digits) + '%';
  }
  function pval(p) {
    if (!isFinite(p)) return '—';
    if (p < 0.001) return '<0.001';
    return num(p, 3);
  }

  /* ------------------------------------------------------------------ */
  /* 判据库                                                               */
  /* ------------------------------------------------------------------ */

  const KNOWLEDGE = [
    {
      id: 'no-difference',
      title: '组间差小于组内波动',
      why: '同一件事跑两遍本来就会差一点。组间差如果还没超过组内各次之间的抖动，你看到的是噪声。',
      fix: '先算安慰剂地板：两个完全相同的条件各跑一遍，它们之间的差就是噪声的幅度。低于它的差异不写。',
      src: '实验设计规范（安慰剂臂）'
    },
    {
      id: 'multi-comp',
      title: '多组比较没做多重比较校正',
      why: '比得越多，撞上一次「显著」的概率越高。三组两两比就是 3 次，五组是 10 次。',
      fix: '用 Holm 或 Bonferroni 校正，或者直接上 ANOVA 加事后检验。报告里写清楚校正方法。',
      src: '统计检验规范'
    },
    {
      id: 'small-n',
      title: 'n≤3 就下结论',
      why: '3 个点算出的标准差本身极不稳定，置信区间宽到没有意义。审稿人一句「n=3 也敢报 p 值」就够打回。',
      fix: '至少补到 n≥5，优先 n≥10；如果补不了，就把结果写成「初步观察」，不放 p 值。',
      src: '统计检验规范'
    },
    {
      id: 'effect-size',
      title: '只报 p 值，不报效应量',
      why: 'p 小只说明「不太可能是巧合」，不说明差得多。样本一大，任何鸡毛蒜皮的差都能显著。',
      fix: '同时报 Cohen\'s d 或相对提升，附 95% 置信区间。',
      src: '统计检验规范'
    },
    {
      id: 'single-run',
      title: '整批只跑了一次',
      why: '只跑一次，你没法区分是方法的功劳还是这台机器这一刻的状态。',
      fix: '同一配置至少跑 3 轮，最好交错跑（A,B,A,B），避免机器状态漂移被算进方法差异。',
      src: '实验设计规范'
    },
    {
      id: 'error-bar',
      title: '误差棒含义没交代',
      why: 'SD、SEM、95% CI 长得几乎一样，含义差很远。不写清楚，读者只能猜，审稿人会问。',
      fix: '图注里写明是标准差、标准误还是置信区间，以及 n 是多少。',
      src: '图表规范'
    },
    {
      id: 'claim-significant',
      title: '写了「显著」，但数据不支持',
      why: '正文用「显著提升」是一个统计声明。按你贴的数据算不出显著，这句话就是错的。',
      fix: '要么删掉「显著」改成描述性说法，要么补数据补到真的显著。',
      src: '证据与转述规范'
    },
    {
      id: 'causal',
      title: '相关性被写成了因果',
      why: '你只改了一个变量，但别的条件也在变（机器、批次、负载）。这时候只能说「同时出现了」，不能说「因为」。',
      fix: '把因果措辞改成相关措辞，或者补一组只改这一个变量的对照。',
      src: '变量控制规范'
    },
    {
      id: 'baseline',
      title: '没有公平的基线',
      why: '没有基线，「提升了」就没有参照物。基线配置不一致，比出来的差也不可信。',
      fix: '基线要用同一套硬件、同一个负载、同样的调参预算。写清楚基线的来源和配置。',
      src: '实验设计规范'
    },
    {
      id: 'baseline-vague',
      title: '基线没说清楚是哪来的',
      why: '勾了「有公平的基线」只说明你有基线，但读者不知道它是谁：哪个系统、哪个版本、什么配置。基线认不出来，公平性和复现都无从谈起。',
      fix: '补一句基线的名字、版本和配置，比如「基线是 vLLM 0.6 默认配置」，或「基线为官方实现，未改参数」。',
      src: '实验设计规范'
    },
    {
      id: 'testset',
      title: '在测试集上调过参数',
      why: '测试集的分数会随着你调参的次数一起变好，那是你记住了题，不是模型变强了。',
      fix: '所有调参只在验证集上做，测试集只在最后跑一次。已经调过的，换一个新的测试集重测。',
      src: '可复现性规范'
    },
    {
      id: 'seed',
      title: 'LLM 实验没记 seed / 温度 / 解码参数',
      why: '不写这些，别人复现出来的数字和你不一样，而且没人知道差在哪。',
      fix: '在附录里列全：模型版本、温度、top_p、seed、最大 token 数、调用日期。',
      src: '可复现性规范'
    },
    {
      id: 'ablation',
      title: '没看到消融',
      why: '你说方法好，但没说清是哪一部分好。审稿人第一个问题就是这个。',
      fix: '至少做一个去掉关键模块的消融，证明性能下降确实来自那个模块。',
      src: '实验设计规范'
    },
    {
      id: 'power',
      title: '没算过样本量',
      why: '跑之前不知道要跑多少轮，跑完就只能拿手上这点数将就。',
      fix: '先估一个效应量，按功效 0.8、α=0.05 反推每组要多少轮，再决定跑几轮。',
      src: '统计检验规范'
    },
    {
      id: 'too-perfect',
      title: '好得不像真的',
      why: '准确率接近 100%、延迟接近零，最常见的原因是数据泄漏或计时范围写错了。',
      fix: '先当成 bug 查：检查测试集有没有混进训练数据，计时有没有漏掉预热或网络往返。',
      src: '统计检验规范'
    },
    {
      id: 'outlier',
      title: '有离群点没交代',
      why: '一个点能把均值拉走一大截。悄悄删掉它是学术不端，不说明它又会误导读者。',
      fix: '报告里说明离群点是否存在、怎么处理、删掉之后结论会不会变。',
      src: '统计检验规范'
    },
    {
      id: 'trend',
      title: '点数太少，谈不上趋势',
      why: '两个点连起来永远是「上升」或「下降」，那不叫趋势。',
      fix: '时间序列至少 5 个点，并且说明每个点是不是独立跑的。',
      src: '图表规范'
    },
    {
      id: 'one-group',
      title: '只有一组数据',
      why: '没有对照就谈不上差异，只能描述。',
      fix: '补一个基线或对照条件，用同样的流程跑。',
      src: '实验设计规范'
    },
    {
      id: 'nonpositive',
      title: '出现了不可能的数值',
      why: '延迟、耗时不可能 ≤0。出现这种数，通常是把空值或者错误码当成了测量值。',
      fix: '回到原始日志，看这些行的状态码和单位。',
      src: '数据与证据规范'
    },
    {
      id: 'perm-disagree',
      title: 't 检验和置换检验结论不一致',
      why: 't 检验假设数据接近正态；置换检验不假设分布，只看把标签打乱后真实差异有多常见。两者打架，说明样本太少或分布偏，结论不稳。',
      fix: '报告置换检验的 p，并在方法里写清重采样次数；能补样本就补样本。',
      src: '统计口径规范'
    }
  ];

  /* ------------------------------------------------------------------ */
  /* 体检                                                                 */
  /* ------------------------------------------------------------------ */

  function evaluate(input) {
    const groups = input.groups || [];
    const scene = input.scene || 'ab';
    const metric = input.metric || 'other';
    const note = String(input.note || '');
    const flags = input.flags || {};
    const findings = [];

    function add(level, id, title, why, fix) {
      const kb = KNOWLEDGE.find(function (k) { return k.id === id; });
      findings.push({
        level: level, id: id, title: title,
        why: why, fix: fix,
        cite: kb ? kb.src : ''
      });
    }

    const gs = groups.filter(function (g) { return g.values.length > 0; });
    const ns = gs.map(function (g) { return g.values.length; });
    const means = gs.map(function (g) { return mean(g.values); });
    const sds = gs.map(function (g) { return sd(g.values); });

    const pairStats = [];
    for (let i = 0; i < gs.length; i++) {
      for (let j = i + 1; j < gs.length; j++) {
        const w = welch(gs[i].values, gs[j].values);
        pairStats.push({
          i: i, j: j,
          diff: means[i] - means[j],
          rel: means[j] !== 0 ? (means[i] - means[j]) / means[j] : NaN,
          t: w.t, df: w.df, p: w.p,
          permP: permutationP(gs[i].values, gs[j].values),
          d: cohenD(gs[i].values, gs[j].values)
        });
      }
    }
    const rawPs = pairStats.map(function (p) { return p.p; });
    const holmPs = holm(rawPs);
    pairStats.forEach(function (p, k) { p.pAdj = holmPs[k]; });
    const m = pairStats.length;

    const viable = gs.length >= 2 && ns.every(function (n) { return n >= 2; });

    const disagree = pairStats.filter(function (p) {
      return isFinite(p.p) && isFinite(p.permP) && (p.p < 0.05) !== (p.permP < 0.05);
    });
    if (disagree.length) {
      const d0 = disagree[0];
      const a0 = gs[d0.i].name, b0 = gs[d0.j].name;
      add('amber', 'perm-disagree', 't 检验和置换检验打架：' + a0 + ' vs ' + b0,
        't 检验给 p = ' + pval(d0.p) + '，置换检验给 p = ' + pval(d0.permP) +
        '。样本少或分布偏的时候，t 检验的正态假设会把结论撑得比实际硬。',
        '以置换检验为准，并在方法里写明重采样次数；能补样本就补样本。');
    }
    const significant = pairStats.filter(function (p) { return isFinite(p.pAdj) && p.pAdj < 0.05; });
    const strongest = pairStats.slice().sort(function (a, b) {
      return Math.abs(b.d) - Math.abs(a.d);
    })[0];

    /* ---- 红牌：先看数据本身 ---- */

    if (gs.length < 2) {
      add('red', 'one-group', '只有一组数据，算不出差异',
        '你贴进来 ' + (gs.length ? gs.length : 0) + ' 组。没有对照，任何「提升」都没有参照物。',
        '补一个基线或对照条件，用完全相同的流程和硬件再跑一遍。');
    }

    if (ns.some(function (n) { return n <= 3; })) {
      add('red', 'small-n', '每组只有 ' + Math.min.apply(null, ns) + ' 个点，别报 p 值',
        'n≤3 时算出来的标准差本身就不稳定，置信区间宽到没有意义，算出来的 p 值只是运气。',
        '补到每组至少 5 次，最好 10 次。补不了就把结果写成「初步观察」，不要放 p 值。');
    } else if (ns.some(function (n) { return n < 10; })) {
      add('amber', 'small-n', '每组最多 ' + Math.max.apply(null, ns) + ' 个点，区间会偏宽',
        '样本少的时候，均值柱把分布完全遮住了，读者看不到那几个点其实散得很开。',
        '改成带散点的图（每次重复画一个点），或者补几轮。');
    }

    if (!flags.repeat) {
      add('red', 'single-run', '整批看起来只跑了一次',
        '只跑一次，机器状态、负载、缓存都可能贡献了那个差，你分不清是谁的功劳。',
        '同一配置至少跑 3 轮，并且交错跑（A,B,A,B），让机器状态漂移平均掉。');
    }

    if (gs.length >= 3 && !flags.correction) {
      const alpha = 1 - Math.pow(0.95, m);
      add('red', 'multi-comp', '你比较了 ' + m + ' 对，一次校正都没做',
        '每对都用 0.05 的话，' + m + ' 对里至少撞出一次假阳性的概率是 ' + pct(alpha) + '。也就是说，你报的那个「显著」有相当一部分概率是撞出来的。',
        '用 Holm 或 Bonferroni 校正后再报。本页表格已经帮你算好了校正后的 p 值。');
    }

    if (viable && strongest && isFinite(strongest.d) && Math.abs(strongest.d) < 1) {
      const a = gs[strongest.i].name, b = gs[strongest.j].name;
      const level = Math.abs(strongest.d) < 0.2 ? 'red' : 'amber';
      add(level, 'no-difference', '最强的差是 ' + a + ' vs ' + b + '，差 ' + num(Math.abs(strongest.diff)) +
        '，但组内波动就有 ' + num(Math.sqrt((variance(gs[strongest.i].values) + variance(gs[strongest.j].values)) / 2)) + '',
        '组间差和组内抖动一比（Cohen\'s d = ' + num(strongest.d) + '），这个差还不够把噪声盖过去。低于噪声的差异不叫差异，只是这次运气好。',
        '先跑一组安慰剂：两个完全相同的条件各跑一遍，量出这台机器的地板，再回来看这个差还剩多少。');
    }

    if (note && /显著|明显提升|大幅提升|明显优于/.test(note)) {
      if (viable && significant.length === 0) {
        const best = pairStats.slice().sort(function (a, b) { return a.pAdj - b.pAdj; })[0];
        add('red', 'claim-significant', '你写了「显著」，但按这组数据算不出来',
          '你贴的数据里，最小的一对是 ' + gs[best.i].name + ' vs ' + gs[best.j].name +
          '，Holm 校正后 p = ' + pval(best.pAdj) + '，没有过 0.05。审稿人自己一算就会发现。',
          '要么把正文里的「显著」删掉，改成「比…低/高」这种描述性说法；要么补数据补到真的显著。');
      }
    }

    if (note && /导致|归因于|证明了|说明了.*造成了|是因为/.test(note)) {
      add('amber', 'causal', '正文里出现了因果说法',
        '要说出「因为 X」，得保证两臂之间只有 X 不一样。机器、负载、批次只要有一项也变了，你拿到的是相关。',
        '把「因为」改成「同时观察到」，或者补一组只改 X 的对照。');
    }

    if (flags.baseline &&
        !/基线\s*(是|为|采用|用的是|使用|来自|出自|选自|：|:)/.test(note) &&
        !/(基线|baseline)[^。；\n]{0,24}(\d+(\.\d+)+|默认配置|默认参数|官方实现|原版|未微调|同一配置|相同配置)/i.test(note)) {
      add('amber', 'baseline-vague', '勾了「有公平的基线」，但说明里没交代基线是谁',
        '基线是所有比较的参照物。只写「跑了基线」而不给名字、版本、配置，读者没法判断它公平不公平，也没法复现。',
        '在说明或正文里补一句：基线是谁、什么版本、什么配置，比如「基线是 vLLM 0.6 默认配置」。');
    }

    if (viable && significant.length > 0 && !flags.effect) {
      add('amber', 'effect-size', '你只报了「显著」，没给效应量',
        'p 值小只说明不太可能是巧合，不说明差得多。样本一大，很小的差别也会显著。',
        '跟着报 Cohen\'s d 或相对提升，再加 95% 置信区间。这张表已经算好了。');
    }

    if (!flags.errbar) {
      add('amber', 'error-bar', '图里的误差棒是什么，还没交代',
        'SD、SEM、95% CI 在图上长得几乎一样，含义差很远。不写清楚，读者只能猜。',
        '图注里补一句：误差棒表示标准差 / 标准误 / 95% 置信区间，n 是多少。');
    }

    if (!flags.power && ns.length && Math.max.apply(null, ns) < 10) {
      add('amber', 'power', '没算过要跑几轮',
        '跑之前不知道需要多少轮，跑完就只能拿手上这点点将就，这也是 n 一直补不上去的原因。',
        '先估个效应量，按功效 0.8、α = 0.05 反推每组要多少轮，再决定跑多少。');
    }

    /* ---- 场景相关 ---- */

    if (scene === 'llm') {
      if (!flags.baseline) {
        add('red', 'baseline', '没看到公平的基线',
          'LLM 实验里，基线换了模型版本、改了提示词、多给了预算，比出来都不算数。',
          '基线要用同一个模型版本、同样的提示词预算、同样的调用参数，并且在附录里写清楚。');
      }
      if (flags.tune) {
        add('red', 'testset', '在测试集上调过参数，分数不能用',
          '测试集上的分数会随着你调参的次数一起变好。那是你记住了题，不是模型变强了。',
          '调参只在验证集上做。已经调过的，换一个新的测试集重测一次。');
      }
      if (!flags.seed) {
        add('red', 'seed', '没记 seed / 温度 / 解码参数',
          '不写这些，别人复现出来的数字和你不一样，而且没人知道差在哪。',
          '附录里列全：模型版本、temperature、top_p、seed、max_tokens、调用日期。');
      }
      if (!/消融|ablation|去掉|移除/.test(note)) {
        add('amber', 'ablation', '没看到消融',
          '你说方法好，但没说清是哪一部分好。审稿人第一个问题就是「把那个模块拿掉会怎样」。',
          '至少做一组去掉关键模块的消融，证明性能下降确实来自那个模块。');
      }
    }

    if (scene === 'time' && gs.length < 3) {
      add('amber', 'trend', '只有 ' + gs.length + ' 个时间点，谈不上趋势',
        '两个点连起来永远是上升或下降。那不叫趋势。',
        '时间序列至少 5 个点，并说明每个点是不是独立跑的。');
    }

    if (metric === 'latency') {
      gs.forEach(function (g) {
        if (g.values.some(function (v) { return v <= 0; })) {
          add('red', 'nonpositive', g.name + ' 里出现了 ≤0 的延迟',
            '延迟不可能为零或负数。这种值通常是把失败请求（空值、错误码）当成了正常测量。',
            '回到原始日志，看这几行的状态码，把失败请求剔掉再重算。');
        }
      });
    }

    if (metric === 'accuracy') {
      gs.forEach(function (g) {
        const m0 = mean(g.values);
        if (m0 >= 99.5) {
          add('red', 'too-perfect', g.name + ' 的准确率是 ' + num(m0, 1) + '%，先当成数据泄漏查',
            '接近 100% 的准确率，最常见的原因是测试集混进了训练数据，或者评测脚本把答案也算进去了。',
            '先查测试集和训练集有没有重叠，再查评测脚本读的字段对不对。');
        }
      });
    }

    if (viable) {
      gs.forEach(function (g) {
        if (g.values.length >= 4) {
          const mu = mean(g.values), s = sd(g.values);
          if (s > 0) {
            const bad = g.values.filter(function (v) { return Math.abs(v - mu) > 3 * s; });
            if (bad.length) {
              add('amber', 'outlier', g.name + ' 里有 ' + bad.length + ' 个点偏离超过 3 个标准差',
                '一个点就能把均值拉走一大截。悄悄删掉是学术不端，不说明又会误导读者。',
                '在报告里说明这些点是否存在、为什么、删掉之后结论会不会变。');
            }
          }
        }
      });
    }

    /* ---- 通过项 ---- */

    const passed = [];
    if (gs.length >= 2) passed.push('有对照，可以比较');
    if (viable && ns.every(function (n) { return n >= 5; })) passed.push('每组样本量 ≥5');
    if (flags.correction) passed.push('做过多重比较校正');
    if (flags.effect) passed.push('报了效应量或置信区间');
    if (flags.repeat) passed.push('整批重复跑过');
    if (scene === 'llm' && flags.seed) passed.push('LLM 参数记录完整');

    const rank = { red: 0, amber: 1, green: 2 };
    findings.sort(function (a, b) { return rank[a.level] - rank[b.level]; });

    return {
      groups: gs,
      ns: ns, means: means, sds: sds,
      pairStats: pairStats,
      findings: findings,
      passed: passed,
      counts: {
        red: findings.filter(function (f) { return f.level === 'red'; }).length,
        amber: findings.filter(function (f) { return f.level === 'amber'; }).length,
        green: passed.length
      },
      viable: viable
    };
  }

  /* ------------------------------------------------------------------ */
  /* 处方                                                                 */
  /* ------------------------------------------------------------------ */

  function prescription(result) {
    const lines = [];
    const reds = result.findings.filter(function (f) { return f.level === 'red'; });
    const ambers = result.findings.filter(function (f) { return f.level === 'amber'; });

    lines.push('## 投稿前必补');
    if (!reds.length && !ambers.length) {
      lines.push('按现有判据没查出硬伤。仍然建议：把原始日志和脚本一起归档，别人要复现时给得出来。');
    }
    reds.forEach(function (f, i) {
      lines.push((i + 1) + '. ' + f.title + ' —— ' + f.fix);
    });
    if (ambers.length) {
      lines.push('');
      lines.push('## 有余力再补');
      ambers.forEach(function (f, i) {
        lines.push((i + 1) + '. ' + f.title + ' —— ' + f.fix);
      });
    }
    lines.push('');
    lines.push('## 可以直接写进 Method 的一句');
    lines.push(methodSentence(result));
    return lines.join('\n');
  }

  function methodSentence(r) {
    const gs = r.groups;
    if (!gs.length) return '';
    const ns = r.ns;
    const nText = ns.every(function (n) { return n === ns[0]; }) ? ('每组 n = ' + ns[0]) : ('各组 n = ' + ns.join('/'));
    const parts = gs.map(function (g) {
      return g.name + ' ' + num(mean(g.values), 2) + ' ± ' + num(sd(g.values), 2);
    });
    const tail = gs.length > 2
      ? '组间比较采用 Welch t 检验，多组比较使用 Holm 方法校正，显著性水平取 0.05。'
      : '组间比较采用 Welch t 检验，显著性水平取 0.05。';
    return '所有实验在相同硬件与负载下进行，' + nText + '，结果以均值 ± 标准差表示（' +
      parts.join('；') + '）。' + tail;
  }

  /* ------------------------------------------------------------------ */

  global.LabCheck = {
    parseData: parseData,
    evaluate: evaluate,
    prescription: prescription,
    methodSentence: methodSentence,
    KNOWLEDGE: KNOWLEDGE,
    stats: {
      mean: mean, sd: sd, variance: variance,
      welch: welch, cohenD: cohenD, holm: holm, tTwoTailP: tTwoTailP
    },
    fmt: { num: num, pct: pct, pval: pval }
  };
})(window);
