# Venue bar — empirical systems and ML (100 papers, 2023–2026)

This file lets someone writing an empirical systems or ML paper hold their draft or experiment plan against what the 100 papers in this corpus actually claim, and self-audit before a reviewer does it for them.
It is derived only from the abstracts (and the cards distilled from them), so every statement below is about what an abstract says, not about what the paper does; where an abstract is silent the file says so rather than assuming.
Card citations use the convention `(cards 1-7, 3-12)`, meaning batch-card: `1-7` is card 7 of `cards_batch1.md`; the corpus ships five card files of 20 cards each, numbered 1–5 in corpus file order.

## 1. What these papers actually study

- **Where does an LLM request's time actually go, and which phase owns the bottleneck?** Prefill/decode interference, cold-start staging, tool calls inside agentic loops, and unpaid work in the last pipeline stage are each treated as something to measure before optimising `(cards 1-1, 1-7, 1-17, 4-7, 4-10)`.
- **Can a prediction replace a reservation?** Output length, request dependencies, expert usage, and branch structure are predicted so the system can allocate less than the worst case, with the misprediction policy as part of the design `(cards 2-6, 1-9, 1-19, 2-1, 1-8)`.
- **What is the scarce resource, and what is traded for it?** KV memory against compute, host bandwidth against accuracy, storage against metadata, SM occupancy against flexibility — the mechanism is usually an exchange rate `(cards 1-8, 2-10, 3-12, 3-15, 1-15, 4-20)`.
- **What does the production workload look like, and does a synthetic one reproduce it?** Trace studies ship a generator or an eviction policy, and the measured mix is the argument `(cards 1-12, 2-11, 4-1, 3-10, 4-15, 1-3)`.
- **How far does heterogeneity extend — across GPU generations, chip types, or a whole wafer?** Cost-per-token on mixed GPU sets, wafer-scale meshes, PIM, near-memory DRAM, and unified-memory SoCs are all treated as new placement problems `(cards 5-9, 5-10, 1-5, 1-19, 3-20, 5-17)`.
- **Can a new substrate or number format run the same model faster without moving quality?** Quantisation, sparse formats, associative-processor FP, and on-chip compression each pair an accuracy claim with a hardware claim `(cards 1-20, 2-2, 2-14, 2-17, 5-14, 5-5)`.
- **What does training cost at scale, and where does it stall?** Imbalance across parallelism levels, stragglers, collective schedules, rollout imbalance, and long-job stability `(cards 1-2, 1-3, 1-10, 1-14, 5-16)`.
- **Is the evaluation itself trustworthy?** Benchmark saturation, metric audits, published negative results, and position papers that argue the current measurement is the problem `(cards 4-5, 4-16, 3-19, 2-13, 3-9, 5-6)`.

## 2. Evidence and scale baseline

Counts are readings of the cards' Evidence fields; where a card is silent but the abstract states the fact (release URLs in particular), the abstract is used and the row says so. Silence in an abstract is not evidence of absence in the paper.

