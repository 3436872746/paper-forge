> 中文版: [cards_batch5.zh.md](cards_batch5.zh.md)

### 1. AUM: Unleashing the Efficiency Potential of Shared Processors with Accelerator Units for LLM Serving (HPCA 2026)
- **Problem:** Dedicating AU-enabled CPUs exclusively to LLM serving wastes resources; sharing with general workloads causes up to 50% performance/efficiency degradation because managers are oblivious to Accelerator Unit Variations.
- **Assumption:** AU behavior varies along three dimensions — usage patterns, compulsory frequency interference, resource bounds — and can be captured in a discrete profiled model.
- **Mechanism:** AUM: background profiler characterizes usage/frequency/resource into a discrete model; runtime controller performs usage-aware requirement analysis, frequency-aware division, bound-aware resource decisions.
- **Evidence:** real system; datasets not stated in abstract.
- **Boundary:** not stated in abstract.
- **Stealable move:** Name your variation space as an explicit N-dimensional axis set (here three), then map each axis to one stage of a cooperative profiler/controller pipeline.
- **Pitch:** Profile the three axes of accelerator-unit variation, then let one controller pick frequency and resource bounds jointly.

### 2. MFS: An Efficient Model Family Serving System for LLMs (EuroSys 2026)
- **Problem:** Serving providers offer model families (e.g., Llama2 7B/13B/70B), but synergy between models of the same family is unexploited.
- **Assumption:** Models in a family share structure and redundant parameters, so the largest can encapsulate the smaller ones.
- **Mechanism:** Knowledge Precipitation fine-tuning restructures the largest model to contain smaller ones as one multi-tiered serving pipeline; tiered-level batching, shared intermediate features and KV-cache, multi-level sampling.
- **Evidence:** real system experiments; datasets not stated in abstract.
- **Boundary:** claims no compromise to generated-content quality; no other limits stated.
- **Stealable move:** Turn a product-lineup into an architecture: fold the small models into the big one so one forward pass serves several tiers.
- **Pitch:** Let the family's largest model host its smaller siblings, then batch across tiers and share their caches.

### 3. Frontier: Simulating the Next Generation of LLM Inference Systems (SOSP 2025)
- **Problem:** MoE and disaggregated architectures (PD, AF) create system dynamics that existing simulators cannot model.
- **Assumption:** High-fidelity simulation requires native MoE/expert-parallel support and refined operator models, not bolted-on extensions.
- **Mechanism:** Unified framework covering co-located and disaggregated systems; native EP MoE support; cross-cluster expert routing, advanced pipelining for latency hiding, refined operator models.
- **Evidence:** simulation; datasets not stated in abstract.
- **Boundary:** no fidelity numbers or limits stated in abstract.
- **Stealable move:** Position a simulator as the community substrate for a paradigm that hardware does not yet exist for — build the design space before the systems.
- **Pitch:** Rebuild the simulator around disaggregation and expert parallelism so tomorrow's serving designs can be searched today.

### 4. From Exploration to Mastery: Enabling LLMs to Master Tools via Self-Driven Interactions (ICLR 2024)
- **Problem:** Human-centric tool documentation is inadequate and inaccurate, creating a comprehension gap between LLMs and external tools.
- **Assumption:** LLMs' own trial-and-error interaction with tools yields feedback sufficient to rewrite documentation.
- **Mechanism:** DRAFT: three phases — experience gathering, learning from experience, documentation rewriting — plus a diversity-promoting exploration strategy and a tool-adaptive termination mechanism.
- **Evidence:** experiments on multiple datasets; datasets not stated in abstract.
- **Boundary:** not stated in abstract.
- **Stealable move:** Make the artifact (documentation) the learned object, and add an explicit anti-overfitting stop rule so iterative rewriting terminates.
- **Pitch:** Let the model fail against tools, then rewrite the manual from those failures until it stops improving.

### 5. KV Cache Transform Coding for Compact Storage in LLM Inference (ICLR 2025)
- **Problem:** Stale reusable KV caches consume scarce GPU memory, forcing offload or recomputation.
- **Assumption:** KV caches contain the same redundancies classical media compression exploits; model weights need not change.
- **Mechanism:** KVTC: PCA-based feature decorrelation, adaptive quantization, entropy coding; brief initial calibration only.
- **Evidence:** real system; Llama 3, Mistral NeMo, R1-Qwen 2.5 on AIME25, GSM8K, LiveCodeBench, LongBench, MATH-500, MMLU, Qasper, RULER.
- **Boundary:** compression gains vary — 20x general, 40x+ only for specific use cases; not stated otherwise.
- **Stealable move:** Import an entire mature codec stack (decorrelate, quantize, entropy-code) rather than inventing a KV-specific compressor.
- **Pitch:** Borrow media compression wholesale: decorrelate, quantize, entropy-code the KV cache and keep the model untouched.

