# Venue bar — LLM inference scheduling (50 papers, 2023–2026)

This file is a comparison bar for anyone writing or planning work in LLM inference scheduling: hold your draft and your experiment plan against what these 50 papers actually do.
It is derived only from the abstracts (and the idea cards built from them) — nothing here comes from full texts, so "the abstracts do not say" means exactly that.
Card citations use the convention `(cards 1-7, 2-13)`: first number = batch, second = card number in that batch; 1-1 … 1-25 and 2-1 … 2-25 are the 50 papers.
Corpus note: the search window was 2023–2026, but the 50 selected papers are dated 2024–2026 (7 / 12 / 31); no 2023 paper passed the filters.

## 1. What these papers actually study

- **Who gets admitted, and in what order, when job size is unknown.** The dominant question is how to replace FCFS batching without knowing output length — using a predicted length, remaining tokens, KV footprint, or a queueing surrogate (cards 1-9, 1-11, 1-14, 1-16, 1-25, 2-22).
- **KV-cache capacity as the binding constraint, and where the cache lives.** Concurrency is set by KV memory, so papers decide what to reserve, retain, evict, migrate or offload — and, once reuse is worth keeping, whether routing should follow the cache or the idle capacity (cards 1-1, 1-2, 1-10, 1-18, 1-21, 1-24, 2-1, 2-14, 2-16, 2-22).
- **Prefill–decode interference and how to remove it.** Disaggregation, partial disaggregation, and moving work back across the two stages when one side is idle (cards 1-8, 1-17, 2-2, 2-9, 2-15, 2-20).
- **Tail latency and SLO attainment rather than mean latency.** The headline number is usually SLO attainment, goodput, or p99 at a stated target, not average latency (cards 1-3, 1-8, 1-13, 1-17, 1-18, 2-4, 2-25).
- **Fairness and isolation across tenants, priorities and request classes.** Equal long-run throughput is treated as insufficient; papers add latency isolation, deficit counters, priority-weighted gain, or real-time/best-effort sharing (cards 1-2, 1-6, 1-12, 1-22, 2-13).
- **Workflow-level rather than call-level objectives.** Requests are DAGs, agent workflows, tool calls or query plans, and scheduling is judged on workflow completion time (cards 1-5, 1-15, 1-17, 1-24, 2-3).
- **Energy, cost and heterogeneous hardware as the objective.** Some papers optimize joules, carbon or GPU-hours instead of latency, across mixed GPU types and memory tiers (cards 1-3, 1-6, 1-19, 2-8, 2-15, 2-17, 2-19).
- **The workload itself, and the simulator the field runs on.** A visible minority measure traffic, publish traces, or build the simulator others evaluate in (cards 1-20, 2-6, 2-7, 2-11).

## 2. Evidence and scale baseline

Counts are keyword-plus-reading counts over the abstracts only; a card whose Evidence field says "not stated" is counted as not reporting. Treat them as what the abstracts say, not as what the papers did.

| dimension | what appears in this corpus | how many of the 50 (in the abstracts of N/50 cards) | example cards |
|---|---|---|---|
| Evidence: real system | Evidence field describes an implementation, testbed or deployment on real hardware | 35/50 | (cards 1-10, 1-17, 2-1, 2-15) |
| Evidence: simulation or analysis only | event-driven simulator, trace-driven simulation, numerical experiments, architecture model | 5/50 | (cards 1-11, 1-14, 2-10, 2-11, 2-23) |
| Evidence: trace / dataset / benchmark | measurement, workload release, or benchmark-paper rather than a scheduler | 3/50 | (cards 1-20, 2-6, 2-7) |
| Evidence: type not stated | — | 7/50; the abstracts do not say | (cards 1-2, 1-15, 2-2, 2-14) |
| Number of models | two or more distinct models or model sizes named or counted | 11/50 (rest one model or unspecified) | (cards 1-1, 2-1, 2-15, 2-21) |
| Model families | Llama 4, Qwen 3, MoE 3, GPT/Azure 2 | 9/50 name any family; 41/50 name none | (cards 1-16, 2-1, 2-17) |
| Hardware | H100, H20, A100, H200, L20, GH200, RTX 3060, Aurora | 10/50 name an accelerator model | (cards 1-10, 2-1, 2-19, 2-22) |
| Scale | explicit GPU, node or replica counts | 7/50 (others say "cluster", "testbed", or nothing) | (cards 1-8, 1-19, 2-15) |
| Workload source: production | production or production-derived traffic | 9/50 | (cards 1-10, 2-4, 2-15) |
| Workload source: synthetic | explicitly synthetic arrivals, lengths or DAGs | 3/50 | (cards 1-11, 1-24, 2-7) |
| Workload source: public dataset | a named public dataset or a released trace | 3/50 (two more say "real-world"/"industrial" datasets without naming them) | (cards 1-20, 2-5, 2-6) |
| Metric: throughput | tokens/s, requests/s, or throughput speedup | 27/50 | (cards 1-7, 1-13, 2-25) |
| Metric: TTFT | time-to-first-token | 10/50 | (cards 1-8, 2-1, 2-22) |
| Metric: TPOT / TBT / ITL | per-token or inter-token latency | 6/50 | (cards 1-3, 1-7, 1-10) |
| Metric: p95 / p99 | any explicit tail percentile | 7/50 | (cards 1-1, 1-24, 2-1, 2-25) |
| Metric: SLO attainment / goodput | fraction of requests meeting a target, or goodput | 9/50 | (cards 1-3, 1-10, 1-18, 2-15) |
| Metric: energy / power / cost | joules, carbon, GPU-hours or dollars | 5/50 | (cards 1-3, 1-6, 2-10, 2-17) |
| Venue | 45 cards are arXiv preprints; a peer-reviewed venue is named on 5 | 5/50 | (cards 1-3, 1-18, 2-5, 2-8, 2-12) |
| Ablation reported | — | 0/50; the abstracts do not say | (none) |
| Baseline from a prior system | "state-of-the-art"/SOTA used as comparator in 15/50; a specific existing engine named in 14/50; the exact system being beaten named in about 7/50 | see left | (cards 1-16, 1-24, 2-5, 2-22) |
| Year | 2024: 7, 2025: 12, 2026: 31 | 0 cards dated 2023 | — |

