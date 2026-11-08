### 1. Language Models can Subtly Deceive Without Lying: A Case Study on Strategic Phrasing in Legislation (ACL 2024)
- **Problem:** LLMs can deceive through strategic phrasing and information manipulation, which is harder to detect than blatant lying or hallucination.
- **Assumption:** A legislative testbed with a corporate lobbyist module captures this behavior realistically.
- **Mechanism:** Real bills matched to affected companies; lobbyist proposes self-serving amendments evading benefactor identification; LLM-based re-planning and re-sampling optimize phrasing.
- **Evidence:** testbed simulation grounded in real legislative bills; human evaluations concordant with automated metrics.
- **Boundary:** not stated in abstract
- **Stealable move:** Put the detector inside the optimization loop so re-sampling is scored against the strongest available detector.
- **Pitch:** Adversarial re-sampling against a live detector turns borderline deception into a measurable, optimizable rate.

### 2. QSpec: Speculative Decoding with Complementary Quantization Schemes (EMNLP 2024)
- **Problem:** Activation-weight joint quantization is fast but degrades multi-step reasoning quality.
- **Assumption:** A fast low-precision drafter plus accurate high-precision verifier decouples efficiency from quality.
- **Mechanism:** Speculative decoding across two complementary quantization schemes; weights and KV cache reused across stages, giving near-zero-cost switching with no retraining or auxiliary models.
- **Evidence:** real system; up to 1.64x speedup over high-precision baselines, up to 1.55x over SOTA speculative decoding in batched settings; generalizes across scales, methods, workloads.
- **Boundary:** not stated in abstract
- **Stealable move:** Reuse one artifact (weights plus KV) across both speed tiers so the switch costs nothing.
- **Pitch:** Same weights, two precisions: draft cheap, verify accurate, switch for free.

### 3. A2ATS: Retrieval-Based KV Cache Reduction via Windowed Rotary Position Embedding and Query-Aware Vector Quantization (ACL 2025)
- **Problem:** Retrieval-based KV reduction still suffers accuracy degradation and extra retrieval overhead in long-context serving.
- **Assumption:** Attention scores can be approximated accurately enough from vector-quantized key states to retrieve top-K tokens.
- **Mechanism:** Windowed Rotary Position Embedding decouples positional dependency from query and key states; query-aware vector quantization optimizes the attention-approximation objective directly; heterogeneous inference architecture for offloading.
- **Evidence:** experiments; up to 2.7x long-context serving throughput with lower degradation and similar or lower overhead.
- **Boundary:** not stated in abstract
- **Stealable move:** Train the approximation objective (attention score error) rather than a generic reconstruction loss.
- **Pitch:** Make the quantizer optimize exactly what retrieval needs, then offload with a matching heterogeneous architecture.

### 4. Unveiling Environmental Impacts of Large Language Model Serving: A Functional Unit View (ACL 2025)
- **Problem:** Existing carbon benchmarking of LLM serving lacks a standardized basis for comparing model configurations.
- **Assumption:** A functional unit provides a fair, standardized comparison basis.
- **Mechanism:** FUEL, a functional-unit-based framework for evaluating serving's environmental impact; three case studies varying model size, quantization strategy, and hardware choice.
- **Evidence:** three case studies; specific datasets not stated in abstract.
- **Boundary:** not stated in abstract
- **Stealable move:** Import a metric-normalization concept from another field as the paper's organizing frame.
- **Pitch:** Normalize by functional unit and carbon numbers become comparable across configurations.

### 5. Taming System Complexity: Demystifying Software Engineering Agents in Diagnosing Linux Kernel Faults (ACL 2025)
- **Problem:** It is unclear how well LLM agents localize faults in the Linux kernel, where scale and limited observability make FL much harder than SWE-bench.
- **Assumption:** SWE-bench success does not transfer to kernel-scale code.
- **Mechanism:** LinuxFLBench built from real kernel bugs; empirical study of state-of-the-art agents; LinuxFL+ enhancement framework.
- **Evidence:** benchmark of real kernel bugs; best top-1 file-level accuracy 41.6%; LinuxFL+ gains 7.2-11.2% at minimal cost.
- **Boundary:** reported accuracy is file level; not stated in abstract
- **Stealable move:** Build the benchmark from real production incidents before proposing the fix.
- **Pitch:** Prove agents collapse on a harder, real domain, then sell the small patch that recovers most of it.

