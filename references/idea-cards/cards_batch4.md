### 1. Batched in Back: Characterizing and Optimizing Offline LLM Inference in Production with ACDC (SOSP 2026)
- **Problem:** Offline inference eats up to 30% of production GPUs yet is understudied; neither online nor offline frameworks exploit its properties.
- **Assumption:** Offline workloads are inherently deterministic and throughput-oriented; online prefill leaves capacity bubbles offline work can harvest.
- **Mechanism:** Task-aware serving along resource orchestration, cache management, and execution flow; plus hybrid serving that fills prefill bubbles.
- **Evidence:** trace — 1.5M tasks / 23B requests, text and multimodal; 3-month production deployment.
- **Boundary:** not stated in abstract
- **Stealable move:** Quantify the idle fraction of the *other* workload class (38.3% prefill bubbles) as a measured opportunity before proposing the hybrid design.
- **Pitch:** Offline inference has exploitable structure; task-aware serving plus bubble harvesting lifts cost-efficiency up to 3.9x.

### 2. Oaken: Fast and Efficient LLM Serving with Online-Offline Hybrid KV Cache Quantization (ISCA 2025)
- **Problem:** Batching makes attention bandwidth-bound; HBM bandwidth costs capacity, and longer contexts inflate KV caches.
- **Assumption:** Mixed-precision KV quantization works, but online outlier detection costs too much to pay for itself.
- **Mechanism:** Algorithm-hardware co-design setting outlier thresholds offline, then applying them online (abstract truncated at this point).
- **Evidence:** not stated in abstract
- **Boundary:** not stated in abstract
- **Stealable move:** Move the expensive adaptive decision (outlier detection) off the critical path by precomputing its threshold offline, and say so explicitly as the trade.
- **Pitch:** Paying for outlier detection online negates quantized KV caching; setting thresholds offline recovers both accuracy and speed.

### 3. MagicDec: Breaking the Latency-Throughput Tradeoff for Long Context Generation with Speculative Decoding (ICLR 2024)
- **Problem:** Long-context serving needs low latency and high throughput; conventional wisdom limits speculative decoding to small batches.
- **Assumption:** The bottleneck shifts with batch size and sequence length, so drafting strategy — not acceptance rate alone — decides speedup.
- **Mechanism:** Bottleneck-shift analysis; draft model with sparse KV cache to relieve the KV bottleneck; theoretical model selecting the optimal drafting strategy.
- **Evidence:** real system — Llama3.1-8B, batch 32–256, various hardware and task types, up to 2.51x speedup.
- **Boundary:** Claim scoped to moderate-to-long sequences; not stated in abstract beyond that.
- **Stealable move:** Derive a small analytical model that picks the configuration at runtime instead of tuning one config for the average case.
- **Pitch:** Speculative decoding still wins at high batch and long context if the draft model's KV footprint is controlled.

### 4. EPIC: Efficient Position-Independent Caching for Serving Large Language Models (ICML 2024)
- **Problem:** Context caching needs exact prefix matches, so it misses few-shot and RAG cases where an immutable document follows varying prefixes.
- **Assumption:** KV vectors can be reused modularly regardless of position, provided the attention-sink effect is corrected.
- **Mechanism:** Formalizes position-independent caching; LegoLink mitigates the inappropriate attention-sink effect at each document beginning with minimal computation.
- **Evidence:** real system — experiments reporting up to 8x TTFT improvement, 7x throughput, negligible-or-no accuracy loss; datasets not stated.
- **Boundary:** not stated in abstract
- **Stealable move:** Name the accuracy artifact your relaxation introduces ("attention sink") and repair it as a named algorithm — that is the reviewable contribution.
- **Pitch:** Prefix-exact caching wastes reusable documents; fixing attention sinks makes KV reuse position-independent and 8x faster to first token.

### 5. The VLLM Safety Paradox: Dual Ease in Jailbreak Attack and Defense (NeurIPS 2024)
- **Problem:** Both jailbreaks and defenses score near-saturation on benchmarks — a "dual high performance" paradox that signals evaluation is broken.
- **Assumption:** Vision input causes the attack susceptibility; defenses reach high scores partly through over-prudence (abstaining on benign inputs).
- **Mechanism:** Attributes susceptibility to vision inputs; names over-prudence; proposes LLM-Pipeline reusing LLM guardrails as a pre-VLLM detector; shows two standard jailbreak evaluations only chance-agree.
- **Evidence:** benchmark evaluations; datasets not stated.
- **Boundary:** not stated in abstract
- **Stealable move:** Audit the metric itself — show two accepted evaluation protocols merely chance-agree — before trusting saturated numbers.
- **Pitch:** Defenses look strong because they over-refuse and because the benchmarks are unreliable; borrowed LLM guardrails fix both.

