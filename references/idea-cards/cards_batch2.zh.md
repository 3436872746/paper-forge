> 中文版 · English: [cards_batch2.md](cards_batch2.md)

### 1. ORCHES: Orchestrated Test-Time-Compute-based LLM Reasoning on Collaborative GPU-PIM HEterogeneous System (MICRO 2025)
- **问题（Problem）**：test-time-compute 流水线在边缘设备上因可变的并行度、分支依赖与分支剪枝而成为延迟瓶颈。
- **假设（Assumption）**：LLM 是内存受限的，因此存内计算（processing-in-memory）可以减少数据搬运。
- **机制（Mechanism）**：GPU–PIM 协同，配合自适应工作负载分配、基于推测的分支感知流水线、碎片感知的内存组织。
- **证据（Evidence）**：报告了实验结果，但摘要在句中截断；类型与数据集摘要未说明。
- **边界（Boundary）**：摘要未说明
- **可偷的一招（Stealable move）**：以“三道壁垒”的分类法开场，然后每道壁垒恰好给一个创新。
- **一句话卖点（Pitch）**：指出 TTC 流水线的三道结构性壁垒，并为每道配一个 GPU–PIM 协同设计的解法。

### 2. Bridging the Gap Between LLMs and LNS with Dynamic Data Format and Architecture Codesign (MICRO 2024)
- **问题（Problem）**：对数数制（LNS）修复小数精度，但与存在显著 outlier 的 LLM 不匹配。
- **假设（Assumption）**：outlier 可以逐 block 识别，且 LNS 表示的对称性在那里留下了提升精度的空间。
- **机制（Mechanism）**：面向 outlier 的动态 LNS 格式，加上在运行时处理这种不规则性的脉动阵列。
- **证据（Evidence）**：真实系统原型，Alveo U280 FPGA。
- **边界（Boundary）**：摘要未说明
- **可偷的一招（Stealable move）**：先把不匹配作为观察结果报告，然后同时在格式与架构两侧修复它。
- **一句话卖点（Pitch）**：诊断出 LNS 与 LLM outlier 的不匹配，并用逐 block 的动态格式在芯片上回应。

### 3. SPARTA ALIGNMENT: Collectively Aligning Multiple Language Models through Combat (NeurIPS 2025)
- **问题（Problem）**：单一模型缺乏生成多样性，并在评估中带有偏差。
- **假设（Assumption）**：同伴评判加上 Elo 式声誉系统能把评估聚合到足以用来训练的程度。
- **机制（Mechanism）**：模型就一条指令对战，其他模型打分，分数更新声誉，结果成为偏好对，所有模型都从中学习。
- **证据（Evidence）**：在 12 个任务与数据集上的实验；12 个中有 10 个提升，平均增益 7.0%。
- **边界（Boundary）**：摘要未说明
- **可偷的一招（Stealable move）**：把竞赛结果转化为训练信号，使评估回路喂养改进回路。
- **一句话卖点（Pitch）**：把模型之间的相互评判转化为偏好对，让一个模型集体自我演化。

### 4. SLANG: New Concept Comprehension of Large Language Models (EMNLP 2024)
- **问题（Problem）**：锚定在静态数据集上的模型跟不上网络俚语与梗的演化。
- **假设（Assumption）**：对真实语言变迁实例做因果推断，可以在不做持续再训练的情况下教会新短语。
- **机制（Mechanism）**：SLNAG 基准自动整合新数据，加上 FOCUS，后者把变迁实例用作上下文路标。
- **证据（Evidence）**：对网络俚语与梗的实证分析；基准数据集。类型摘要未说明。
- **边界（Boundary）**：摘要未说明
- **可偷的一招（Stealable move）**：让基准能自主摄取新数据，堵死“靠记忆蒙混”的逃生口。
- **一句话卖点（Pitch）**：把自动更新的俚语基准与一种避免昂贵持续再训练的因果推断方法配对。

### 5. ImageNetVC: Zero- and Few-Shot Visual Commonsense Evaluation on 1000 ImageNet Categories (EMNLP 2023)
- **问题（Problem）**：目前不清楚 LLM 与视觉增强模型究竟在多好地掌握视觉常识。
- **假设（Assumption）**：1000 个 ImageNet 类别构成可用的常识抽样框；人工标注提供真值。
- **机制（Mechanism）**：人工标注的数据集用于零样本与少样本评估，随后做基准测试与因子分析。
- **证据（Evidence）**：人工标注基准，1000 个 ImageNet 类别。
- **边界（Boundary）**：摘要未说明
- **可偷的一招（Stealable move）**：复用现有类别分类法作为抽样框，使覆盖度无需新的本体工作即可辩护。
- **一句话卖点（Pitch）**：用 ImageNet 自己的 1000 类分类法来衡量 LLM 与 VaLM 的视觉常识。

