### 1. HAServe: Horizon-Aware Scheduling and Memory Co-Design for Efficient LLM Serving (arXiv 2026)
- **Problem:** Online requests share context but differ in prefix structure and arrival timing, and finite capacity couples admission with KV retention so neither can be decided well alone.
- **Assumption:** A unified view of visible demand — exact prefix paths, permitted serializations, released consumers — is enough to predict the latency cost of joint admission/KV-retention candidates as rates vary.
- **Mechanism:** HorizonSchema workload abstraction feeds a scheduling-memory co-design that picks the feasible joint admission and KV-retention candidate with lowest predicted latency cost, built on SGLang.
- **Evidence:** Real system: SGLang, 8x H100, Qwen3-4B-Instruct-2507 and Llama2-13B, five workloads; up to 1.14-5.90x P99 TTFT speedup, 1.08-1.44x throughput, KV-cache hit rate up to 20.59 percentage points above the strongest baseline per metric.
- **Boundary:** not stated in abstract
- **Stealable move:** Expose the workload's future demand — which items will be reused, when, by whom — as a shared input to both the admission policy and the retention policy, so the coupled decision is optimized jointly rather than sequentially.
- **Pitch:** A unified view of visible demand lets the system choose admission and KV retention together at the lowest predicted latency cost.

### 2. Trinity: Disaggregating Vector Search from Prefill-Decode Disaggregation in LLM Serving (arXiv 2025)
- **Problem:** Retrieval via vector search stays entangled with model inference — heterogeneous RAG requests and prompt answer caches — which inflates tail latency even after prefill and decode are separated.
- **Assumption:** All retrieval can be consolidated into one shared vector-search GPU pool and co-scheduled with PD-disaggregated serving without violating SLOs across varied retrieval workloads.
- **Mechanism:** A dedicated GPU vector-search pool matched to PD disaggregation, with continuous batching for vector search under heterogeneous queries and stage-aware scheduling that preempts vector-search requests between decode and prefill tasks.
- **Evidence:** not stated in abstract
- **Boundary:** not stated in abstract
- **Stealable move:** When one pipeline stage is a different kind of work from the rest, give it its own homogeneous pool and let a stage-aware scheduler preempt it against the stages it competes with, rather than nesting it inside the main pipeline.
- **Pitch:** Consolidating all retrieval into a single shared vector-search pool that works in match with PD-disaggregated serving.

### 3. Efficient LLM Serving for Agentic Workflows: A Data Systems Perspective (arXiv 2026)
- **Problem:** Agentic workflows are chains of interdependent LLM calls with extensive redundancy from overlapping prompts and intermediate results, yet serving systems optimize each call in isolation and overlook cross-call dependencies.
- **Assumption:** An agentic workload can be expressed as a query plan over LLM invocations treated as first-class operators, so classical query optimization (reuse, caching) applies.
- **Mechanism:** Models agentic workloads as query plans, treats LLM invocations as operators, and integrates proactive caching with cache-aware scheduling to maximize reuse across prompts, KV states, and whole workflows (Helium).
- **Evidence:** Evaluation on various workloads: up to 1.56x speedup over state-of-the-art agent serving systems; no further quantitative detail in abstract.
- **Boundary:** not stated in abstract
- **Stealable move:** Lift the unit of optimization from the single request to the dependency graph of calls, and treat repeated sub-results as materialized views to be cached proactively and scheduled around.
- **Pitch:** End-to-end optimization across whole workflows, not individual calls, is what makes scalable and efficient LLM agents.

### 4. Cross-Model Autoscaling for Shared LLM Serving (arXiv 2026)
- **Problem:** In shared MaaS clusters co-hosted models compete for a fixed GPU budget, but autoscalers are model-local — their signals expose local activity or delayed latency and say nothing about how shared capacity should be split.
- **Assumption:** A calibrated, demand-normalized estimate of effective token service per active or queued request yields a health score comparable across heterogeneous models and SLO classes.
- **Mechanism:** Token Service Share (TSS) guides bounded receiver-donor capacity movement under a fixed GPU budget, separating fast rescue from slower rebalancing and incrementally reallocating replicas toward models with the largest deficits; built on a Kubernetes hot-switch stack without touching the inference scheduler.
- **Evidence:** Real system over seven LLM serving traces: P95 end-to-end latency down 11.9-79.0% and P99 down 12.5-72.6% vs a KV-cache-based reactive autoscaler on the same runtime; on production-derived conversation/code traces 50.8/63.7% and 79.0/72.6% (abstract truncated).
- **Boundary:** not stated in abstract
- **Stealable move:** Replace per-component local health signals with one demand-normalized, cross-comparable score, then move capacity between a bounded donor and receiver instead of resizing each component independently.
- **Pitch:** A single calibrated token-service-share signal lets a control plane rebalance shared GPU capacity across models that each carry their own latency SLO.