### 6. VectorLiteRAG: Latency-Aware and Fine-Grained Resource Partitioning for Efficient RAG (HPCA 2025)
- **Problem:** CPU-only vector search is slow on large high-dimensional indices, while co-locating retriever and LLM on GPU causes contention with KV cache and compute.
- **Assumption:** Jointly modeling search latency and hit-rate distributions yields an optimal CPU/GPU index partition that stabilizes batching.
- **Mechanism:** Access-pattern analysis plus performance estimation; splits the index at a modeled point; low-overhead online index update to track drift.
- **Evidence:** evaluations reported (abstract truncated); datasets not stated.
- **Boundary:** not stated in abstract
- **Stealable move:** Split one data structure across two devices at a point chosen by modeling the *distribution* of access skew, not its mean.
- **Pitch:** RAG contention is a partitioning problem: modeling latency and hit-rate skew across CPU and GPU keeps retrieval SLO-compliant.

### 7. Sutradhara: An Intelligent Orchestrator-Engine Co-design for Tool-based Agentic Inference (ASPLOS 2026)
- **Problem:** Agentic requests chain LLM calls and tools, so First-Token-Rendered latency is dominated by tool calls (30–85% at production scale).
- **Assumption:** The root cause is the black-box boundary between orchestrator and LLM engine, which blocks cross-layer optimization.
- **Mechanism:** Thin API enabling tool-aware prompt splitting to overlap tool execution with prefill, streaming tool dispatch during decode, and orchestrator-aware cache management using semantic hints.
- **Evidence:** trace — production-scale request analysis; implementation on vLLM; gain figure truncated in abstract.
- **Boundary:** not stated in abstract
- **Stealable move:** Measure where the end-to-end latency actually goes (tool time share) before optimizing the LLM engine everyone else optimizes.
- **Pitch:** Agentic latency lives in tool calls and broken cache reuse; co-designing orchestrator and engine recovers both.

### 8. MoESD: Unveil Speculative Decoding's Potential for Accelerating Sparse MoE (NeurIPS 2025)
- **Problem:** Speculative decoding is believed efficient only for dense models, leaving MoE serving unoptimized.
- **Assumption:** At medium batch sizes MoE benefits more from SD than dense models, and the benefit window widens as MoE gets sparser.
- **Mechanism:** Theoretical modeling of the tradeoff; introduces "target efficiency" to capture workload and architecture effects that acceptance rate hides.
- **Evidence:** real system — experiments on different GPUs, up to 2.29x for Qwen2-57B-A14B at medium batch; theory validated.
- **Boundary:** not stated in abstract
- **Stealable move:** Introduce a metric that exposes what the field's favorite metric (acceptance rate) cannot explain.
- **Pitch:** Sparse MoE gains more from speculative decoding than dense models, and the right batch window widens with sparsity.

### 9. Symbiotic MLLM Serving: Dynamically Balancing Parallelism Across GPUs and Resources Within GPUs (ISCA 2026)
- **Problem:** MLLM stacks fix encoder/decoder parallelism and GPU allocation ahead of time, ignoring that encoder is small but input-dependent and compute-heavy.
- **Assumption:** Encoder and decoder are complementary at stage and kernel level, so work-conserving sharing plus runtime re-planning beats static placement.
- **Mechanism:** Intra-GPU engine shares SM and HBM between compute-bound encoder kernels and memory-bound decoder kernels; inter-GPU engine picks data/tensor parallelism at runtime via a Performance Atlas, switching at near-zero cost.
- **Evidence:** real system — three state-of-the-art MLLMs vs strong baselines; up to 5.1x mean TTFT, 3.0x TPOT.
- **Boundary:** not stated in abstract
- **Stealable move:** Replace an ahead-of-time parallelism decision with a lookup table (Atlas) of measured plans indexed by runtime input features.
- **Pitch:** Encoder and decoder have opposite bottlenecks; sharing a GPU work-conservingly and re-planning per batch beats static placement.

### 10. DynaPipe: Dynamic Layer Redistribution for Efficient Serving of LLMs with Pipeline Parallelism (NeurIPS 2025)
- **Problem:** Even layer partitioning leaves pipeline bubbles because the tail stage also runs sampling and post-processing.
- **Assumption:** Imbalance is predictable enough to correct at runtime, if layer movement can happen without stalling.
- **Mechanism:** Dynamic layer redistribution driven by real-time execution-latency prediction, plus an asynchronous KV cache migration coordinator for non-blocking moves.
- **Evidence:** real system — representative LLMs, 8%–41% lower average end-to-end latency vs SOTA pipeline-parallel systems.
- **Boundary:** not stated in abstract
- **Stealable move:** Price the "extra work" every stage does beyond the modeled op (sampling in the last stage) instead of assuming uniform cost.
- **Pitch:** Pipeline bubbles come from unpaid tail-stage work; predicting latency and moving layers asynchronously closes them.

