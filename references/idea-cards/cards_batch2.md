### 1. ORCHES: Orchestrated Test-Time-Compute-based LLM Reasoning on Collaborative GPU-PIM HEterogeneous System (MICRO 2025)
- **Problem:** Test-time-compute pipelines bottleneck latency on edge devices via variable parallelism, branch dependencies, and branch pruning.
- **Assumption:** LLMs are memory-bound, so processing-in-memory can cut data movement.
- **Mechanism:** GPU–PIM collaboration with adaptive workload assignment, speculation-based branch-aware pipelining, and fragmentation-aware memory structuring.
- **Evidence:** experimental results reported but the abstract truncates mid-sentence; type and datasets not stated in abstract.
- **Boundary:** not stated in abstract
- **Stealable move:** Open with a three-barrier taxonomy, then give exactly one innovation per barrier.
- **Pitch:** Names three structural barriers of TTC pipelines and pairs each with a GPU–PIM co-design remedy.

### 2. Bridging the Gap Between LLMs and LNS with Dynamic Data Format and Architecture Codesign (MICRO 2024)
- **Problem:** Logarithmic number systems fix small-number precision but mismatch LLMs, which exhibit significant outliers.
- **Assumption:** Outliers can be identified per block, and LNS representation asymmetry leaves room for higher precision there.
- **Mechanism:** Dynamic LNS format for outliers plus a systolic array handling that irregularity at runtime.
- **Evidence:** real system prototype, Alveo U280 FPGA.
- **Boundary:** not stated in abstract
- **Stealable move:** Report the mismatch first as an observation, then fix it on both the format and the architecture side.
- **Pitch:** Diagnoses an LNS/LLM outlier mismatch and answers it with a per-block dynamic format in silicon.

### 3. SPARTA ALIGNMENT: Collectively Aligning Multiple Language Models through Combat (NeurIPS 2025)
- **Problem:** A single model lacks generation diversity and carries biases in evaluation.
- **Assumption:** Peer judging plus an Elo-style reputation system aggregates evaluations well enough to train on.
- **Mechanism:** Models duel on one instruction, others score, scores update reputation, and outcomes become preference pairs all models learn from.
- **Evidence:** experiments on 12 tasks and datasets; 10 of 12 improved, 7.0% average gain.
- **Boundary:** not stated in abstract
- **Stealable move:** Convert a competition outcome into a training signal, so the evaluation loop feeds the improvement loop.
- **Pitch:** Turns mutual judging among models into preference pairs, letting a model collective self-evolve.

### 4. SLANG: New Concept Comprehension of Large Language Models (EMNLP 2024)
- **Problem:** Models anchored to static datasets cannot keep up with online slang and meme evolution.
- **Assumption:** Causal inference over real-world linguistic-shift instances can teach new phrases without continual retraining.
- **Mechanism:** SLNAG benchmark that autonomously integrates novel data, plus FOCUS, which uses shift instances as contextual beacons.
- **Evidence:** empirical analysis on Internet slang and memes; benchmark dataset. Type not stated in abstract.
- **Boundary:** not stated in abstract
- **Stealable move:** Build the benchmark so it ingests new data autonomously, closing the memorization escape hatch.
- **Pitch:** Pairs an auto-updating slang benchmark with a causal-inference method that avoids costly continual retraining.

### 5. ImageNetVC: Zero- and Few-Shot Visual Commonsense Evaluation on 1000 ImageNet Categories (EMNLP 2023)
- **Problem:** It is unclear how well LLMs and visually augmented models actually master visual commonsense.
- **Assumption:** 1000 ImageNet categories form a workable sampling frame for commonsense; human annotation gives ground truth.
- **Mechanism:** Human-annotated dataset for zero- and few-shot evaluation, then benchmarking and factor analysis.
- **Evidence:** human-annotated benchmark, 1000 ImageNet categories.
- **Boundary:** not stated in abstract
- **Stealable move:** Reuse an existing category taxonomy as the sampling frame so coverage is defensible without new ontology work.
- **Pitch:** Uses ImageNet's own 1000-category taxonomy to measure visual commonsense in LLMs and VaLMs.

