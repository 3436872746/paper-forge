> 中文版 · English: [cards_batch4.md](cards_batch4.md)

### 1. Batched in Back: Characterizing and Optimizing Offline LLM Inference in Production with ACDC (SOSP 2026)
- **问题（Problem）：** 离线推理最多吞掉生产环境中 30% 的 GPU，却研究不足；在线与离线框架都没有利用它的特性。
- **假设（Assumption）：** 离线工作负载本质上是确定性的、面向吞吐的；在线 prefill 会留下容量气泡（capacity bubble），离线工作可以从中收获。
- **机制（Mechanism）：** 任务感知的服务（task-aware serving），贯穿资源编排、缓存管理与执行流；外加填充 prefill 气泡的混合服务。
- **证据（Evidence）：** trace — 1.5M 个任务 / 23B 次请求，文本与多模态；为期 3 个月的生产部署。
- **边界（Boundary）：** 摘要未说明
- **可偷的一招（Stealable move）：** 在提出混合设计之前，先量化*另一类*工作负载的空闲比例（38.3% 的 prefill 气泡），把它当作一次实测机会。
- **一句话卖点（Pitch）：** 离线推理有可利用的结构；任务感知服务加上气泡收获，可把成本效率提升最高 3.9x。

### 2. Oaken: Fast and Efficient LLM Serving with Online-Offline Hybrid KV Cache Quantization (ISCA 2025)
- **问题（Problem）：** 批处理使注意力（attention）受限于带宽；HBM 带宽的代价是容量，而更长的上下文会膨胀 KV cache。
- **假设（Assumption）：** 混合精度 KV 量化有效，但在线离群点检测（outlier detection）的成本太高，无法自偿。
- **机制（Mechanism）：** 算法-硬件协同设计：离线设定离群点阈值，再在在线阶段应用（摘要在此处被截断）。
- **证据（Evidence）：** 摘要未说明
- **边界（Boundary）：** 摘要未说明
- **可偷的一招（Stealable move）：** 把昂贵的自适应决策（离群点检测）移出关键路径——离线预先算好它的阈值——并明确把它说成这项取舍。
- **一句话卖点（Pitch）：** 在线支付离群点检测的代价会抵消量化 KV 缓存的好处；把阈值放到离线设定，可同时找回精度与速度。

### 3. MagicDec: Breaking the Latency-Throughput Tradeoff for Long Context Generation with Speculative Decoding (ICLR 2024)
- **问题（Problem）：** 长上下文服务既需要低延迟又需要高吞吐；而常识把投机解码（speculative decoding）限制在小批次上。
- **假设（Assumption）：** 瓶颈随批大小与序列长度而转移，因此决定加速的是起草（drafting）策略，而不只是接受率。
- **机制（Mechanism）：** 瓶颈转移分析；带稀疏 KV cache 的草稿模型以缓解 KV 瓶颈；用理论模型选出最优起草策略。
- **证据（Evidence）：** 真实系统 — Llama3.1-8B，批大小 32–256，多种硬件与任务类型，最高 2.51x 加速。
- **边界（Boundary）：** 结论限定在中等至长序列；除此之外摘要未说明。
- **可偷的一招（Stealable move）：** 推导一个小型解析模型，在运行时挑选配置，而不是为平均情况调好一套配置。
- **一句话卖点（Pitch）：** 只要控制住草稿模型的 KV 占用，投机解码在高批次与长上下文下仍然胜出。

### 4. EPIC: Efficient Position-Independent Caching for Serving Large Language Models (ICML 2024)
- **问题（Problem）：** 上下文缓存需要精确的前缀匹配，因此错过 few-shot 与 RAG 场景——在这些场景中，一份不可变文档跟在各不相同的前缀之后。
- **假设（Assumption）：** 只要校正注意力汇（attention sink）效应，KV 向量就可以与位置无关地模块化复用。
- **机制（Mechanism）：** 形式化位置无关缓存（position-independent caching）；LegoLink 以极小的计算量缓解每份文档开头处不恰当的注意力汇效应。
- **证据（Evidence）：** 真实系统 — 实验报告 TTFT 最多改善 8x、吞吐 7x，精度损失可忽略甚至为零；数据集未说明。
- **边界（Boundary）：** 摘要未说明
- **可偷的一招（Stealable move）：** 给你放宽条件所引入的精度伪影命名（"注意力汇"），再以一个命名的算法去修复它——那才是可被审阅的贡献。
- **一句话卖点（Pitch）：** 前缀精确缓存浪费了本可复用的文档；修好注意力汇，KV 复用就与位置无关，首 token 快 8x。

