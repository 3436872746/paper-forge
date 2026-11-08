> 中文版 · English: [cards_batch3.md](cards_batch3.md)

### 1. Language Models can Subtly Deceive Without Lying: A Case Study on Strategic Phrasing in Legislation (ACL 2024)
- **问题（Problem）**：LLM 可以通过策略性措辞与信息操纵进行欺骗，这比公然撒谎或幻觉更难检测。
- **假设（Assumption）**：带企业游说者模块的立法测试床能真实地捕捉这种行为。
- **机制（Mechanism）**：真实法案匹配受影响公司；游说者提出自我牟利的修正案并规避对受益者的识别；基于 LLM 的重规划与重采样优化措辞。
- **证据（Evidence）**：以真实立法法案为依据的测试床模拟；人工评估与自动指标一致。
- **边界（Boundary）**：摘要未说明
- **可偷的一招（Stealable move）**：把检测器放进优化回路，使重采样面对当下最强的检测器被打分。
- **一句话卖点（Pitch）**：对照一个在线检测器做对抗式重采样，把边缘地带的欺骗变成可测量、可优化的比率。

### 2. QSpec: Speculative Decoding with Complementary Quantization Schemes (EMNLP 2024)
- **问题（Problem）**：激活-权重联合量化快，但会降低多步推理质量。
- **假设（Assumption）**：快的低精度 drafter 加准确的高精度 verifier，把效率与质量解耦。
- **机制（Mechanism）**：跨两种互补量化方案的推测解码；权重与 KV cache 在阶段间复用，实现近乎零成本的切换，无需再训练或辅助模型。
- **证据（Evidence）**：真实系统；相较全精度基线最高 1.64x 加速，批处理场景下相较 SOTA 推测解码最高 1.55x；可跨规模、方法、负载泛化。
- **边界（Boundary）**：摘要未说明
- **可偷的一招（Stealable move）**：在两个速度层级间复用同一份产物（权重加 KV），使切换不花成本。
- **一句话卖点（Pitch）**：同一套权重，两种精度：便宜地草拟，准确地验证，自由地切换。

### 3. A2ATS: Retrieval-Based KV Cache Reduction via Windowed Rotary Position Embedding and Query-Aware Vector Quantization (ACL 2025)
- **问题（Problem）**：基于检索的 KV 削减在长上下文服务中仍有精度下降与额外检索开销。
- **假设（Assumption）**：attention 分数可以由向量量化的 key 状态足够准确地近似，从而检索 top-K token。
- **机制（Mechanism）**：窗口化 Rotary Position Embedding 把位置依赖从 query 与 key 状态解耦；query 感知的向量量化直接优化 attention 近似目标；用于 offloading 的异构推理架构。
- **证据（Evidence）**：实验；长上下文服务吞吐最高 2.7x，退化更低、开销相近或更低。
- **边界（Boundary）**：摘要未说明
- **可偷的一招（Stealable move）**：训练近似目标（attention 分数误差）而不是通用的重建损失。
- **一句话卖点（Pitch）**：让量化器精确优化检索所需的东西，再用匹配的异构架构做 offloading。

### 4. Unveiling Environmental Impacts of Large Language Model Serving: A Functional Unit View (ACL 2025)
- **问题（Problem）**：现有 LLM 服务的碳基准缺少比较模型配置的标准化依据。
- **假设（Assumption）**：功能单元（functional unit）提供公平、标准化的比较依据。
- **机制（Mechanism）**：FUEL，一个基于功能单元评估服务环境影响的框架；三个案例研究分别变化模型规模、量化策略与硬件选择。
- **证据（Evidence）**：三个案例研究；具体数据集摘要未说明。
- **边界（Boundary）**：摘要未说明
- **可偷的一招（Stealable move）**：从另一个领域引入指标归一化概念，作为论文的组织框架。
- **一句话卖点（Pitch）**：按功能单元归一化后，碳数字在不同配置之间就变得可比。