### 6. Manage the Workloads not the Cluster: Designing a Control Plane for Large-Scale AI Clusters (MLSys 2025)
- **Problem:** Cluster managers treat accelerators as monolithic and allocate once at placement, unbalancing power, memory, and compute utilization.
- **Assumption:** LLM serving cluster management is a bin-packing problem where resource budgets abstract hardware away.
- **Mechanism:** Shapeshifter monitors workload demands, abstracts hardware as multi-dimensional budgets, and continuously rebalances workload deployment before hardware allocation.
- **Evidence:** not stated in abstract (position/vision framing; no evaluation reported).
- **Boundary:** explicitly a forward-looking agenda; multidimensional model placement and rebalancing without service disruption left as future work.
- **Stealable move:** Shift the control target from hardware to workload shape — rebalance the abstraction, not the machines.
- **Pitch:** Stop packing GPUs; pack resource budgets, and continuously reshape workloads so power, memory, and compute stay balanced.

### 7. BanditSpec: Adaptive Speculative Decoding via Bandit Algorithms (ICML 2025)
- **Problem:** Speculative decoding uses a fixed configuration regardless of prefix tokens, or needs offline/online draft-model training.
- **Assumption:** Hyperparameter choice can be learned online during generation, with no training.
- **Mechanism:** Formulate as multi-armed bandit; UCB-Spec and EXP3-Spec; analyzed via a new "stopping time regret," bounded for stochastic and adversarial rewards.
- **Evidence:** real system experiments with LLaMA3 and Qwen2; simulated real-life serving scenarios with diverse prompts.
- **Boundary:** throughput approaching oracle best only; quality/accuracy tradeoff not stated.
- **Stealable move:** Invent a task-specific regret definition ("stopping time regret") — it makes a systems heuristic theoretically defensible.
- **Pitch:** Treat decoding hyperparameters as bandit arms and adapt them per prefix, with an information-theoretic optimality bound.

### 8. FlexPipe: Adapting Dynamic LLM Serving Through Inflight Pipeline Refactoring in Fragmented Serverless Clusters (EuroSys 2025)
- **Problem:** Static pipeline configurations cannot adapt to variable request patterns and severe resource fragmentation in serverless clusters.
- **Assumption:** Pipeline granularity can be reconfigured at runtime, mid-flight, without breaking correctness.
- **Mechanism:** Fine-grained model partitioning under computational-graph constraints; inflight pipeline refactoring with consistent cache transitions; topology-aware allocation over fragmented GPUs.
- **Evidence:** real system on an 82-GPU cluster.
- **Boundary:** not stated in abstract.
- **Stealable move:** Make "cache transitions" a named sub-problem of reconfiguration — the refactor is only safe if state migration is.
- **Pitch:** Refactor the pipeline while requests are in flight, treating cache consistency as the hard constraint that makes it legal.

### 9. Cauchy: A Cost-Efficient LLM Serving System through Adaptive Heterogeneous Deployment (SoCC 2025)
- **Problem:** Frameworks co-locate prefill and decode on homogeneous GPUs, ignoring their distinct resource demands and under-using heterogeneous GPUs.
- **Assumption:** Cost efficiency is governed by the choice of "GPU Combo" for prefill-decode pairs.
- **Mechanism:** Deploy combos to meet goodput QoS; hierarchical scheduling — opportunistic within a combo, goodput-weighted round-robin across combos; dynamic autoscaling.
- **Evidence:** real system experiments; datasets/traces not stated in abstract.
- **Boundary:** claims strict SLO maintenance; other limits not stated.
- **Stealable move:** Make the unit of decision a heterogeneous pair ("combo") rather than a single GPU, and schedule two levels above it.
- **Pitch:** Match prefill and decode to different GPU types by cost, then schedule two levels: inside each combo and across combos.

### 10. Demystifying Cost-Efficiency in LLM Serving over Heterogeneous GPUs (ICML 2025)
- **Problem:** Homogeneous-GPU practice degrades cost efficiency when requests have divergent compute and memory demands.
- **Assumption:** Different GPU types' compute/memory characteristics align with different request demands; cost-efficiency is set by GPU composition, deployment configuration, and workload assignment.
- **Mechanism:** Comprehensive benchmarking to establish that claim, then a MILP scheduling algorithm choosing the most cost-efficient plan under price budget and real-time GPU availability.
- **Evidence:** benchmarking study plus trace-driven evaluation; diverse workload traces, varying GPU availability, multi-model serving.
- **Boundary:** not stated in abstract.
- **Stealable move:** Lead with a measurement/benchmark section that establishes the design space, then cast selection as MILP — "demystify, then optimize."
- **Pitch:** Benchmark first to prove composition matters, then solve heterogeneous GPU assignment as MILP under price and availability budgets.

