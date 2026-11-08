> 中文版 · English: [cards_batch1.md](cards_batch1.md)

**这一页是什么**：一批论文卡片。每张七个字段：问题、假设、机制、证据、边界、可偷的一招、一句话卖点。
**怎么用**：先扫「可偷的一招」；要引用某条机制前，回原文读。

### 1. Preble: Efficient Distributed Prompt Scheduling for LLM Serving (arXiv 2024)
- **问题（Problem）**：提示词（prompt）如今会在多个请求之间重复大量共享部分，但每一个 KV 复用方案都局限在单块 GPU 内，而生产环境的服务是分布式的。
- **假设（Assumption）**：提示词共享在真实流量中足够普遍，因此 KV 复用的收益可以与负载均衡相互权衡，而不会让一方摧毁另一方。
- **机制（Mechanism）**：一个分布式调度系统，通过一种新的调度算法加上一套分层调度机制，协同优化 KV 状态复用与计算负载均衡。
- **证据（Evidence）**：在两个开源 LLM 上的真实工作负载与请求到达模式；相比 SOTA 服务系统，平均延迟好 1.5X 到 14.5X，p99 延迟好 2X 到 10X。
- **边界（Boundary）**：摘要未说明
- **可偷的一招（Stealable move）**：当局部最优的缓存命中与全局负载均衡相互冲突时，把这两个决策放到不同的层，让粗粒度层永远不必看到逐请求的缓存细节。
- **一句话卖点（Pitch）**：首个以提示词共享为目标并为之优化的分布式 LLM 服务平台。

### 2. Locality-aware Fair Scheduling in LLM Serving (arXiv 2025)
- **问题（Problem）**：公平调度器忽略前缀局部性，局部性感知调度器忽略公平共享，因此两者都无法很好地服务多样的客户端前缀模式。
- **假设（Assumption）**：公平性与前缀局部性可以由同一个策略同时满足，即公平性保证能在一种对局部性友好的匹配规则下继续成立。
- **机制（Mechanism）**：Deficit Longest Prefix Match (DLPM)，以及将其扩展到分布式场景的 Double Deficit LPM (D$^2$LPM)，用以平衡公平性、局部性与负载均衡。
- **证据（Evidence）**：评估类型摘要未说明；相比 VTC 吞吐最高提升 2.87$\times$，相比最先进的分布式 LLM 服务系统每客户端延迟最高降低 7.18$\times$。
- **边界（Boundary）**：摘要未说明
- **可偷的一招（Stealable move）**：把亏空计数器（deficit counter）加装到你本来就想用的那条匹配规则上，这样公平性属性是继承来的，而不是从头重新推导。
- **一句话卖点（Pitch）**：首个兼具高度前缀局部性与公平性保证的局部性感知公平调度算法。

### 3. Energy-Aware Scheduling for Serverless LLM Serving on Shared GPUs (ATC 2026)
- **问题（Problem）**：同驻模型共享同一个设备级工作点，而它们的需求与延迟余量会随阶段和负载变化，因此没有任何单一层能单独把能耗降到最低。
- **假设（Assumption）**：离线剖析（profile）加上 GPU 状态摘要足够准确，可以在常数时间内在线做出满足 SLO 的能耗决策。
- **机制（Mechanism）**：Festina，一个剖析引导的功耗感知控制平面，在 TTFT/TBT SLO 下联合协调请求放置、SM 分区与 GPU 工作点，并配有阶段感知的本地调度器和面向整合（consolidation）的 SLO 感知迁移。
- **证据（Evidence）**：与四个 SOTA LLM 服务系统及一个增强 DVFS 的系统对比；在 SLO 达成率持平的前提下最多降低 56% 的能耗（在（摘要被截断）。
- **边界（Boundary）**：摘要未说明
- **可偷的一招（Stealable move）**：把昂贵的联合优化离线预计算成查找表，使一个多维在线决策仍能在常数时间内完成。
- **一句话卖点（Pitch）**：一个面向无服务器 LLM 服务、以能耗优先（而非吞吐或尾延迟优先）的控制平面。

