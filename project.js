/* LabCheck — 项目状态（七站流水线） */
(function () {
  'use strict';

  const KEY = 'labcheck.project';

  const DEFAULTS = {
    topic: { domain: '', query: '', picked: [] },
    framing: { claim: '', falsifier: '', metric: '', verdict: null },
    design: { arms: '', control: '', placebo: false, unit: 'run', criterion: '', rounds: 0, variables: '', card: '' },
    batch: { name: '', dir: '', cmd: '', version: '', seeds: '', machine: '', card: '' },
    analysis: { data: '', note: '', scene: 'ab', metric: 'latency', red: 0, amber: 0 },
    writing: { text: '', claims: [], verdict: null },
    submit: { refs: '', comments: '', verdict: null }
  };
  const STATIONS = Object.keys(DEFAULTS);

  function clone(v) { return JSON.parse(JSON.stringify(v)); }

  function get() {
    let raw = null;
    try { raw = JSON.parse(localStorage.getItem(KEY) || 'null'); } catch (e) { raw = null; }
    const p = clone(DEFAULTS);
    if (raw && typeof raw === 'object') {
      STATIONS.forEach(function (s) {
        if (raw[s] && typeof raw[s] === 'object') {
          for (const k in raw[s]) p[s][k] = raw[s][k];
        }
      });
    }
    return p;
  }

  function save(patch) {
    const p = get();
    for (const s in patch) {
      if (STATIONS.indexOf(s) < 0) continue;
      Object.assign(p[s], patch[s]);
    }
    try { localStorage.setItem(KEY, JSON.stringify(p)); } catch (e) { /* 存不进去就不存 */ }
    return p;
  }

  function reset() {
    try { localStorage.removeItem(KEY); } catch (e) { /* 忽略 */ }
    return clone(DEFAULTS);
  }

  window.LabCheckProject = { get: get, save: save, reset: reset, STATIONS: STATIONS, DEFAULTS: DEFAULTS };
})();