### 5. Astrolabe: Balancing Load in LLM Serving with Randomized Prediction-Guided Scheduling (ATC 2025)
- **Problem:** Load imbalance across instances is normally corrected by migration, but KV-cache transfers add substantial overhead and network contention under high load.
- **Assumption:** Response length and per-instance latency can be predicted cheaply enough at dispatch time to steer each request without any corrective movement.
- **Mechanism:** One-shot randomized dispatch combining response-length estimation, per-instance simulation-based latency prediction, and a power-of-two-choices policy.
- **Evidence:** Real system, default Llama-2-7B/ShareGPT: 31.6 vs 31.5 QPS SLO capacity, mean TTFT -8 to 36%, P99 TTFT -16 to 77%, mean E2E -up to 5.6%, ~6x fewer preemptions; +6% SLO capacity on Qwen2-7B, +7.1% under tight batching, 6-9% E2E reduction under bursts, ~2.8x lower per-predictor CPU vs full fanout, and up to 2.6x Llumnix throughput with migration enabled on A100.
- **Boundary:** not stated in abstract
- **Stealable move:** Avoid state migration entirely by making the placement decision well-informed at arrival — predict the outcome for each candidate and randomize over two — so no corrective movement is ever needed.
- **Pitch:** Randomized prediction-guided one-shot dispatch balances load while avoiding request herding and the cost of migration.

### 6. FineServe: A Fine-Grained Dataset and Characterization of Global LLM Serving Workloads (arXiv 2026)
- **Problem:** Serving studies rely on proxy traces or coarse characterizations that fail to capture the heterogeneity of modern multi-model LLM platforms.
- **Assumption:** One in-the-wild multi-model trace from a commercial marketplace is representative enough to characterize real serving dynamics and to ground a generator.
- **Mechanism:** Collects an in-the-wild multi-model serving dataset, analyzes arrival dynamics and token behavior across architectures, scales and task intents, then builds a generator that composes fine-grained model-aware workloads into configurable mixtures.
- **Evidence:** Trace dataset plus analysis: an in-the-wild, multi-model trace from a global commercial marketplace, publicly released; no performance numbers or fluctuation magnitudes stated in abstract.
- **Boundary:** not stated in abstract
- **Stealable move:** Characterize workloads per-model rather than in aggregate, and ship the benchmark generator as a composition of model-aware components so mixtures can be reconfigured without collecting new traces.
- **Pitch:** Fine-grained, model-aware workload dynamics are the realistic foundation missing from evaluation of routing, scheduling and capacity planning.

### 7. PrefixBench-H100: Characterizing Prefix Reuse and Time-to-First-Token in H100 LLM Serving (arXiv 2026)
- **Problem:** Runtimes already reuse KV state for repeated prefixes, but it is unclear when reuse materially helps on contemporary accelerators and when scheduling, cache granularity, concurrency or memory pressure cap the benefit.
- **Assumption:** A controlled, reproducible sweep over workload and cache parameters on one accelerator can delimit the operating envelope of prefix reuse across runtimes.
- **Mechanism:** A benchmark and measurement framework mixing controlled synthetic traces with chat-style and retrieval-style workloads, varying shared-prefix length, suffix diversity, arrival pattern, concurrency, output length and cache configuration across two serving runtimes.
- **Evidence:** Benchmark/measurement study on a single H100 with two runtimes, collecting TTFT, inter-token latency, E2E latency, throughput, cache-hit statistics, GPU memory and profiling traces; no numbers stated, and the claim that cache effectiveness is largely insensitive to concurrency and output (abstract truncated).
- **Boundary:** Scope is one H100 and two runtimes, and the authors state the goal is not a new caching algorithm; reuse benefits are admitted to be limited by scheduling, cache granularity, concurrency, or memory pressure.
- **Stealable move:** Before optimizing a mechanism, publish its envelope: sweep the parameters the benefit depends on and report the regime where the benefit survives and the regime where it collapses.
- **Pitch:** Expose the practical operating envelope of prefix reuse for H100-class serving rather than propose yet another caching algorithm.