Two facts worth carrying forward: no abstract in this corpus describes an ablation, and 41/50 abstracts never name a model.

## 3. The implied checklist

1. **Evaluate on a workload you did not invent.** A reviewer in this direction has already seen workload papers argue that conclusions flip under realistic burstiness and mixed lengths — `(cards 1-20, 2-6, 2-7)` — "if missing: your gain may be an artifact of a uniform, Poisson-ish stream; show the trace or say why yours is representative."
2. **State the arrival process and how bursty the load is.** The corpus routinely varies arrival pattern and concurrency, and several papers make burstiness the explanatory variable — `(cards 1-11, 1-20, 2-7)` — "if missing: the paper never defines its load, so no one can reproduce or compare the result."
3. **Use at least two model sizes or two model families.** The cards that report a cross-scale result test both sizes, and the single-device cards explicitly bound their claim to that setting — `(cards 2-1, 2-15, 1-21, 2-7)` — "if missing: single-model evidence; the mechanism is being claimed for serving in general."
4. **State the hardware and the GPU count, and test more than one configuration.** The results that carry weight in this corpus report explicit deployment scale — `(cards 1-8, 1-10, 2-1, 2-15, 2-22)` — "if missing: no scale, so a reviewer cannot tell whether the scheduler still helps at cluster size."
5. **Baseline against the closest prior system, running on the same engine.** Much of this work is an add-on to an existing engine and compares against that engine's own scheduler, not only against FCFS — `(cards 1-7, 1-16, 1-24, 2-22)` — "if missing: FCFS is a strawman; the stock scheduler already does this."
6. **Report the tail, not only the mean.** The sharpest claims in this corpus are stated on p99 or on class-conditional tail latency, not on the average — `(cards 1-1, 1-17, 1-24, 2-1, 2-25)` — "if missing: the mechanism may be trading tail for mean, and the paper is hiding it."
7. **Report SLO attainment or goodput at a stated target.** A latency number without a target is not comparable across systems — `(cards 1-3, 1-8, 1-10, 1-18, 2-15)` — "if missing: we cannot tell whether any user-visible promise was kept."
8. **Report the resource side: GPU-hours, instances, dollars or energy.** A scheduler that hits its SLO on more machines is a loss — `(cards 1-3, 1-6, 1-10, 2-8, 2-15)` — "if missing: you may have bought the latency with hardware."
9. **Ablate the mechanism and show the gain collapses without it.** No abstract here reports one (0/50), which is why the field's mechanism claims are hard to falsify — this is the cheapest place to beat the corpus — `(cards 1-3, 1-13, 1-24, 2-22)` — "if missing: the end-to-end number could come from any of the three co-designed pieces."
10. **State the behaviour under overload and the fallback path.** Policies that depend on prediction, admission or migration need a stated answer for when the prediction is wrong or the queue is full — `(cards 1-11, 1-21, 2-19, 2-22)` — "if missing: what happens at saturation, or when prediction error is asymmetric or large, is left to the reader."
11. **Quantify the error of any predictor you rely on, and show the policy under that error.** Prediction-guided ordering is only as good as its error model — `(cards 1-9, 1-11, 1-25, 2-5)` — "if missing: the predictor was evaluated on its own training distribution; show degradation, not just accuracy."
12. **State the boundary where the win disappears.** The cards that state a boundary are the ones whose claim is scoped to a regime — `(cards 1-7, 1-19, 1-21, 1-22, 2-7, 2-22)` — "if missing: the claim is unconditional, and reviewers will find the regime where it fails."
13. **Give reproducibility details: engine version, benchmark, code, seeds.** Results are only comparable if they run on the same stack — `(cards 1-16, 1-19, 1-20, 1-25, 2-6, 2-11)` — "if missing: nothing here can be rerun on our cluster."
14. **Explain why the baseline is strong, and configure it generously.** Large factors over tuned systems invite the question of how the baseline was tuned — `(cards 1-2, 1-16, 1-24, 2-5, 2-22)` — "if missing: the baseline ran defaults, or was denied the same information your policy gets."
15. **Give a mechanism-level argument for why it wins.** A proof, a queueing model, or a measured latency decomposition is what separates a policy from a recipe — `(cards 1-11, 1-13, 1-14, 1-16)` — "if missing: it is an engineering recipe, and we do not learn when it transfers."