### 6. S3: Increasing GPU Utilization during Generative Inference for Higher Throughput (NeurIPS 2023)
- **问题（Problem）**：按最大序列长度预留 KV cache 迫使批次小、GPU 利用率低、吞吐低。
- **假设（Assumption）**：输出序列长度可以先验预测得足够准，从而据此调度。
- **机制（Mechanism）**：预测输出长度，基于预测调度生成查询，并处理预测错误。
- **证据（Evidence）**：实验；相较假设最坏情况长度的系统 6.49× 吞吐。类型摘要未说明。
- **边界（Boundary）**：摘要未说明
- **可偷的一招（Stealable move）**：明确给最坏情况预留定价，然后用预测器加明确的误预测策略取代它。
- **一句话卖点（Pitch）**：通过预测输出长度而不是为最坏情况预留内存来换取吞吐。

### 7. Scalable Context Orchestration for Serving LLMs Over Voice (SOSP 2026)
- **问题（Problem）**：扁平的 message 序列上下文让语音特有的线索隐式化，损害对齐、鲁棒性与成本。
- **假设（Assumption）**：副语言与环境状态可以被显式建模并转化为可执行的指令。
- **机制（Mechanism）**：中间件每轮构建有界的语音上下文；服务端 LLM 在其上推理并发出运行时指令。
- **证据（Evidence）**：真实语音应用与基准；对齐错误降低 52.4%，误打断 46.0%→0.9%，成本降低 79.2%。
- **边界（Boundary）**：摘要未说明
- **可偷的一招（Stealable move）**：让模型发出控制系统行为的控制指令，而不只是文本。
- **一句话卖点（Pitch）**：让语音上下文显式化，并让 LLM 输出运行时指令而不只是回复。

### 8. Tetris: Efficient Long-context LLM Serving with Chunkwise Dynamic Sequence Parallelism (ISCA 2026)
- **问题（Problem）**：动态序列并行分配太粗：没有阶段特异性、全局延迟退化、碎片被浪费。
- **假设（Assumption）**：并行度可以安全地在请求内 token 段之间变化。
- **机制（Mechanism）**：解耦集群中的分块式动态 SP、负载驱动的 SP 扩张调节、自适应分块计划搜索。
- **证据（Evidence）**：对照最先进系统的评估；TTFT 降低 4.35×，中位 TBT 降低 40.1%，容量 45%。类型摘要未说明。
- **边界（Boundary）**：摘要未说明
- **可偷的一招（Stealable move）**：把一个资源分配决策从“按请求”粒度下移到“按段”粒度。
- **一句话卖点（Pitch）**：把一个请求切成分块，每块各自选择并行度。

### 9. AdaServe: Accelerating Multi-SLO LLM Serving with SLO-Customized Speculative Decoding (EuroSys 2026)
- **问题（Problem）**：统一批处理与调度无法同时满足异构 SLO。
- **假设（Assumption）**：推测树形状可以按请求、针对延迟目标作为约束问题来优化。
- **机制（Mechanism）**：针对每个延迟目标的硬件感知树构造、speculate-select-verify 流水线、动态推测参数。
- **证据（Evidence）**：跨多种负载的评估；SLO 违规最多减少 4.3×，goodput 1.9×。
- **边界（Boundary）**：摘要未说明
- **可偷的一招（Stealable move）**：把一项 SLO 要求映射到一个本身不改变输出质量的机制的旋钮上。
- **一句话卖点（Pitch）**：把推测解码变成按请求的 SLO 旋钮，同时服务混合的延迟目标。

### 10. High Throughput and Low Latency LLM Serving via Adaptive KV Caching (EuroSys 2026)
- **问题（Problem）**：KV offload-and-restore 粒度太粗，无法同时利用 GPU 计算与存储。
- **假设（Assumption）**：部分 token 缓存加上其余部分的并行重计算，可以在内存与计算之间做交换。
- **机制（Mechanism）**：token 级缓存自适应批次大小与未缓存比例；层级重叠与 kernel 融合。
- **证据（Evidence）**：严格逐 token 延迟 SLO 下 3.03× 吞吐；首 token 延迟降低 2.63×。
- **边界（Boundary）**：摘要未说明
- **可偷的一招（Stealable move）**：暴露一个连续旋钮（缓存 token 的比例），并在运行时按请求调它。
- **一句话卖点（Pitch）**：把全有或全无的 KV offload 换成可调的缓存 token 比例并并行重算。

