> 中文版: [cards_batch1.zh.md](cards_batch1.zh.md)

### 1. Taming Throughput-Latency Tradeoff in LLM Inference with Sarathi-Serve (OSDI 2024)
- **Problem:** Batching interleaves prefill and decode, so high throughput and low latency conflict.
- **Assumption:** Equal-sized prefill chunks let new requests join without pausing decodes; uniform batches shrink pipeline bubbles.
- **Mechanism:** Chunked-prefills plus stall-free scheduling that admits requests mid-batch.
- **Evidence:** type: real system; models and hardware under tail-latency constraints; Mistral-7B on A100 (abstract truncated).
- **Boundary:** not stated in abstract
- **Stealable move:** Reframe latency as batch uniformity: equalize iteration durations instead of delaying a phase.
- **Pitch:** Chunk prefills so decodes never stall, winning throughput from large batches without tail-latency cost.

### 2. WLB-LLM: Workload-Balanced 4D Parallelism for Large Language Model Training (OSDI 2025)
- **Problem:** Workload imbalance in LLM training, localized at the pipeline and context parallelism levels.
- **Assumption:** Imbalance has two separable sources: variant document lengths across micro-batches, and uneven per-document work inside a context-parallel group.
- **Mechanism:** Workload-aware variable-length document packing for pipeline parallelism; fine-grained per-document sharding for context parallelism.
- **Evidence:** type: real system; experiments at different model scales; average 1.23x speedup in their internal training framework.
- **Boundary:** not stated in abstract
- **Stealable move:** Name the parallelism level where imbalance lives, then pack work units by measured workload rather than by count.
- **Pitch:** Balance 4D-parallel training by packing documents and sharding them per-document, not per-batch.

### 3. Understanding Stragglers in Large Model Training Using What-if Analysis (OSDI 2025)
- **Problem:** Thousand-GPU training stalls on few slow workers, and stragglers are not always hardware failures.
- **Assumption:** Contrasting the real trace with a simulated straggler-free run isolates their true cost.
- **Mechanism:** Five-month cluster trace plus what-if simulation answering frequency/impact, temporal-spatial patterns, and root causes.
- **Evidence:** type: trace plus simulation; five-month ByteDance LLM training cluster trace.
- **Boundary:** not stated in abstract
- **Stealable move:** Use the counterfactual "what if X were absent" simulation as the measurement instrument, not just a diagnosis.
- **Pitch:** Simulate a straggler-free world to price stragglers exactly, then explain where and why they appear.

### 4. Parrot: Efficient Serving of LLM-based Applications with Semantic Variable (OSDI 2024)
- **Problem:** Request-level public APIs force services to optimize requests blindly, losing application-level structure.
- **Assumption:** If clients may annotate prompt variables, the service can recover cross-request data dependencies.
- **Mechanism:** Semantic Variable abstraction annotating input/output prompt variables, forming a data pipeline; the service then runs conventional dataflow analysis.
- **Evidence:** type: real system; extensive evaluations on popular, practical LLM application use cases; up to order-of-magnitude improvement.
- **Boundary:** not stated in abstract
- **Stealable move:** Expose one declarative client-side annotation so classic compiler analysis becomes applicable to a new workload.
- **Pitch:** Let clients name prompt variables, then optimize whole application dataflows instead of isolated requests.

### 5. WaferLLM: Large Language Model Inference at Wafer Scale (OSDI 2025)
- **Problem:** LLM inference systems tuned for shared-memory GPUs underuse wafer-scale mesh accelerators.
- **Assumption:** A dedicated cost model, PLMR, captures wafer hardware traits well enough to drive scheduling.
- **Mechanism:** PLMR-guided wafer-scale parallelism, plus MeshGEMM and MeshGEMV for mesh architectures.
- **Evidence:** type: real system on Cerebras WSE2; versus A100, SGLang, vLLM; up to 200x utilization, 606x GEMV, 10-20x inference.
- **Boundary:** not stated in abstract
- **Stealable move:** Name the cost model and let it generate the schedule; a short model name makes the hardware assumption citable.
- **Pitch:** Give wafer-scale hardware its own cost model and kernels, then show GPU-era systems leave 200x on the table.