### 4. Coordinated Scheduling for MoE LLM Serving (arXiv 2026)
- **问题（Problem）**：前端路由使用粗粒度的请求计数，而后端均衡器使用聚合的专家计数，因此两者都不响应细粒度的引擎压力或与来源相关的专家流量。
- **假设（Assumption）**：把在线的后端压力信号暴露给前端，比任何局部最优的前端计数器都能产生更好的路由。
- **机制（Mechanism）**：Gimbal，包含一个由 KV 使用量、剩余 prefill 工作量、队列压力和专家压力驱动的细粒度 DP 引擎调度器，一种带老化（aging）的 prefill 感知队列排序（避免输出长度预测），以及基于源 DP 到专家路由统计的 MINLP 引导的专家放置。
- **证据（Evidence）**：针对最先进的服务 s... 的评估；平均 TTFT 降低 42.9%，平均 TPOT 降低 33.3%（摘要被截断）。
- **边界（Boundary）**：摘要未说明
- **可偷的一招（Stealable move）**：把后端压力遥测上推到路由层，而不是从前端请求计数重新推导后端状态。
- **一句话卖点（Pitch）**：一个面向高效 MoE LLM 服务的跨层协同调度系统。

### 5. Kalypso: Relational LLM Serving (arXiv 2026)
- **问题（Problem）**：以请求为中心的服务对查询计划（query plan）一无所知，因此本可以从一个语义算子流入下一个语义算子的 KV 状态被丢弃并重新计算。
- **假设（Assumption）**：在流水线化算子之间流动的中间元组携带可复用的 KV 状态，而且保持其存活与 GPU 显存压力是相容的。
- **机制（Mechanism）**：Kalypso 提供一个用于语义查询计划的 API，并用自适应、内存感知的调度器执行它们；该调度器联合处理流水线化算子执行与 GPU 显存压力，在上游并行度、下游进度和 GPU 利用率之间持续重新平衡分配。
- **证据（Evidence）**：评估显示，在多样工作负载下，查询完成时间相比以请求为中心的 LLM 服务基线最高加速 4.57x。
- **边界（Boundary）**：摘要未说明
- **可偷的一招（Stealable move）**：让中间结果的产出方声明它将要交付之物的结构，使消费方继承已计算的状态，而不必重新开始。
- **一句话卖点（Pitch）**：在保持查询语义与输出准确性的同时，感知语义查询结构的服务。

### 6. FREESH: Fair, Resource- and Energy-Efficient Scheduling for LLM Serving on Heterogeneous GPUs (arXiv 2025)
- **问题（Problem）**：同一查询若在排放高峰时段跑在高端 GPU 上，其碳足迹可能远高于在低排放的时间与地点跑在中端 GPU 上。
- **假设（Assumption）**：查询在何处、何时运行具有足够的时空灵活性，可以在不牺牲延迟或公平性的前提下把碳/能耗的最优点移动。
- **机制（Mechanism）**：跨一组数据中心的联合路由与调度，把每个 GPU 实例的功耗-吞吐特性与可预测的查询长度匹配，包含优化的并行策略、查询路由、GPU 动态调频以及 Least-Laxity-First 服务。
- **证据（Evidence）**：在生产工作负载上服务一小时；能耗降低 28.6%，排放降低 45.45%，同时 SLO 达成率与公平性均有改善。
- **边界（Boundary）**：摘要未说明
- **可偷的一招（Stealable move）**：把地理与时间上分离的异构硬件当作一个调度域，其目标是用户选定的单一标量，而不是本地设备自身的效率。
- **一句话卖点（Pitch）**：协同运行一组数据中心，同时最小化用户指定的碳或能耗目标。