### 5. The VLLM Safety Paradox: Dual Ease in Jailbreak Attack and Defense (NeurIPS 2024)
- **问题（Problem）：** 越狱（jailbreak）与防御在基准上都接近饱和——这种"双高"悖论说明评测本身出了问题。
- **假设（Assumption）：** 视觉输入导致了易受攻击；防御之所以得高分，部分来自过度审慎（对良性输入也拒答）。
- **机制（Mechanism）：** 把易受攻击性归因于视觉输入；指出过度审慎；提出 LLM-Pipeline，复用 LLM 护栏（guardrail）作为 VLLM 前置检测器；并证明两种标准越狱评测只是偶然一致（chance-agree）。
- **证据（Evidence）：** 基准评测；数据集未说明。
- **边界（Boundary）：** 摘要未说明
- **可偷的一招（Stealable move）：** 先审计指标本身——证明两种被接受的评测协议只是偶然一致——再去相信那些饱和的数字。
- **一句话卖点（Pitch）：** 防御看起来强，是因为它们过度拒答、也因为基准不可靠；借用 LLM 护栏两者都能修。

### 6. VectorLiteRAG: Latency-Aware and Fine-Grained Resource Partitioning for Efficient RAG (HPCA 2025)
- **问题（Problem）：** 纯 CPU 的向量检索在大规模高维索引上很慢；而把检索器与 LLM 共置于 GPU 上，又会与 KV cache 和计算争抢资源。
- **假设（Assumption）：** 联合建模检索延迟与命中率分布，可得到一个使批处理稳定的最优 CPU/GPU 索引划分。
- **机制（Mechanism）：** 访问模式分析加性能估计；在建模得到的切分点处把索引一分为二；以低开销的在线索引更新跟踪漂移。
- **证据（Evidence）：** 已报告评测（摘要被截断）；数据集未说明。
- **边界（Boundary）：** 摘要未说明
- **可偷的一招（Stealable move）：** 把同一个数据结构跨两台设备切分，切分点通过建模访问偏斜的*分布*而非其均值来选取。
- **一句话卖点（Pitch）：** RAG 的争抢是划分问题：对 CPU 与 GPU 之间的延迟和命中率偏斜建模，能让检索满足 SLO。

### 7. Sutradhara: An Intelligent Orchestrator-Engine Co-design for Tool-based Agentic Inference (ASPLOS 2026)
- **问题（Problem）：** 智能体（agentic）请求把 LLM 调用与工具串成链，于是首 token 渲染（First-Token-Rendered）延迟被工具调用主导（生产规模下占 30–85%）。
- **假设（Assumption）：** 根因是编排器（orchestrator）与 LLM 引擎之间的黑盒边界，它阻断了跨层优化。
- **机制（Mechanism）：** 一层薄 API：支持工具感知的 prompt 切分，让工具执行与 prefill 重叠；在 decode 期间流式派发工具；并利用语义提示做编排器感知的缓存管理。
- **证据（Evidence）：** trace — 生产规模请求分析；在 vLLM 上实现；收益数字在摘要中被截断。
- **边界（Boundary）：** 摘要未说明
- **可偷的一招（Stealable move）：** 在优化所有人都在优化的那个 LLM 引擎之前，先测清端到端延迟到底花在哪里（工具耗时占比）。
- **一句话卖点（Pitch）：** 智能体延迟出在工具调用与被打断的缓存复用上；协同设计编排器与引擎能把两者都找回来。

### 8. MoESD: Unveil Speculative Decoding's Potential for Accelerating Sparse MoE (NeurIPS 2025)
- **问题（Problem）：** 人们认为投机解码只对稠密模型高效，于是 MoE 服务一直未被优化。
- **假设（Assumption）：** 在中等批大小下，MoE 从投机解码（SD）的获益大于稠密模型，且随 MoE 变得更稀疏，获益窗口变宽。
- **机制（Mechanism）：** 对这项取舍做理论建模；引入"目标效率"（target efficiency），以刻画接受率所掩盖的工作负载与架构效应。
- **证据（Evidence）：** 真实系统 — 在不同 GPU 上的实验，Qwen2-57B-A14B 在中等批次下最高 2.29x；理论得到验证。
- **边界（Boundary）：** 摘要未说明
- **可偷的一招（Stealable move）：** 引入一个指标，揭示本领域最爱用的指标（接受率）无法解释的东西。
- **一句话卖点（Pitch）：** 稀疏 MoE 从投机解码获益多于稠密模型，而且合适的批次窗口随稀疏度增大而变宽。