### 6. ServerlessLLM: Low-Latency Serverless Inference for Large Language Models (OSDI 2024)
- **Problem:** Serverless LLM cold starts are dominated by fetching large checkpoints from remote storage.
- **Assumption:** Near-GPU storage and memory hold checkpoints locally, so remote downloads are avoidable.
- **Mechanism:** Loading-optimized checkpoint format with multi-tier loading; live inference migration; scheduling by checkpoint locality.
- **Evidence:** type: real system; microbenchmarks and real-world scenarios; 10-200x latency reduction versus state-of-the-art serverless systems.
- **Boundary:** not stated in abstract
- **Stealable move:** Change the persisted format to serve the loader, rather than optimizing the loader around a fixed format.
- **Pitch:** Store LLM checkpoints in a loader-friendly format locally, cutting serverless cold starts by up to 200x.

### 7. DistServe: Disaggregating Prefill and Decoding for Goodput-optimized Large Language Model Serving (OSDI 2024)
- **Problem:** Colocating prefill and decode causes interference and couples both phases' resource and parallelism plans.
- **Assumption:** TTFT and TPOT are separate application constraints, so each phase merits its own plan and its own GPUs.
- **Mechanism:** Phase-disaggregated placement; per-phase co-optimization of resources and parallelism; bandwidth-aware placement to limit migration communication.
- **Evidence:** type: real system; various LLMs, applications, latency requirements; 7.4x more requests or 12.6x (abstract truncated).
- **Boundary:** not stated in abstract
- **Stealable move:** Replace one coupled objective with two separately met latency constraints, then maximize goodput under both.
- **Pitch:** Separate prefill GPUs from decode GPUs so each latency target is met without over-provisioning.

### 8. InfiniGen: Efficient Generative Inference of Large Language Models with Dynamic KV Cache Management (OSDI 2024)
- **Problem:** KV cache grows with sequence length and batch size, straining offloading-based serving.
- **Assumption:** Important tokens for the next attention layer can be speculated cheaply from current-layer inputs plus part of the next layer's query weights and key cache.
- **Mechanism:** A minimal rehearsal speculates important tokens; only those KV entries are prefetched from host memory.
- **Evidence:** type: real system; several representative LLMs; up to 3.00x over prior management, better accuracy.
- **Boundary:** not stated in abstract
- **Stealable move:** Turn a bandwidth problem into a prediction problem: speculate the reuse set, then fetch only it.
- **Pitch:** Speculate which KV entries matter, prefetch only them, beating full offloading on speed and accuracy.

### 9. JITServe: SLO-aware LLM Serving with Imprecise Request Information (NSDI 2025)
- **Problem:** SLOs vary widely while request information is imprecise, so schedulers optimize aggregates instead of application needs.
- **Assumption:** Imprecise estimates can be refined during generation, so initial conservatism can be progressively relaxed.
- **Mechanism:** Schedule on imprecise estimates and refine them; grouped margin goodput maximization allocates just-enough bandwidth just-in-time; batch composition with provable guarantees.
- **Evidence:** type: real system; realistic chat, deep-research, and agentic-pipeline workloads.
- **Boundary:** not stated in abstract
- **Stealable move:** Treat estimation error as a budget you spend down over time, not a fixed worst-case bound.
- **Pitch:** Start conservative under imprecise request info, then relax guarantees as generation reveals the truth.

### 10. ForestColl: Throughput-Optimal Collective Communications on Heterogeneous Network Fabrics (NSDI 2024)
- **Problem:** Collectives bottleneck large models, and schedules are hard to design across heterogeneous fabrics.
- **Assumption:** Broadcast/aggregation spanning trees can be throughput-optimal for any topology.
- **Mechanism:** Polynomial-time, scalable generation of spanning-tree schedules covering switching fabrics and direct accelerator links.
- **Evidence:** type: real system; AMD MI250 and NVIDIA DGX A100/H100 clusters; beats vendor libraries and prior generators.
- **Boundary:** not stated in abstract
- **Stealable move:** Claim optimality for a topology class rather than tuning one fabric, and sell polynomial generation time as scalability.
- **Pitch:** Generate provably optimal collective schedules for arbitrary fabrics, replacing vendor libraries built for one topology.