### 5. Taming System Complexity: Demystifying Software Engineering Agents in Diagnosing Linux Kernel Faults (ACL 2025)
- **问题（Problem）**：目前不清楚 LLM agent 在 Linux 内核中定位故障的能力如何，在那里规模与有限可观测性使 FL 比 SWE-bench 难得多。
- **假设（Assumption）**：SWE-bench 上的成功不能迁移到内核规模的代码。
- **机制（Mechanism）**：由真实内核 bug 构建的 LinuxFLBench；对最先进 agent 的实证研究；LinuxFL+ 增强框架。
- **证据（Evidence）**：真实内核 bug 基准；最佳 top-1 文件级准确率 41.6%；LinuxFL+ 以极低成本提升 7.2-11.2%。
- **边界（Boundary）**：所报告的准确率是文件级；摘要未说明其余。
- **可偷的一招（Stealable move）**：在提出修复方案之前，先用真实生产事件构建基准。
- **一句话卖点（Pitch）**：先证明 agent 在一个更难的、真实领域中崩掉，再兜售那个能挽回大部分的补丁。

### 6. Characterizing Performance–Energy Trade-offs of Large Language Models in Multi-Request Workflows (SIGMETRICS 2026)
- **问题（Problem）**：测量工作针对单请求，忽视了工作流依赖、跨请求交互与能耗。
- **假设（Assumption）**：四种模式（顺序、交互、agentic、组合）代表现代多请求部署。
- **机制（Mechanism）**：在 A100 测试床上以 vLLM 与 Parrot 做系统刻画，扫描输入-输出长度、批次大小与 GPU 功耗上限，并给出组件级 CPU/GPU/DRAM 能耗。
- **证据（Evidence）**：真实系统测试床；批次大小是最有影响的杠杆，但高度依赖负载。
- **边界（Boundary）**：仅 NVIDIA A100 测试床；摘要被截断。
- **可偷的一招（Stealable move）**：以组件粒度报告能耗，而不是一个聚合数字。
- **一句话卖点（Pitch）**：把批次大小从传闻变成在组件粒度上实测的、以负载为条件的能耗杠杆。

### 7. Outcome-Grounded Advantage Reshaping for Fine-Grained Credit Assignment in Mathematical Reasoning (ACL 2026)
- **问题（Problem）**：GRPO 把组级奖励均等地传播到每个 token，忽视了不同步骤贡献的差异。
- **假设（Assumption）**：token 对最终答案的影响可以被估计，并能重新分配 advantage。
- **机制（Mechanism）**：OAR-P 通过反事实 token 扰动估计结果敏感度；OAR-G 用一次反向传播得到的输入梯度敏感度作为代理；保守的双层重塑压制低影响 token 同时保持 advantage 总量。
- **证据（Evidence）**：大量数学推理基准；OAR-P 是上界，OAR-G 在可忽略开销下与其相当。
- **边界（Boundary）**：仅数学推理；摘要未说明其余。
- **可偷的一招（Stealable move）**：提供一个高保真机制和一个廉价代理，并把两者作为质量-成本曲线报告。
- **一句话卖点（Pitch）**：按测得的 token 影响重塑 advantage，无需 critic 就得到更细的信用分配。

### 8. Hardware and Software Platform Inference (ICML 2024)
- **问题（Problem）**：托管 LLM 推理的买家无法核实所宣传的服务硬件或模型。
- **假设（Assumption）**：GPU 架构与编译器在模型输出中留下可区分的数值签名。
- **机制（Mechanism）**：分析黑盒输入-输出行为中的数值模式；分类框架识别 GPU 类型与软件栈。
- **证据（Evidence）**：对照在不同真实硬件上服务的模型的评估；摘要被截断。
- **边界（Boundary）**：摘要未说明
- **可偷的一招（Stealable move）**：把实现产物的指纹当作审计信号，而不是当作噪声。
- **一句话卖点（Pitch）**：输出数值携带硬件指纹；黑盒客户端可以审计自己实际租到了什么。