### 6. S3: Increasing GPU Utilization during Generative Inference for Higher Throughput (NeurIPS 2023)
- **Problem:** Reserving KV cache at maximum sequence length forces small batches, low GPU utilization, and low throughput.
- **Assumption:** Output sequence length can be predicted a priori well enough to schedule on.
- **Mechanism:** Predict output length, schedule generation queries on the prediction, and handle mispredictions.
- **Evidence:** experiments; 6.49× throughput over systems assuming worst-case length. Type not stated in abstract.
- **Boundary:** not stated in abstract
- **Stealable move:** Price the worst-case reservation explicitly, then replace it with a predictor plus a stated misprediction policy.
- **Pitch:** Buys throughput by predicting output length instead of reserving memory for the worst case.

### 7. Scalable Context Orchestration for Serving LLMs Over Voice (SOSP 2026)
- **Problem:** Flat message-sequence context leaves voice-specific cues implicit, hurting alignment, robustness, and cost.
- **Assumption:** Paralinguistic and environmental state can be modeled explicitly and turned into actionable directives.
- **Mechanism:** Middleware builds a bounded voice context each turn; the serving LLM reasons over it and emits runtime directives.
- **Evidence:** real-world voice applications and benchmarks; 52.4% alignment error cut, 46.0%→0.9% false interruptions, 79.2% cost cut.
- **Boundary:** not stated in abstract
- **Stealable move:** Let the model emit control directives that steer the system, not only text.
- **Pitch:** Makes voice context explicit and has the LLM output runtime directives rather than just responses.

### 8. Tetris: Efficient Long-context LLM Serving with Chunkwise Dynamic Sequence Parallelism (ISCA 2026)
- **Problem:** Dynamic sequence-parallel allocation is too coarse: no stage-specificity, global latency degradation, wasted fragments.
- **Assumption:** Parallelism degree can safely vary across intra-request token segments.
- **Mechanism:** Chunkwise dynamic SP in a disaggregated cluster, load-driven regulation of SP expansion, adaptive chunking-plan search.
- **Evidence:** evaluation against state-of-the-art systems; 4.35× lower TTFT, 40.1% lower median TBT, 45% capacity. Type not stated in abstract.
- **Boundary:** not stated in abstract
- **Stealable move:** Move a resource allocation decision from per-request to per-segment granularity.
- **Pitch:** Breaks one request into chunks that each pick their own parallelism degree.

### 9. AdaServe: Accelerating Multi-SLO LLM Serving with SLO-Customized Speculative Decoding (EuroSys 2026)
- **Problem:** Uniform batching and scheduling cannot satisfy heterogeneous SLOs concurrently.
- **Assumption:** Speculation-tree shape can be optimized per request against a latency target as a constrained problem.
- **Mechanism:** Hardware-aware tree construction per latency target, a speculate-select-verify pipeline, and dynamic speculation parameters.
- **Evidence:** evaluations across diverse workloads; up to 4.3× fewer SLO violations, 1.9× goodput.
- **Boundary:** not stated in abstract
- **Stealable move:** Map an SLO requirement onto a knob of a mechanism that does not itself change output quality.
- **Pitch:** Turns speculative decoding into a per-request SLO dial, serving mixed latency targets at once.

### 10. High Throughput and Low Latency LLM Serving via Adaptive KV Caching (EuroSys 2026)
- **Problem:** KV offload-and-restore is too coarse-grained to exploit both GPU compute and storage together.
- **Assumption:** Partial token caching plus parallel recomputation of the rest can trade memory against compute.
- **Mechanism:** Token-wise caching adapts batch size and uncached ratio; layer-level overlap and kernel fusion.
- **Evidence:** 3.03× throughput under strict per-token latency SLOs; 2.63× lower first-token latency.
- **Boundary:** not stated in abstract
- **Stealable move:** Expose a continuous knob (fraction of tokens cached) and tune it per request at runtime.
- **Pitch:** Replaces all-or-nothing KV offload with a tunable cached-token fraction recomputed in parallel.