### 9. Symbiotic MLLM Serving: Dynamically Balancing Parallelism Across GPUs and Resources Within GPUs (ISCA 2026)
- **问题（Problem）：** MLLM 系统预先固定编解码器（encoder/decoder）的并行方式与 GPU 分配，忽略了编码器虽小却依赖输入且计算密集。
- **假设（Assumption）：** 编码器与解码器在阶段与内核层面互补，因此工作守恒（work-conserving）的共享加上运行时重规划优于静态放置。
- **机制（Mechanism）：** GPU 内引擎在计算受限的编码器内核与内存受限的解码器内核之间共享 SM 与 HBM；GPU 间引擎通过 Performance Atlas 在运行时选择数据/张量并行，切换代价近乎为零。
- **证据（Evidence）：** 真实系统 — 三个最先进 MLLM 对比强基线；平均 TTFT 最高 5.1x，TPOT 3.0x。
- **边界（Boundary）：** 摘要未说明
- **可偷的一招（Stealable move）：** 用一张按运行时输入特征索引的实测方案查找表（Atlas）取代预先确定的并行决策。
- **一句话卖点（Pitch）：** 编码器与解码器的瓶颈正好相反；以工作守恒方式共享 GPU 并按批次重规划，优于静态放置。

### 10. DynaPipe: Dynamic Layer Redistribution for Efficient Serving of LLMs with Pipeline Parallelism (NeurIPS 2025)
- **问题（Problem）：** 即使层划分均匀，流水线仍会留下气泡，因为尾段还要做采样与后处理。
- **假设（Assumption）：** 只要层的移动能在不停顿的情况下完成，这种不均衡就足够可预测，可在运行时校正。
- **机制（Mechanism）：** 由实时执行延迟预测驱动的动态层重分配，外加一个异步 KV cache 迁移协调器以实现非阻塞移动。
- **证据（Evidence）：** 真实系统 — 有代表性的 LLM，平均端到端延迟比 SOTA 流水线并行系统低 8%–41%。
- **边界（Boundary）：** 摘要未说明
- **可偷的一招（Stealable move）：** 为每个阶段超出所建模算子的"额外工作"（最后阶段的采样）计价，而不是假设成本均匀。
- **一句话卖点（Pitch）：** 流水线气泡来自尾段没被计入的工作；预测延迟并异步移动层就能把它们合上。

### 11. SERE: Similarity-based Expert Re-routing for Efficient Batch Decoding in MoE Models (ICLR 2026)
- **问题（Problem）：** MoE 的批解码激活了过多专家（expert），拖慢了内存受限的解码阶段。
- **假设（Assumption）：** 一批中不同 token 所选的专家冗余度足够高，可以按相似度合并而不损失能力。
- **机制（Mechanism）：** 把 token 从次要专家改路由到最相似的主专家；利用相似度模式保留关键专家；自研 CUDA 内核，在 vLLM 中只需改一行。
- **证据（Evidence）：** 真实系统 — 复杂推理基准，最高 2.0x 加速，质量损失极小。
- **边界（Boundary）：** 避免静态剪枝或合并；跳过是动态的、批级别的。
- **可偷的一招（Stealable move）：** 把这项优化做成对现有服务引擎的一行式替换；采纳成本本身成为论证的一部分。
- **一句话卖点（Pitch）：** 杠杆是批级别的专家冗余，而非逐 token 路由；基于相似度的改路由让 MoE 解码速度翻倍。

### 12. DynamoLLM: Designing LLM Inference Clusters for Performance and Energy Efficiency (HPCA 2024)
- **问题（Problem）：** 在耗电的 GPU 上做受 SLO 约束的 LLM 推理，既浪费能源又排放碳。
- **假设（Assumption）：** 异构的计算特性加上负载波动，形成一个值得动态搜索的配置空间（实例、并行度、GPU 频率）。
- **机制（Mechanism）：** 自动且动态地重配服务集群，在满足延迟 SLO 的前提下优化能耗。
- **证据（Evidence）：** 服务级评测 — 节省 52% 能耗、减少 38% 运营碳排放、客户成本降低 61%，且满足 SLO。
- **边界（Boundary）：** 摘要未说明
- **可偷的一招（Stealable move）：** 为每种配置同时报告成本/碳排与延迟，让效率主张成为三方取舍，而不是一句加速。
- **一句话卖点（Pitch）：** 能耗是一等服务目标；对实例、并行度与频率做动态重配，可在一半能耗下满足 SLO。