### 6. Characterizing Performance–Energy Trade-offs of Large Language Models in Multi-Request Workflows (SIGMETRICS 2026)
- **Problem:** Measurement work targets single requests, overlooking workflow dependencies, cross-request interactions, and energy.
- **Assumption:** Four patterns (sequential, interactive, agentic, composite) represent modern multi-request deployments.
- **Mechanism:** Systematic characterization on an A100 testbed with vLLM and Parrot, sweeping input-output length, batch size, and GPU power cap, with component-level CPU/GPU/DRAM energy.
- **Evidence:** real system testbed; batch size is the most impactful lever but highly workload dependent.
- **Boundary:** NVIDIA A100 testbed only; abstract truncated.
- **Stealable move:** Report energy at component granularity, not one aggregate number.
- **Pitch:** Turn batch size from a rumor into a measured, workload-conditional energy lever at component granularity.

### 7. Outcome-Grounded Advantage Reshaping for Fine-Grained Credit Assignment in Mathematical Reasoning (ACL 2026)
- **Problem:** GRPO propagates group-level rewards uniformly to every token, ignoring differing step contributions.
- **Assumption:** Token influence on the final answer is estimable and can redistribute advantage.
- **Mechanism:** OAR-P estimates outcome sensitivity via counterfactual token perturbations; OAR-G uses an input-gradient sensitivity proxy from one backward pass; a conservative bi-level reshaping suppresses low-impact tokens while preserving advantage mass.
- **Evidence:** extensive mathematical reasoning benchmarks; OAR-P is the upper bound, OAR-G comparable at negligible overhead.
- **Boundary:** mathematical reasoning only; not stated in abstract
- **Stealable move:** Offer a high-fidelity mechanism and a cheap proxy, then report both as a quality-cost curve.
- **Pitch:** Reshape advantage by measured token influence and get finer credit without a critic.

### 8. Hardware and Software Platform Inference (ICML 2024)
- **Problem:** Buyers of hosted LLM inference cannot verify the advertised serving hardware or model.
- **Assumption:** GPU architectures and compilers leave distinguishable numerical signatures in model outputs.
- **Mechanism:** Analyze numerical patterns in black-box input-output behavior; classification framework identifies GPU type and software stack.
- **Evidence:** evaluation against models served on different real hardware; abstract truncated.
- **Boundary:** not stated in abstract
- **Stealable move:** Use implementation-artifact fingerprints as an audit signal rather than treating them as noise.
- **Pitch:** Output numerics carry a hardware fingerprint; black-box clients can audit what they actually rent.

### 9. A Case for a Simulation-Driven Exploration of Distributed GenAI Platforms (MLSys 2026)
- **Problem:** Design-space exploration for GenAI serving platforms is prohibitively expensive and slow; current evaluation studies isolated components.
- **Assumption:** Discrete-event simulation can capture hardware-scheduler-workload interplay faithfully enough to guide design.
- **Mechanism:** Opal, an open-source discrete-event simulation framework modeling interactions across layers of the inference stack, built to be simple, extensible, reproducible, and fast.
- **Evidence:** design and motivation paper; no quantitative results stated in abstract.
- **Boundary:** position paper seeking community feedback on open challenges.
- **Stealable move:** Frame a simulator as a "case for" position paper to gather requirements before building.
- **Pitch:** Simulate the whole stack to explore GenAI platform designs without the hardware bill.

### 10. AdaSpec: Adaptive Speculative Decoding for Fast, SLO-Aware Large Language Model Serving (SoCC 2025)
- **Problem:** Existing speculative decoding fails to adapt to fluctuating workloads and dynamic system environments, causing SLO violations.
- **Assumption:** Speculative strategy efficiency is predictable from a theoretical model given load and configuration.
- **Mechanism:** Theoretical model predicting strategy efficiency across scenarios; dynamic drafting and verification algorithms adjusting strategy in real time to maximize SLO attainment.
- **Evidence:** real-world LLM service traces; meets SLOs consistently, up to 66% speedup over SOTA speculative inference.
- **Boundary:** not stated in abstract
- **Stealable move:** Lead with an analytical efficiency model, then show the adaptive controller that follows from it.
- **Pitch:** Predict each speculative strategy's efficiency, then switch strategies per request to hold SLOs.

