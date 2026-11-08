> 中文版 · English: [INDEX.md](INDEX.md)

# 论文索引 — 250 篇论文（2023–2026）

由四个 `_corpus.json` 文件生成。每篇论文一行：标题、会议/期刊（venue）、年份、DOI。每篇的卡片在同目录的 `cards_batch*.md` 中；提炼出的设计动作在 `design-moves.md`（通用库）和各领域文件夹中。

## 通用系统 / 机器学习（100）

1. **Taming Throughput-Latency Tradeoff in LLM Inference with Sarathi-Serve** — OSDI 2024 — `10.48550/arXiv.2403.02310`
2. **WLB-LLM: Workload-Balanced 4D Parallelism for Large Language Model Training** — OSDI 2025 — `10.48550/arXiv.2503.17924`
3. **Understanding Stragglers in Large Model Training Using What-if Analysis** — OSDI 2025 — `10.48550/arXiv.2505.05713`
4. **Parrot: Efficient Serving of LLM-based Applications with Semantic Variable** — OSDI 2024 — `10.48550/arXiv.2405.19888`
5. **WaferLLM: Large Language Model Inference at Wafer Scale** — OSDI 2025
6. **ServerlessLLM: Low-Latency Serverless Inference for Large Language Models** — OSDI 2024
7. **DistServe: Disaggregating Prefill and Decoding for Goodput-optimized Large Language Model Serving** — OSDI 2024 — `10.48550/arXiv.2401.09670`
8. **InfiniGen: Efficient Generative Inference of Large Language Models with Dynamic KV Cache Management** — OSDI 2024 — `10.48550/arXiv.2406.19707`
9. **JITServe: SLO-aware LLM Serving with Imprecise Request Information** — NSDI 2025
10. **ForestColl: Throughput-Optimal Collective Communications on Heterogeneous Network Fabrics** — NSDI 2024
11. **PlanetServe: A Decentralized, Scalable, and Privacy-Preserving Overlay for Democratizing Large Language Model Serving** — NSDI 2025
12. **ServeGen: Workload Characterization and Generation of Large Language Model Serving in Production** — NSDI 2025 — `10.48550/arXiv.2505.09999`
13. **Cortex: Achieving Low-Latency, Cost-Efficient Remote Data Access For LLM via Semantic-Aware Knowledge Caching** — NSDI 2025
14. **MegaScale: Scaling Large Language Model Training to More Than 10, 000 GPUs** — NSDI 2024 — `10.48550/arXiv.2402.15627`
15. **ZipLLM: Efficient LLM Storage via Model-Aware Synergistic Data Deduplication and Compression** — NSDI 2025
16. **FlexLLM: Token-Level Co-Serving of LLM Inference and Finetuning with SLO Guarantees** — NSDI 2024
17. **HydraServe: Minimizing Cold Start Latency for Serverless LLM Serving in Public Clouds** — NSDI 2025
18. **Supercharging Packet-level Network Simulation of Large Model Training via Memoization and Fast-Forwarding** — NSDI 2026 — `10.48550/arXiv.2602.10615`
19. **Stratum: System-Hardware Co-Design with Tiered Monolithic 3D-Stackable DRAM for Efficient MoE Serving** — MICRO 2025 — `10.1145/3725843.3756043`
20. **FloatAP: Supporting High-Performance Floating-Point Arithmetic in Associative Processors** — MICRO 2024 — `10.1109/MICRO61859.2024.00055`
21. **ORCHES: Orchestrated Test-Time-Compute-based LLM Reasoning on Collaborative GPU-PIM HEterogeneous System** — MICRO 2025 — `10.1145/3725843.3756039`
22. **Bridging the Gap Between LLMs and LNS with Dynamic Data Format and Architecture Codesign** — MICRO 2024 — `10.1109/MICRO61859.2024.00118`
23. **SPARTA ALIGNMENT: Collectively Aligning Multiple Language Models through Combat** — NeurIPS 2025 — `10.48550/arXiv.2506.04721`
24. **SLANG: New Concept Comprehension of Large Language Models** — EMNLP 2024 — `10.18653/v1/2024.emnlp-main.698`
25. **ImageNetVC: Zero- and Few-Shot Visual Commonsense Evaluation on 1000 ImageNet Categories** — EMNLP 2023 — `10.18653/v1/2023.findings-emnlp.133`
26. **S3: Increasing GPU Utilization during Generative Inference for Higher Throughput** — NeurIPS 2023 — `10.48550/arXiv.2306.06000`
27. **Scalable Context Orchestration for Serving LLMs Over Voice** — SOSP 2026 — `10.1145/3830418.3843860`
28. **Tetris: Efficient Long-context LLM Serving with Chunkwise Dynamic Sequence Parallelism** — ISCA 2026 — `10.1109/ISCA66397.2026.00098`
29. **AdaServe: Accelerating Multi-SLO LLM Serving with SLO-Customized Speculative Decoding** — EuroSys 2026 — `10.1145/3767295.3769315`
30. **High Throughput and Low Latency LLM Serving via Adaptive KV Caching** — EuroSys 2026 — `10.1145/3767295.3803570`
31. **KVCache Cache in the Wild: Characterizing and Optimizing KVCache Cache at a Large Cloud Provider** — ATC 2025 — `10.48550/arXiv.2506.02634`
32. **Pie: A Programmable Serving System for Emerging LLM Applications** — SOSP 2025 — `10.1145/3731569.3764814`
33. **Towards Effective and Efficient Multi-Agent Language Model Systems: Foundations, Prospects, and Applications** — ACL 2026 — `10.18653/v1/2026.acl-tutorials.3`
34. **COMET: Towards Practical W4A4KV4 LLMs Serving** — ASPLOS 2024 — `10.1145/3676641.3716252`
35. **PipeLLM: Fast and Confidential Large Language Model Services with Speculative Pipelined Encryption** — ASPLOS 2024 — `10.1145/3669940.3707224`
36. **DHP Benchmark: Are LLMs Good NLG Evaluators?** — ACL 2024 — `10.48550/arXiv.2408.13704`
37. **QServe: W4A8KV4 Quantization and System Co-design for Efficient LLM Serving** — MLSys 2024 — `10.48550/arXiv.2405.04532`
38. **3-in-1: 2D Rotary Adaptation for Efficient Finetuning, Efficient Batching and Composability** — NeurIPS 2024 — `10.48550/arXiv.2409.00119`
39. **Loquetier: A Virtualized Multi-LoRA Framework for Unified LLM Fine-tuning and Serving** — NeurIPS 2025 — `10.48550/arXiv.2511.00101`
40. **MoC: Mixtures of Text Chunking Learners for Retrieval-Augmented Generation System** — ACL 2025 — `10.48550/arXiv.2503.09600`
41. **Language Models can Subtly Deceive Without Lying: A Case Study on Strategic Phrasing in Legislation** — ACL 2024 — `10.18653/v1/2025.acl-long.1600`
42. **QSpec: Speculative Decoding with Complementary Quantization Schemes** — EMNLP 2024 — `10.48550/arXiv.2410.11305`
43. **A2ATS: Retrieval-Based KV Cache Reduction via Windowed Rotary Position Embedding and Query-Aware Vector Quantization** — ACL 2025 — `10.48550/arXiv.2502.12665`
44. **Unveiling Environmental Impacts of Large Language Model Serving: A Functional Unit View** — ACL 2025 — `10.48550/arXiv.2502.11256`
45. **Taming System Complexity: Demystifying Software Engineering Agents in Diagnosing Linux Kernel Faults** — ACL 2025 — `10.18653/v1/2026.acl-long.862`
46. **Characterizing Performance–Energy Trade-offs of Large Language Models in Multi-Request Workflows** — SIGMETRICS 2026 — `10.1145/3820171.3806907`
47. **Outcome-Grounded Advantage Reshaping for Fine-Grained Credit Assignment in Mathematical Reasoning** — ACL 2026 — `10.48550/arXiv.2601.07408`
48. **Hardware and Software Platform Inference** — ICML 2024 — `10.48550/arXiv.2411.05197`
49. **A Case for a Simulation-Driven Exploration of Distributed GenAI Platforms** — MLSys 2026 — `10.1145/3805621.3807623`
50. **AdaSpec: Adaptive Speculative Decoding for Fast, SLO-Aware Large Language Model Serving** — SoCC 2025 — `10.1145/3772052.3772239`
51. **AgentKV: Phase-Aware KV Eviction for Agentic LLMs** — EMNLP 2026 — `10.18653/2026.emnlp-main.2514`
52. **Fast State Restoration in LLM Serving with HCache** — EuroSys 2024 — `10.1145/3689031.3696072`
53. **Efficient Training-Free Online Routing for High-Volume Multi-LLM Serving** — NeurIPS 2025 — `10.48550/arXiv.2509.02718`
54. **Position: LLMs Can be Good Tutors in English Education** — EMNLP 2025 — `10.18653/v1/2025.emnlp-main.885`
55. **ORBITFLOW: SLO-Aware Long-Context LLM Serving with Fine-Grained KV Cache Reconfiguration** — VLDB 2026 — `10.48550/arXiv.2601.10729`
56. **LMTracer: Fine-Grained and Real-Time Performance Profiling for Production LLM Systems** — SOSP 2026 — `10.1145/3830418.3843871`
57. **Unified Static-Dynamic Pruning for Efficient LLM Inference** — VLDB 2026 — `10.48550/arXiv.2607.21985`
58. **Lung-R1: A Knowledge Graph-Guided LLM for Pulmonary Diagnostic Reasoning** — EMNLP 2026 — `10.48550/arXiv.2606.11675`
59. **Exploring the Integration of Large Language Models into Automatic Speech Recognition Systems: An Empirical Study** — NeurIPS 2023 — `10.1007/978-981-99-8181-6_6`
60. **Hardware-Aware Co-Design of Multi-Chip LLM Serving via Performance Modeling** — MLSys 2026 — `10.1145/3805621.3807651`
61. **Batched in Back: Characterizing and Optimizing Offline LLM Inference in Production with ACDC** — SOSP 2026 — `10.1145/3830418.3843877`
62. **Oaken: Fast and Efficient LLM Serving with Online-Offline Hybrid KV Cache Quantization** — ISCA 2025 — `10.1145/3695053.3731019`
63. **MagicDec: Breaking the Latency-Throughput Tradeoff for Long Context Generation with Speculative Decoding** — ICLR 2024 — `10.48550/arXiv.2408.11049`
64. **EPIC: Efficient Position-Independent Caching for Serving Large Language Models** — ICML 2024
65. **The VLLM Safety Paradox: Dual Ease in Jailbreak Attack and Defense** — NeurIPS 2024 — `10.48550/arXiv.2411.08410`
66. **VectorLiteRAG: Latency-Aware and Fine-Grained Resource Partitioning for Efficient RAG** — HPCA 2025 — `10.1109/HPCA68181.2026.11408552`
67. **Sutradhara : An Intelligent Orchestrator-Engine Co-design for Tool-based Agentic Inference** — ASPLOS 2026 — `10.48550/arXiv.2601.12967`
68. **MoESD: Unveil Speculative Decoding's Potential for Accelerating Sparse MoE** — NeurIPS 2025 — `10.48550/arXiv.2505.19645`
69. **Symbiotic MLLM Serving: Dynamically Balancing Parallelism Across GPUs and Resources Within GPUs** — ISCA 2026 — `10.1109/ISCA66397.2026.00173`
70. **DynaPipe: Dynamic Layer Redistribution for Efficient Serving of LLMs with Pipeline Parallelism** — NeurIPS 2025 — `10.52202/085713-4569`
71. **SERE: Similarity-based Expert Re-routing for Efficient Batch Decoding in MoE Models** — ICLR 2026 — `10.48550/arXiv.2602.07616`
72. **DynamoLLM: Designing LLM Inference Clusters for Performance and Energy Efficiency** — HPCA 2024 — `10.1109/HPCA61900.2025.00102`
73. **All You Need is One: Capsule Prompt Tuning with a Single Vector** — NeurIPS 2025 — `10.48550/arXiv.2510.16670`
74. **Tree of Attributes Prompt Learning for Vision-Language Models** — ICLR 2024 — `10.48550/arXiv.2410.11201`
75. **AdaGen: Workload-Adaptive Cluster Scheduler for Latency-Optimal LLM Inference Serving** — EuroSys 2026 — `10.1145/3767295.3769345`
76. **Rethinking Generative Large Language Model Evaluation for Semantic Comprehension** — ICML 2024 — `10.48550/arXiv.2403.07872`
77. **Asynchronous Verified Semantic Caching for Tiered LLM Architectures** — MLSys 2026 — `10.1145/3805621.3807627`
78. **NeuStream: Bridging Deep Learning Serving and Stream Processing** — EuroSys 2025 — `10.1145/3689031.3717489`
79. **DéjàVu: KV-cache Streaming for Fast, Fault-tolerant Generative LLM Serving** — ICML 2024 — `10.48550/arXiv.2403.01876`
80. **ConServe: Contiguity-Preserving Memory Management for Multi-Turn LLM Serving** — ISCA 2026 — `10.1109/ISCA66397.2026.00075`
81. **AUM: Unleashing the Efficiency Potential of Shared Processors with Accelerator Units for LLM Serving** — HPCA 2026 — `10.1109/HPCA68181.2026.11408539`
82. **MFS: An Efficient Model Family Serving System for LLMs** — EuroSys 2026 — `10.1145/3767295.3769355`
83. **Frontier: Simulating the Next Generation of LLM Inference Systems** — SOSP 2025 — `10.1145/3766882.3767173`
84. **From Exploration to Mastery: Enabling LLMs to Master Tools via Self-Driven Interactions** — ICLR 2024 — `10.48550/arXiv.2410.08197`
85. **KV Cache Transform Coding for Compact Storage in LLM Inference** — ICLR 2025 — `10.48550/arXiv.2511.01815`
86. **Manage the Workloads not the Cluster: Designing a Control Plane for Large-Scale AI Clusters** — MLSys 2025 — `10.1145/3721146.3721937`
87. **BanditSpec: Adaptive Speculative Decoding via Bandit Algorithms** — ICML 2025 — `10.48550/arXiv.2505.15141`
88. **FlexPipe: Adapting Dynamic LLM Serving Through Inflight Pipeline Refactoring in Fragmented Serverless Clusters** — EuroSys 2025 — `10.1145/3767295.3769316`
89. **Cauchy: A Cost-Efficient LLM Serving System through Adaptive Heterogeneous Deployment** — SoCC 2025 — `10.1145/3772052.3772264`
90. **Demystifying Cost-Efficiency in LLM Serving over Heterogeneous GPUs** — ICML 2025 — `10.48550/arXiv.2502.00722`
91. **DeltaZip: Efficient Serving of Multiple Full-Model-Tuned LLMs** — EuroSys 2023 — `10.1145/3689031.3717468`
92. **Rethinking Key-Value Cache Compression Techniques for Large Language Model Serving** — MLSys 2025 — `10.48550/arXiv.2503.24000`
93. **Efficient Deployment of Large Language Model across Cloud-Device Systems** — SoCC 2024 — `10.1109/SOCC62300.2024.10737825`
94. **MoE-Lightning: High-Throughput MoE Inference on Memory-constrained GPUs** — ASPLOS 2024 — `10.1145/3669940.3707267`
95. **Hydra: Scale-out FHE Accelerator Architecture for Secure Deep Learning on FPGA** — HPCA 2025 — `10.1109/HPCA61900.2025.00090`
96. **History Doesn't Repeat Itself but Rollouts Rhyme: Accelerating Reinforcement Learning with RhymeRL** — ASPLOS 2026 — `10.1145/3779212.3790172`
97. **EdgeAgent: Orchestrating On-Device LLM inference for End-User Multi-Agent Systems on CPU-GPU Unified Memory Architectures** — ASPLOS 2026 — `10.1145/3845814.3850072`
98. **LLM-42: Enabling Determinism in LLM Inference with Verified Speculation** — SOSP 2026 — `10.1145/3830418.3843901`
99. **Linux AGX: An Adaptive GPU eXtension to Linux Fair Scheduling for Physical AI and Robotic Systems** — SOSP 2026 — `10.1145/3830418.3843893`
100. **HealthServe: A Public Health-Aware Inference Framework** — SIGMETRICS 2026 — `10.1145/3820171.3806868`