### 11. SERE: Similarity-based Expert Re-routing for Efficient Batch Decoding in MoE Models (ICLR 2026)
- **Problem:** Batch decoding in MoE activates too many experts, slowing the memory-bound decode stage.
- **Assumption:** Experts chosen by different tokens in a batch are redundant enough to be merged by similarity without losing capability.
- **Mechanism:** Re-routes tokens from secondary experts to the most similar primary expert; uses similarity patterns to preserve critical experts; custom CUDA kernel, one-line change in vLLM.
- **Evidence:** real system — complex reasoning benchmarks, up to 2.0x speedup with minimal quality loss.
- **Boundary:** Avoids static pruning or merging; skipping is dynamic and batch-level.
- **Stealable move:** Ship the optimization as a one-line drop-in for an existing serving engine; adoption cost becomes part of the argument.
- **Pitch:** Batch-level expert redundancy, not per-token routing, is the lever; similarity-based re-routing doubles MoE decode speed.

### 12. DynamoLLM: Designing LLM Inference Clusters for Performance and Energy Efficiency (HPCA 2024)
- **Problem:** SLO-bound LLM inference on power-hungry GPUs wastes energy and emits carbon.
- **Assumption:** Heterogeneous compute properties plus workload fluctuation create a configuration space (instances, parallelism, GPU frequency) worth searching dynamically.
- **Mechanism:** Automatically and dynamically reconfigures the serving cluster to optimize energy subject to latency SLOs.
- **Evidence:** service-level evaluation — 52% energy saved, 38% operational carbon cut, 61% customer cost reduction, SLOs met.
- **Boundary:** not stated in abstract
- **Stealable move:** Report cost/carbon alongside latency for every configuration, so the efficiency claim is a three-way trade rather than a speedup.
- **Pitch:** Energy is a first-class serving objective; dynamic reconfiguration of instances, parallelism and frequency meets SLOs at half the energy.

### 13. All You Need is One: Capsule Prompt Tuning with a Single Vector (NeurIPS 2025)
- **Problem:** Prompt tuning needs grid search over prompt length and many tokens, and task-aware prompts carry no instance-aware information.
- **Assumption:** Adding instance semantics at the earliest position ("attention anchor") improves results with no extra fine-tuning.
- **Mechanism:** Capsule Prompt-Tuning fuses instance-aware and task-aware guidance into one nearly parameter-free capsule prompt.
- **Evidence:** empirical results reported (abstract truncated); datasets not stated.
- **Boundary:** not stated in abstract
- **Stealable move:** Turn an observed positional effect ("attention anchor") into a design constraint, then shrink the artifact to the smallest thing satisfying it.
- **Pitch:** One instance-aware capsule vector at the sequence head beats long searched prompts, removing prompt-length tuning entirely.

### 14. Tree of Attributes Prompt Learning for Vision-Language Models (ICLR 2024)
- **Problem:** Prompt learning appends learnable tokens only to class names, ignoring the rich context those names imply.
- **Assumption:** Structured, LLM-generated attribute hierarchies transfer better than unstructured descriptions, if aligned to the actual image.
- **Mechanism:** LLM generates a concept–attribute–description tree per category; text and vision prompts learn the hierarchy; vision-conditional pooling extracts instance-specific text features to fix misalignment.
- **Evidence:** real system — 11 datasets; zero-shot base-to-novel generalization, cross-dataset transfer, few-shot classification.
- **Boundary:** not stated in abstract
- **Stealable move:** Replace a flat list of generated hints with an explicit hierarchy, then add a conditioning module for the case where the hints are wrong for this input.
- **Pitch:** Distilling a concept–attribute–description tree from an LLM gives vision-language prompts structure, not just extra words.

### 15. AdaGen: Workload-Adaptive Cluster Scheduler for Latency-Optimal LLM Inference Serving (EuroSys 2026)
- **Problem:** Cluster schedulers only load-balance for memory, which ignores that token layout across iterations drives latency.
- **Assumption:** "Compute layout" per instance is the real decision variable, and it can be estimated without executing the request.
- **Mechanism:** Multi-step scheduling: classify by prefill/decode length, balance load, then selectively execute distributed; each step refines layouts; a simulation-based estimator replaces real execution.
- **Evidence:** trace — production workloads; up to 3.6x SLO attainment and 2x cost-efficiency, with scalability shown.
- **Boundary:** not stated in abstract
- **Stealable move:** Put a cheap simulator in the scheduler's inner loop so you can evaluate candidate layouts without paying to run them.
- **Pitch:** Load balancing misses the real knob; scheduling on predicted compute layouts lifts SLO attainment 3.6x.