### 8. BOute: Cost-Efficient LLM Serving with Heterogeneous LLMs and GPUs via Multi-Objective Bayesian Optimization (MLSys 2026)
- **Problem:** Cost-efficient serving needs both routing easy queries to cheaper models and deploying across heterogeneous GPUs, but routing, deployment configuration, and their co-optimization must all hold latency and quality requirements at once.
- **Assumption:** The joint space of routing policies and deployment configurations is smooth enough for a multi-objective Bayesian optimizer to find near-optimal points without exhaustively measuring every configuration.
- **Mechanism:** A multi-objective Bayesian optimization (MOBO) framework that co-optimizes the query routing strategy and the model deployment (resource allocation and parallelism across heterogeneous GPUs) while guaranteeing response quality.
- **Evidence:** Up to 157% and 59% on average better than state-of-the-art LLM serving systems under identical cost budgets and quality requirements, or serving costs reduced by 15%-61% (abstract truncated).
- **Boundary:** not stated in abstract
- **Stealable move:** When an algorithmic policy and a physical placement are constrained by the same budget, search them together with a sample-efficient multi-objective optimizer instead of tuning each layer separately.
- **Pitch:** Co-optimizing routing and heterogeneous-GPU deployment maximizes cost-efficiency while guaranteeing response quality.

### 9. LAPS: A Length-Aware-Prefill LLM Serving System (arXiv 2026)
- **Problem:** Prefill-decode disaggregation improves throughput but keeps unified scheduling that cannot adapt to prompt-length heterogeneity, where different lengths hit distinct bottlenecks.
- **Assumption:** Prompt length is a sufficient basis for partitioning, so long-prefill multi-turn requests and short-prefill requests can be scheduled apart without giving up throughput.
- **Mechanism:** Disaggregates multi-turn long-prefill from short-prefill requests, with a length-aware smart batching mechanism, a dual-queue design supporting temporal disaggregation on one prefill instance or spatial disaggregation across instances, plus a batch waiting window and CUDA Graph-based clustering for short batches.
- **Evidence:** Real multi-turn workloads: prefill latency down over 30% vs vanilla SGLang under PD disaggregation, SLO violations down 28% in multi-instance data-parallel deployments, a further 12% fewer SLO violations than the SGLang load-balancing router in multi-GPU settings, and 35% throughput improvement serving Qwen2.5-32B on a prefill instance under high concurrency.
- **Boundary:** not stated in abstract
- **Stealable move:** Partition requests by the trait that predicts which resource they stress, then give each partition its own queue and batching discipline instead of one policy for all.
- **Pitch:** Prompt-length heterogeneity deserves its own scheduling policy rather than a unified one.

### 10. Characterizing High Bandwidth Flash for LLM Serving (arXiv 2026)
- **Problem:** Weights and KV caches need ever more capacity and bandwidth, and agentic workloads compound the pressure by repeatedly re-reading growing contexts whose KV state is worth retaining.
- **Assumption:** Flash can serve as a capacity tier if access costs and write endurance are handled by data placement and cache-aware buffering rather than treated as blockers.
- **Mechanism:** An HBM-HBF-host hierarchical storage system with buffered cache-aware scheduling, analyzed with trace-driven simulation for performance, energy and HBF write lifetime.
- **Evidence:** Trace-driven simulation: fastest HBF-augmented systems cut completion time by 36.1-87.7% vs HBM-only, modeled energy savings reach 59.1%, and buffered cache-aware scheduling extends estimated HBF write lifetime from 1.21 to 14.82 years.
- **Boundary:** The abstract admits HBF access costs and limited write endurance complicate its use, and that benefits depend on the workload and on weight placement.
- **Stealable move:** When adding a cheap-but-slow tier, make write endurance a first-class metric alongside latency and energy, and shape the write schedule to the tier's lifetime budget.
- **Pitch:** HBF can expand accelerator memory for agentic serving, but only if data placement and scheduling are coordinated to sustain a practical write lifetime.