## LLM 推理调度（50）

1. **Preble: Efficient Distributed Prompt Scheduling for LLM Serving** — arXiv preprint 2024 — `2407.00023v2`
2. **Locality-aware Fair Scheduling in LLM Serving** — arXiv preprint 2025 — `2501.14312v1`
3. **Energy-Aware Scheduling for Serverless LLM Serving on Shared GPUs** — ATC 2026 — `2606.30391v2`
4. **Coordinated Scheduling for MoE LLM Serving** — arXiv preprint 2026 — `2606.15177v1`
5. **Kalypso: Relational LLM Serving** — arXiv preprint 2026 — `2607.23815v2`
6. **FREESH: Fair, Resource- and Energy-Efficient Scheduling for LLM Serving on Heterogeneous GPUs** — arXiv preprint 2025 — `2511.00807v2`
7. **DualPace: Decoupled Scheduling and Cooperative GPU--CPU Decoding for LLM Serving** — arXiv preprint 2026 — `2610.33501v1`
8. **Stage-Aware Communication Scheduling for Disaggregated LLM Serving** — arXiv preprint 2026 — `2603.17456v2`
9. **ELIS: Efficient LLM Iterative Scheduling System with Response Length Predictor** — arXiv preprint 2025 — `2505.09142v1`
10. **PackServe: SLO-Aware Request Scheduling for Agentic LLM Serving at Scale** — arXiv preprint 2026 — `2609.33224v1`
11. **Quota-Based Aging for Prediction-Guided Scheduling in LLM Serving** — arXiv preprint 2026 — `2610.17795v1`
12. **ProServe: Unified Multi-Priority Request Scheduling for LLM Serving** — arXiv preprint 2025 — `2512.12928v2`
13. **A Predictive and Synergistic Two-Layer Scheduling Framework for LLM Serving** — arXiv preprint 2025 — `2509.23384v3`
14. **Efficiency and Cost Alignment in Batched LLM Serving via Resource-Fair Scheduling** — arXiv preprint 2026 — `2608.02244v1`
15. **Conveyor: Efficient Tool-aware LLM Serving with Tool Partial Execution** — arXiv preprint 2024 — `2406.00059v2`
16. **Geometry-Aware Online Scheduling for LLM Serving: From Theoretical Bound to System Practice** — arXiv preprint 2026 — `2606.22327v3`
17. **HexAGenT: Efficient Agentic LLM Serving via Workflow- and Heterogeneity-Aware Scheduling** — arXiv preprint 2026 — `2605.16637v1`
18. **Past-Future Scheduler for LLM Serving under SLA Guarantees** — ASPLOS 2025 — `2507.10150v1`
19. **ExaServe: Large-Scale LLM Serving on Exascale HPC Systems** — arXiv preprint 2026 — `2609.10812v2`
20. **BurstGPT: A Real-world Workload Dataset to Optimize LLM Serving Systems** — arXiv preprint 2024 — `2401.17644v5`
21. **PersistentKV: Page-Aware Decode Scheduling for Long-Context LLM Serving on Commodity GPUs** — arXiv preprint 2026 — `2606.26666v2`
22. **Token Latency Fairness: Performance Isolation for Multi-Tenant LLM Serving** — arXiv preprint 2026 — `2609.18112v1`
23. **TimelyLLM: Segmented LLM Serving System for Time-sensitive Robotic Applications** — arXiv preprint 2024 — `2412.18695v1`
24. **TOPAS: Workflow-Aware Prefix-State Scheduling for Multi-Agent LLM Serving** — arXiv preprint 2026 — `2608.25523v1`
25. **Efficient Interactive LLM Serving with Proxy Model-based Sequence Length Prediction** — arXiv preprint 2024 — `2404.08509v2`
26. **HAServe: Horizon-Aware Scheduling and Memory Co-Design for Efficient LLM Serving** — arXiv preprint 2026 — `2605.08581v2`
27. **Trinity: Disaggregating Vector Search from Prefill-Decode Disaggregation in LLM Serving** — arXiv preprint 2025 — `2512.02281v1`
28. **Efficient LLM Serving for Agentic Workflows: A Data Systems Perspective** — arXiv preprint 2026 — `2603.16104v1`
29. **Cross-Model Autoscaling for Shared LLM Serving** — arXiv preprint 2026 — `2609.29160v1`
30. **Astrolabe: Balancing Load in LLM Serving with Randomized Prediction-Guided Scheduling** — ATC 2025 — `2508.03611v3`
31. **FineServe: A Fine-Grained Dataset and Characterization of Global LLM Serving Workloads** — arXiv preprint 2026 — `2607.19349v1`
32. **PrefixBench-H100: Characterizing Prefix Reuse and Time-to-First-Token in H100 LLM Serving** — arXiv preprint 2026 — `2609.19657v1`
33. **BOute: Cost-Efficient LLM Serving with Heterogeneous LLMs and GPUs via Multi-Objective Bayesian Optimization** — MLSys 2026 — `2602.10729v1`
34. **LAPS: A Length-Aware-Prefill LLM Serving System** — arXiv preprint 2026 — `2601.11589v2`
35. **Characterizing High Bandwidth Flash for LLM Serving** — arXiv preprint 2026 — `2609.39131v2`
36. **LLMServingSim 2.0: A Unified Simulator for Heterogeneous and Disaggregated LLM Serving Infrastructure** — arXiv preprint 2026 — `2602.23036v2`
37. **ThunderServe: High-performance and Cost-efficient LLM Serving in Cloud Environments** — MLSys 2025 — `2502.09334v2`
38. **Efficient LLM Serving on Hybrid Real-time and Best-effort Requests** — arXiv preprint 2025 — `2504.09590v1`
39. **DualMap: Enabling Both Cache Affinity and Load Balancing for Distributed LLM Serving** — arXiv preprint 2026 — `2602.06502v1`
40. **EcoServe: Enabling Cost-effective LLM Serving with Proactive Intra- and Inter-Instance Orchestration** — arXiv preprint 2025 — `2504.18154v1`
41. **PAM: Processing Across Memory Hierarchy for Efficient KV-centric LLM Serving System** — arXiv preprint 2026 — `2602.11521v1`
42. **PALS: Power-Aware LLM Serving for Mixture-of-Experts Models** — arXiv preprint 2026 — `2605.21427v1`
43. **Autopoiesis: A Self-Evolving System Paradigm for LLM Serving Under Runtime Dynamics** — arXiv preprint 2026 — `2604.07144v1`
44. **C2CServe: Leveraging NVLink-C2C for Elastic Serverless LLM Serving on MIG** — arXiv preprint 2026 — `2605.19481v1`
45. **Injecting Adrenaline into LLM Serving: Boosting Resource Utilization and Throughput via Attention Disaggregation** — arXiv preprint 2025 — `2503.20552v1`
46. **MuxServe: Flexible Spatial-Temporal Multiplexing for Multiple LLM Serving** — arXiv preprint 2024 — `2404.02015v2`
47. **PEEK: Predictive Queue-Informed KV Cache Management for LLM Serving** — arXiv preprint 2026 — `2607.02525v2`
48. **A Shape-Adaptive Architecture with Disaggregated Quantization for Efficient LLM Serving** — arXiv preprint 2026 — `2610.07443v1`
49. **ENOVA: Autoscaling towards Cost-effective and Stable Serverless LLM Serving** — arXiv preprint 2024 — `2407.09486v1`
50. **NELSSA: A GPU-PNM Heterogeneous System for Mixed-Length LLM Serving via Length-based Request Placement** — arXiv preprint 2026 — `2607.26633v1`