### 11. DeltaZip: Efficient Serving of Multiple Full-Model-Tuned LLMs (EuroSys 2023)
- **Problem:** Serving many full-parameter fine-tuned LLMs concurrently is hard due to sporadic, bursty, varying request patterns.
- **Assumption:** Fine-tuning makes only small-magnitude changes to the pre-trained model, so deltas compress well without quality loss.
- **Mechanism:** Aggressively compress model deltas (up to 10x) with a compression algorithm co-designed with the serving system.
- **Evidence:** real system; datasets not stated in abstract.
- **Boundary:** delta compression targeted at full-model fine-tunes; other settings not stated.
- **Stealable move:** Co-design the lossy compressor with the scheduler so compression ratio becomes a serving knob, not a fixed cost.
- **Pitch:** Store only compressed deltas of each fine-tune and co-design the system around that assumption to multiply throughput.

### 12. Rethinking Key-Value Cache Compression Techniques for Large Language Model Serving (MLSys 2025)
- **Problem:** Despite many KV compression algorithms, production adoption is rare; performance measurement is incomplete.
- **Assumption:** The gap is evidential, not algorithmic — existing benchmarks hide what matters in deployment.
- **Mechanism:** Review algorithm designs and benchmark studies; identify missing measurement pieces; empirically evaluate representative methods; analyze per-sample rather than aggregate accuracy.
- **Evidence:** review plus empirical re-evaluation; benchmarks not stated in abstract.
- **Boundary:** scoped to KV cache compression for serving; other limits not stated.
- **Stealable move:** Report per-sample accuracy tails, not just averages, and measure end-to-end latency including output-length inflation.
- **Pitch:** Show that KV compression looks good on averages but breaks on individual samples and slows real serving.

### 13. Efficient Deployment of Large Language Model across Cloud-Device Systems (SoCC 2024)
- **Problem:** Cloud clusters are costly and network-unstable against SLAs; cloud-device collaboration is complicated by varying operational intensity across LLM operators and dynamic sequence lengths.
- **Assumption:** Operator-level compute-to-memory ratio under a given sequence length predicts where an operator should run.
- **Mechanism:** Greedy operator-level scheduling; hardware model relating operational intensity to GPU utilization for runtime estimation; a cloud-device LLM compiler framework for evaluation and deployment.
- **Evidence:** not stated in abstract (framework design with quantitative evaluation promised).
- **Boundary:** not stated in abstract.
- **Stealable move:** Route at operator granularity, not request granularity — the compute/memory ratio changes within a single inference.
- **Pitch:** Split inference by operator, routing each by its compute-to-memory ratio across cloud and device hardware.

### 14. MoE-Lightning: High-Throughput MoE Inference on Memory-constrained GPUs (ASPLOS 2024)
- **Problem:** MoE models are too large for users without high-end GPUs, and offloading underuses resources.
- **Assumption:** A hierarchical Roofline model can predict, and a pipelined schedule can reach, a throughput bound under memory limits.
- **Mechanism:** CGOPipe CPU-GPU-I/O pipelining with paged weights; HRM hierarchical-roofline performance model used to find high-throughput policies.
- **Evidence:** real system; Mixtral 8x7B on a single T4 (16GB), plus Mixtral 8x22B and DBRX on 2-4 T4s.
- **Boundary:** bounded by GPU memory throughput ceiling; larger MoEs need multiple low-cost GPUs.
- **Stealable move:** Pair the system with a roofline-derived upper bound and show you approach it — the bound is the argument.
- **Pitch:** Page MoE weights, pipeline CPU-GPU-I/O, and use a hierarchical roofline to drive policies up to the memory bound.

### 15. Hydra: Scale-out FHE Accelerator Architecture for Secure Deep Learning on FPGA (HPCA 2025)
- **Problem:** FHE accelerators stack parallel compute clusters for throughput but cannot exploit application-level parallelism or scale by adding nodes.
- **Assumption:** Application-level parallelism exists and can be governed centrally across arbitrary compute nodes.
- **Mechanism:** Scale-out multi-server architecture; each node handles a portion of the model under a central scheduling mechanism on the host server.
- **Evidence:** real system/hardware; CNN and LLM workloads, FPGA implementation.
- **Boundary:** "theoretically" arbitrary nodes; limits beyond scaling not stated.
- **Stealable move:** Argue scalability by showing performance across a range of compute resource sizes, not one point.
- **Pitch:** Scale FHE deep learning out, not up: split the model across servers under one central scheduler.