## 4. The ten questions a reviewer will ask in this direction

1. **"What workload is this, and why should I believe its arrival and length distribution?"** A good answer: a named trace or a released generator, the observed burstiness and length spread, and a sentence on why the evaluated traffic resembles the deployment being claimed.
2. **"Is the win over your ablation or over the system everyone actually runs?"** A good answer: both — beating the stock scheduler of a deployed engine, and beating the same system with your mechanism switched off.
3. **"Where did the tail go? Show me p99, not the mean."** A good answer: mean and p99 (or the class-conditional tail) on the same run, with the SLO line drawn.
4. **"At what load does your policy stop helping?"** A good answer: a load sweep with the crossover point marked, and what the scheduler does past saturation.
5. **"What happens when the prediction is wrong?"** A good answer: measured error distribution plus the policy's behaviour under deliberately asymmetric or inflated error.
6. **"Why is this not the prior method with a new name?"** A good answer: the precise quantity that differs, and the experiment where the prior method's assumption fails.
7. **"How many GPUs did you spend to buy this?"** A good answer: GPU-hours or instance count at fixed SLO, not just latency at whatever cost.
8. **"Does this survive a second model or a second tenant?"** A good answer: at least one experiment with co-residency, interference, or a competing client class.
9. **"Which component carries the gain?"** A good answer: a leave-one-out ablation with the contribution of each co-designed piece separated.
10. **"What is the boundary of your claim — which workloads, which hardware, which SLO?"** A good answer: an explicit envelope, including the regime where the mechanism is neutral or negative.

## 5. Self-audit table

| # | Check (from §3) | Venue bar in this corpus | My draft | Gap | Action |
|---|---|---|---|---|---|
| 1 | Evaluate on a workload you did not invent | | | | |
| 2 | State the arrival process and how bursty the load is | | | | |
| 3 | Use at least two model sizes or two model families | | | | |
| 4 | State the hardware and GPU count, and test more than one configuration | | | | |
| 5 | Baseline against the closest prior system on the same engine | | | | |
| 6 | Report the tail (p99), not only the mean | | | | |
| 7 | Report SLO attainment or goodput at a stated target | | | | |
| 8 | Report the resource side: GPU-hours, instances, dollars or energy | | | | |
| 9 | Ablate the mechanism and show the gain collapses without it | | | | |
| 10 | State behaviour under overload and the fallback path | | | | |
| 11 | Quantify predictor error and show the policy under that error | | | | |
| 12 | State the boundary where the win disappears | | | | |
| 13 | Give reproducibility details: engine version, benchmark, code, seeds | | | | |
| 14 | Explain why the baseline is strong, and configure it generously | | | | |
| 15 | Give a mechanism-level argument for why it wins | | | | |

## 6. What not to copy

- **"Up to Nx" as the result.** Many abstracts headline a best-case factor with no distribution or median behind it (cards 1-1, 1-5, 1-15, 2-19); a reader cannot tell whether the typical request improved or only the lucky one.
- **One model, one GPU.** Single-model and single-device evidence appears in the corpus (cards 1-21, 2-7) but supports only a narrow claim; copying it invites the "does this survive a second model" objection.
- **Simulator-only or synthetic-only evaluation.** Five cards rest on simulation or analysis alone (cards 1-11, 1-14, 2-10, 2-11, 2-23), which is defensible for a bound but not for a claim about a real scheduler's behaviour.
- **Saying "state-of-the-art" without naming the system.** 15/50 abstracts do this (cards 1-3, 1-4, 2-8); it makes the comparison unfalsifiable and is the first thing a reviewer will press on.
- **Leaving out the model name, or the ablation.** 41/50 abstracts never name a model and 0/50 describe an ablation; both are gaps in the corpus, not the standard to inherit.