### 7. DualPace: Decoupled Scheduling and Cooperative GPU--CPU Decoding for LLM Serving (arXiv 2026)
- **问题（Problem）**：驻留 CPU 的请求只有在 GPU 调度器恰好暴露出重叠时才能推进，因此主机内存与 CPU 算力无法作为独立的服务资源。
- **假设（Assumption）**：驻留 CPU 的解码可以独立成批并自行有效地推进，而且拆分调度权带来的开销不超过它换来的重叠收益。
- **机制（Mechanism）**：两个在调度上解耦、在执行上协作的引擎：一个负责 prefill 与驻留 GPU 解码的 GPU 引擎，以及一个启用 AMX 的 CPU 引擎，后者独立地对驻留 CPU 的解码进行批处理，可选地调用 GPU Dense Assist 来处理稠密阶段，并由离线剖析指导硬件特定的批处理与路由。
- **证据（Evidence）**：面向解码的场景；在相同延迟下吞吐比 NEO 高 6.9--43.2\%，比 vLLM 高 11.5--90.6\%，在相同 P99 ITL 下请求率比 NEO 高 7.3--50.5\%。
- **边界（Boundary）**：收益仅在面向解码的场景中报告；摘要未陈述其他适用范围限制。
- **可偷的一招（Stealable move）**：给未被充分利用的次要资源配一个自己的调度器，而不是让它做主要资源调度的奴隶。
- **一句话卖点（Pitch）**：把主机变成一个可独立调度的解码引擎。

### 8. Stage-Aware Communication Scheduling for Disaggregated LLM Serving (arXiv 2026)
- **问题（Problem）**：来自相互依赖阶段的流在共享瓶颈链路上重叠，而与阶段无关的流调度会产生不协调的争用，这是 TTFT SLO 违约的主要原因。
- **假设（Assumption）**：即使不知道任何请求精确的剩余松弛量（slack），Least-Laxity-First 排序也能被足够好地近似。
- **机制（Mechanism）**：Nuska，一种"延迟-提升"（Defer-and-Promote）原则，实现为 Reverse Multi-Level Queue (RMLQ)，随着有效松弛量减少而动态提升任务优先级，并作为可插拔模块部署在 vLLM 中。
- **证据（Evidence）**：一个 8 服务器、32 GPU 的测试床加上大规模仿真；相比最先进基线把 TTFT SLO 达成率提升 1.2x-2.4x。
- **边界（Boundary）**：摘要未说明
- **可偷的一招（Stealable move）**：当理想策略需要一个不可观测的量时，构建一种队列结构，让排序从那些能廉价代理该量的信号中自然涌现。
- **一句话卖点（Pitch）**：一个整体性的多阶段流调度机制，旨在最大化 TTFT SLO 达成率。

### 9. ELIS: Efficient LLM Iterative Scheduling System with Response Length Predictor (arXiv 2025)
- **问题（Problem）**：FCFS 批处理导致队头阻塞，而最短作业优先需要推理时的预测，自回归生成使这件事很难。
- **假设（Assumption）**：一个编码器模型能足够准确地预测响应长度，使得按剩余长度排序在迭代批处理内部是净收益。
- **机制（Mechanism）**：基于 BGE 的响应长度预测器，驱动 ISRTF（Iterative Shortest Remaining Time First），即一种为现有 LLM 迭代批处理量身定制的最短剩余时间优先变体。
- **证据（Evidence）**：由真实用户服务轨迹构建的模拟请求流，加上一个云原生 Kubernetes 实现；平均作业完成时间最多降低 19.6%。
- **边界（Boundary）**：摘要未说明
- **可偷的一招（Stealable move）**：预测那个既廉价可观测、又能给队列排序的量，然后把经典策略重新优化到你批处理实际提供的粒度上。
- **一句话卖点（Pitch）**：一个按最少剩余 token 数管理推理任务的 ISRTF 调度器。