### 11. LLMServingSim 2.0: A Unified Simulator for Heterogeneous and Disaggregated LLM Serving Infrastructure (arXiv 2026)
- **Problem:** Performance is now set by the runtime interaction of heterogeneous hardware and disaggregated software — scheduling, data movement, interconnect — and existing simulators cannot model both within one runtime-driven framework.
- **Assumption:** Embedding serving decisions and hardware behavior in a single runtime loop is enough to reproduce interaction effects on batching, routing, offloading, memory and power with low error.
- **Mechanism:** A system-level simulator that puts serving decisions and hardware behavior into one runtime loop, with profile-based modeling for extensible integration of emerging accelerators and memory systems.
- **Evidence:** Validated against real deployments, reproducing key performance, memory and power metrics with an average error of 0.95% (abstract truncated).
- **Boundary:** not stated in abstract
- **Stealable move:** Put the policy and the hardware model inside the same simulation loop, so the policy reacts to modeled system state instead of being replayed against a fixed trace.
- **Pitch:** Runtime-driven hardware-software interactions in heterogeneous, disaggregated serving should be explicit and analyzable in one framework.

### 12. ThunderServe: High-performance and Cost-efficient LLM Serving in Cloud Environments (MLSys 2025)
- **Problem:** Cloud environments offer diverse GPU types but also diverse network conditions, which makes high-performance serving hard, while in-house homogeneous clusters are unavailable because of the GPU shortage.
- **Assumption:** A deployment plan can be computed for a given heterogeneous resource and bandwidth profile, and only lightweight re-scheduling is needed when online conditions shift.
- **Mechanism:** A scheduling algorithm that optimizes the deployment plan against heterogeneous resource and network bandwidth conditions, paired with a lightweight re-scheduling mechanism that adapts to node failures and workload shifts without restarting ongoing services.
- **Evidence:** Empirical results in heterogeneous cloud and homogeneous in-house environments: up to 2.1x (average 1.7x) throughput and up to 2.5x (average 1.5x) reduction in latency deadlines vs state-of-the-art systems at the same price budget.
- **Boundary:** not stated in abstract
- **Stealable move:** Split the expensive global decision (a plan) from the cheap adaptive one (a re-schedule), so reacting to failures or workload shifts never costs a restart of live service.
- **Pitch:** Opting for heterogeneous cloud services is more cost-efficient than homogeneous in-house clusters if the deployment plan and re-scheduling are designed for it.

### 13. Efficient LLM Serving on Hybrid Real-time and Best-effort Requests (arXiv 2025)
- **Problem:** Services concurrently carry latency-critical interactive requests and throughput-oriented batch requests, and dedicating machines to each type simplifies scheduling at the cost of poor utilization.
- **Assumption:** Latency-critical and best-effort requests can share KV memory and machines under adaptive priorities without giving up best-effort throughput.
- **Mechanism:** BROS formulates hybrid RT/BE scheduling and solves it with a dynamic priority-based algorithm, plus a bidirectional KV cache management mechanism that lets RT requests share KV memory with BE requests.
- **Evidence:** Experiments: RT request latency reduced up to 74.20%, fine-grained SLO attainment up to 36.38x, with negligible "through..." (abstract truncated).
- **Boundary:** not stated in abstract
- **Stealable move:** Make memory the shared currency between two request classes — let the latency-critical class borrow the throughput class's cached state — so priority scheduling is never blocked by a capacity shortage.
- **Pitch:** Collocating RT and BE requests under dynamic priorities and shared KV memory beats dedicating machines to each.

### 14. DualMap: Enabling Both Cache Affinity and Load Balancing for Distributed LLM Serving (arXiv 2026)
- **Problem:** Cache-affinity routing and load balancing pull against each other, and existing schedulers work in one mapping space, applying one policy to a subset of requests and the other to the rest.
- **Assumption:** Two independent hash mappings of the same prompt, plus a choice between them based on live state, is enough to obtain affinity and dispersion simultaneously.
- **Mechanism:** Maps each request to two candidate instances via two independent hash functions and selects the better from current system state, adding SLO-aware routing, hotspot-aware rebalancing that migrates requests off overloaded instances, and lightweight dual- (abstract truncated).
- **Evidence:** not stated in abstract (abstract truncated before results)
- **Boundary:** The abstract concedes plain dual mapping is not robust by itself — extra techniques are needed for dynamic and skewed real-world workloads.
- **Stealable move:** Instead of choosing between two conflicting objectives, generate two cheap candidates and select between them using live state, so both objectives are served per decision.
- **Pitch:** Two hash mappings plus a state-aware choice deliver cache affinity and load balancing from one unified scheduler.