## 视频流 + 卫星/LEO（50）

1. **A control-theoretic simplification of adaptive bitrate (ABR) video streaming** — arXiv preprint 2023 — `2310.00934v3`
2. **Semantic-Aware Adaptive Video Streaming Using Latent Diffusion Models for Wireless Networks** — arXiv preprint 2025 — `2502.05695v3`
3. **Imitation Learning for Adaptive Video Streaming with Future Adversarial Information Bottleneck Principle** — arXiv preprint 2024 — `2405.03692v1`
4. **DIGITWISE: Digital Twin-based Modeling of Adaptive Video Streaming Engagement** — arXiv preprint 2025 — `2510.13267v1`
5. **Video Streaming Over QUIC: A Comprehensive Study** — arXiv preprint 2025 — `2505.21769v2`
6. **EVAN: Evolutional Video Streaming Adaptation via Neural Representation** — arXiv preprint 2024 — `2406.02557v1`
7. **A Global Perspective on the Past, Present, and Future of Video Streaming over Starlink** — arXiv preprint 2024 — `2409.09846v1`
8. **LiveVV: Human-Centered Live Volumetric Video Streaming System** — arXiv preprint 2023 — `2310.08205v2`
9. **Improving ABR Performance for Short Video Streaming Using Multi-Agent Reinforcement Learning with Expert Guidance** — arXiv preprint 2023 — `2304.04637v1`
10. **LL-GABR: Energy Efficient Live Video Streaming Using Reinforcement Learning** — arXiv preprint 2024 — `2402.09392v1`
11. **SafeLink-Agent: Agentic Maintenance for Adaptive Bitrate Controllers over Dynamic Starlink Networks** — arXiv preprint 2026 — `2608.28194v1`
12. **SafeSABR: Risk-Calibrated Adaptive Bitrate Streaming over Starlink Networks** — arXiv preprint 2026 — `2605.23560v2`
13. **Goal-Oriented Semantic Communication for Wireless Video Transmission via Generative AI** — arXiv preprint 2025 — `2502.20927v1`
14. **Real-time Extended Reality Video Transmission Optimization Based on Frame-priority Scheduling** — arXiv preprint 2024 — `2402.01180v2`
15. **AnalogDepth: Multi-view Geometry from FPV drones under Analog Video Transmission** — arXiv preprint 2026 — `2609.24312v1`
16. **Semantic-Aware Neural Video Codec for Error-Resilient Low-Latency Transmission** — arXiv preprint 2026 — `2609.16279v1`
17. **Quality of Experience Optimization for Real-time XR Video Transmission with Energy Constraints** — arXiv preprint 2024 — `2405.07689v1`
18. **Real-Time Transmission of Uncompressed High-Definition Video Via A VCSEL-Based Optical Wireless Link With Ultra-Low Latency** — arXiv preprint 2025 — `2507.23746v1`
19. **Multiple description video coding for real-time applications using HEVC** — arXiv preprint 2023 — `2303.05843v2`
20. **5G Aero: A Prototyping Platform for Evaluating Aerial 5G Communications** — arXiv preprint 2025 — `2506.08386v1`
21. **Architecture Design of a Networked Music Performance Platform for a Chamber Choir** — arXiv preprint 2023 — `2310.17388v1`
22. **Simulative Comparison of DVB-S2X/RCS2 and 3GPP 5G NR NTN Technologies in a Geostationary Satellite Scenario** — arXiv preprint 2025 — `2502.13704v1`
23. **Joint Optimization of Handoff and Video Rate in LEO Satellite Networks** — INFOCOM 2025 — `2504.04586v2`
24. **VISTA: A Benchmark for Real-Time Video Streaming under Network Impairments in Surgical Teleoperation** — arXiv preprint 2026 — `2605.08886v1`
25. **Satellite Streaming Video QoE Prediction: A Real-World Subjective Database and Network-Level Prediction Models** — arXiv preprint 2024 — `2410.13952v1`
26. **Unleashing Collaborative Computing for Adaptive Video Streaming with Multi-objective Optimization in Satellite Terrestrial Networks** — arXiv preprint 2024 — `2408.13512v1`
27. **End-to-End Performance of Video Streaming With MPEG-DASH Over Satellite 5G IAB Networks** — arXiv preprint 2026 — `2604.16634v1`
28. **Enabling High Error Tolerance in Satellite Video Transmissions by Generative Semantic Communication** — arXiv preprint 2026 — `2604.25184v1`
29. **Dissecting the Performance of Satellite Network Operators** — CoNEXT 2023 — `2310.15808v2`
30. **StarStream: Live Video Analytics over Space Networking** — arXiv preprint 2025 — `2508.14222v1`
31. **Robust Live Streaming over LEO Satellite Constellations: Measurement, Analysis, and Handover-Aware Adaptation** — arXiv preprint 2025 — `2508.13402v1`
32. **Watching Stars in Pixels: The Interplay of Traffic Shaping and YouTube Streaming QoE over GEO Satellite Networks** — arXiv preprint 2023 — `2309.00686v1`
33. **Media-over-Multipath-QUIC for Realtime Video Applications** — arXiv preprint 2026 — `2608.10741v1`
34. **Securing Satellite Communications: Real-Time Video Encryption Scheme on Satellite Payloads** — arXiv preprint 2025 — `2503.16287v1`
35. **Dynamic Pacing for Real-time Satellite Traffic** — arXiv preprint 2025 — `2507.09798v2`
36. **Broadened-beam Uniform Rectangular Array Coefficient Design in LEO SatComs Under Quality of Service and Constant Modulus Constraints** — arXiv preprint 2024 — `2403.07435v3`
37. **Multipath Adaptive Video Streaming with Multiple Description Neural Video Codec over 5G Networks** — arXiv preprint 2026 — `2608.22891v1`
38. **QSMVM: QoS-aware and social-aware multimetric routing protocol for video-streaming services over MANETs** — arXiv preprint 2023 — `2312.07414v1`
39. **Deep Adaptive Rate Allocation in Volatile Heterogeneous Wireless Networks** — arXiv preprint 2026 — `2603.20926v1`
40. **Swarm: Cost-Efficient Video Content Distribution with a Peer-to-Peer System** — arXiv preprint 2024 — `2401.15839v1`
41. **Deep Reinforcement Learning with Importance Weighted A3C for QoE enhancement in Video Delivery Services** — arXiv preprint 2023 — `2304.04527v1`
42. **XLR (piXel Loss Rate): a Lightweight Indicator to Measure Video QoE in IP Networks** — arXiv preprint 2024 — `2402.05820v1`
43. **ProCAVE: A Self-Adaptive, Full-Lifecycle Edge Caching Framework for Video Streaming via Predictive Bandwidth Estimation and Preference-Aware Deep Reinforcement Learning** — arXiv preprint 2026 — `2608.03313v1`
44. **BOLA360: Near-optimal View and Bitrate Adaptation for 360-degree Video Streaming** — arXiv preprint 2023 — `2309.04023v2`
45. **Objective Video Quality Assessment in FWA-Based Over-the-Top Content Delivery Across Open Source 5G Networks** — arXiv preprint 2026 — `2609.25423v1`
46. **Stateless Network-Aware Adaptive Bitrate Streaming over IPFS** — arXiv preprint 2026 — `2606.29574v1`
47. **Understanding User Behavior in Volumetric Video Watching: Dataset, Analysis and Prediction** — ACM MM 2023 — `2308.07578v2`
48. **Video Quality Monitoring for Remote Autonomous Vehicle Control** — arXiv preprint 2025 — `2506.03166v1`
49. **A 3D Framework for Improving Low-Latency Multi-Channel Live Streaming** — arXiv preprint 2024 — `2410.16284v2`
50. **Towards Low-Latency and Energy-Efficient Hybrid P2P-CDN Live Video Streaming** — arXiv preprint 2024 — `2403.16985v1`