### 10. PackServe: SLO-Aware Request Scheduling for Agentic LLM Serving at Scale (arXiv 2026)
- **问题（Problem）**：把请求整合到更少的实例上会牺牲缓存局部性并加剧 prefill/decode 干扰，因此 SLO 达成率与资源效率相互权衡。
- **假设（Assumption）**：紧凑的白盒延迟模型能足够精确地预测 prefill/decode 干扰的代价，从而可以安全地花掉延迟余量。
- **机制（Mechanism）**：PackServe 用白盒模型预测干扰下的延迟，在保持 KV 缓存复用与 SLO 约束的同时把请求打包到更少的服务实例上。
- **证据（Evidence）**：64 块 NVIDIA H20 GPU，在 30 ms 和 50 ms 的 TPOT 目标下比最先进的调度器少用最多 16.8% 和 24.6% 的 GPU 小时；在超过 1000 块 GPU 的生产集群上，资源占用比原生产调度器小 34.7%。
- **边界（Boundary）**：摘要未说明
- **可偷的一招（Stealable move）**：把 SLO 当作你有权花掉的预算：把剩余的延迟余量换成更少的机器，并用资源而不是延迟来报告收益。
- **一句话卖点（Pitch）**：一个在为 agentic 服务满足延迟 SLO 的同时降低资源成本的调度器。

### 11. Quota-Based Aging for Prediction-Guided Scheduling in LLM Serving (arXiv 2026)
- **问题（Problem）**：预测引导的短作业优先调度会让长请求饿死，而在拥塞下无限制的老化又会过度提升被延迟的长请求。
- **假设（Assumption）**：在非对称预测误差下，对提升设置一个有界配额，能在不放弃平均延迟收益的前提下恢复长请求的尾延迟。
- **机制（Mechanism）**：Quota-Based Aging (QBA)，把预测的短作业优先准入，与配额受限、按亏空强制执行的"对老化预测长请求的提升"结合起来，并用一个从模拟器轨迹校准的简化 M/G/n 排队替代模型来解释。
- **证据（Evidence）**：事件驱动的服务感知仿真，建模了解码优先批处理、分块 prefill、token 预算和 KV 缓存安全准入，运行于合成与生产衍生工作负载；结果为定性，摘要中没有数字。
- **边界（Boundary）**：摘要未说明
- **可偷的一招（Stealable move）**：用配额或亏空账户约束一个纠正机制，使它即使在触发条件成立时也不能无限开火。
- **一句话卖点（Pitch）**：一个在激进的短作业优先与无限制老化之间可控的中间地带。

### 12. ProServe: Unified Multi-Priority Request Scheduling for LLM Serving (arXiv 2025)
- **问题（Problem）**：现有调度器没有同时优化 SLO 达成率与客户端级优先级，而满足一个业务关键的请求，其价值远高于满足另一个。
- **假设（Assumption）**：不同优先级的请求携带不同且定义良好的收益，因此多优先级调度可以被表述为单一的服务收益最大化问题。
- **机制（Mechanism）**：一个两层框架：引擎层的 SlideBatching 用滑动边界调整批次构成；异步卸载配管道化重载与自适应拷贝预算控制，用于抢占；服务层的 GoRouting 做面向收益、能力感知的派发，并带容量预留。
- **证据（Evidence）**：四个开源数据集与一个工业数据集；ProServe 优于最...（摘要被截断）。
- **边界（Boundary）**：摘要未说明
- **可偷的一招（Stealable move）**：把多目标策略问题转成一个显式的"每请求价值"目标，然后让这单个标量同时驱动批处理与路由决策。
- **一句话卖点（Pitch）**：一个旨在最大化整体服务收益的统一两层调度框架。

### 13. A Predictive and Synergistic Two-Layer Scheduling Framework for LLM Serving (arXiv 2025)
- **问题（Problem）**：两层 router/engine 拆分存在信息泄漏：router 依据滞后的粗粒度指标行动，而 engine 运行静态启发式，造成 SLO 违约与资源浪费。
- **假设（Assumption）**：单个在线性能模型能产生足够准确的逐步延迟与容量估计，让两层都能提前行动。
- **机制（Mechanism）**：NexusSched，建立在一个结构信息化的在线性能模型之上，由该模型驱动 LENS（引擎层 SLO 感知的自适应批处理）与 PRISM（集群层预测性、状态驱动的路由）。
- **证据（Evidence）**：评估报告 SLO 达成率平均提升 43%，在长...下吞吐最高加速 3x（摘要被截断）。
- **边界（Boundary）**：摘要未说明
- **可偷的一招（Stealable move）**：给层级中的两层同一个前瞻性模型，让廉价的那层去查询预测，而不是套用自己的启发式。
- **一句话卖点（Pitch）**：把 LLM 服务从被动负载均衡转向预测性编排。