### 16. Rethinking Generative Large Language Model Evaluation for Semantic Comprehension (ICML 2024)
- **Problem:** Multiple-choice QA is the default metric but does not match how models answer open-ended queries.
- **Assumption:** Pairwise competition judged by a strong model, aggregated as Elo, mirrors real usage better than accuracy on MCQA.
- **Mechanism:** RWQ-Elo rating: 24 LLMs play two-player matches judged by GPT-4, rated by Elo, over a new benchmark of real user questions.
- **Evidence:** trace/benchmark — 24 models, 11 benchmarks analyzed, new RWQ benchmark of 20,772 authentic user inquiries.
- **Boundary:** not stated in abstract
- **Stealable move:** Build the evaluation harness around real logged user queries rather than constructed test items, and report leaderboard stability as a result.
- **Pitch:** MCQA misrepresents generation quality; Elo over 20,772 real user questions gives a stabler, more faithful leaderboard.

### 17. Asynchronous Verified Semantic Caching for Tiered LLM Architectures (MLSys 2026)
- **Problem:** A single embedding-similarity threshold governs both static and dynamic cache tiers, forcing a precision/coverage tradeoff.
- **Assumption:** Near-miss matches can be adjudicated by an LLM judge off the critical path without changing serving semantics.
- **Mechanism:** Krites acts as a standard threshold policy on the critical path; when the nearest static neighbor falls just below threshold, it asynchronously asks an LLM judge, promoting approved matches into the dynamic cache.
- **Evidence:** simulation — oracle-based trace-driven, conversational and search workloads; up to 2.4x and 3.9x more curated static answers.
- **Boundary:** Trace-driven simulation with oracle judging, not a production deployment.
- **Stealable move:** Keep the fast path byte-identical to the baseline and put all improvement in an asynchronous side channel — the paper can claim zero regression by construction.
- **Pitch:** Move verification off the critical path: an async LLM judge expands safe cache reuse without changing any serving decision.

### 18. NeuStream: Bridging Deep Learning Serving and Stream Processing (EuroSys 2025)
- **Problem:** DNNs with control flow (loops, switch/merge) execute sub-models conditionally, so request batching at the whole-model level is inefficient.
- **Assumption:** Reframing inference as a dataflow of modules allows batching at module granularity and better resource allocation.
- **Mechanism:** Programming model and runtime that decomposes workflows into modules forming a stream; two-level scheduling chooses batches and resources per module under SLOs.
- **Evidence:** real system — modern DNNs including LLMs and diffusion models; goodput improves over SOTA serving systems (numbers not stated).
- **Boundary:** not stated in abstract
- **Stealable move:** Import an abstraction from a neighboring field (stream processing) and show it makes the batching granularity question natural.
- **Pitch:** Control-flow DNNs break whole-model batching; module-granular streaming plus two-level scheduling recovers goodput.

### 19. DéjàVu: KV-cache Streaming for Fast, Fault-tolerant Generative LLM Serving (ICML 2024)
- **Problem:** Distributed LLM serving suffers pipeline bubbles from bimodal prompt/token latency, GPU memory overprovisioning, and slow failure recovery.
- **Assumption:** One primitive — cheap KV cache streaming — can address all three if the cache can move fast enough between devices.
- **Mechanism:** DéjàVuLib streaming library, used for prompt-token disaggregation, microbatch swapping for memory, and state replication for fault tolerance.
- **Evidence:** real system — a range of large models across cloud deployments; quantitative results not stated.
- **Boundary:** not stated in abstract
- **Stealable move:** Identify one low-level primitive and show it solves three seemingly unrelated system problems — a strong framing for a systems paper.
- **Pitch:** Fast KV cache streaming is a multipurpose primitive: it kills pipeline bubbles, shrinks memory overprovisioning, and enables replication.

### 20. ConServe: Contiguity-Preserving Memory Management for Multi-Turn LLM Serving (ISCA 2026)
- **Problem:** PagedAttention removes fragmentation but scatters virtual addresses, adding address-translation overhead and programming complexity in multi-turn serving.
- **Assumption:** Translation locality, not fragmentation alone, is the binding constraint; contiguity can be kept virtually while fragmenting physically.
- **Mechanism:** Reserves one contiguous virtual slice per conversation, maps physical pages on demand via CUDA VMM, and resizes slices by lazy copy-free remapping.
- **Evidence:** real system — diverse models and workloads; up to 74.4/43.4/19.1% lower TTFT and 35.1/15.6/12.1% higher throughput than vLLM, vAttention-Turn, vAttention-Conv.
- **Boundary:** not stated in abstract
- **Stealable move:** Separate the virtual and physical views and argue that a previously "solved" problem (paging) was solved at the wrong layer.
- **Pitch:** Paging fixed fragmentation but broke translation locality; giving each conversation a contiguous virtual slice recovers both.