### 15. EcoServe: Enabling Cost-effective LLM Serving with Proactive Intra- and Inter-Instance Orchestration (arXiv 2025)
- **Problem:** Non-disaggregated serving suffers prefill-decode interference while fully disaggregated serving relies on high-performance interconnects, so neither is cost-effective on commodity networks.
- **Assumption:** Temporal disaggregation within an instance plus rolling activation across instances recovers most of full disaggregation's benefit without needing a fast interconnect.
- **Mechanism:** A partially disaggregated strategy with temporal disaggregation and rolling activation, grouping instances into a "macro instance", plus an adaptive scheduling algorithm for routing within it and a mitosis scaling approach for fine-grained capacity scaling.
- **Evidence:** Real production-level cluster, 32 NVIDIA L20 GPUs over commodity Ethernet, 30B and 70B models: average goodput improvements of 82.49%, 86.17%, 122.76% and 126.96% over four (abstract truncated).
- **Boundary:** not stated in abstract
- **Stealable move:** When full separation is too expensive and no separation interferes too much, separate along time inside one instance and rotate activity across instances so the specialized stage is always available.
- **Pitch:** Partial disaggregation delivers disaggregation's benefits on commodity interconnects, with goodput, load balancing, hardware cost and engineering simplicity.

### 16. PAM: Processing Across Memory Hierarchy for Efficient KV-centric LLM Serving System (arXiv 2026)
- **Problem:** KV-related operations, attention compute and cache storage, now bottleneck serving because they need both massive bandwidth and massive capacity, which no single-level memory design satisfies even with processing-in-memory.
- **Assumption:** KV access has enough inherent context locality that tokens can be spread across a memory hierarchy and attention computed piecewise across devices without losing efficiency.
- **Mechanism:** A hierarchical PIM-enabled memory design that distributes KV tokens by context locality, runs the PAMattention algorithm for fine-grained parallel attention across heterogeneous PIM devices, and adds intra-device KV mapping, an inter-device migration interface and online inter-device KV scheduling.
- **Evidence:** not stated in abstract (abstract truncated)
- **Boundary:** not stated in abstract
- **Stealable move:** Split a computation along the data's natural locality so the expensive operation runs where the data already sits, keeping only a thin migration path for rebalancing.
- **Pitch:** Coordinating heterogeneous PIM devices in a hierarchy satisfies bandwidth and capacity demands at the same time.

### 17. PALS: Power-Aware LLM Serving for Mixture-of-Experts Models (arXiv 2026)
- **Problem:** Prior serving systems optimize batching, scheduling and parallelism but treat GPU power as a static constraint rather than a controllable resource, leaving energy efficiency unclaimed.
- **Assumption:** Lightweight offline power-performance models plus feedback control can predict the effect of a power cap and batch size pair well enough to track throughput targets online.
- **Mechanism:** Treats GPU power caps as a first-class control knob and jointly optimizes them with software parameters such as batch size, using offline power-performance models and a feedback-driven controller; implemented in vLLM with no retraining or API changes.
- **Evidence:** Real system on multi-GPU setups with dense and MoE models: energy efficiency up to 26.3% higher, QoS violations reduced 4x to 7x under power constraints, and it tracks dynamic power budgets.
- **Boundary:** not stated in abstract
- **Stealable move:** Promote a constraint everyone treats as fixed into a decision variable and optimize it jointly with the software knob you were already tuning.
- **Pitch:** Power caps are a control knob, not a constraint, and co-optimizing them with batch size enables energy-proportional serving.

### 18. Autopoiesis: A Self-Evolving System Paradigm for LLM Serving Under Runtime Dynamics (arXiv 2026)
- **Problem:** Runtime trade-offs are deeply intertwined and shift continuously with workload fluctuations and elastic autoscaling, so any fixed human-engineered policy is structurally unable to stay optimal.
- **Assumption:** An LLM-driven program synthesis loop can observe live behavior and rewrite policy code quickly and safely enough to run as a continuous system component.
- **Mechanism:** An LLM-driven program synthesis workflow evolves serving policies against real-time observed dynamics and runs continuously during serving, rewriting the policy code as runtime trade-offs shift.
- **Evidence:** not stated in abstract (no quantitative results; abstract truncated)
- **Boundary:** not stated in abstract
- **Stealable move:** Make the policy itself a runtime artifact that a synthesis loop rewrites from observed behavior, instead of a configuration chosen once before deployment.
- **Pitch:** Serving policies should be living code that evolves with the system, not static artifacts designed by humans ahead of time.