### 14. Efficiency and Cost Alignment in Batched LLM Serving via Resource-Fair Scheduling (arXiv 2026)
- **问题（Problem）**：一个批步骤的墙钟成本由其最大的活跃 KV 缓存占用决定，因此与长请求同批的短请求要付出与其自身 token 不成比例的延迟与 GPU 成本。
- **假设（Assumption）**：限制批内解码进度（等价地，KV 占用）的差异，可以提升吞吐并使成本与按 token 计费的收入对齐。
- **机制（Mechanism）**：一个带批内 KV 占用差异公平性约束的数学调度模型，导出 Insert-Short-Jobs-with-Limit (ISJL)，一种参数化的混合批处理策略。
- **证据（Evidence）**：分析加数值实验；证明 ISJL 的全局竞争比下界为 3/4，并将其定位于 FCFS 与 LJF 之间；摘要中没有实验数字。
- **边界（Boundary）**：摘要未说明
- **可偷的一招（Stealable move）**：当一个共享批次的成本按其最大成员计费时，限制成员之间的差异，而不是纯粹按到达时间或按大小排序。
- **一句话卖点（Pitch）**：一个双准则策略，在保持吞吐的同时让由最大成员驱动的批成本与按 token 计费的收入对齐。

### 15. Conveyor: Efficient Tool-aware LLM Serving with Tool Partial Execution (arXiv 2024)
- **问题（Problem）**：触发外部工具的请求会在工具运行时让服务停滞，因为服务把工具调用当作一段不透明的空档，而不是可调度的工作。
- **假设（Assumption）**：工具可以在其输入完全已知之前做有用的工作，而且这部分部分执行的工作能在完整输入到达时被调和。
- **机制（Mechanism）**：Conveyor 增加一个接口，让工具开发者向服务系统暴露部分执行的机会；并增加一个请求调度器，把部分工具执行与 LLM 解码一并调度。
- **证据（Evidence）**：评估平台摘要未说明；请求完成延迟最多改善 38.8%。
- **边界（Boundary）**：摘要未说明
- **可偷的一招（Stealable move）**：让被调用方发布部分可执行的接口，使调用方可以用自己的工作与对方的启动阶段重叠，而不是干等交接。
- **一句话卖点（Pitch）**：把工具部分执行与 LLM 解码并列，识别为一个新的效率机会。

### 16. Geometry-Aware Online Scheduling for LLM Serving: From Theoretical Bound to System Practice (arXiv 2026)
- **问题（Problem）**：以时间为中心的启发式（如最短作业优先）继承了经典调度的保证，而这些保证并没有建模 LLM KV 缓存占用的动态二维时空增长。
- **假设（Assumption）**：KV 占用的几何体积容许一种最坏情况界优于基于时间的排序，且该界在粗粒度信息下依然成立。
- **机制（Mechanism）**：Smallest Volume First (SVF) 及其 1-bit 变体，通过体积证书（volume certificate）论证给出证明，并作为即插即用层集成进 vLLM。
- **证据（Evidence）**：分析给出接近 3 的最坏情况近似比（此前最优常数为 48），加上 vLLM 中 Llama-3.1 上的真实系统评估，平均延迟与尾延迟均有下降；1-bit SVF 仅用一位信息即可竞争。
- **边界（Boundary）**：摘要未说明
- **可偷的一招（Stealable move）**：在实际约束争用资源的那个度量里重新推导经典启发式，然后问信号可以量化到多粗而保证不崩塌。
- **一句话卖点（Pitch）**：一个理论上可靠、经验上得证的内存受限调度方法。