## 安全（50）

1. **Automatic and Universal Prompt Injection Attacks against Large Language Models** — arXiv preprint 2024 — `2403.04957v1`
2. **Detecting Prompt Injection Attacks Against Application Using Classifiers** — arXiv preprint 2025 — `2512.12583v1`
3. **SecAlign: Defending Against Prompt Injection with Preference Optimization** — CCS 2024 — `2410.05451v3`
4. **StruQ: Defending Against Prompt Injection with Structured Queries** — USENIX Security 2024 — `2402.06363v2`
5. **WebInject: Prompt Injection Attack to Web Agents** — arXiv preprint 2025 — `2505.11717v4`
6. **UniGuardian: A Unified Defense for Detecting Prompt Injection, Backdoor Attacks and Adversarial Attacks in Large Language Models** — arXiv preprint 2025 — `2502.13141v2`
7. **Beyond Instruction Override: Benchmarking Indirect Prompt Injection with Task-Tampering Attacks** — arXiv preprint 2026 — `2611.07640v1`
8. **Backdoor-Powered Prompt Injection Attacks Nullify Defense Methods** — arXiv preprint 2025 — `2510.03705v1`
9. **LongPIBench: A Long-Context Benchmark for Prompt Injection** — arXiv preprint 2026 — `2608.28411v1`
10. **Maatphor: Automated Variant Analysis for Prompt Injection Attacks** — arXiv preprint 2023 — `2312.11513v1`
11. **Latent Jailbreak: A Benchmark for Evaluating Text Safety and Output Robustness of Large Language Models** — arXiv preprint 2023 — `2307.08487v3`
12. **Gradient Cuff: Detecting Jailbreak Attacks on Large Language Models by Exploring Refusal Loss Landscapes** — NeurIPS 2024 — `2403.00867v3`
13. **Jailbreak Distillation: Renewable Safety Benchmarking** — arXiv preprint 2025 — `2505.22037v1`
14. **JailbreakBench: An Open Robustness Benchmark for Jailbreaking Large Language Models** — NeurIPS 2024 — `2404.01318v5`
15. **LLMs Can Defend Themselves Against Jailbreaking in a Practical Manner: A Vision Paper** — arXiv preprint 2024 — `2402.15727v2`
16. **TombRaider: Entering the Vault of History to Jailbreak Large Language Models** — arXiv preprint 2025 — `2501.18628v2`
17. **EnJa: Ensemble Jailbreak on Large Language Models** — arXiv preprint 2024 — `2408.03603v1`
18. **Jailbreaking Attack against Multimodal Large Language Model** — arXiv preprint 2024 — `2402.02309v1`
19. **Foot In The Door: Understanding Large Language Model Jailbreaking via Cognitive Psychology** — arXiv preprint 2024 — `2402.15690v1`
20. **Jailbreaking Large Language Models with Morality Attacks** — arXiv preprint 2026 — `2604.17053v1`
21. **Off-Path TCP Hijacking in Wi-Fi Networks: A Packet-Size Side Channel Attack** — arXiv preprint 2024 — `2402.12716v5`
22. **A Practical Deep Learning-Based Acoustic Side Channel Attack on Keyboards** — S&P 2023 — `2308.01074v1`
23. **Beyond the Bridge: Contention-Based Covert and Side Channel Attacks on Multi-GPU Interconnect** — arXiv preprint 2024 — `2404.03877v2`
24. **PREFENDER: A Prefetching Defender against Cache Side Channel Attacks as A Pretender** — arXiv preprint 2023 — `2307.06756v1`
25. **Timing the Transient Execution: A New Side-Channel Attack on Intel CPUs** — arXiv preprint 2023 — `2304.10877v1`
26. **Application-Specific Power Side-Channel Attacks and Countermeasures: A Survey** — arXiv preprint 2025 — `2512.23785v1`
27. **A Survey on Acoustic Side Channel Attacks on Keyboards** — arXiv preprint 2023 — `2309.11012v2`
28. **THOR: A Non-Speculative Value Dependent Timing Side Channel Attack Exploiting Intel AMX** — arXiv preprint 2025 — `2502.17658v1`
29. **Acoustic Side Channel Attack on Keyboards Based on Typing Patterns** — arXiv preprint 2024 — `2403.08740v1`
30. **A Survey of Side-Channel Attacks in Context of Cache -- Taxonomies, Analysis and Mitigation** — arXiv preprint 2023 — `2312.11094v1`
31. **Protocol-Aware Firmware Rehosting for Effective Fuzzing of Embedded Network Stacks** — CCS 2025 — `2509.13740v1`
32. **Poster: Machine Learning for Vulnerability Detection as Target Oracle in Automated Fuzz Driver Generation** — arXiv preprint 2025 — `2505.01123v1`
33. **Vulnerability Detection Through an Adversarial Fuzzing Algorithm** — arXiv preprint 2023 — `2307.11917v1`
34. **Systematic Meets Unintended: Prior Knowledge Adaptive 5G Vulnerability Detection via Multi-Fuzzing** — arXiv preprint 2023 — `2305.08039v2`
35. **TransferFuzz: Fuzzing with Historical Trace for Verifying Propagated Vulnerability Code** — arXiv preprint 2024 — `2411.18347v1`
36. **Formal and Fuzzing Amplification: Targeting Vulnerability Detection in 5G and Beyond** — arXiv preprint 2023 — `2307.05758v1`
37. **Multi-Agent Collaborative Fuzzing with Continuous Reflection for Smart Contracts Vulnerability Detection** — arXiv preprint 2025 — `2511.12164v1`
38. **AI-Driven Fuzzing for Vulnerability Assessment of 5G Traffic Steering Algorithms** — arXiv preprint 2026 — `2601.18690v2`
39. **Fixing Security Vulnerabilities with AI in OSS-Fuzz** — arXiv preprint 2024 — `2411.03346v2`
40. **WhisperFuzz: White-Box Fuzzing for Detecting and Locating Timing Vulnerabilities in Processors** — arXiv preprint 2024 — `2402.03704v2`
41. **GoSurf: Identifying Software Supply Chain Attack Vectors in Go** — arXiv preprint 2024 — `2407.04442v2`
42. **SoK: Analysis of Software Supply Chain Security by Establishing Secure Design Properties** — arXiv preprint 2024 — `2406.10109v1`
43. **Maven-Hijack: Software Supply Chain Attack Exploiting Packaging Order** — arXiv preprint 2024 — `2407.18760v4`
44. **What Gets Measured Gets Managed: Mitigating Supply Chain Attacks with a Link Integrity Management System** — CCS 2025 — `2509.14583v1`
45. **Reinforcement Learning for Supply Chain Attacks Against Frequency and Voltage Control** — ICML 2023 — `2309.05814v1`
46. **Finding Software Supply Chain Attack Paths with Logical Attack Graphs** — arXiv preprint 2025 — `2511.11171v1`
47. **Software supply chain: review of attacks, risk assessment strategies and security controls** — arXiv preprint 2023 — `2305.14157v1`
48. **Journey to the Center of Software Supply Chain Attacks** — arXiv preprint 2023 — `2304.05200v1`
49. **Robot Collapse: Supply Chain Backdoor Attacks Against VLM-based Robotic Manipulation** — arXiv preprint 2024 — `2411.11683v7`
50. **SOK: A Taxonomy of Attack Vectors and Defense Strategies for Agentic Supply Chain Runtime** — ICLR 2026 — `2602.19555v2`

总计：250 篇论文。