### 19. C2CServe: Leveraging NVLink-C2C for Elastic Serverless LLM Serving on MIG (arXiv 2026)
- **Problem:** Serverless serving faces large catalogs and long-tail traffic, but dedicated GPUs waste scarce HBM, time-sharing puts model initialization and weight loading on the cold-start path, and each MIG slice holds too little HBM for modern weights.
- **Assumption:** On NVLink-C2C machines, host memory is fast enough that weights can reside there and stream on demand to MIG instances more cheaply than reloading them into HBM.
- **Mechanism:** Request-granularity switching of models on MIG with weights resident in CPU memory, a HybridGEMM kernel that adapts access patterns to balance HBM and C2C bandwidth via one tuning knob, and a hierarchical scheduler coordinating model placement, input chunking and kernel selection with online feedback control.
- **Evidence:** Real system on GH200: cold-start latency reduced up to 7.1x for dense and 4.6x for MoE models vs state-of-the-art serverless LLM serving systems, sustaining over 95% TTFT and TPOT attainment under C2C contention.
- **Boundary:** not stated in abstract
- **Stealable move:** Move a scarce resource's contents to an abundant tier and pay a streaming cost per request, turning a capacity problem into a bandwidth-scheduling problem that one knob can tune.
- **Pitch:** High-bandwidth CPU-GPU interconnects let MIG instances switch models across requests without reloading weights into HBM.

### 20. Injecting Adrenaline into LLM Serving: Boosting Resource Utilization and Throughput via Attention Disaggregation (arXiv 2025)
- **Problem:** Prefill-decode disaggregation removes interference but leaves compute-intensive prefill instances with idle memory and memory-intensive decode instances with idle compute.
- **Assumption:** Decode-phase attention is memory-bound, so part of it can be executed on prefill instances profitably without breaking the decode loop's latency.
- **Mechanism:** Adrenaline disaggregates part of the decoding-phase attention computation and offloads it to prefill instances, using low-latency decoding synchronization, resource-efficient prefill colocation, and load-aware offloading scheduling.
- **Evidence:** Experimental results show 2.28x higher memory capacit... (abstract truncated; no further numbers available).
- **Boundary:** not stated in abstract
- **Stealable move:** After separating two phases, move the memory-bound phase's most transferable work back onto the now-idle compute of the other side — rebalance by work type, not by request.
- **Pitch:** Offloading part of decode attention to prefill instances turns the wasted half of each machine into useful capacity.

### 21. MuxServe: Flexible Spatial-Temporal Multiplexing for Multiple LLM Serving (arXiv 2024)
- **Problem:** Serving several LLMs as endpoints is hard because model popularity varies, so fixed allocations leave memory or compute idle depending on which endpoints are hot.
- **Assumption:** Models can be colocated by popularity to multiplex memory, while prefill and decode can be separated and colocated independently to multiplex compute.
- **Mechanism:** Formally formulates the multiplexing problem, then a placement algorithm and an adaptive batch scheduling strategy to find colocations that maximize utilization, tied together by a unified resource manager.
- **Evidence:** Up to 1.8x higher throughput, or 2.9x more requests processed within 99% SLO attainment.
- **Boundary:** not stated in abstract
- **Stealable move:** Multiplex different resources along different axes — pack by predicted popularity for memory, split by phase and pack for compute — instead of packing everything by one criterion.
- **Pitch:** Spatial-temporal multiplexing that accounts for model popularity makes multi-LLM serving efficient.

### 22. PEEK: Predictive Queue-Informed KV Cache Management for LLM Serving (arXiv 2026)
- **Problem:** Prefix sharing is present in the waiting queue but engines never surface it, so admission order and eviction are decided without knowing which queued requests share prefixes.
- **Assumption:** An incremental radix tree over the pending queue, matched against the engine's prefix cache per request, is cheap enough to run at admission and exposes exploitable structure.
- **Mechanism:** Maintains an incremental radix tree over the waiting queue, uses a dual-walk to compute longest-prefix-match for each waiting request, admits cluster pioneers first so siblings inherit the freshly cached prefix, protects ancestral blocks through a co-designed eviction hook, and bounds starvation with a multi-lane stride scheduler.
- **Evidence:** Real system: SGLang and vLLM across five workloads up to 4xH100 (DP=2 over TP=2), up to 3.0x/2.6x cache hit, 7.9x/7.1x TTFT, 6.7x/5.5x E2E and 3.6x/4.5x throughput over each engine's strongest stock baseline, matching baselines within noise where no prefix structure exists.
- **Boundary:** Gains are explicitly conditional on exploitable prefix structure; on workloads without it the system is only within noise of baselines.
- **Stealable move:** Look ahead into the pending queue rather than only the cache, and order admission so one item's work is reused by the items behind it, while protecting that shared work from eviction.
- **Pitch:** The waiting queue already contains the reuse structure, and admitting pioneers first makes the cache self-reinforcing.