### 11. KVCache Cache in the Wild: Characterizing and Optimizing KVCache Cache at a Large Cloud Provider (ATC 2025)
- **问题（Problem）**：淘汰策略设计依赖负载，但对它的理解建立在合成负载上。
- **假设（Assumption）**：生产 trace 能揭示合成研究漏掉的模式，并可在同一提供商内泛化。
- **机制（Mechanism）**：对 KV 复用的系统刻画，然后是负载感知的淘汰策略。
- **证据（Evidence）**：来自一家领先 LLM 服务提供商的生产 trace；真实世界 trace。
- **边界（Boundary）**：范围是一家提供商的生产负载；摘要未作跨提供商主张。
- **可偷的一招（Stealable move）**：选一个所有人都硬编码的策略选择，在生产 trace 上刻画它，然后交付替代品。
- **一句话卖点（Pitch）**：首个关于 KV 缓存复用的系统性生产 trace 研究，最终给出负载感知的淘汰策略。

### 12. Pie: A Programmable Serving System for Emerging LLM Applications (SOSP 2025)
- **问题（Problem）**：单体 token 生成循环无法表达多样的推理与 agentic 工作流。
- **假设（Assumption）**：把内部机制暴露为 handler 并配以沙箱化的用户代码，可以在增加灵活性的同时保持效率。
- **机制（Mechanism）**：API 之下的细粒度服务 handler，用户程序（"inferlets"）通过 WebAssembly 执行。
- **证据（Evidence）**：标准任务上 3–12% 延迟开销，agentic 工作流上延迟/吞吐为 1.3×–3.4×。
- **边界（Boundary）**：摘要未说明
- **可偷的一招（Stealable move）**：在同一句话里，把标准场景上的代价放在新场景上的收益旁边一起报告。
- **一句话卖点（Pitch）**：把生成循环里外翻过来，让应用可以编程 KV 策略与自定义生成逻辑。

### 13. Towards Effective and Efficient Multi-Agent Language Model Systems: Foundations, Prospects, and Applications (ACL 2026)
- **问题（Problem）**：在多智能体 LLM 系统中同时取得有效性与效率仍未解决。
- **假设（Assumption）**：三个组件——agent 设计、协调、应用——覆盖设计空间。
- **机制（Mechanism）**：教程：紧凑模型蒸馏、动态路由、内存/计算高效服务；prompt 与图优化、谄媚（sycophancy）缓解。
- **证据（Evidence）**：教程；摘要未说明实验。
- **边界（Boundary）**：摘要未说明
- **可偷的一招（Stealable move）**：围绕一个张力（有效 vs 高效）组织综述或框架章节，而不是罗列方法。
- **一句话卖点（Pitch）**：把多智能体 LLM 设计框定为一种张力，并沿 agent、协调与应用三层展开。

### 14. COMET: Towards Practical W4A4KV4 LLMs Serving (ASPLOS 2024)
- **问题（Problem）**：8-bit 权重-激活与 4-bit 仅权重量化收益很小，因为低精度激活的支持很差。
- **假设（Assumption）**：大多数激活可以压缩到 4 bit 而精度损失可忽略。
- **机制（Mechanism）**：细粒度混合精度量化、W4Ax kernel、混合精度数据布局、细粒度 SM 调度。
- **证据（Evidence）**：LLaMA 家族模型、单块 A100-80G-SMX4 上的评估；kernel 级 2.88× 加速（摘要被截断）。
- **边界（Boundary）**：摘要未说明
- **可偷的一招（Stealable move）**：用数据布局与调度去追算法节省与墙钟节省之间的差距。
- **一句话卖点（Pitch）**：通过让混合精度 matmul 在 INT4 核上真正跑快，宣称首个实用的 W4A4KV4 服务。

### 15. PipeLLM: Fast and Confidential Large Language Model Services with Speculative Pipelined Encryption (ASPLOS 2024)
- **问题（Problem）**：机密计算加密使吞吐下降最多 52.8%（OPT-30B）与 88.2%（OPT-66B）。
- **假设（Assumption）**：哪些数据需要加密可以从 LLM 服务模式预测出来。
- **机制（Mechanism）**：推测式流水线加密把密码学计算与 GPU 计算重叠，加上误预测时的低成本流水线让出。
- **证据（Evidence）**：对照 vLLM、PEFT、FlexGen 的实验；13B–175B 模型上开销低于 19.6%。
- **边界（Boundary）**：摘要未说明
- **可偷的一招（Stealable move）**：明确点出跨领域类比（CPU 指令流水线），并把它作为论文的主干。
- **一句话卖点（Pitch）**：通过预测要加密什么并在 GPU 计算之下流水化，隐藏加密开销。