### 13. All You Need is One: Capsule Prompt Tuning with a Single Vector (NeurIPS 2025)
- **问题（Problem）：** prompt 调优需要在 prompt 长度上做网格搜索、需要大量 token，而任务感知的 prompt 不携带任何实例感知信息。
- **假设（Assumption）：** 在最前位置加入实例语义（"注意力锚点"）即可提升效果，且无需额外微调。
- **机制（Mechanism）：** 胶囊 prompt 调优（Capsule Prompt-Tuning）把实例感知与任务感知的引导融合为一个几乎无参数的胶囊 prompt。
- **证据（Evidence）：** 已报告实证结果（摘要被截断）；数据集未说明。
- **边界（Boundary）：** 摘要未说明
- **可偷的一招（Stealable move）：** 把一个观察到的位置效应（"注意力锚点"）变成设计约束，再把产物收缩到满足该约束的最小形式。
- **一句话卖点（Pitch）：** 序列开头的一个实例感知胶囊向量，胜过精心搜索出的长 prompt，并彻底免去 prompt 长度调优。

### 14. Tree of Attributes Prompt Learning for Vision-Language Models (ICLR 2024)
- **问题（Problem）：** prompt 学习只把可学习 token 追加在类名之后，忽略了类名所隐含的丰富语境。
- **假设（Assumption）：** 由 LLM 生成的结构化属性层次，比非结构化描述迁移得更好——前提是与实际图像对齐。
- **机制（Mechanism）：** LLM 为每个类别生成概念–属性–描述树；文本与视觉 prompt 学习该层次；视觉条件池化（vision-conditional pooling）抽取实例专属的文本特征以修正不对齐。
- **证据（Evidence）：** 真实系统 — 11 个数据集；零样本 base-to-novel 泛化、跨数据集迁移、few-shot 分类。
- **边界（Boundary）：** 摘要未说明
- **可偷的一招（Stealable move）：** 用显式层次取代生成提示的扁平列表，再为"这些提示对当前输入是错的"这一情况加一个条件模块。
- **一句话卖点（Pitch）：** 从 LLM 中蒸馏出概念–属性–描述树，给视觉-语言 prompt 带来的是结构，而不只是更多词。

### 15. AdaGen: Workload-Adaptive Cluster Scheduler for Latency-Optimal LLM Inference Serving (EuroSys 2026)
- **问题（Problem）：** 集群调度器只为内存做负载均衡，忽略了跨迭代的 token 布局才是驱动延迟的因素。
- **假设（Assumption）：** 每个实例的"计算布局"（compute layout）才是真正的决策变量，且它可以在不实际执行请求的情况下被估计出来。
- **机制（Mechanism）：** 多步调度：按 prefill/decode 长度分类、均衡负载、再有选择地分布式执行；每一步都细化布局；用基于模拟的估计器取代真实执行。
- **证据（Evidence）：** trace — 生产工作负载；SLO 达成率最高 3.6x、成本效率 2x，并展示了可扩展性。
- **边界（Boundary）：** 摘要未说明
- **可偷的一招（Stealable move）：** 把廉价的模拟器放进调度器的内循环，这样评估候选布局不必真的把它跑一遍。
- **一句话卖点（Pitch）：** 负载均衡没抓住真正的旋钮；按预测的计算布局调度可把 SLO 达成率提升 3.6x。

### 16. Rethinking Generative Large Language Model Evaluation for Semantic Comprehension (ICML 2024)
- **问题（Problem）：** 多项选择问答（MCQA）是默认指标，但它与模型回答开放式问题的实际情况并不相符。
- **假设（Assumption）：** 由强模型裁判的两两对战、再以 Elo 聚合，比 MCQA 上的准确率更贴近真实使用。
- **机制（Mechanism）：** RWQ-Elo 评分：24 个 LLM 在由真实用户问题构成的新基准上两两对战，由 GPT-4 裁判，按 Elo 评级。
- **证据（Evidence）：** trace/基准 — 24 个模型、分析了 11 个基准、新 RWQ 基准含 20,772 条真实用户提问。
- **边界（Boundary）：** 摘要未说明
- **可偷的一招（Stealable move）：** 围绕真实记录的用户查询而非构造的测试项来搭建评测框架，并把排行榜稳定性作为一个结果来报告。
- **一句话卖点（Pitch）：** MCQA 误表了生成质量；在 20,772 条真实用户问题上的 Elo 给出更稳定、更忠实的排行榜。