### 9. A Case for a Simulation-Driven Exploration of Distributed GenAI Platforms (MLSys 2026)
- **问题（Problem）**：GenAI 服务平台的设计空间探索极其昂贵且缓慢；当前的评估研究孤立地看组件。
- **假设（Assumption）**：离散事件模拟可以足够忠实地捕捉硬件-调度器-负载的相互作用，从而指导设计。
- **机制（Mechanism）**：Opal，一个开源离散事件模拟框架，对推理栈各层之间的交互建模，构建目标是简单、可扩展、可复现、快速。
- **证据（Evidence）**：设计与动机论文；摘要未说明定量结果。
- **边界（Boundary）**：立场论文，寻求社区对开放挑战的反馈。
- **可偷的一招（Stealable move）**：把模拟器写成一篇 "case for" 立场论文，在构建前先收集需求。
- **一句话卖点（Pitch）**：模拟整个栈来探索 GenAI 平台设计，而不付硬件的账单。

### 10. AdaSpec: Adaptive Speculative Decoding for Fast, SLO-Aware Large Language Model Serving (SoCC 2025)
- **问题（Problem）**：现有推测解码无法适应波动的负载与动态系统环境，导致 SLO 违规。
- **假设（Assumption）**：在给定负载与配置下，推测策略的效率可以由理论模型预测。
- **机制（Mechanism）**：理论模型预测各场景下的策略效率；动态草拟与验证算法实时调整策略以最大化 SLO 达成。
- **证据（Evidence）**：真实世界 LLM 服务 trace；持续满足 SLO，相较 SOTA 推测推理最高 66% 加速。
- **边界（Boundary）**：摘要未说明
- **可偷的一招（Stealable move）**：以解析效率模型开场，然后展示由它导出的自适应控制器。
- **一句话卖点（Pitch）**：预测每种推测策略的效率，然后按请求切换策略以守住 SLO。

### 11. AgentKV: Phase-Aware KV Eviction for Agentic LLMs (EMNLP 2026)
- **问题（Problem）**：KV 淘汰假设未来 attention 与近期 attention 相似；agentic 生成违反这一点。
- **假设（Assumption）**：依据主角度（principal-angle）分析，agentic 查询在 think、act、tool 等阶段上构成混合，占据可测的不同子空间。
- **机制（Mechanism）**：每个阶段维护一个小的 query 缓冲，并用它们的并集给缓存 key 打分；跨轮携带压缩 KV 的持久多轮服务路径；保留页的在线压缩。
- **证据（Evidence）**：两个模型、六个任务域、每种三个 KV 预算；较 R-KV +5.5 分，较 Tri-attention +5.3 分；相较全 KV 的 SGLang，输出 token 吞吐最高 1.80x。
- **边界（Boundary）**：摘要未说明
- **可偷的一招（Stealable move）**：用主角度分析为设计假设提供依据，然后再构建它。
- **一句话卖点（Pitch）**：agent 各阶段查询不同子空间，所以每阶段保留一个代表性缓冲，别再淘汰接下来要用的东西。

### 12. Fast State Restoration in LLM Serving with HCache (EuroSys 2024)
- **问题（Problem）**：跨请求复用 KV cache 受容量限制；被淘汰的状态要靠昂贵的重计算或主机 offload 恢复。
- **假设（Assumption）**：LLM 上下文状态可以从中间激活而非原始 token 恢复。
- **机制（Mechanism）**：从中间激活恢复；在计算与 IO 之间平衡的无气泡恢复调度器；修复“先层后 token”与“先 token 后层”布局不匹配的基于 chunk 的存储管理器。
- **证据（Evidence）**：真实世界任务；相较 KV offload 的 TTFT 降低最高 1.93x，存储少 1.92-2.40x；相较重计算 TTFT 降低最高 5.73x。
- **边界（Boundary）**：摘要未说明
- **可偷的一招（Stealable move）**：明确指出低层布局的不匹配，并把它做成一个有名字的系统组件。
- **一句话卖点（Pitch）**：从保存的激活恢复 KV 状态，比重计算便宜、比 offloading 更省空间。