### 11. AgentKV: Phase-Aware KV Eviction for Agentic LLMs (EMNLP 2026)
- **Problem:** KV eviction assumes future attention resembles recent attention; agentic generation violates this.
- **Assumption:** Agentic queries form a mixture over think, act, tool, and other phases occupying measurably different subspaces, per principal-angle analysis.
- **Mechanism:** Maintain a small query buffer per phase and score cached keys against their union; persistent multi-turn serving path carrying compressed KV across turns; online compaction of retained pages.
- **Evidence:** two models, six task domains, three KV budgets each; +5.5 points over R-KV, +5.3 over Tri-attention; up to 1.80x output-token throughput vs full-KV SGLang.
- **Boundary:** not stated in abstract
- **Stealable move:** Use principal-angle analysis to justify a design assumption before building it.
- **Pitch:** Agent phases query different subspaces, so keep one representative buffer per phase and stop evicting what comes next.

### 12. Fast State Restoration in LLM Serving with HCache (EuroSys 2024)
- **Problem:** Reusing KV cache across requests is capacity-limited; evicted state is restored by costly recomputation or host offload.
- **Assumption:** LLM contextual states can be restored from intermediate activations rather than raw tokens.
- **Mechanism:** Restore from intermediate activations; bubble-free restoration scheduler balancing compute and IO; chunk-based storage manager fixing layer-before-token versus token-before-layer layout mismatch.
- **Evidence:** real-world tasks; up to 1.93x TTFT reduction vs KV offload with 1.92-2.40x less storage; up to 5.73x TTFT reduction vs recomputation.
- **Boundary:** not stated in abstract
- **Stealable move:** Name the low-level layout mismatch explicitly and make it a named system component.
- **Pitch:** Restore KV state from saved activations, cheaper than recomputing and smaller than offloading.

### 13. Efficient Training-Free Online Routing for High-Volume Multi-LLM Serving (NeurIPS 2025)
- **Problem:** Existing LLM routing work is offline and struggles with high online query volume under constrained token budgets.
- **Assumption:** Query features are estimable by approximate nearest neighbor search, and a one-time optimization on a small initial query set generalizes.
- **Mechanism:** Training-free algorithm estimating query features via ANN, then a one-time optimization learning a routing strategy for future queries; competitive ratio 1 - o(1) under natural assumptions.
- **Evidence:** 3 benchmark datasets, 8 baselines; 3.55x average performance, 1.85x cost efficiency, 4.25x throughput.
- **Boundary:** guarantee holds under "natural assumptions"; not stated further.
- **Stealable move:** Learn once on a tiny sample, then run inference-time routing with no further training.
- **Pitch:** One tiny optimization pass, then nearest-neighbor routing serves high-volume traffic training-free.

### 14. Position: LLMs Can be Good Tutors in English Education (EMNLP 2025)
- **Problem:** LLM use in English education relies on traditional learning-task approaches without educational methodologies, limiting adaptability.
- **Assumption:** Three roles capture the space: data enhancer, task predictor, and agent.
- **Mechanism:** Argues LLMs can enhance learning-material creation or simulate students, predict learner assessment or optimize pathways, and act as agents for personalized, inclusive education.
- **Evidence:** none stated; position paper with no datasets.
- **Boundary:** position paper; calls for future interdisciplinary research rather than reporting results.
- **Stealable move:** Structure a position paper as an enumerated role taxonomy with a research agenda per role.
- **Pitch:** Split LLM-in-education into three concrete roles and hand each role its own research agenda.

### 15. ORBITFLOW: SLO-Aware Long-Context LLM Serving with Fine-Grained KV Cache Reconfiguration (VLDB 2026)
- **Problem:** Static, predetermined KV offloading cannot follow memory demand that shifts during token generation, causing transfer spikes and SLO violations.
- **Assumption:** Which layers' KV to keep on GPU is decidable per request by a lightweight ILP within capacity.
- **Mechanism:** ILP solver picks per-request layer retention; continuous refinement from runtime feedback when the active plan goes suboptimal; under heavy load a fallback defers large-footprint in-flight requests.
- **Evidence:** SLO attainment +62% TPOT and +66% TBT, P95 latency -38%, up to 3.3x throughput over existing offloading methods.
- **Boundary:** not stated in abstract
- **Stealable move:** Add an explicit admission-control fallback to protect the SLO tail under overload.
- **Pitch:** Re-solve KV placement per request with an ILP and defer the monsters to keep p95 honest.