### 23. A Shape-Adaptive Architecture with Disaggregated Quantization for Efficient LLM Serving (arXiv 2026)
- **Problem:** Prefill is dominated by large GEMMs and decode by small GEMVs, and continuous batching with prefill-decode disaggregation makes shapes dynamic, leaving fixed accelerators misaligned with system behavior.
- **Assumption:** The compute tile a systolic array executes can be reshaped at runtime along all three GEMM dimensions, and it pays to choose that shape per batch.
- **Mechanism:** DynaCore reshapes the Minimum Efficient Unit spatially (asymmetric width/height trade) and temporally (Split-K folded through the existing interconnect), adds disaggregated quantization — dual-side for prefill, weight-only for decode — with a mixed-precision inner-product datapath, and selects an MEU per batch at runtime.
- **Evidence:** Architecture evaluation with real-world serving traces: substantially reduces service-level latency over quantization and reconfigurable accelerators, im... (abstract truncated; no numbers available).
- **Boundary:** not stated in abstract
- **Stealable move:** Let the hardware's working tile size be a scheduling decision made per batch, so one unit serves both the big-matrix phase and the skinny-vector phase well.
- **Pitch:** Reshaping the compute tile along all three GEMM dimensions, plus phase-matched quantization, aligns the accelerator with how serving actually behaves.

### 24. ENOVA: Autoscaling towards Cost-effective and Stable Serverless LLM Serving (arXiv 2024)
- **Problem:** Multi-GPU serverless clusters host diverse co-located applications whose diversity leads to low service quality and low GPU utilization, while autoscaling must decide both configuration and placement.
- **Assumption:** Deconstructing the LLM service execution process yields a configuration recommendation that transfers to any GPU cluster and is accurate enough to autoscale on.
- **Mechanism:** Decomposes the execution process into a configuration recommendation module for automatic deployment on any GPU cluster, a performance detection module for autoscaling, and a deployment execution engine for multi-GPU cluster scheduling.
- **Evidence:** Experiments show it significantly outperforms other state-of-the-art methods; no numbers stated in abstract.
- **Boundary:** not stated in abstract
- **Stealable move:** Split autoscaling into an offline configuration advisor and an online performance detector, so the same system ports to a new cluster shape by re-running recommendation rather than re-tuning policy.
- **Pitch:** A recommend-detect-execute stack delivers stable, cost-effective serverless LLM serving on multi-GPU clusters.

### 25. NELSSA: A GPU-PNM Heterogeneous System for Mixed-Length LLM Serving via Length-based Request Placement (arXiv 2026)
- **Problem:** Workloads mix contexts from a few hundred to hundreds of thousands of tokens, but GPU-centric serving depends on large memory-constrained batches that fit short requests poorly.
- **Assumption:** Length at admission predicts which tier fits, and a long-context request can migrate across tiers as its context grows without recomputation.
- **Mechanism:** Routes short-context requests to GPUs and long-context requests to a PNM tier by length-based placement, with runtime migration that avoids recomputation, device-level sparse attention on PNM, GPU decode kernels, and a host-side runtime orchestrating scheduling and cross-tier memory movement over CXL with RPC and RDMA.
- **Evidence:** End-to-end prototype across mixed-length workloads: decode throughput up to 5.5x higher in tokens/sec and P99 latency up to 15x lower than GPU-only baselines.
- **Boundary:** not stated in abstract
- **Stealable move:** Route by the workload trait that determines resource fit, and make the tier boundary crossable mid-request so placement never forces recomputation.
- **Pitch:** GPU-PNM tiering enabled by CXL-based disaggregation is a promising paradigm for scalable, flexible infrastructures under evolving workloads.