### 11. PlanetServe: A Decentralized, Scalable, and Privacy-Preserving Overlay for Democratizing Large Language Model Serving (NSDI 2025)
- **Problem:** Serving scalability blocks small organizations and individuals from deploying LLM innovations.
- **Assumption:** Decentralized contributor nodes in a peer-to-peer overlay can supply serving capacity.
- **Mechanism:** GenTorrent overlay addressing four problems: overlay organization, LLM communication privacy, resource-efficient forwarding, and serving-quality verification.
- **Evidence:** type: real system prototype on decentralized nodes; over 50% latency reduction versus no-overlay-forwarding baseline.
- **Boundary:** not stated in abstract
- **Stealable move:** Enumerate N sub-problems up front and ship one system as their first systematic study, claiming a space.
- **Pitch:** Pool decentralized nodes into a private overlay, trading small security overhead for halved serving latency.

### 12. ServeGen: Workload Characterization and Generation of Large Language Model Serving in Production (NSDI 2025)
- **Problem:** Real LLM serving workloads are poorly understood; prior analyses are too narrow in scale and scope.
- **Assumption:** Production workloads are best synthesized by composing behavior per client.
- **Mechanism:** In-depth characterization of a worldwide cloud service covering LLM, multimodal, and reasoning models, then per-client workload generation.
- **Evidence:** type: production trace; cloud inference service; a production use case avoids 50% under-provisioning.
- **Boundary:** not stated in abstract
- **Stealable move:** Make the generator the deliverable, so the trace study ships a reusable benchmark rather than a findings list.
- **Pitch:** Characterize production LLM serving per client, then generate realistic workloads that stop under-provisioning by half.

### 13. Cortex: Achieving Low-Latency, Cost-Efficient Remote Data Access For LLM via Semantic-Aware Knowledge Caching (NSDI 2025)
- **Problem:** Agents query remote knowledge repeatedly; exact-match caches miss semantically equivalent reuse.
- **Assumption:** Embedding similarity plus a lightweight LLM judge is a safe cache-hit test.
- **Mechanism:** Semantic Element (embedding plus latency, cost, staticity metadata) and Seri two-stage retrieval; semantic-aware hit definition, cost-aware eviction, proactive prefetch; judger co-located with the main LLM.
- **Evidence:** type: real system; representative search workloads; up to 3.6x throughput with correctness preserved.
- **Boundary:** not stated in abstract
- **Stealable move:** Attach performance metadata to cache entries so eviction and prefetch use cost and staticity, not just recency.
- **Pitch:** Redefine cache hits semantically, verify them with a small judge, and cut cross-region agent latency.

### 14. MegaScale: Scaling Large Language Model Training to More Than 10,000 GPUs (NSDI 2024)
- **Problem:** Training beyond 10,000 GPUs threatens efficiency and stability over long jobs.
- **Assumption:** Many stability failures appear only at scale, so deep observability is the lever.
- **Mechanism:** Full-stack co-design of block/optimizer, compute-communication overlap, operator optimization, data pipeline, network tuning; plus diagnosis tools for faults and stragglers.
- **Evidence:** type: real system; production deployment; 55.2% MFU training 175B on 12,288 GPUs, 1.34x over Megatron-LM.
- **Boundary:** not stated in abstract
- **Stealable move:** Make operational experience a first-class contribution: report the failures found and fixed, not only the speedup.
- **Pitch:** Co-design the whole stack and instrument it deeply to hold 55% MFU on twelve thousand GPUs.

### 15. ZipLLM: Efficient LLM Storage via Model-Aware Synergistic Data Deduplication and Compression (NSDI 2025)
- **Problem:** Model hubs store tens of petabytes, dominated by fine-tuned variants; dedup and compression are LLM-oblivious or mutually incompatible.
- **Assumption:** Fine-tuned models differ from bases in sparse structured ways, and bitwise similarity clusters model families.
- **Mechanism:** Large-scale Hugging Face characterization; BitX lossless delta compression over XORed differences; tensor-level dedup unified with compression around family clustering.
- **Evidence:** type: trace; all public Hugging Face LLM repositories; 54% storage reduction, over 20% beyond prior work.
- **Boundary:** not stated in abstract
- **Stealable move:** Number each empirical finding and cite it as the license for the corresponding system component.
- **Pitch:** Cluster model families, then dedup and delta-compress together to cut hub storage by 54%.