### 16. DHP Benchmark: Are LLMs Good NLG Evaluators? (ACL 2024)
- **问题（Problem）**：人工评估与简单指标无法刻画 LLM 跨任务评判 NLG 的能力。
- **假设（Assumption）**：层级扰动加上统计检验可以给出定量的辨别力分数。
- **机制（Mechanism）**：在六个重建数据集上做层级扰动文本，覆盖摘要、故事补全、QA、翻译。
- **证据（Evidence）**：五个主要 LLM 家族上的基准；六个数据集。
- **边界（Boundary）**：摘要未说明
- **可偷的一招（Stealable move）**：用判断在分级扰动下退化的程度给模型打分，而不是看与人类的相关性。
- **一句话卖点（Pitch）**：把关质量测成对受控损坏的敏感度，而不是与人类的一致性。

### 17. QServe: W4A8KV4 Quantization and System Co-design for Efficient LLM Serving (MLSys 2024)
- **问题（Problem）**：最先进的 INT4 量化只加速低批次边缘推理；大批次服务要付 20–90% 的反量化开销。
- **假设（Assumption）**：GPU 服务效率由低吞吐的 CUDA core 操作决定。
- **机制（Mechanism）**：渐进量化以实现廉价的 W4A8 反量化、SmoothAttention 保证 KV4 精度、计算感知的权重重排、寄存器级并行。
- **证据（Evidence）**：QServe 库中的实测加速；harness 与数据集摘要未说明。
- **边界（Boundary）**：摘要未说明
- **可偷的一招（Stealable move）**：把开销归给它实际执行的硬件单元，而不是它所属的算子。
- **一句话卖点（Pitch）**：解释为什么 INT4 的收益在批处理下不成立，然后把成本从 CUDA core 上挪走。

### 18. 3-in-1: 2D Rotary Adaptation for Efficient Finetuning, Efficient Batching and Composability (NeurIPS 2024)
- **问题（Problem）**：PEFT 必须处理同一批次内的多 adapter 批处理与可解释性，而不只是参数量。
- **假设（Assumption）**：一个 2D 旋转足以表达适配，同时比批次矩阵乘法更便宜。
- **机制（Mechanism）**：RoAd 施加一个 2D 旋转，使 adapter 切换只花约一次逐元素乘法。
- **证据（Evidence）**：GLUE、八个常识与四个算术推理任务；可训练参数低于 0.1%；组合实验。
- **边界（Boundary）**：摘要未说明
- **可偷的一招（Stealable move）**：挑三个此前工作分别解决的需求，用一个原语同时满足。
- **一句话卖点（Pitch）**：一个 2D 旋转同时带来参数效率、廉价的多 adapter 批处理与可解释性。

### 19. Loquetier: A Virtualized Multi-LoRA Framework for Unified LLM Fine-tuning and Serving (NeurIPS 2025)
- **问题（Problem）**：LoRA 模型的微调与推理仍然分离，统一的运行时尚未被触及。
- **假设（Assumption）**：共享基座加隔离的虚拟模块与合并的前向路径，可以高效服务两个阶段。
- **机制（Mechanism）**：隔离 PEFT 修改的 Virtualized Module，加上合并微调与推理路径的 kernel。
- **证据（Evidence）**：三种任务设置；仅推理上吞吐最高 3.0×，统一任务上 SLO 达成率高出 46.4×。
- **边界（Boundary）**：摘要未说明
- **可偷的一招（Stealable move）**：当负载交织两个阶段时，报告 SLO 达成率而不是吞吐。
- **一句话卖点（Pitch）**：把 LoRA 微调与服务折叠进一个运行时，共享合并的前向路径。

### 20. MoC: Mixtures of Text Chunking Learners for Retrieval-Augmented Generation System (ACL 2025)
- **问题（Problem）**：RAG 流水线忽视分块；传统与语义分块器都处理不好复杂的上下文细微差别。
- **假设（Assumption）**：LLM 级的分块质量可以被可执行的正则表达式捕捉，从而保持推理廉价。
- **机制（Mechanism）**：双指标（Boundary Clarity、Chunk Stickiness）加上三阶段 mixture-of-chunkers，输出一个正则列表。
- **证据（Evidence）**：关于分块质量与端到端 RAG 性能的大量实验；数据集摘要未说明。
- **边界（Boundary）**：摘要未说明
- **可偷的一招（Stealable move）**：把一个昂贵的模型决策蒸馏成可执行产物，使成本只付一次而不是每次调用都付。
- **一句话卖点（Pitch）**：用两个指标定义分块质量，然后把 LLM 分块蒸馏成可复用的正则表达式。