| dimension | what appears in this corpus | how many of the 100 | example cards |
|---|---|---|---|
| real system vs trace vs simulation vs analysis | 51 real systems or prototypes; 16 empirical studies, benchmarks, or analyses; 8 production traces (often combined with simulation or a deployment); 6 simulations; 19 where the abstract does not say what the evidence is | a real system in the abstracts of 51/100 cards, a study or benchmark in 16/100, a trace in 8/100, a simulation in 6/100, and unstated in 19/100 | 1-1 (real system), 1-12 (trace), 1-18 (simulation), 2-16 (benchmark), 1-19 (not stated) |
| number of workloads, datasets, or model sizes | an explicit count of two or more models, datasets, workloads, or task domains; the rest give no count | in the abstracts of 42/100 cards | 1-16 (three model sizes), 3-11 (two models × six domains × three budgets), 5-5 (three models, eight benchmarks), 3-13 (three datasets, eight baselines) |
| hardware scale | a named accelerator or cluster; of these, only three give a GPU count | in the abstracts of 14/100 cards; explicit GPU counts in 3/100 (thousands; 12,288; 82); single accelerator in 3/100 | 1-14 (12,288 GPUs), 5-8 (82-GPU cluster), 1-3 (thousands of GPUs), 1-1 and 2-14 (one A100), 5-14 (one T4) |
| baselines (closest prior system) | the closest prior system is named; a further two give only a count of baselines; 23/100 use "state-of-the-art" or "baselines" language without naming any system | named in the abstracts of 11/100 cards; counted but unnamed in 2 more; "state-of-the-art" with nothing named in 23/100 | 1-14 (Megatron-LM), 1-5 (SGLang, vLLM), 3-11 (R-KV, Tri-attention), 4-20 (vLLM, vAttention), 3-17 (SpInfer) |
| metrics: throughput | a throughput, goodput, capacity, or speedup number, usually as a ratio | in the abstracts of 45/100 cards | 1-7, 1-14, 2-19, 3-15 |
| metrics: tail latency | an explicit tail or percentile metric; a further 22 frame the target as TTFT, TPOT, TBT, or an SLO without naming a percentile | explicit tail or percentile in the abstracts of 3/100 cards; latency-constraint framing in 22/100 | 3-15 (P95 −38%), 1-1 (tail-latency constraints), 3-20 (tail-constrained), 2-8 (median TBT), 2-10 (per-token SLO) |
| metrics: cost, energy, storage | cost per token, energy, carbon, health cost, storage reduction, or under-provisioning | in the abstracts of 18/100 cards | 4-12 (energy and carbon), 3-6 (component-level energy), 5-20 (health cost), 1-15 (storage), 5-10 (cost efficiency) |
| metrics: accuracy or quality | an accuracy, quality, perplexity, task-score, or correctness effect alongside the performance claim | in the abstracts of 31/100 cards | 1-8, 3-17, 4-4, 5-5, 2-3 |
| whether an ablation is reported | a component-removed or single-knob comparison; no abstract in the corpus uses the word "ablation" | in the abstracts of 2/100 cards | 1-11 (comparison against the design without overlay forwarding), 5-17 (per-layer ablation described as the paper's move) |
| whether a workload characterisation is included | a measurement section that reports the workload's own structure — request mix, lengths, reuse, imbalance, traffic shape — before the design | in the abstracts of 11/100 cards | 1-12, 2-11, 4-1, 1-3, 1-15, 3-6, 4-7, 5-10 |
| whether code or artefacts are released | a public code, data, harness, or simulator release stated in the abstract; the cards record it for 1/100 because the extraction drops the URL sentence | in the abstracts of 16/100 cards (1/100 in the cards themselves) | 1-5, 1-12, 1-16, 2-5, 2-15, 3-10, 3-11, 4-10 |
| whether a boundary is stated | a scope limit in the abstract: one provider, one accelerator, one model family, one accuracy granularity, or a bounded error | in the abstracts of 21/100 cards | 2-11 (one provider), 3-20 (one accelerator), 4-17 (trace-driven simulation), 5-14 (memory ceiling), 1-18 (error <1%) |
| headline number form | a result phrased as "up to X" rather than a median or a distribution | in the abstracts of 39/100 cards | 1-5, 1-19, 2-15, 4-7, 5-9 |

## 3. The implied checklist

1. **Pick a workload you can name, and say where its numbers came from** — a reviewer cannot tell whether a 2× on a synthetic arrival process transfers to any deployment, and the trace studies in this corpus exist because earlier synthetic mixes were wrong — `(cards 1-12, 2-11, 4-1, 3-10)` — if missing: "your workload is your design assumption, so the result is an upper bound on the real one."
2. **Evaluate at two or more model sizes, workloads, or datasets** — 42/100 do, and a single model on a single accelerator reads as a claim about that model only — `(cards 1-16, 2-15, 3-11, 5-5, 5-14)` — if missing: "does this survive one model size up, or is it a property of 7B?"
3. **Benchmark against the closest prior system, named and run by you on your own hardware** — only 11/100 name one, and "state-of-the-art" without a name is a number the reviewer cannot check — `(cards 1-14, 1-5, 3-11, 4-20, 3-17)` — if missing: "which system am I supposed to compare my number against?"
4. **Report a tail, not only a mean or a throughput total** — 3/100 state a tail or percentile metric while 45/100 report throughput, and a design that improves the mean can leave the slow request worse — `(cards 1-1, 3-15, 3-20)` — if missing: "what happens to the request I actually care about, the slow one?"
5. **Isolate the mechanism with a component-removed or single-knob ablation** — 2/100 record one, so most of the corpus's speedups are end-to-end and cannot be attributed to a part — `(cards 1-11, 5-17, 1-2)` — if missing: "which of your three contributions produced the gain?"
6. **State what happens under overload, misprediction, or eviction** — every paper that schedules on a prediction needs a policy for being wrong, and the ones that state it are the deployable ones — `(cards 3-15, 2-6, 2-15, 1-1)` — if missing: "your system is only defined in the regime where your prediction is right."
7. **Ship a reproducibility manifest: code, data, harness, and exact configuration** — 16/100 state a release, and in this corpus the release sentence sits at the end of the abstract where a reviewer looks for it — `(cards 1-12, 1-5, 2-15, 3-10, 2-5)` — if missing: "I cannot rebuild your baseline, so I cannot trust the delta."
8. **State the boundary in the abstract, not only in a limitations paragraph** — 21/100 do, and the boundary is what lets a reader decide whether the result applies to their cluster — `(cards 2-11, 3-20, 3-19, 4-17, 5-14)` — if missing: "unknown scope means I must assume it does not apply to me."
9. **Scope the claim to what you measured** — a file-level accuracy, a bounded simulation error, or an oracle-judged replay is a narrower claim than the general framing invites — `(cards 3-5, 1-18, 4-17, 5-7, 4-3)` — if missing: "your conclusion is one sentence wider than your evidence."
10. **Name the scarce resource and state the exchange rate** — KV memory against compute, storage against bandwidth, tokens against latency; a speedup with no resource curve is one point, not a trade — `(cards 1-8, 2-10, 3-12, 1-15, 4-20)` — if missing: "what did you spend to get this, and what happens when I cannot spend it?"
11. **Report the cost on the ordinary case beside the win on the new case** — overhead on standard traffic is the number an operator needs, and the cards that give it (3–12%, 0.9%, under 19.6%) are the credible ones — `(cards 2-12, 3-16, 2-15)` — if missing: "you have told me the upside and hidden the tax."
12. **Bound the error of any approximate component, and validate a simulator against hardware** — approximation is legitimate when it comes with a number — `(cards 1-18, 3-20, 4-17, 1-3)` — if missing: "your speedup is bought with an unmeasured fidelity loss."
13. **Measure where end-to-end time goes before optimising the component you chose** — tool calls are 30–85% of latency in one card and prefill bubbles are 38.3% in another, and both redefined the target — `(cards 4-7, 4-1, 1-17, 4-10)` — if missing: "you optimised the phase that was convenient to instrument."
14. **State the deployment envelope: hardware, scale, tenancy, and model family** — a single-GPU result and an 82-GPU serverless result are different claims with the same shape — `(cards 1-14, 5-8, 1-17, 1-1)` — if missing: "I cannot tell whether this is a cluster result or a laptop result."
15. **Report energy, carbon, or cost when efficiency is part of the claim** — 18/100 report one, and this corpus treats energy as an objective rather than an afterthought — `(cards 4-12, 3-6, 5-20, 3-4)` — if missing: "efficiency in what unit, and paid by whom?"

## 4. The ten questions a reviewer will ask

1. **"What exactly did you measure, on what hardware, at what scale?"** — A good answer gives hardware, model sizes, batch and sequence range, and the number of runs in one sentence before the first figure.
2. **"Why this workload, and would your result hold on mine?"** — A good answer names the trace or generator, its request mix, and the part of that mix the mechanism depends on.
3. **"What is the baseline, and did you run it yourself?"** — A good answer is a named system, on the same hardware and workload, tuned at least as hard as the new design.
4. **"Is the gain in the mean or in the tail?"** — A good answer reports both plus the percentile, and the load at which the ordering between systems flips.
5. **"Which part of the system produced the gain?"** — A good answer is a component-removed ablation on the same workload and baseline, with the residual gain stated.
6. **"What happens when the prediction is wrong, the load doubles, or the cache misses?"** — A good answer is a stated fallback or admission policy with its measured effect on the slow requests.
7. **"Does the approximation cost accuracy, and how much?"** — A good answer is a per-model accuracy delta or a bounded error, not one averaged score.
8. **"What did you have to give up?"** — A good answer is the resource curve — memory, bandwidth, extra GPUs, per-request overhead — with the knee marked.
9. **"Where does this stop being true?"** — A good answer is a boundary sentence naming provider, hardware generation, sequence length, or batch range.
10. **"Can I reproduce it?"** — A good answer is a release, or an explicit list of what was withheld and the conditions for getting it.

## 5. Self-audit table

| # | Check (from §3) | Venue bar in this corpus | My draft | Gap | Action |
|---|---|---|---|---|---|
| 1 | Workload named and sourced; realism of the request mix stated | | | | |
| 2 | At least two model sizes, workloads, or datasets evaluated | | | | |
| 3 | Closest prior system named and run on the same hardware and workload | | | | |
| 4 | Tail or percentile reported alongside the mean | | | | |
| 5 | Mechanism-isolating ablation (component removed or one knob varied) | | | | |
| 6 | Overload, misprediction, and eviction behaviour stated and measured | | | | |
| 7 | Reproducibility manifest: code, data, harness, configuration | | | | |
| 8 | Boundary stated in the abstract (provider, hardware, model family, error bound) | | | | |
| 9 | Claim scoped to what was actually measured | | | | |
| 10 | Scarce resource and its exchange rate stated (memory, bandwidth, tokens, storage) | | | | |
| 11 | Cost on the ordinary case reported beside the gain on the new case | | | | |
| 12 | Error bounded for every approximate component; simulator validated against hardware | | | | |
| 13 | End-to-end time budget measured before the optimisation target was chosen | | | | |
| 14 | Deployment envelope stated: hardware, scale, tenancy, model family | | | | |
| 15 | Energy, carbon, or cost reported when efficiency is part of the claim | | | | |

## 6. What not to copy

- **"Up to X" as the headline number.** 39/100 abstracts phrase a result this way, and the reader cannot tell whether X is the median, the best single configuration, or an artefact of one batch size; the card that reports the fraction of peak retained (76%) is the exception that reads as stronger, not weaker `(cards 1-16, 1-5, 4-7)`.
- **"State-of-the-art" as the baseline.** 27/100 use the phrase, only 11/100 name the system, and 23/100 name nothing at all, so a large share of this corpus asks the reader to accept a comparison they cannot reconstruct; naming the system costs one clause and removes the objection `(cards 1-14, 3-11, 4-20)`.
- **A single-accelerator evaluation carried into a cluster-scale claim.** Three abstracts here evaluate on one A100 or one T4, which is legitimate when labelled as a single-device result; the thing not to copy is an abstract whose framing implies deployment scale over an evaluation the hardware does not support `(cards 1-1, 2-14, 5-14)`.
- **Aggregate throughput as the only serving metric.** 45/100 report throughput and 3/100 report a tail; a serving paper whose only number is goodput has not shown that the slow request got better, and schedulers in this corpus are judged on exactly that request `(cards 1-1, 3-15, 2-10)`.
- **Novelty by firstness.** "First system to X" and "first systematic study of Y" appear across the corpus and are unfalsifiable and date quickly; the papers that last in this collection argue from a cost model, a bound, or a measured opportunity instead `(cards 1-5, 1-11, 1-19, 2-9)`.