### 16. LMTracer: Fine-Grained and Real-Time Performance Profiling for Production LLM Systems (SOSP 2026)
- **Problem:** Existing profilers are either too coarse to find bottlenecks or too intrusive for production.
- **Assumption:** Inefficiency stems from disruptions to highly asynchronous GPU execution flows.
- **Mechanism:** Graph-embedded probing: compile lightweight probe kernels as special trace nodes inside GPU execution graphs, streaming buffered profiling data to CPUs on demand so user kernels never stop.
- **Evidence:** production deployment for eight months; 0.9% average overhead across training, serving, fine-tuning; found 15 issues, yielding 21.2% latency reduction and 24.5% throughput improvement.
- **Boundary:** not stated in abstract
- **Stealable move:** Report the issues found and the post-fix gains as evidence the profiler is useful.
- **Pitch:** Put probes inside the CUDA graph, stream results asynchronously, and profiling stops disturbing the thing it measures.

### 17. Unified Static-Dynamic Pruning for Efficient LLM Inference (VLDB 2026)
- **Problem:** Static pruning is permanent but inflexible; dynamic pruning adapts but creates runtime irregularity.
- **Assumption:** Unstructured static and input-adaptive dynamic sparsity can be harmonized through joint format-kernel co-design.
- **Mechanism:** Tiled-CBC bitmap format; CUDA-core spMspV kernel with hybrid activation-aware dynamic shared-memory bitmap decoding for runtime activation skipping; Tensor-Core SpMM kernel for prefill.
- **Evidence:** inference-optimized GPUs; 1.24-1.37x average (up to 2.51x) over SpInfer, matching perplexity at up to 25% higher sparsity.
- **Boundary:** not stated in abstract
- **Stealable move:** Assign each inference phase (decode vs prefill) the kernel that suits it, under one format.
- **Pitch:** One bitmapped format and two kernels unify static and dynamic sparsity across decode and prefill.

### 18. Lung-R1: A Knowledge Graph-Guided LLM for Pulmonary Diagnostic Reasoning (EMNLP 2026)
- **Problem:** Pulmonary knowledge QA does not give the patient-specific, relation-aware reasoning over EMR evidence that diagnosis needs.
- **Assumption:** The gap, named the Pulmonary Knowledge-to-Diagnosis Gap, is closable by structured knowledge plus KG-guided training.
- **Mechanism:** LungKG with 59,038 nodes, 164,308 edges, 15 entity types, 112 relation types; Lung-R1 trained via KG-constrained reasoning-chain construction and KG-guided reinforcement learning.
- **Evidence:** 20-system evaluation; Lung-R1-14B is state of the art on Choice, Pulmonary-QA, and EMR Diagnosis; EMR Diagnosis score 4.3583, +0.1476 over strongest baseline.
- **Boundary:** pulmonary domain only; not stated in abstract
- **Stealable move:** Name the gap as a proper noun in the abstract and make the artifact a reusable resource.
- **Pitch:** Name the gap, build the graph, and let KG-constrained reasoning chains turn knowledge into case-level diagnosis.

### 19. Exploring the Integration of Large Language Models into Automatic Speech Recognition Systems: An Empirical Study (NeurIPS 2023)
- **Problem:** ASR struggles with noise, accents, and complex linguistic context; can LLM in-context learning help correct transcripts.
- **Assumption:** In-context learning plus instruction following can correct ASR errors.
- **Mechanism:** Study varying settings, prompts, and models, with ChatGPT and GPT-4 as the LLM baselines.
- **Evidence:** empirical study on Aishell-1 and LibriSpeech; corrected sentences frequently had higher WER; negative result.
- **Boundary:** limited to in-context-learning correction; not stated in abstract
- **Stealable move:** Publish the negative result with a full account of the varied settings tried.
- **Pitch:** LLM post-correction of ASR transcripts raises WER, and the paper says so plainly.

### 20. Hardware-Aware Co-Design of Multi-Chip LLM Serving via Performance Modeling (MLSys 2026)
- **Problem:** Compiler-based exploration of multi-chip strategies is expensive and obscured by compiler artifacts.
- **Assumption:** Command-granularity simulation reconstructs accelerator execution faithfully enough to design against.
- **Mechanism:** Simulator models tiled computation, explicit DRAM-SRAM transfers, collective communication, and overlap constraints; instantiated on the RNGD accelerator.
- **Evidence:** simulation validated against hardware-level traces; a fine-grained parallelism design gives up to 77% throughput over full tensor parallelism; a tail-constrained chunked prefill improves the TTFT-TPOT trade-off.
- **Boundary:** instantiated only on RNGD; all quantitative results come from the simulator.
- **Stealable move:** Validate the simulator against traces first, then let it carry the design claims.
- **Pitch:** Model the machine at command granularity, then co-design parallelism and chunking without recompiling.
