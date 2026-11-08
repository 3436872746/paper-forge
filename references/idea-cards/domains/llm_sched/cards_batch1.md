### 1. Preble: Efficient Distributed Prompt Scheduling for LLM Serving (arXiv 2024)
- **Problem:** Prompts now repeat large shared parts across requests, but every KV-reuse proposal is confined to a single GPU while production serving is distributed.
- **Assumption:** Prompt sharing is common enough in real traffic that KV reuse gains can be traded against load balance without one destroying the other.
- **Mechanism:** A distributed scheduling system that co-optimizes KV state reuse and computation load-balancing via a new scheduling algorithm plus a hierarchical scheduling mechanism.
- **Evidence:** Real workloads and request arrival patterns on two open-source LLMs; 1.5X to 14.5X better average latency and 2X to 10X better p99 latency than SOTA serving systems.
- **Boundary:** not stated in abstract
- **Stealable move:** When a locally optimal cache hit fights global load balance, put the two decisions in different layers so the coarse layer never has to see per-request cache detail.
- **Pitch:** The first distributed LLM serving platform that targets and optimizes for prompt sharing.

### 2. Locality-aware Fair Scheduling in LLM Serving (arXiv 2025)
- **Problem:** Fair schedulers ignore prefix locality, and locality-aware schedulers ignore fair sharing, so neither serves diverse client prefix patterns well.
- **Assumption:** Fairness and prefix locality can be satisfied by one policy, i.e. the fairness guarantee survives a locality-friendly matching rule.
- **Mechanism:** Deficit Longest Prefix Match (DLPM), plus Double Deficit LPM (D$^2$LPM) extending it to the distributed case to balance fairness, locality, and load-balancing.
- **Evidence:** Evaluation type not stated in abstract; up to 2.87$\times$ higher throughput than VTC and up to 7.18$\times$ lower per-client latency than the state-of-the-art distributed LLM serving system.
- **Boundary:** not stated in abstract
- **Stealable move:** Bolt a deficit counter onto the matching rule you already want to use, so the fairness property is inherited instead of re-derived from scratch.
- **Pitch:** The first locality-aware fair scheduling algorithm that holds a high degree of prefix locality with a fairness guarantee.