### 11. KVCache Cache in the Wild: Characterizing and Optimizing KVCache Cache at a Large Cloud Provider (ATC 2025)
- **Problem:** Eviction policy design is workload-dependent, yet understanding rests on synthetic workloads.
- **Assumption:** Production traces reveal patterns synthetic studies miss and generalize within one provider.
- **Mechanism:** Systematic characterization of KV reuse, then a workload-aware eviction policy.
- **Evidence:** trace from one leading LLM service provider; real-world traces.
- **Boundary:** scope is one provider's production workload; abstract makes no cross-provider claim.
- **Stealable move:** Pick a policy choice everyone hard-codes, characterize it on production traces, then ship the replacement.
- **Pitch:** First systematic production trace study of KV cache reuse, ending in a workload-aware eviction policy.

### 12. Pie: A Programmable Serving System for Emerging LLM Applications (SOSP 2025)
- **Problem:** A monolithic token generation loop cannot express diverse reasoning and agentic workflows.
- **Assumption:** Exposing internals as handlers with sandboxed user code preserves efficiency while adding flexibility.
- **Mechanism:** Fine-grained service handlers behind an API, with user programs ("inferlets") executed via WebAssembly.
- **Evidence:** 3–12% latency overhead on standard tasks, 1.3×–3.4× higher latency/throughput on agentic workflows.
- **Boundary:** not stated in abstract
- **Stealable move:** Report the cost on the standard case beside the win on the new case, in the same sentence.
- **Pitch:** Turns the generation loop inside out, letting applications program KV strategies and custom generation logic.

### 13. Towards Effective and Efficient Multi-Agent Language Model Systems: Foundations, Prospects, and Applications (ACL 2026)
- **Problem:** Achieving effectiveness and efficiency together in multi-agent LLM systems remains unsolved.
- **Assumption:** Three components — agent design, coordination, applications — cover the design space.
- **Mechanism:** Tutorial: compact-model distillation, dynamic routing, memory/compute-efficient serving; prompt and graph optimization, sycophancy mitigation.
- **Evidence:** tutorial; no experiments stated in abstract.
- **Boundary:** not stated in abstract
- **Stealable move:** Organize a survey or framing section around one tension (effective vs efficient) rather than a list of methods.
- **Pitch:** Frames multi-agent LLM design as one tension and walks agent, coordination, and application layers.

### 14. COMET: Towards Practical W4A4KV4 LLMs Serving (ASPLOS 2024)
- **Problem:** 8-bit weight-activation and 4-bit weight-only quantization gain little because low-precision activation support is poor.
- **Assumption:** Most activations can be compressed to 4 bits with negligible accuracy loss.
- **Mechanism:** Fine-grained mixed-precision quantization, a W4Ax kernel, mixed-precision data layout, and fine-grained SM scheduling.
- **Evidence:** evaluations on LLaMA-family models, single A100-80G-SMX4; 2.88× kernel-level speedup (abstract truncated).
- **Boundary:** not stated in abstract
- **Stealable move:** Chase the gap between algorithmic savings and wall-clock savings with data layout and scheduling.
- **Pitch:** Claims first practical W4A4KV4 serving by making mixed-precision matmul actually fast on INT4 cores.

### 15. PipeLLM: Fast and Confidential Large Language Model Services with Speculative Pipelined Encryption (ASPLOS 2024)
- **Problem:** Confidential-computing encryption costs up to 52.8% (OPT-30B) and 88.2% (OPT-66B) throughput.
- **Assumption:** Which data needs encryption is predictable from LLM serving patterns.
- **Mechanism:** Speculative pipelined encryption overlapping crypto with GPU compute, plus low-cost pipeline relinquishing on mispredictions.
- **Evidence:** experiments versus vLLM, PEFT, FlexGen; under 19.6% overhead across 13B–175B models.
- **Boundary:** not stated in abstract
- **Stealable move:** Name the cross-field analogy explicitly (CPU instruction pipelining) and make it the paper's spine.
- **Pitch:** Hides encryption overhead by predicting what to encrypt and pipelining it under GPU compute.