### 13. Efficient Training-Free Online Routing for High-Volume Multi-LLM Serving (NeurIPS 2025)
- **问题（Problem）**：现有 LLM 路由工作是离线的，在受限 token 预算下难以应对高在线查询量。
- **假设（Assumption）**：查询特征可以用近似最近邻搜索估计，且在一小份初始查询集上做一次性优化可以泛化。
- **机制（Mechanism）**：免训练算法用 ANN 估计查询特征，然后一次性优化为未来查询学习路由策略；在自然假设下竞争比 1 - o(1)。
- **证据（Evidence）**：3 个基准数据集、8 个基线；平均性能 3.55x，成本效率 1.85x，吞吐 4.25x。
- **边界（Boundary）**：保证在“自然假设”下成立；摘要未说明更多。
- **可偷的一招（Stealable move）**：在极小样本上学一次，然后在推理时路由，无需进一步训练。
- **一句话卖点（Pitch）**：一次微小的优化，之后最近邻路由就免训练地服务高流量。

### 14. Position: LLMs Can be Good Tutors in English Education (EMNLP 2025)
- **问题（Problem）**：英语教育中 LLM 的使用依赖传统学习任务方法而缺少教育方法论，限制了适应性。
- **假设（Assumption）**：三个角色覆盖该空间：数据增强者、任务预测者、agent。
- **机制（Mechanism）**：论证 LLM 可以增强学习材料创建或模拟学生、预测学习者评估或优化路径，并作为 agent 提供个性化、包容性教育。
- **证据（Evidence）**：未给出；无数据集的立场论文。
- **边界（Boundary）**：立场论文；呼吁未来跨学科研究，而不是报告结果。
- **可偷的一招（Stealable move）**：把立场论文组织成列举式的角色分类法，每个角色配一份研究议程。
- **一句话卖点（Pitch）**：把 LLM 在教育中的角色拆成三个具体角色，并给每个角色一份自己的研究议程。

### 15. ORBITFLOW: SLO-Aware Long-Context LLM Serving with Fine-Grained KV Cache Reconfiguration (VLDB 2026)
- **问题（Problem）**：静态、预先确定的 KV offloading 无法跟上 token 生成过程中移动的内存需求，造成传输尖峰与 SLO 违规。
- **假设（Assumption）**：哪些层的 KV 留在 GPU 上，可以按请求用容量内的轻量 ILP 决定。
- **机制（Mechanism）**：ILP 求解器选出每请求的层保留；当活动方案变为次优时，从运行时反馈持续细化；重载下用回退机制推迟大占用的在途请求。
- **证据（Evidence）**：SLO 达成 TPOT +62% 与 TBT +66%，P95 延迟 -38%，相较现有 offloading 方法吞吐最高 3.3x。
- **边界（Boundary）**：摘要未说明
- **可偷的一招（Stealable move）**：加一个显式的准入控制回退，在过载下保护 SLO 尾部。
- **一句话卖点（Pitch）**：用 ILP 按请求重解 KV 放置，并把巨兽请求推迟，以守住 p95。

### 16. LMTracer: Fine-Grained and Real-Time Performance Profiling for Production LLM Systems (SOSP 2026)
- **问题（Problem）**：现有 profiler 要么太粗找不到瓶颈，要么对生产来说侵入性太强。
- **假设（Assumption）**：低效源于对高度异步的 GPU 执行流的扰动。
- **机制（Mechanism）**：图内嵌探针：把轻量探针 kernel 作为特殊 trace 节点编译进 GPU 执行图，按需把缓冲的 profiling 数据流式送到 CPU，使用户 kernel 永不停止。
- **证据（Evidence）**：生产部署八个月；训练、服务、微调上平均 0.9% 开销；发现 15 个问题，带来 21.2% 延迟降低与 24.5% 吞吐提升。
- **边界（Boundary）**：摘要未说明
- **可偷的一招（Stealable move）**：把发现的问题与修复后的收益作为 profiler 有用的证据来报告。
- **一句话卖点（Pitch）**：把探针放进 CUDA graph，异步流式返回结果，profiling 不再扰动它所测量的东西。