### 17. HexAGenT: Efficient Agentic LLM Serving via Workflow- and Heterogeneity-Aware Scheduling (arXiv 2026)
- **问题（Problem）**：用户等待的是一个依赖关系只在运行时才揭示的完整工作流，且跨越异构 prefill-decode 集群，而这两个阶段压的是不同资源。
- **假设（Assumption）**：持续维护的工作流独立完成时限估计，即使在 DAG 仍在扩展时，也是可用的优先级信号。
- **机制（Mechanism）**：HexAGenT 把每个请求建模为在线揭示的 DAG，维护工作流完成时限的运行估计，按错过该时限的预估风险对就绪调用排序，并在 KV 容量与传输延迟约束下联合选择 prefill 放置、decode 放置与本地队列优先级。
- **证据（Evidence）**：异构 A100/H100/H200 集群上的代表性 agentic 工作负载；在 95% 达成率下平均降低所需 SLO 规模 20.1%，在 99% 下降低 33.0%，最大降幅分别为 45.0% 与 80.5%。
- **边界（Boundary）**：摘要未说明
- **可偷的一招（Stealable move）**：即使作业的大部分结构仍未知，也按整个作业的截止时间调度，办法是持续重估完成时限而不是只估一次。
- **一句话卖点（Pitch）**：一个面向异构 prefill-decode 分离式服务的工作流感知调度器。

### 18. Past-Future Scheduler for LLM Serving under SLA Guarantees (ASPLOS 2025)
- **问题（Problem）**：连续批处理依赖估计请求内存，但可变的输出长度把调度器推向激进或保守的极端，在 SLA 下造成有害的驱逐或长排队。
- **假设（Assumption）**：输出长度的历史分布能足够好地预测未来的内存占用，从而计算每个未来时间点的峰值。
- **机制（Mechanism）**：一个 Past-Future 调度器，把历史输出长度分布与每个未来时间点的已计算占用结合起来，估计运行批次的峰值内存，实现在 LightLLM 框架中。
- **证据（Evidence）**：真实系统（LightLLM）评估显示，相比现有激进或保守的调度器，goodput 最高高 2-3$\times$（摘要被截断）。
- **边界（Boundary）**：摘要未说明
- **可偷的一招（Stealable move）**：当资源必须为未知时长预留时，预留预测占用曲线的峰值，而不是点估计或最坏情况。
- **一句话卖点（Pitch）**：精确估计运行批次的峰值内存，以在严格 SLA 保证下维持 goodput。

### 19. ExaServe: Large-Scale LLM Serving on Exascale HPC Systems (arXiv 2026)
- **问题（Problem）**：云原生服务框架若没有调度器集成、MPI 启动、加速器选择、节点本地权重暂存和平台特定补丁，就无法登上领导级超级计算机。
- **假设（Assumption）**：所有平台特定的粘合都能被吸收进一份声明式规格，使一次百亿亿次部署可以作为单个制品复现。
- **机制（Mechanism）**：一个可 pip 安装的框架，把声明式 YAML 规格转换成可复现的大规模服务部署，并在 ALCF Aurora 上从 1 个节点演示到 256 个节点（3072 个 vLLM 副本）。
- **证据（Evidence）**：Aurora 上的真实部署；非流式推理在 27.1k 请求/秒（3.8M token/秒）下近似线性扩展到 256 个节点；token 流式在集中式代理处于约 4.7k 请求/秒附近触及平台；O(N^2) 的 Ray Serve 控制平面瓶颈使 256 节点时启动时间升至约 30 分钟。
- **边界（Boundary）**：流式不随节点扩展（代理在约 4.7k req/s 处平台化），且控制平面成本按 O(N^2) 增长，抬高了部署时间。
- **可偷的一招（Stealable move）**：把无法扩展的那一层作为一等结果报告，而不是脚注；部署的负面结果正是下一个系统构建者所需要的。
- **一句话卖点（Pitch）**：一条实用、可复现的部署路径，同时暴露了百亿亿次 LLM 服务的关键障碍。