### 16. FlexLLM: Token-Level Co-Serving of LLM Inference and Finetuning with SLO Guarantees (NSDI 2024)
- **Problem:** Serving stacks isolate inference and finetuning on separate clusters, wasting hardware.
- **Assumption:** PEFT finetuning and inference can share one iteration at token granularity while SLOs hold.
- **Mechanism:** Static compilation (dependent parallelization, graph pruning) cutting activation memory up to 80%; token-level finetuning plus a hybrid token scheduler.
- **Evidence:** type: real system; LLaMA-3.1-8B, Qwen-2.5-14B/32B; SLO compliance to 20 req/s; 1.9-4.8x and 2.5-6.8x finetuning throughput.
- **Boundary:** PEFT-based finetuning only; not stated in abstract otherwise.
- **Stealable move:** Report the fraction of peak progress retained under peak contention (76%), not just mean speedup.
- **Pitch:** Fuse inference and finetuning tokens in one iteration, keeping latency SLOs while tripling finetuning throughput.

### 17. HydraServe: Minimizing Cold Start Latency for Serverless LLM Serving in Public Clouds (NSDI 2025)
- **Problem:** Public clouds cannot guarantee serverless LLM performance because model size and runtime dependencies make cold starts long.
- **Assumption:** Cold start is stage-decomposable, so stages can overlap and inputs can be pre-staged.
- **Mechanism:** Proactive model distribution; overlapping cold-start stages within workers; contention-aware GPU placement; pipeline consolidation merging worker groups into endpoints.
- **Evidence:** type: real system; diverse settings; 1.7-4.7x lower cold start, 1.43-1.74x better SLO attainment.
- **Boundary:** not stated in abstract
- **Stealable move:** Decompose the latency metric into stages and claim cross-stage overlap as the mechanism, not just a faster stage.
- **Pitch:** Pre-stage models, overlap startup stages, and dodge network contention to shrink serverless cold starts several-fold.

### 18. Supercharging Packet-level Network Simulation of Large Model Training via Memoization and Fast-Forwarding (NSDI 2026)
- **Problem:** Packet-level simulation is faithful but slow; existing fixes simplify the network or cap parallel speedup.
- **Assumption:** Training traffic shows repetitive contention patterns and steady states, so redundant events can be skipped with negligible error.
- **Mechanism:** Wormhole: network partitioning, state memoization and reuse, rate-based steady-state detection, consistency-preserving fast-forwarding.
- **Evidence:** type: simulation; 744x over ns-3 (510x MoE), under 1% error; 1012x with multithreading.
- **Boundary:** Approximate; error bounded under 1%.
- **Stealable move:** Buy speed with an explicit error bound over detected steady states rather than with a simplified model.
- **Pitch:** Memoize contention and skip steady states, making packet-level training simulation three orders faster at 1% error.

### 19. Stratum: System-Hardware Co-Design with Tiered Monolithic 3D-Stackable DRAM for Efficient MoE Serving (MICRO 2025)
- **Problem:** MoE layers carry massive data volume that complicates hardware deployment.
- **Assumption:** Expert usage is predictable by topic, so placement across vertical memory tiers can follow access likelihood.
- **Mechanism:** Mono3D DRAM near-memory processing, hybrid-bonded logic and DRAM dies, silicon interposer to the GPU; vertical memory tiers assigned by access likelihood, guided by topic-based expert prediction.
- **Evidence:** type: not stated in abstract; up to 8.29x decoding throughput, 7.66x better (truncated).
- **Boundary:** not stated in abstract
- **Stealable move:** Predict the access pattern (topic to expert) and use the prediction to place data across latency tiers.
- **Pitch:** Stack DRAM in tiers, predict which experts a topic needs, and place them where latency allows.

### 20. FloatAP: Supporting High-Performance Floating-Point Arithmetic in Associative Processors (MICRO 2024)
- **Problem:** Associative processors excel at integer work but lack floating-point support needed by AI/ML and science.
- **Assumption:** Straightforward bit-serial AP arithmetic gives insufficient FP throughput, but mantissa alignment can be parallelized across bits and components.
- **Mechanism:** Bit- and component-parallel vector mantissa alignment for add and reduce; repurposed adder trees for multiply and dot product; programmable via the RISC-V V extension.
- **Evidence:** type: not stated in abstract (no evaluation numbers stated).
- **Boundary:** not stated in abstract
- **Stealable move:** Repurpose existing structures (adder trees) instead of adding units, so the gain costs no new area.
- **Pitch:** Parallelize mantissa alignment and reuse adder trees, making CAM-based associative processors fast at floating point.