### 16. DHP Benchmark: Are LLMs Good NLG Evaluators? (ACL 2024)
- **Problem:** Human assessments and simple metrics fail to capture how well LLMs judge NLG across tasks.
- **Assumption:** Hierarchical perturbation plus statistical tests yield a quantitative discernment score.
- **Mechanism:** Hierarchically perturbed text over six rebuilt datasets covering summarization, story completion, QA, translation.
- **Evidence:** benchmark on five major LLM families; six datasets.
- **Boundary:** not stated in abstract
- **Stealable move:** Score a model by how its judgments degrade under graded perturbation, not by correlation with humans.
- **Pitch:** Measures judge quality as sensitivity to controlled corruption rather than agreement with humans.

### 17. QServe: W4A8KV4 Quantization and System Co-design for Efficient LLM Serving (MLSys 2024)
- **Problem:** State-of-the-art INT4 quantization only accelerates low-batch edge inference; large-batch serving pays 20–90% dequantization overhead.
- **Assumption:** GPU serving efficiency is set by low-throughput CUDA core operations.
- **Mechanism:** Progressive quantization for cheap W4A8 dequant, SmoothAttention for KV4 accuracy, compute-aware weight reordering, register-level parallelism.
- **Evidence:** measured speedups in the QServe library; harness and datasets not stated in abstract.
- **Boundary:** not stated in abstract
- **Stealable move:** Attribute overhead to the hardware unit that executes it, not to the operator it belongs to.
- **Pitch:** Explains why INT4 wins do not survive batching, then moves the cost off CUDA cores.

### 18. 3-in-1: 2D Rotary Adaptation for Efficient Finetuning, Efficient Batching and Composability (NeurIPS 2024)
- **Problem:** PEFT must handle multi-adapter batching within one batch and interpretability, not just parameter count.
- **Assumption:** A 2D rotation is expressive enough for adaptation while costing less than batch matrix multiplication.
- **Mechanism:** RoAd applies a 2D rotation, giving adapter switching costing about one element-wise multiply.
- **Evidence:** GLUE, eight commonsense and four arithmetic reasoning tasks; under 0.1% trainable parameters; composition experiments.
- **Boundary:** not stated in abstract
- **Stealable move:** Pick three desiderata prior work solved separately and satisfy them with one primitive.
- **Pitch:** One 2D rotation delivers parameter efficiency, cheap multi-adapter batching, and interpretability at once.

### 19. Loquetier: A Virtualized Multi-LoRA Framework for Unified LLM Fine-tuning and Serving (NeurIPS 2025)
- **Problem:** Fine-tuning and inference for LoRA models remain separate, leaving unified runtimes unaddressed.
- **Assumption:** A shared base with isolated virtual modules and a merged forward path can serve both phases efficiently.
- **Mechanism:** A Virtualized Module isolating PEFT modifications, plus a kernel merging fine-tuning and inference paths.
- **Evidence:** three task settings; up to 3.0× throughput on inference-only, 46.4× higher SLO attainment on unified tasks.
- **Boundary:** not stated in abstract
- **Stealable move:** When a workload interleaves two phases, report SLO attainment rather than throughput.
- **Pitch:** Collapses LoRA fine-tuning and serving into one runtime with a shared, merged forward path.

### 20. MoC: Mixtures of Text Chunking Learners for Retrieval-Augmented Generation System (ACL 2025)
- **Problem:** RAG pipelines overlook chunking; traditional and semantic chunkers mishandle complex contextual nuance.
- **Assumption:** LLM-grade chunking quality can be captured in executable regexes, keeping inference cheap.
- **Mechanism:** Dual metrics (Boundary Clarity, Chunk Stickiness) plus a three-stage mixture-of-chunkers emitting a regex list.
- **Evidence:** extensive experiments on chunking quality and end-to-end RAG performance; datasets not stated in abstract.
- **Boundary:** not stated in abstract
- **Stealable move:** Distill an expensive model decision into an executable artifact so the cost is paid once, not per call.
- **Pitch:** Defines chunking quality with two metrics, then distills LLM chunking into reusable regular expressions.