### 20. BurstGPT: A Real-world Workload Dataset to Optimize LLM Serving Systems (arXiv 2024)
- **问题（Problem）**：没有公开的服务工作负载，系统就会在不现实的假设下被评估，一旦部署便出现退化。
- **假设（Assumption）**：来自一家商业供应商区域生产流量的统计，能足够好地表征现实的 LLM 服务负载，从而充当社区评估标准。
- **机制（Mechanism）**：BurstGPT，一个轨迹数据集，捕获用户请求的并发度与突发性、对话模式与间隔、模型响应长度以及系统响应失败。
- **证据（Evidence）**：来自区域 Azure OpenAI GPT 服务、跨 213 天的 1031 万条轨迹数据集，外加一个演示性评估，显示在现实变化下效率、稳定性或可靠性的下降（摘要被截断）。
- **边界（Boundary）**：摘要未说明
- **可偷的一招（Stealable move）**：优化之前，先发表证明你所假设的工作负载分布是错的测量结果，并把轨迹作为人人都必须击败的共享基线发出去。
- **一句话卖点（Pitch）**：一个真实世界的 LLM 服务工作负载，展示了当前评估假设为何会误导。

### 21. PersistentKV: Page-Aware Decode Scheduling for Long-Context LLM Serving on Commodity GPUs (arXiv 2026)
- **问题（Problem）**：最好的单个 kernel 并不是最好的服务调度：低活跃度的长上下文解码未充分利用 GPU，而混合序列长度迫使在大量精确长度启动与粗粒度填充批次之间二选一。
- **假设（Assumption）**：在少量轨迹上校准的成本模型可以迁移到留出流量，并对它所路由的形状保持有效。
- **机制（Mechanism）**：一个面向分组查询注意力（grouped-query attention, GQA）的原生 block-table 解码注意力引擎，按 KV-head 组在原生页表上映射工作；一个只针对非空 row-KV-head-sequence-split 任务的紧凑工作队列调度；以及一个 roofline 风格策略，为每种形状在 FlashInfer 与 PersistentKV 路径之间路由。
- **证据（Evidence）**：RTX 3060（FP16，page size 16，Hq=32，Hkv=8，d=128）上的真实系统：五个留出种子在 B8 双峰、均匀与 Zipf 类负载上把平均墙钟解码 token 吞吐提升 1.04x 到 1.08x，在 B1 分桶轨迹上提升 1.40x（摘要被截断）。
- **边界（Boundary）**：对 B4 边界情形和未校准的 GQA 比例，策略只通过回退到 FlashInfer 来避免回退，因此收益不延伸到那里。
- **可偷的一招（Stealable move）**：不要替换现有实现；增加一个按输入形状在各实现之间挑选的成本模型，并把"什么都不做"作为一等选项。
- **一句话卖点（Pitch）**：最好的单 kernel 实现并不总是最好的服务调度。

### 22. Token Latency Fairness: Performance Isolation for Multi-Tenant LLM Serving (arXiv 2026)
- **问题（Problem）**：现有隔离均衡了长期吞吐，却不提供延迟隔离，因此行为良好的客户端仍可能因另一客户端的需求而遭受大幅的 token 级延迟退化。
- **假设（Assumption）**：来自 GPU 计算共享与共享 KV 缓存的延迟可以提前给出上界，然后用逐 token 截止时间强制执行。
- **机制（Mechanism）**：FairInference 提供 δ-token 公平性保证，按逐 token 截止时间调度，同时对来自 GPU 计算共享的延迟给出上界，并计入 GPU 内存中共享 KV 缓存引入的延迟。
- **证据（Evidence）**：评估报告称行为良好客户端的 token 级延迟尖峰受到限制，且整体吞吐提升；摘要中未陈述数值结果。
- **边界（Boundary）**：该保证只针对行为良好的客户端陈述；未声称作恶客户端下的行为。
- **可偷的一招（Stealable move）**：把隔离定义为相对单独执行时每单位延迟的上界（一个 delta），而不是吞吐的均等份额。
- **一句话卖点（Pitch）**：一个新的 δ-token 公平性保证，为 LLM 服务提供强延迟隔离。