### 16. History Doesn't Repeat Itself but Rollouts Rhyme: Accelerating Reinforcement Learning with RhymeRL (ASPLOS 2026)
- **Problem:** RL for LLMs wastes GPUs: rollout dominates runtime and length imbalance within a batch creates bubbles.
- **Assumption:** Rollout responses are remarkably similar across adjacent training epochs — a distributional, not memorized, redundancy.
- **Mechanism:** HistoSpec, a speculative decoder drafting from historical rollout token sequences; HistoPipe, two-tier scheduling using historical rollout distributions to balance workers.
- **Evidence:** real system; up to 2.6x speedup; models/datasets not stated in abstract.
- **Boundary:** prior async/truncation fixes may compromise accuracy; this paper claims not to.
- **Stealable move:** Mine the training loop's own history as the draft source — the previous epoch is a free speculative model.
- **Pitch:** Draft new rollouts from last epoch's rollouts; schedule workers by historical length distribution to kill bubbles.

### 17. EdgeAgent: Orchestrating On-Device LLM inference for End-User Multi-Agent Systems on CPU-GPU Unified Memory Architectures (ASPLOS 2026)
- **Problem:** Multi-agent edge inference suffers UMA bus contention during memory-bound decode, extreme drafting-difficulty variance, and tool-induced stalls.
- **Assumption:** Sequence predictability is observable at runtime and can drive both draft budget and agent suspension.
- **Mechanism:** Zero-copy UMA-aware tensor parallelism with asymmetric memory layouts; dynamic draft budget from real-time predictability; async suspend-and-yield to evict stalled agents.
- **Evidence:** real system on Apple M4 SoC; UMA execution 1.29x, full system 1.77x over batched speculative decoding.
- **Boundary:** not stated in abstract.
- **Stealable move:** Report an ablation that isolates each layer's contribution (micro-architectural vs scheduling) so cross-layer claims stay auditable.
- **Pitch:** Co-design tensors for unified memory and scheduling for stalled agents, bounding bandwidth waste by predicted predictability.

### 18. LLM-42: Enabling Determinism in LLM Inference with Verified Speculation (SOSP 2026)
- **Problem:** Floating-point non-associativity plus dynamic batching makes outputs vary across runs; disabling batching kills throughput and batch-invariant kernels impose fixed costs.
- **Assumption:** A token sequence usually emits the same next token across runs, and kernels reuse reduction schedules per shape.
- **Mechanism:** Fast nondeterministic decode path plus verify-rollback: replay under fixed batch size to get a deterministic reference, commit matches, roll back mismatches.
- **Evidence:** real system; datasets not stated in abstract.
- **Boundary:** overhead proportional only to traffic needing determinism; other limits not stated.
- **Stealable move:** Pay for a guarantee only where it is demanded — make correctness a per-request option with cost proportional to demand.
- **Pitch:** Decode fast and non-deterministically, then verify against a fixed-batch replay and roll back only mismatches.

### 19. Linux AGX: An Adaptive GPU eXtension to Linux Fair Scheduling for Physical AI and Robotic Systems (SOSP 2026)
- **Problem:** Linux fair scheduling sees only CPU service and sleep-wake events, so it cannot identify GPU-gating feeder slices or track a shifting critical path, idling GPUs on embedded robots.
- **Assumption:** The critical path is observable online and can be encoded as a bounded per-task importance score applied as an effective weight.
- **Mechanism:** User-space profiler computes bounded per-task score; kernel applies it as effective weight while preserving EEVDF/CFS pick logic, deadlines, and fairness.
- **Evidence:** real system; proofs of proportional-fairness preservation and a bound on GPU launch delay.
- **Boundary:** bound is K-independent only when the bounded boost is not clipped; otherwise coalescing bound.
- **Stealable move:** Change only the weight interface of an existing scheduler — "scheduler-agnostic, no new queues" is a powerful adoption argument.
- **Pitch:** Leave EEVDF's pick logic untouched; feed it a GPU-aware importance weight and keep the fairness proof.

### 20. HealthServe: A Public Health-Aware Inference Framework (SIGMETRICS 2026)
- **Problem:** LLM inference emits CO2 and criteria pollutants (PM2.5, SO2, NOx) whose health damage depends on meteorology and population exposure at the emission site.
- **Assumption:** Health impact can be quantified into a health-cost metric usable as a scheduling objective alongside carbon.
- **Mechanism:** Health impact assessment applied to inference; hierarchical scheduling with Social Cognitive Optimization maintaining condition-indexed decision libraries for reuse.
- **Evidence:** real system on a heterogeneous GPU cluster across U.S. datacenter locations.
- **Boundary:** evaluated in U.S. locations; claims additive benefit with existing carbon-aware methods, not replacement.
- **Stealable move:** Add a second externality axis to an existing sustainability objective and show it is additive, not competing.
- **Pitch:** Schedule inference by public-health cost as well as carbon, using cached decisions for recurring operating conditions.