### 3. Energy-Aware Scheduling for Serverless LLM Serving on Shared GPUs (ATC 2026)
- **Problem:** Co-resident models share one device-wide operating point while their demands and latency slack shift by phase and load, so no single layer can minimize energy alone.
- **Assumption:** Offline profiles plus GPU state summaries are accurate enough to make SLO-safe energy decisions in constant time online.
- **Mechanism:** Festina, a profiling-guided power-aware control plane jointly coordinating request placement, SM partitioning, and GPU operating points under TTFT/TBT SLOs, with a phase-aware local scheduler and SLO-aware migration for consolidation.
- **Evidence:** Comparison against four SOTA LLM serving systems and one DVFS-augmented system; reduces energy by up to 56% at parity of SLO attainment (within (abstract truncated).
- **Boundary:** not stated in abstract
- **Stealable move:** Precompute the expensive joint optimization offline into a lookup table so a multi-dimensional online decision still runs in constant time.
- **Pitch:** An energy-first control plane for serverless LLM serving, instead of a throughput- or tail-latency-first one.

### 4. Coordinated Scheduling for MoE LLM Serving (arXiv 2026)
- **Problem:** Frontend routing uses coarse request counters while backend balancers use aggregate expert counts, so neither reacts to fine-grained engine pressure or source-dependent expert traffic.
- **Assumption:** Exposing online backend pressure signals to the frontend produces better routing than any locally optimal frontend counter can.
- **Mechanism:** Gimbal, with a fine-grained DP-engine scheduler driven by KV usage, remaining prefill work, queue pressure and expert pressure, a prefill-aware queue ordering with aging that avoids output-length prediction, and MINLP-guided expert placement using source-DP-to-expert routing statistics.
- **Evidence:** Evaluation against the state-of-the-art serving s... ; reduces average TTFT by 42.9% and average TPOT by 33.3% (abstract truncated).
- **Boundary:** not stated in abstract
- **Stealable move:** Push backend pressure telemetry up into the routing layer rather than re-deriving backend state from frontend request counters.
- **Pitch:** A coordinated cross-level scheduling system for efficient MoE-based LLM serving.

### 5. Kalypso: Relational LLM Serving (arXiv 2026)
- **Problem:** Request-centric serving is blind to the query plan, so KV state that could flow from one semantic operator into the next is thrown away and recomputed.
- **Assumption:** Intermediate tuples moving between pipelined operators carry reusable KV state, and keeping it alive is compatible with GPU memory pressure.
- **Mechanism:** Kalypso exposes an API for semantic query plans and runs them with an adaptive memory-aware scheduler that jointly handles pipelined operator execution and GPU memory pressure, continuously rebalancing allocations across upstream parallelism, downstream progress, and GPU utilization.
- **Evidence:** Evaluation showing speedups up to 4.57x in query completion time over request-centric LLM serving baselines across diverse workloads.
- **Boundary:** not stated in abstract
- **Stealable move:** Let the producer of intermediate results declare the structure of what it will hand over, so the consumer inherits computed state instead of restarting.
- **Pitch:** Serving that is aware of semantic query structure while preserving query semantics and output accuracy.

### 6. FREESH: Fair, Resource- and Energy-Efficient Scheduling for LLM Serving on Heterogeneous GPUs (arXiv 2025)
- **Problem:** The same query run on an advanced GPU during a high-emission hour can carry a far higher carbon footprint than on a mid-level GPU at a low-emission time and place.
- **Assumption:** There is enough spatiotemporal flexibility in where and when queries run to move the carbon/energy optimum without paying in latency or fairness.
- **Mechanism:** Joint routing and scheduling across a group of data centers, matching each GPU instance's power-throughput characteristics to predictable query lengths, with optimized parallelism, query routing, dynamic GPU frequency scaling, and Least-Laxity-First serving.
- **Evidence:** One-hour serving on production workloads; reduces energy by 28.6% and emissions by 45.45%, with improvements in SLO attainment and fairness.
- **Boundary:** not stated in abstract
- **Stealable move:** Treat geographically and temporally separated heterogeneous hardware as one scheduling domain whose objective is a user-chosen scalar, not the local device's own efficiency.
- **Pitch:** Cooperatively run a group of data centers while minimizing user-specified carbon or energy objectives.

### 7. DualPace: Decoupled Scheduling and Cooperative GPU--CPU Decoding for LLM Serving (arXiv 2026)
- **Problem:** CPU-resident requests make progress only when the GPU scheduler happens to expose overlap, so host memory and CPU compute cannot act as an independent serving resource.
- **Assumption:** CPU-resident decode can be batched and advanced productively on its own, and splitting scheduling authority does not cost more than the overlap it buys.
- **Mechanism:** Two engines decoupled in scheduling but cooperative in execution: a GPU engine for prefills and GPU-resident decodes, and an AMX-enabled CPU engine that independently batches CPU-resident decodes, optionally invoking GPU Dense Assist for dense stages, with offline profiles guiding hardware-specific batching and routing.
- **Evidence:** Decode-oriented scenarios; throughput 6.9--43.2\% over NEO and 11.5--90.6\% over vLLM at the same latency, and 7.3--50.5\% higher request rates than NEO at the same P99 ITL.
- **Boundary:** Gains are reported only for decode-oriented scenarios; abstract states no other scope limits.
- **Stealable move:** Give an underused secondary resource its own scheduler instead of letting it be a slave to the primary resource's schedule.
- **Pitch:** Turning the host into an independently scheduled decode engine.

### 8. Stage-Aware Communication Scheduling for Disaggregated LLM Serving (arXiv 2026)
- **Problem:** Flows from dependent stages overlap on shared bottleneck links, and stage-agnostic flow scheduling produces uncoordinated contention that is a primary cause of TTFT SLO violations.
- **Assumption:** Least-Laxity-First ordering can be approximated well enough without knowing any request's precise remaining slack.
- **Mechanism:** Nuska, a Defer-and-Promote principle implemented as a Reverse Multi-Level Queue (RMLQ) that dynamically promotes task precedence as effective laxity diminishes, deployed as a pluggable module in vLLM.
- **Evidence:** An 8-server, 32-GPU testbed plus large-scale simulations; improves TTFT SLO attainment by 1.2x-2.4x over state-of-the-art baselines.
- **Boundary:** not stated in abstract
- **Stealable move:** When the ideal policy needs an unobservable quantity, build a queue structure whose ordering emerges from signals that cheaply proxy it.
- **Pitch:** A holistic multi-stage flow scheduling mechanism designed to maximize TTFT SLO attainment.

### 9. ELIS: Efficient LLM Iterative Scheduling System with Response Length Predictor (arXiv 2025)
- **Problem:** FCFS batching causes head-of-line blocking, but shortest-job-first needs an inference-time prediction that autoregressive generation makes hard.
- **Assumption:** An encoder model can predict response length accurately enough that remaining-length ordering is a net win inside iteration batching.
- **Mechanism:** A BGE-based response length predictor feeding ISRTF (Iterative Shortest Remaining Time First), a variant of shortest remaining time first tailored to existing LLM iteration batching.
- **Evidence:** Simulated request streams built from real-world user serving traces, plus a cloud-native Kubernetes implementation; reduces average job completion time by up to 19.6%.
- **Boundary:** not stated in abstract
- **Stealable move:** Predict the one cheap-to-observe quantity that orders the queue, then re-optimize the classical policy to the granularity your batching actually offers.
- **Pitch:** An ISRTF scheduler that manages inference tasks by the fewest remaining tokens.

### 10. PackServe: SLO-Aware Request Scheduling for Agentic LLM Serving at Scale (arXiv 2026)
- **Problem:** Consolidating requests onto fewer instances sacrifices cache locality and raises prefill/decode interference, so SLO attainment and resource efficiency are traded against each other.
- **Assumption:** Compact white-box latency models can predict the cost of prefill/decode interference precisely enough to spend latency headroom safely.
- **Mechanism:** PackServe predicts latency under interference with white-box models and packs requests onto fewer serving instances while preserving KV-cache reuse and SLO constraints.
- **Evidence:** 64 NVIDIA H20 GPUs, using up to 16.8% and 24.6% fewer GPU-hours than state-of-the-art schedulers at 30-ms and 50-ms TPOT targets; production cluster of over 1000 GPUs, 34.7% smaller resource footprint than the original production scheduler.
- **Boundary:** not stated in abstract
- **Stealable move:** Treat the SLO as a budget you are allowed to spend: convert leftover latency headroom into fewer machines, and report the win in resources rather than in latency.
- **Pitch:** A scheduler that reduces resource cost while meeting latency SLOs for agentic serving.

### 11. Quota-Based Aging for Prediction-Guided Scheduling in LLM Serving (arXiv 2026)
- **Problem:** Prediction-guided short-first scheduling starves long requests, while unrestricted aging over-promotes delayed long requests under congestion.
- **Assumption:** Under asymmetric prediction errors, a bounded quota on promotion restores long-request tail latency without giving back the mean-latency gain.
- **Mechanism:** Quota-Based Aging (QBA), combining predicted short-first admission with quota-bounded, debt-enforced promotion of aged predicted-long requests, explained by a reduced M/G/n queueing surrogate calibrated from simulator traces.
- **Evidence:** Event-driven serving-aware simulation modeling decode-priority batching, chunked prefill, token budgets and KV-cache-safe admission, on synthetic and production-derived workloads; results are qualitative, no numbers in abstract.
- **Boundary:** not stated in abstract
- **Stealable move:** Constrain a corrective mechanism with a quota or debt account so it cannot fire without limit whenever its trigger condition holds.
- **Pitch:** A controllable middle ground between aggressive short-first prioritization and unrestricted aging.

### 12. ProServe: Unified Multi-Priority Request Scheduling for LLM Serving (arXiv 2025)
- **Problem:** Existing schedulers do not jointly optimize SLO attainment and client-level priority, though fulfilling a business-critical request is worth far more than fulfilling another.
- **Assumption:** Requests of different priorities carry varying, well-defined gain, so multi-priority scheduling can be posed as a single service-gain maximization problem.
- **Mechanism:** A two-tier framework: SlideBatching at the engine layer adapting batch formation with a sliding boundary, asynchronous offloading with pipelined reloading and adaptive copy-budget control for preemption, and GoRouting at the service layer for gain-oriented, capability-aware dispatching with capacity reservation.
- **Evidence:** Four open-source and one industrial dataset; ProServe outperforms stat... (abstract truncated).
- **Boundary:** not stated in abstract
- **Stealable move:** Turn a multi-objective policy question into an explicit value-per-request objective, then let that one scalar drive both the batching and the routing decision.
- **Pitch:** A unified two-tier scheduling framework designed to maximize overall service gain.

### 13. A Predictive and Synergistic Two-Layer Scheduling Framework for LLM Serving (arXiv 2025)
- **Problem:** The two-tier router/engine split leaks information: the router acts on lagging coarse metrics while the engine runs static heuristics, causing SLO violations and wasted resources.
- **Assumption:** A single online performance model can produce per-step latency and capacity estimates accurate enough for both layers to act on ahead of time.
- **Mechanism:** NexusSched, built on a structurally-informed online performance model that drives LENS (SLO-aware adaptive batching at the engine layer) and PRISM (predictive, state-driven routing at the cluster layer).
- **Evidence:** Evaluation reporting 43% average improvement in SLO attainment and up to 3x throughput speedup in long-c... (abstract truncated).
- **Boundary:** not stated in abstract
- **Stealable move:** Give both layers of a hierarchy the same forward-looking model, so the cheap layer queries a prediction instead of applying its own heuristic.
- **Pitch:** Shifts LLM serving from reactive load balancing to predictive orchestration.

### 14. Efficiency and Cost Alignment in Batched LLM Serving via Resource-Fair Scheduling (arXiv 2026)
- **Problem:** A batch step's wall-clock cost is set by its largest active KV-cache footprint, so a short request co-batched with a long one pays latency and GPU cost disproportionate to its own tokens.
- **Assumption:** Bounding the disparity of decode progress (equivalently KV footprint) within a batch improves throughput and aligns cost with token-metered revenue.
- **Mechanism:** A mathematical scheduling model with a fairness constraint on within-batch KV-footprint disparity, yielding Insert-Short-Jobs-with-Limit (ISJL), a parameterized hybrid batching policy.
- **Evidence:** Analysis plus numerical experiments; proves ISJL a global competitive-ratio lower bound of 3/4 and places it between FCFS and LJF; no experimental numbers in abstract.
- **Boundary:** not stated in abstract
- **Stealable move:** When a shared batch's cost is charged by its largest member, bound the spread among members instead of ordering purely by arrival time or by size.
- **Pitch:** A bi-criterion policy that keeps throughput while aligning max-driven batch cost with token-metered revenue.

### 15. Conveyor: Efficient Tool-aware LLM Serving with Tool Partial Execution (arXiv 2024)
- **Problem:** Requests that trigger external tools stall serving while the tool runs, because serving treats the tool call as an opaque gap rather than schedulable work.
- **Assumption:** A tool can do useful work before its input is fully known, and that partially executed work can be reconciled when the full input arrives.
- **Mechanism:** Conveyor adds an interface letting tool developers expose partial execution opportunities to the serving system, plus a request scheduler that schedules partial tool execution alongside LLM decoding.
- **Evidence:** Evaluation platform not stated in abstract; up to 38.8% improvement in request completion latency.
- **Boundary:** not stated in abstract
- **Stealable move:** Let the callee publish a partially-executable interface so the caller can overlap its own work with the callee's ramp-up instead of waiting for the handoff.
- **Pitch:** Identifies tool partial execution alongside LLM decoding as a new efficiency opportunity.

### 16. Geometry-Aware Online Scheduling for LLM Serving: From Theoretical Bound to System Practice (arXiv 2026)
- **Problem:** Time-centric heuristics such as Shortest Job First inherit guarantees from classical scheduling that do not model the dynamic 2D spatio-temporal growth of LLM KV-cache footprints.
- **Assumption:** KV footprint's geometric volume admits an ordering with a better worst-case bound than time-based orderings, and that bound survives coarse information.
- **Mechanism:** Smallest Volume First (SVF) and its 1-bit variant, proved via a volume-certificate argument and integrated as a plug-and-play layer in vLLM.
- **Evidence:** Analysis giving a worst-case approximation ratio approaching 3 (versus prior best constant 48), plus real-system evaluation on Llama-3.1 in vLLM with reductions in average and tail latency; 1-bit SVF competitive with one bit of information.
- **Boundary:** not stated in abstract
- **Stealable move:** Re-derive the classical heuristic in the metric that actually bounds the contended resource, then ask how far you can quantize the signal before the guarantee collapses.
- **Pitch:** A theoretically sound and empirically proven approach to memory-constrained scheduling.

### 17. HexAGenT: Efficient Agentic LLM Serving via Workflow- and Heterogeneity-Aware Scheduling (arXiv 2026)
- **Problem:** Users wait on a whole workflow whose dependencies are only revealed at runtime, across heterogeneous prefill-decode clusters where the two stages stress different resources.
- **Assumption:** A continuously maintained estimate of the workflow's standalone completion horizon is a usable priority signal even while the DAG is still expanding.
- **Mechanism:** HexAGenT models each request as an online-revealed DAG, keeps a running estimate of the workflow's completion horizon, ranks ready calls by projected risk of missing it, and jointly selects prefill placement, decode placement, and local queue priority under KV capacity and transfer-latency constraints.
- **Evidence:** Representative agentic workloads on heterogeneous A100/H100/H200 clusters; reduces required SLO scale by 20.1% on average at 95% attainment and 33.0% at 99%, with maxima of 45.0% and 80.5%.
- **Boundary:** not stated in abstract
- **Stealable move:** Schedule against the deadline of the whole job even when most of the job's structure is still unknown, by re-estimating the finish horizon continuously rather than once.
- **Pitch:** A workflow-aware scheduler for heterogeneous prefill-decode disaggregated service.

### 18. Past-Future Scheduler for LLM Serving under SLA Guarantees (ASPLOS 2025)
- **Problem:** Continuous batching depends on estimating request memory, but variable output lengths push schedulers to aggressive or conservative extremes, causing harmful evictions or long queuing under SLA.
- **Assumption:** The historical distribution of output lengths predicts future memory occupancy well enough to compute a peak at each future time point.
- **Mechanism:** A Past-Future scheduler that estimates the running batch's peak memory by combining the historical output-length distribution with computed occupancy at each future time point, implemented in the LightLLM framework.
- **Evidence:** Real system (LightLLM) evaluation showing up to 2-3$\times$ higher goo... than existing aggressive or conservative schedulers (abstract truncated).
- **Boundary:** not stated in abstract
- **Stealable move:** When a resource must be reserved for an unknown duration, reserve the peak of a predicted occupancy curve rather than a point estimate or a worst case.
- **Pitch:** Precisely estimates peak memory of the running batch to hold goodput under strict SLA guarantees.

### 19. ExaServe: Large-Scale LLM Serving on Exascale HPC Systems (arXiv 2026)
- **Problem:** Cloud-native serving frameworks do not reach leadership-class supercomputers without scheduler integration, MPI launch, accelerator selection, node-local weight staging, and platform-specific patches.
- **Assumption:** All platform-specific glue can be absorbed into a declarative specification, making an exascale deployment reproducible as a single artifact.
- **Mechanism:** A pip-installable framework that transforms a declarative YAML specification into a reproducible large-scale serving deployment, demonstrated on ALCF Aurora from 1 to 256 nodes (3072 vLLM replicas).
- **Evidence:** Real deployment on Aurora; non-streaming inference scales nearly linearly to 256 nodes at 27.1k requests/s (3.8M tokens/s); token streaming plateaus near 4.7k requests/s at a centralized proxy; an O(N^2) Ray Serve control-plane bottleneck raises bring-up to roughly 30 minutes at 256 nodes.
- **Boundary:** Streaming does not scale with nodes (proxy plateau at ~4.7k req/s), and control-plane cost grows as O(N^2), inflating deployment time.
- **Stealable move:** Report the layer that fails to scale as a first-class result instead of a footnote; the deployment's negative result is what the next system builder needs.
- **Pitch:** A practical, reproducible deployment path that also exposes the key barriers to exascale LLM serving.

### 20. BurstGPT: A Real-world Workload Dataset to Optimize LLM Serving Systems (arXiv 2024)
- **Problem:** Without open serving workloads, systems are evaluated under unrealistic assumptions and degrade once deployed.
- **Assumption:** Statistics from regional production traffic of one commercial provider characterize realistic LLM serving load well enough to serve as the community's evaluation standard.
- **Mechanism:** BurstGPT, a trace dataset capturing user request concurrency and burstiness, conversation patterns and intervals, model response lengths, and system response failures.
- **Evidence:** Trace dataset of 10.31 million traces from regional Azure OpenAI GPT services over 213 days, plus a demo evaluation showing declines in efficiency, stability or reliability under realistic variation (abstract truncated).
- **Boundary:** not stated in abstract
- **Stealable move:** Before optimizing, publish the measurement showing your assumed workload distribution is wrong, and hand the trace out as the shared baseline everyone must beat.
- **Pitch:** A real-world LLM serving workload that shows why current evaluation assumptions mislead.

### 21. PersistentKV: Page-Aware Decode Scheduling for Long-Context LLM Serving on Commodity GPUs (arXiv 2026)
- **Problem:** The best single kernel is not the best serving schedule: low-active long-context decode under-utilizes GPUs, and mixed sequence lengths force a choice between many exact-length launches and coarse padded batches.
- **Assumption:** A cost model calibrated on a small number of traces transfers to held-out traffic and stays valid for the shapes it routes.
- **Mechanism:** A native block-table decode attention engine for grouped-query attention that maps work by KV-head group over native page tables, a compact workqueue schedule over only non-empty row-KV-head-sequence-split tasks, and a roofline-style policy that routes each shape among FlashInfer and the PersistentKV paths.
- **Evidence:** Real system on an RTX 3060 (FP16, page size 16, Hq=32, Hkv=8, d=128): five held-out seeds improve mean wall decode-token throughput by 1.04x to 1.08x on B8 bimodal, uniform and Zipf-like workloads and 1.40x on a B1 bucketed trace (abstract truncated).
- **Boundary:** For the B4 boundary case and uncalibrated GQA ratios the policy only avoids regressions by routing back to FlashInfer, so gains do not extend there.
- **Stealable move:** Do not replace the incumbent implementation; add a cost model that picks among implementations per input shape, with "do nothing" as a first-class option.
- **Pitch:** The best single-kernel implementation is not always the best serving schedule.

### 22. Token Latency Fairness: Performance Isolation for Multi-Tenant LLM Serving (arXiv 2026)
- **Problem:** Existing isolation equalizes long-run throughput, but gives no latency isolation, so a well-behaved client can still suffer large token-level latency degradation from another client's demand.
- **Assumption:** Delay from GPU compute sharing and shared KV caching can be bounded ahead of time and then enforced with per-token deadlines.
- **Mechanism:** FairInference provides a δ-token fairness guarantee, scheduling with per-token deadlines while bounding delays from GPU compute sharing and accounting for delays introduced by shared KV caching in GPU memory.
- **Evidence:** Evaluation reporting that token-level latency spikes for well-behaved clients are bounded and overall throughput improves; no numeric results stated in abstract.
- **Boundary:** The guarantee is stated only for a well-behaved client; behavior under misbehaving clients is not claimed.
- **Stealable move:** Define isolation as a bound on per-unit latency relative to solo execution (a delta), not as an equalized share of throughput.
- **Pitch:** A novel δ-token fairness guarantee that gives strong latency isolation for LLM serving.

### 23. TimelyLLM: Segmented LLM Serving System for Time-sensitive Robotic Applications (arXiv 2024)
- **Problem:** FCFS batching in existing serving systems ignores that robotic agents need plans by a deadline, not eventually.
- **Assumption:** Redundancy between the plan generation phase and the plan execution phase is large enough that splitting generation pays off for time-sensitive consumers.
- **Mechanism:** Segmented generation and scheduling that exploits redundancy between robot plan generation and execution phases.
- **Evidence:** Implementation on a widely used LLM serving framework, evaluated on a range of robotic applications; improves time utility up to 1.97x and reduces overall waiting time by 84%.
- **Boundary:** not stated in abstract
- **Stealable move:** Find the slack in the consumer's downstream phase and split your output so usable pieces can be handed over before the whole item is finished.
- **Pitch:** Serving multiple robotic agents with time-sensitive requests, instead of first-come first-served.

### 24. TOPAS: Workflow-Aware Prefix-State Scheduling for Multi-Agent LLM Serving (arXiv 2026)
- **Problem:** Retaining a long system-prompt KV cache speeds future calls but shrinks the memory available for concurrent batching, and optimizing either locality or workflow progress alone stretches job completion time.
- **Assumption:** The expected reduction in a task's longest remaining service path is a tractable and faithful score for a cache/schedule decision.
- **Mechanism:** TOPAS scores candidate post-decision states by trading expected reduction in each task's longest remaining service path against near-term downstream prefix reuse, charges them for prefix movement and preemption, and adds task-level aging to prevent starvation; implemented in SGLang.
- **Evidence:** Real system (SGLang) on three synthetic DAGs and two MetaGPT workflows; mean/p99 JCT down by up to 39.8%/49.4% on synthetic, 9.8% mean on MetaGPT-SOP, and 22.0%/26.6% mean/p99 on MetaGPT-TL.
- **Boundary:** not stated in abstract
- **Stealable move:** Score every candidate action by its effect on the job's critical path, and charge it for the eviction and movement it forces elsewhere.
- **Pitch:** A Task-Oriented Prefix-Aware Scheduler that jointly decides what to cache and what to run.

### 25. Efficient Interactive LLM Serving with Proxy Model-based Sequence Length Prediction (arXiv 2024)
- **Problem:** Autoregressive generation makes execution time unpredictable, so serving falls back to FCFS and suffers head-of-line blocking.
- **Assumption:** A light proxy model's length prediction is accurate enough that shortest-job-first ordering wins despite speculation error.
- **Mechanism:** A speculative shortest-job-first (SSJF) scheduler that uses a light proxy model to predict output sequence length, with no changes to memory management or batching.
- **Evidence:** Real-world datasets and production workload traces; reduces average job completion time by 30.5-39.6% and raises throughput by 2.2-3.6x versus FCFS across no batching, dynamic batching and continuous batching.
- **Boundary:** not stated in abstract
- **Stealable move:** Keep the speculative predictor strictly outside the correctness-critical paths (memory management, batching) so the policy can be swapped in or out without touching them.
- **Pitch:** Enabling efficient interactive serving despite the non-deterministic nature of LLM execution times.