### 17. Unified Static-Dynamic Pruning for Efficient LLM Inference (VLDB 2026)
- **问题（Problem）**：静态剪枝永久但不够灵活；动态剪枝自适应却造成运行时不规则。
- **假设（Assumption）**：非结构化静态稀疏与输入自适应动态稀疏可以通过格式-内核联合设计协调。
- **机制（Mechanism）**：Tiled-CBC bitmap 格式；CUDA-core spMspV kernel，带混合激活感知的动态共享内存 bitmap 解码以实现运行时激活跳过；用于 prefill 的 Tensor-Core SpMM kernel。
- **证据（Evidence）**：面向推理优化的 GPU；相较 SpInfer 平均 1.24-1.37x（最高 2.51x），在稀疏度高 25% 时困惑度相当。
- **边界（Boundary）**：摘要未说明
- **可偷的一招（Stealable move）**：在一种格式之下，给每个推理阶段（decode vs prefill）分配适合它的 kernel。
- **一句话卖点（Pitch）**：一种 bitmap 格式加两个 kernel，在 decode 与 prefill 上统一静态与动态稀疏。

### 18. Lung-R1: A Knowledge Graph-Guided LLM for Pulmonary Diagnostic Reasoning (EMNLP 2026)
- **问题（Problem）**：肺科知识问答没有给出诊断所需的、针对患者且关系感知的 EMR 证据推理。
- **假设（Assumption）**：这个缺口——被命名为 Pulmonary Knowledge-to-Diagnosis Gap——可以通过结构化知识加 KG 引导的训练弥合。
- **机制（Mechanism）**：LungKG 有 59,038 个节点、164,308 条边、15 种实体类型、112 种关系类型；Lung-R1 通过 KG 约束的推理链构建与 KG 引导的强化学习训练。
- **证据（Evidence）**：20 个系统的评估；Lung-R1-14B 在 Choice、Pulmonary-QA 与 EMR Diagnosis 上达到 SOTA；EMR Diagnosis 得分 4.3583，比最强基线高 0.1476。
- **边界（Boundary）**：仅肺科领域；摘要未说明其余。
- **可偷的一招（Stealable move）**：在摘要中把该缺口命名为专有名词，并把产物做成可复用资源。
- **一句话卖点（Pitch）**：命名缺口、构建图，让 KG 约束的推理链把知识变成个案级诊断。

### 19. Exploring the Integration of Large Language Models into Automatic Speech Recognition Systems: An Empirical Study (NeurIPS 2023)
- **问题（Problem）**：ASR 在噪声、口音与复杂语言上下文上吃力；LLM 的 in-context learning 能否帮助纠正转写。
- **假设（Assumption）**：in-context learning 加指令遵循可以纠正 ASR 错误。
- **机制（Mechanism）**：研究不同的设置、prompt 与模型，以 ChatGPT 与 GPT-4 作为 LLM 基线。
- **证据（Evidence）**：在 Aishell-1 与 LibriSpeech 上的实证研究；纠正后的句子常常 WER 更高；负结果。
- **边界（Boundary）**：限于 in-context-learning 纠正；摘要未说明其余。
- **可偷的一招（Stealable move）**：发表这个负结果，并完整交代试过的各种设置。
- **一句话卖点（Pitch）**：用 LLM 对 ASR 转写做后纠正反而提高 WER，而论文如实这样说。

### 20. Hardware-Aware Co-Design of Multi-Chip LLM Serving via Performance Modeling (MLSys 2026)
- **问题（Problem）**：基于编译器的多芯片策略探索既昂贵，又被编译器产物遮蔽。
- **假设（Assumption）**：命令粒度模拟可以足够忠实地重建加速器执行，从而据此设计。
- **机制（Mechanism）**：模拟器建模分块计算、显式 DRAM-SRAM 传输、集合通信与重叠约束；在 RNGD 加速器上实例化。
- **证据（Evidence）**：模拟对照硬件级 trace 验证；细粒度并行设计相较全张量并行吞吐最高提升 77%；尾部受限的分块 prefill 改善 TTFT-TPOT 权衡。
- **边界（Boundary）**：仅在 RNGD 上实例化；所有定量结果来自模拟器。
- **可偷的一招（Stealable move）**：先用 trace 验证模拟器，再让它承载设计主张。
- **一句话卖点（Pitch）**：以命令粒度建模机器，然后在不重新编译的情况下协同设计并行与分块。