### 17. Asynchronous Verified Semantic Caching for Tiered LLM Architectures (MLSys 2026)
- **问题（Problem）：** 单一嵌入相似度（embedding-similarity）阈值同时管着静态与动态两层缓存，被迫在精确率与覆盖率之间取舍。
- **假设（Assumption）：** 近失配匹配（near-miss）可以由 LLM 裁判在关键路径之外裁决，而不改变服务语义。
- **机制（Mechanism）：** Krites 在关键路径上表现为标准阈值策略；当最近的静态邻居略低于阈值时，它异步询问 LLM 裁判，把获准的匹配提升进动态缓存。
- **证据（Evidence）：** 模拟 — 基于 oracle 的 trace 驱动，对话与搜索负载；精选静态答案最多多出 2.4x 和 3.9x。
- **边界（Boundary）：** 带 oracle 裁判的 trace 驱动模拟，不是生产部署。
- **可偷的一招（Stealable move）：** 让快路径与基线逐字节相同，把所有改进放进异步旁路——论文据此可以主张零回退。
- **一句话卖点（Pitch）：** 把校验移出关键路径：异步 LLM 裁判扩大安全缓存复用，却不改变任何服务决策。

### 18. NeuStream: Bridging Deep Learning Serving and Stream Processing (EuroSys 2025)
- **问题（Problem）：** 带控制流（循环、switch/merge）的 DNN 会条件性地执行子模型，因此整模型级别的请求批处理效率低下。
- **假设（Assumption）：** 把推理重构为由模块构成的数据流，就允许在模块粒度上批处理并获得更好的资源分配。
- **机制（Mechanism）：** 把工作流分解为组成一条流的模块的编程模型与运行时；两级调度在 SLO 下为每个模块选择批次与资源。
- **证据（Evidence）：** 真实系统 — 包括 LLM 与扩散模型在内的现代 DNN；有效吞吐（goodput）优于 SOTA 服务系统（未给出数字）。
- **边界（Boundary）：** 摘要未说明
- **可偷的一招（Stealable move）：** 从邻近领域引入一个抽象（流处理），并说明它让"批处理粒度"这个问题变得自然。
- **一句话卖点（Pitch）：** 带控制流的 DNN 打破了整模型批处理；模块粒度的流式处理加两级调度把有效吞吐找回来。

### 19. DéjàVu: KV-cache Streaming for Fast, Fault-tolerant Generative LLM Serving (ICML 2024)
- **问题（Problem）：** 分布式 LLM 服务受困于三件事：prompt/token 双峰延迟造成的流水线气泡、GPU 内存过度预留、以及缓慢的故障恢复。
- **假设（Assumption）：** 只要 cache 在设备间移动得足够快，一个原语——廉价的 KV cache 流式传输——就能同时解决这三者。
- **机制（Mechanism）：** DéjàVuLib 流式库，用于 prompt-token 分离（disaggregation）、为省内存的微批交换（microbatch swapping）、以及为容错的状态复制。
- **证据（Evidence）：** 真实系统 — 跨云部署的一系列大模型；未给出量化结果。
- **边界（Boundary）：** 摘要未说明
- **可偷的一招（Stealable move）：** 找出一个底层原语，并证明它解决了三个看似无关的系统问题——这是系统论文最有力的框架。
- **一句话卖点（Pitch）：** 快速的 KV cache 流式传输是多用途原语：消除流水线气泡、压缩内存过度预留、并支撑复制。

### 20. ConServe: Contiguity-Preserving Memory Management for Multi-Turn LLM Serving (ISCA 2026)
- **问题（Problem）：** PagedAttention 消除了碎片，但把虚拟地址打散，在多轮服务中增加地址转换开销与编程复杂度。
- **假设（Assumption）：** 真正的约束是转换局部性，而非单纯的碎片；可以在虚拟层面保持连续、在物理层面允许碎片。
- **机制（Mechanism）：** 为每次会话预留一段连续的虚拟切片，通过 CUDA VMM 按需映射物理页，并以惰性的免拷贝重映射来调整切片大小。
- **证据（Evidence）：** 真实系统 — 多种模型与负载；相比 vLLM、vAttention-Turn、vAttention-Conv，TTFT 分别最多低 74.4/43.4/19.1%，吞吐分别最多高 35.1/15.6/12.1%。
- **边界（Boundary）：** 摘要未说明
- **可偷的一招（Stealable move）：** 把虚拟视图与物理视图分开，并论证一个此前"已解决"的问题（分页）其实是在错误的层次上解决的。
- **一句话卖点（Pitch）：** 分页修好了碎片，却破坏了转换局部性；给每次会话一段连续的虚拟切片，两者都找回来。