### 23. TimelyLLM: Segmented LLM Serving System for Time-sensitive Robotic Applications (arXiv 2024)
- **问题（Problem）**：现有服务系统中的 FCFS 批处理忽略了机器人智能体需要在截止时间前拿到计划，而不是最终拿到。
- **假设（Assumption）**：计划生成阶段与计划执行阶段之间的冗余足够大，以致对时间敏感的消费者而言拆分生成是划算的。
- **机制（Mechanism）**：利用机器人计划生成与执行阶段之间冗余的分段生成与调度。
- **证据（Evidence）**：在一个广泛使用的 LLM 服务框架上实现，在一系列机器人应用上评估；时间效用最高提升 1.97x，总等待时间减少 84%。
- **边界（Boundary）**：摘要未说明
- **可偷的一招（Stealable move）**：找到消费者下游阶段中的松弛，把你的输出切分，使可用的片段能在整件完成之前就交付。
- **一句话卖点（Pitch）**：为多个带时间敏感请求的机器人智能体提供服务，而不是先来先服务。

### 24. TOPAS: Workflow-Aware Prefix-State Scheduling for Multi-Agent LLM Serving (arXiv 2026)
- **问题（Problem）**：保留长系统提示词的 KV 缓存能加速未来调用，却压缩了并发批处理可用的内存；而单独优化局部性或工作流进度都会拉长作业完成时间。
- **假设（Assumption）**：一个任务最长剩余服务路径的预期缩减量，是一个可处理且忠实的缓存/调度决策评分。
- **机制（Mechanism）**：TOPAS 通过权衡每个任务最长剩余服务路径的预期缩减量与近期下游前缀复用，来给决策后的候选状态打分，并对其征收前缀移动与抢占的代价，再加大任务级老化以防饿死；实现在 SGLang 中。
- **证据（Evidence）**：真实系统（SGLang）在三个合成 DAG 与两个 MetaGPT 工作流上；平均/p99 JCT 在合成负载上最多下降 39.8%/49.4%，MetaGPT-SOP 上平均 9.8%，MetaGPT-TL 上平均/p99 为 22.0%/26.6%。
- **边界（Boundary）**：摘要未说明
- **可偷的一招（Stealable move）**：用每个候选动作对作业关键路径的影响来打分，并让它对在别处造成的驱逐与移动付出代价。
- **一句话卖点（Pitch）**：一个任务导向的前缀感知调度器，同时决定缓存什么与运行什么。

### 25. Efficient Interactive LLM Serving with Proxy Model-based Sequence Length Prediction (arXiv 2024)
- **问题（Problem）**：自回归生成使执行时间不可预测，因此服务退回到 FCFS 并遭受队头阻塞。
- **假设（Assumption）**：轻量代理模型（proxy model）的长度预测足够准确，因此尽管存在投机误差，最短作业优先排序仍然胜出。
- **机制（Mechanism）**：一个投机最短作业优先（speculative shortest-job-first, SSJF）调度器，用轻量代理模型预测输出序列长度，且不改动内存管理或批处理。
- **证据（Evidence）**：真实世界数据集与生产工作负载轨迹；在无批处理、动态批处理与连续批处理下，相比 FCFS 平均作业完成时间减少 30.5-39.6%，吞吐提升 2.2-3.6x。
- **边界（Boundary）**：摘要未说明
- **可偷的一招（Stealable move）**：让投机预测器严格留在正确性关键路径（内存管理、批处理）之外，这样策略可以随时插入或摘除而不触及这些路径。
- **一句话卖点（Pitch）**：在 LLM 执行时间不确定的前提下仍然实现高效交互式服务。
