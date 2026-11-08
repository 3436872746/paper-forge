> 中文版 · English: [cards_batch2.md](cards_batch2.md)

### 1. HAServe: Horizon-Aware Scheduling and Memory Co-Design for Efficient LLM Serving (arXiv 2026)
- **问题（Problem）**：在线请求共享上下文，但前缀结构与到达时间各不相同；有限容量把准入与 KV 保留耦合在一起，二者都无法单独决策得当。
- **假设（Assumption）**：对可见需求的统一视图——精确的前缀路径、被允许的序列化方式、已释放的消费者——足以在速率变化时预测联合准入/KV 保留候选的延迟成本。
- **机制（Mechanism）**：HorizonSchema 工作负载抽象供给一个调度-内存协同设计，在可行候选中选出预测延迟成本最低的联合准入与 KV 保留方案，构建于 SGLang 之上。
- **证据（Evidence）**：真实系统：SGLang，8x H100，Qwen3-4B-Instruct-2507 与 Llama2-13B，五个工作负载；P99 TTFT 最高加速 1.14-5.90x，吞吐 1.08-1.44x，KV 缓存命中率按各指标最高比最强基线高 20.59 个百分点。
- **边界（Boundary）**：摘要未说明
- **可偷的一招（Stealable move）**：把工作负载的未来需求——哪些条目会被复用、何时、由谁——作为准入策略与保留策略的共享输入暴露出来，使这组耦合决策被联合优化而不是顺序优化。
- **一句话卖点（Pitch）**：对可见需求的统一视图让系统在最低的预测延迟成本下同时选择准入与 KV 保留。

### 2. Trinity: Disaggregating Vector Search from Prefill-Decode Disaggregation in LLM Serving (arXiv 2025)
- **问题（Problem）**：向量检索仍与模型推理纠缠在一起——异构的 RAG 请求与提示答案缓存——即使把 prefill 与 decode 分离之后，也仍会抬高尾延迟。
- **假设（Assumption）**：所有检索都能整合进一个共享的向量检索 GPU 池，并与 PD 分离式服务协同调度，而在多样的检索工作负载下不违反 SLO。
- **机制（Mechanism）**：一个与 PD 分离相匹配的专用 GPU 向量检索池，异构查询下向量检索的连续批处理，以及阶段感知调度，在 decode 与 prefill 任务之间抢占向量检索请求。
- **证据（Evidence）**：摘要未说明
- **边界（Boundary）**：摘要未说明
- **可偷的一招（Stealable move）**：当流水线中的某一个阶段是与其余部分不同类型的工时，给它一个自己的同构池，让阶段感知调度器使它与被它竞争的阶段相互抢占，而不是把它嵌在主流水线内部。
- **一句话卖点（Pitch）**：把所有检索整合进一个共享的向量检索池，与 PD 分离式服务配合工作。

### 3. Efficient LLM Serving for Agentic Workflows: A Data Systems Perspective (arXiv 2026)
- **问题（Problem）**：agentic 工作流是相互依赖的 LLM 调用链，因提示与中间结果重叠而存在大量冗余，然而服务系统对每次调用孤立地优化，忽略了跨调用依赖。
- **假设（Assumption）**：agentic 工作负载可以表达为把 LLM 调用当作一等算子的查询计划，因此经典查询优化（复用、缓存）是适用的。
- **机制（Mechanism）**：把 agentic 工作负载建模为查询计划，把 LLM 调用视为算子，并把主动缓存与缓存感知调度结合起来，以最大化提示、KV 状态与整个工作流层面的复用（Helium）。
- **证据（Evidence）**：在多种工作负载上评估：相比最先进的 agent 服务系统最高加速 1.56x；摘要中没有进一步的定量细节。
- **边界（Boundary）**：摘要未说明
- **可偷的一招（Stealable move）**：把优化单元从单个请求抬升到调用的依赖图，并把重复的子结果当作物化视图（materialized view），主动缓存它们并围绕它们调度。
- **一句话卖点（Pitch）**：跨整个工作流而非单次调用的端到端优化，才是让可扩展且高效的 LLM agent 成为可能的原因。

### 4. Cross-Model Autoscaling for Shared LLM Serving (arXiv 2026)
- **问题（Problem）**：在共享的 MaaS 集群中，同驻模型竞争固定的 GPU 预算，但自动扩缩器是模型局部的——它们的信号只暴露局部活动或滞后延迟，对共享容量该如何切分一无所知。
- **假设（Assumption）**：对每个活跃或排队请求的有效 token 服务量做校准的、按需求归一化的估计，能得到一个跨异构模型与 SLO 类别可比较的健康分数。
- **机制（Mechanism）**：Token Service Share (TSS) 在固定 GPU 预算下指导有界的"接收方-让出方"容量移动，把快速救援与较慢的再平衡分开，并把副本增量重新分配给亏空最大的模型；构建在 Kubernetes 热切换栈上，且不改动推理调度器。
- **证据（Evidence）**：覆盖七条 LLM 服务轨迹的真实系统：在相同运行时上，相比基于 KV 缓存的反应式自动扩缩器，P95 端到端延迟下降 11.9-79.0%，P99 下降 12.5-72.6%；在生产衍生的对话/代码轨迹上为 50.8/63.7% 与 79.0/72.6%（摘要被截断）。
- **边界（Boundary）**：摘要未说明
- **可偷的一招（Stealable move）**：用单一按需求归一化、可跨组件比较的分值取代各组件的局部健康信号，然后在有界的让出方与接收方之间移动容量，而不是独立调整每个组件的大小。
- **一句话卖点（Pitch）**：单个校准过的 token 服务份额信号，让控制平面在各带自身延迟 SLO 的模型之间重新平衡共享 GPU 容量。

### 5. Astrolabe: Balancing Load in LLM Serving with Randomized Prediction-Guided Scheduling (ATC 2025)
- **问题（Problem）**：实例间的负载不均通常靠迁移来纠正，但 KV 缓存传输在高负载下带来可观的开销与网络争用。
- **假设（Assumption）**：响应长度与每实例延迟可以在派发时被足够廉价地预测，从而引导每个请求，而完全不需要任何纠正性移动。
- **机制（Mechanism）**：一次性随机派发，结合响应长度估计、基于模拟的每实例延迟预测，以及 power-of-two-choices 策略。
- **证据（Evidence）**：真实系统，默认 Llama-2-7B/ShareGPT：31.6 对 31.5 QPS 的 SLO 容量，平均 TTFT -8 到 36%，P99 TTFT -16 到 77%，平均 E2E 最高 -5.6%，抢占少约 6x；Qwen2-7B 上 SLO 容量 +6%，紧批处理下 +7.1%，突发下 E2E 降低 6-9%，每预测器 CPU 用量比全扇出低约 2.8x，在 A100 上启用迁移时吞吐最高为 Llumnix 的 2.6x。
- **边界（Boundary）**：摘要未说明
- **可偷的一招（Stealable move）**：通过让放置决策在到达时就信息充分——为每个候选预测结果并在两者之间随机化——来完全避免状态迁移，从而永远不需要纠正性移动。
- **一句话卖点（Pitch）**：预测引导的一次性随机派发在均衡负载的同时避免请求羊群效应（request herding）与迁移成本。

### 6. FineServe: A Fine-Grained Dataset and Characterization of Global LLM Serving Workloads (arXiv 2026)
- **问题（Problem）**：服务研究依赖代理轨迹或粗粒度刻画，无法捕捉现代多模型 LLM 平台的异质性。
- **假设（Assumption）**：来自某商业市场的一条野外（in-the-wild）多模型轨迹，足够有代表性，可以刻画真实的服务动态，并为生成器提供基础。
- **机制（Mechanism）**：采集一个野外的多模型服务数据集，分析跨架构、规模与任务意图的到达动态与 token 行为，然后构建一个生成器，把细粒度的模型感知工作负载组合成可配置的混合。
- **证据（Evidence）**：轨迹数据集加分析：来自全球商业市场的一条野外多模型轨迹，已公开发布；摘要中未给出性能数字或波动幅度。
- **边界（Boundary）**：摘要未说明
- **可偷的一招（Stealable move）**：按模型而非按聚合刻画工作负载，并把基准生成器作为模型感知组件的组合发布，使混合可以重新配置而无需采集新轨迹。
- **一句话卖点（Pitch）**：细粒度、模型感知的工作负载动态，是路由、调度与容量规划评估中缺失的现实基础。

### 7. PrefixBench-H100: Characterizing Prefix Reuse and Time-to-First-Token in H100 LLM Serving (arXiv 2026)
- **问题（Problem）**：运行时已会为重复前缀复用 KV 状态，但在当代加速器上复用何时才实质有益，以及调度、缓存粒度、并发或内存压力何时封顶收益，仍不清楚。
- **假设（Assumption）**：在单一加速器上对工作负载与缓存参数做受控、可复现的扫描，可以划出前缀复用跨各运行时的工作包络。
- **机制（Mechanism）**：一个基准与测量框架，混合受控合成轨迹与聊天式、检索式工作负载，在两个服务运行时上变动共享前缀长度、后缀多样性、到达模式、并发、输出长度与缓存配置。
- **证据（Evidence）**：在单块 H100、两个运行时上的基准/测量研究，采集 TTFT、token 间延迟、E2E 延迟、吞吐、缓存命中统计、GPU 内存与剖析轨迹；未给出数字，以及关于缓存有效性对并发与输出基本不敏感的论断（摘要被截断）。
- **边界（Boundary）**：范围是单块 H100 与两个运行时，且作者声明目标不是提出新的缓存算法；复用收益被承认受调度、缓存粒度、并发或内存压力所限。
- **可偷的一招（Stealable move）**：优化一个机制之前，先发布它的包络：扫描收益所依赖的参数，并报告收益存活与崩塌的两个区间。
- **一句话卖点（Pitch）**：揭示 H100 级服务中前缀复用的实用工作包络，而不是再提出一个新的缓存算法。

### 8. BOute: Cost-Efficient LLM Serving with Heterogeneous LLMs and GPUs via Multi-Objective Bayesian Optimization (MLSys 2026)
- **问题（Problem）**：成本高效的服务既需要把简单查询路由到更便宜的模型，也需要跨异构 GPU 部署，但路由、部署配置以及二者的协同优化必须同时满足延迟与质量要求。
- **假设（Assumption）**：路由策略与部署配置的联合空间足够平滑，多目标贝叶斯优化器无需穷举测量每个配置就能找到近优点。
- **机制（Mechanism）**：一个多目标贝叶斯优化（multi-objective Bayesian optimization, MOBO）框架，协同优化查询路由策略与模型部署（异构 GPU 上的资源分配与并行），同时保证响应质量。
- **证据（Evidence）**：在相同成本预算与质量要求下，比最先进的 LLM 服务系统最高好 157%、平均好 59%，或将服务成本降低 15%-61%（摘要被截断）。
- **边界（Boundary）**：摘要未说明
- **可偷的一招（Stealable move）**：当算法策略与物理放置受同一预算约束时，用采样高效的多目标优化器一起搜索它们，而不是逐层分别调。
- **一句话卖点（Pitch）**：协同优化路由与异构 GPU 部署，在保证响应质量的同时最大化成本效益。

### 9. LAPS: A Length-Aware-Prefill LLM Serving System (arXiv 2026)
- **问题（Problem）**：prefill-decode 分离提升了吞吐，却保留了统一调度，无法适应提示长度异质性——不同长度撞上不同瓶颈。
- **假设（Assumption）**：提示长度是足够的分区依据，因此长 prefill 的多轮请求与短 prefill 请求可以分开调度而不牺牲吞吐。
- **机制（Mechanism）**：把多轮长 prefill 与短 prefill 请求分离，配有长度感知的智能批处理机制、一个支持在单个 prefill 实例上做时间分离或跨实例做空间分离的双队列设计，以及批等待窗口与面向短批次的 CUDA Graph 聚类。
- **证据（Evidence）**：真实多轮工作负载：在 PD 分离下 prefill 延迟比原生 SGLang 下降超过 30%，多实例数据并行部署中 SLO 违约下降 28%，多 GPU 场景下比 SGLang 负载均衡路由器再少 12% 的 SLO 违约，高并发下在单个 prefill 实例上服务 Qwen2.5-32B 吞吐提升 35%。
- **边界（Boundary）**：摘要未说明
- **可偷的一招（Stealable move）**：按预示请求将压哪种资源的特征来分区，然后给每个分区自己的队列与批处理纪律，而不是一个策略通吃。
- **一句话卖点（Pitch）**：提示长度异质性值得有它自己的调度策略，而不是统一的策略。

### 10. Characterizing High Bandwidth Flash for LLM Serving (arXiv 2026)
- **问题（Problem）**：权重与 KV 缓存需要越来越大的容量与带宽，agentic 工作负载又通过反复重读不断增长的上下文进一步加剧压力，而这些上下文的 KV 状态值得保留。
- **假设（Assumption）**：如果访问成本与写入寿命由数据放置和缓存感知缓冲来处理，而不是被当作阻碍，Flash 就可以充当一个容量层级。
- **机制（Mechanism）**：一个 HBM-HBF-主机的层次化存储系统，配缓冲式缓存感知调度，并用轨迹驱动仿真分析性能、能耗与 HBF 写入寿命。
- **证据（Evidence）**：轨迹驱动仿真：最快的 HBF 增强系统相比仅用 HBM 将完成时间缩短 36.1-87.7%，建模能耗节省达 59.1%，缓冲式缓存感知调度把估计的 HBF 写入寿命从 1.21 年延长到 14.82 年。
- **边界（Boundary）**：摘要承认 HBF 的访问成本与有限的写入寿命使其使用复杂化，且收益取决于工作负载与权重放置。
- **可偷的一招（Stealable move）**：增加一个廉价但慢的层级时，把写入寿命与延迟、能耗并列为一级指标，并依据该层级的寿命预算来塑造写入调度。
- **一句话卖点（Pitch）**：HBF 可以为 agentic 服务扩展加速器内存，但前提是数据放置与调度被协同起来以维持实用的写入寿命。

### 11. LLMServingSim 2.0: A Unified Simulator for Heterogeneous and Disaggregated LLM Serving Infrastructure (arXiv 2026)
- **问题（Problem）**：性能现在由异构硬件与分离式软件的运行时交互决定——调度、数据移动、互连——而现有模拟器无法在一个运行时驱动的框架中同时建模二者。
- **假设（Assumption）**：把服务决策与硬件行为嵌入同一个运行时循环，足以以低误差复现批处理、路由、卸载、内存与功耗上的交互效应。
- **机制（Mechanism）**：一个系统级模拟器，把服务决策与硬件行为放进同一个运行时循环，并用基于剖析的建模支持新兴加速器与内存系统的可扩展集成。
- **证据（Evidence）**：针对真实部署验证，复现关键性能、内存与功耗指标，平均误差 0.95%（摘要被截断）。
- **边界（Boundary）**：摘要未说明
- **可偷的一招（Stealable move）**：把策略与硬件模型放进同一个仿真循环，使策略对建模出的系统状态作出反应，而不是对固定轨迹回放。
- **一句话卖点（Pitch）**：异构、分离式服务中运行时驱动的软硬件交互，应当在一个框架中被显式地分析。

### 12. ThunderServe: High-performance and Cost-efficient LLM Serving in Cloud Environments (MLSys 2025)
- **问题（Problem）**：云环境提供多样的 GPU 类型，也带来多样的网络条件，这使高性能服务变得困难；而由于 GPU 短缺，自有同构集群又不可得。
- **假设（Assumption）**：可以针对给定的异构资源与带宽配置计算出一份部署计划，在线条件变化时只需轻量重调度。
- **机制（Mechanism）**：一个针对异构资源与网络带宽条件优化部署计划的调度算法，配有轻量重调度机制，能适应节点故障与工作负载变化而不重启正在进行的服务。
- **证据（Evidence）**：在异构云与同构自有环境中的实证结果：在相同价格预算下相比最先进系统，吞吐最高 2.1x（平均 1.7x），延迟截止违约最高降低 2.5x（平均 1.5x）。
- **边界（Boundary）**：摘要未说明
- **可偷的一招（Stealable move）**：把昂贵的全局决策（一个计划）与廉价的自适应决策（一次重调度）分开，使对故障或负载变化的反应永不需要重启在线服务。
- **一句话卖点（Pitch）**：如果部署计划与重调度为此而设计，选择异构云服务比同构自有集群更具成本效益。

### 13. Efficient LLM Serving on Hybrid Real-time and Best-effort Requests (arXiv 2025)
- **问题（Problem）**：服务同时承载延迟关键的交互请求与面向吞吐的批请求，为每种类型专门分配机器简化了调度，却牺牲了利用率。
- **假设（Assumption）**：延迟关键请求与尽力而为请求可以在自适应优先级下共享 KV 内存与机器，而不牺牲尽力而为的吞吐。
- **机制（Mechanism）**：BROS 把混合 RT/BE 调度形式化，并用一个动态优先级算法求解，外加一个双向 KV 缓存管理机制，让 RT 请求与 BE 请求共享 KV 内存。
- **证据（Evidence）**：实验：RT 请求延迟最高降低 74.20%，细粒度 SLO 达成率最高 36.38x，而"through..."（吞吐）影响可忽略（摘要被截断）。
- **边界（Boundary）**：摘要未说明
- **可偷的一招（Stealable move）**：让内存成为两类请求之间共享的货币——让延迟关键的类借用吞吐类的缓存状态——使优先级调度永不被容量短缺所阻塞。
- **一句话卖点（Pitch）**：在动态优先级与共享 KV 内存下同置 RT 与 BE 请求，优于为每一类专门分配机器。

### 14. DualMap: Enabling Both Cache Affinity and Load Balancing for Distributed LLM Serving (arXiv 2026)
- **问题（Problem）**：缓存亲和路由与负载均衡相互拉扯，而现有调度器只在一个映射空间中工作，对一个请求子集套一种策略、对其余请求套另一种。
- **假设（Assumption）**：对同一提示的两套独立哈希映射，加上基于实时状态在二者之间选择，足以同时获得亲和性与分散性。
- **机制（Mechanism）**：通过两个独立哈希函数把每个请求映射到两个候选实例，并从当前系统状态中选出更好的一个，附加 SLO 感知路由、把请求从过载实例迁走的热点感知再平衡，以及轻量级的 dual-（摘要被截断）。
- **证据（Evidence）**：摘要未说明（摘要在结果之前被截断）
- **边界（Boundary）**：摘要承认仅有双映射本身并不鲁棒——应对动态且倾斜的真实工作负载还需要额外技术。
- **可偷的一招（Stealable move）**：与其在两个相互冲突的目标之间二选一，不如生成两个廉价候选并用实时状态在其中选择，使每个决策都同时服务两个目标。
- **一句话卖点（Pitch）**：两套哈希映射加一次状态感知的选择，从一个统一调度器同时交付缓存亲和与负载均衡。

### 15. EcoServe: Enabling Cost-effective LLM Serving with Proactive Intra- and Inter-Instance Orchestration (arXiv 2025)
- **问题（Problem）**：非分离式服务受 prefill-decode 干扰之苦，而完全分离式服务依赖高性能互连，因此在商用网络上二者都不具成本效益。
- **假设（Assumption）**：实例内的时间分离加上跨实例的滚动激活，能在无需高速互连的情况下恢复完全分离的大部分收益。
- **机制（Mechanism）**：一种部分分离策略，含时间分离与滚动激活，把实例分组成一个"宏实例"（macro instance），外加用于组内路由的自适应调度算法和用于细粒度容量伸缩的 mitosis 伸缩方法。
- **证据（Evidence）**：真实生产级集群，32 块 NVIDIA L20 GPU 运行在商用以太网上，30B 与 70B 模型：相比四个...平均 goodput 提升 82.49%、86.17%、122.76% 与 126.96%（摘要被截断）。
- **边界（Boundary）**：摘要未说明
- **可偷的一招（Stealable move）**：当完全分离太贵、而不分离干扰又太大时，在单个实例内部沿时间分离、并跨实例轮换活动，使专门化的阶段始终可用。
- **一句话卖点（Pitch）**：部分分离在商用互连上交付分离的收益，兼具 goodput、负载均衡、硬件成本与工程简洁性。

### 16. PAM: Processing Across Memory Hierarchy for Efficient KV-centric LLM Serving System (arXiv 2026)
- **问题（Problem）**：KV 相关操作（注意力计算与缓存存储）如今成为服务瓶颈，因为它们既需要巨大带宽又需要巨大容量，而即使有存内计算（processing-in-memory），任何单级内存设计都无法满足。
- **假设（Assumption）**：KV 访问具有足够的固有上下文局部性，使 token 可以分散在一个内存层次上，且注意力可以跨设备分片计算而不损失效率。
- **机制（Mechanism）**：一个层次化的、启用 PIM 的内存设计，按上下文局部性分布 KV token，运行 PAMattention 算法在异构 PIM 设备间做细粒度并行注意力，并增加设备内 KV 映射、跨设备迁移接口与在线跨设备 KV 调度。
- **证据（Evidence）**：摘要未说明（摘要被截断）
- **边界（Boundary）**：摘要未说明
- **可偷的一招（Stealable move）**：沿数据的自然局部性拆分计算，使昂贵操作在数据已经所在处运行，只保留一条薄薄的迁移路径用于再平衡。
- **一句话卖点（Pitch）**：在层次结构中协调异构 PIM 设备，同时满足带宽与容量需求。

### 17. PALS: Power-Aware LLM Serving for Mixture-of-Experts Models (arXiv 2026)
- **问题（Problem）**：此前的服务系统优化批处理、调度与并行，却把 GPU 功耗当作静态约束而非可控资源，使能效收益无从获取。
- **假设（Assumption）**：轻量的离线功耗-性能模型加上反馈控制，能足够好地预测功耗上限与批大小组合的效果，以在线追踪吞吐目标。
- **机制（Mechanism）**：把 GPU 功耗上限当作一级控制旋钮，并与批大小等软件参数联合优化，使用离线功耗-性能模型与反馈驱动的控制器；实现在 vLLM 中，无需重训练或改动 API。
- **证据（Evidence）**：多 GPU 稠密与 MoE 模型上的真实系统：能效最高提升 26.3%，功耗约束下 QoS 违约减少 4x 到 7x，且能追踪动态功耗预算。
- **边界（Boundary）**：摘要未说明
- **可偷的一招（Stealable move）**：把一个所有人都当作固定的约束提升为决策变量，并与你本来就在调的软件旋钮联合优化。
- **一句话卖点（Pitch）**：功耗上限是控制旋钮而不是约束，与批大小协同优化可实现能耗比例式的服务。

### 18. Autopoiesis: A Self-Evolving System Paradigm for LLM Serving Under Runtime Dynamics (arXiv 2026)
- **问题（Problem）**：运行时权衡深度交织，并随工作负载波动与弹性扩缩持续移动，因此任何固定的人工工程策略在结构上都不可能保持最优。
- **假设（Assumption）**：一个 LLM 驱动的程序合成循环能够观察实时行为，并足够快速、安全地重写策略代码，从而作为持续的系统组件运行。
- **机制（Mechanism）**：一个 LLM 驱动的程序合成工作流，针对实时观测到的动态演化服务策略，并在服务期间持续运行，随运行时权衡变化重写策略代码。
- **证据（Evidence）**：摘要未说明（无定量结果；摘要被截断）
- **边界（Boundary）**：摘要未说明
- **可偷的一招（Stealable move）**：让策略本身成为运行时产物，由合成循环依据观测到的行为重写，而不是部署前一次性选定的配置。
- **一句话卖点（Pitch）**：服务策略应当是随系统演化的活代码，而不是人类预先设计的静态制品。

### 19. C2CServe: Leveraging NVLink-C2C for Elastic Serverless LLM Serving on MIG (arXiv 2026)
- **问题（Problem）**：无服务器服务面临庞大的模型目录与长尾流量，但专用 GPU 浪费稀缺的 HBM，分时共享把模型初始化与权重加载放到了冷启动路径上，而每个 MIG 切片所持有的 HBM 对现代权重来说又太少。
- **假设（Assumption）**：在 NVLink-C2C 机器上，主机内存足够快，权重可以驻留在那里并按需流向 MIG 实例，比把它们重新加载进 HBM 更便宜。
- **机制（Mechanism）**：在 MIG 上做请求粒度的模型切换，权重驻留在 CPU 内存；一个 HybridGEMM kernel 通过一个调优旋钮调整访存模式以平衡 HBM 与 C2C 带宽；以及一个层次化调度器，借助在线反馈控制协调模型放置、输入分块与 kernel 选择。
- **证据（Evidence）**：GH200 上的真实系统：相比最先进的无服务器 LLM 服务系统，稠密模型冷启动延迟最高降低 7.1x，MoE 模型降低 4.6x，在 C2C 争用下维持超过 95% 的 TTFT 与 TPOT 达成率。
- **边界（Boundary）**：摘要未说明
- **可偷的一招（Stealable move）**：把稀缺资源的内容移到充裕的层级，并按请求支付流式成本，把一个容量问题变成带宽调度问题，一个旋钮即可调。
- **一句话卖点（Pitch）**：高带宽的 CPU-GPU 互连让 MIG 实例可以跨请求切换模型，而无需把权重重新加载进 HBM。

### 20. Injecting Adrenaline into LLM Serving: Boosting Resource Utilization and Throughput via Attention Disaggregation (arXiv 2025)
- **问题（Problem）**：prefill-decode 分离消除了干扰，却让计算密集的 prefill 实例内存闲置，让内存密集的 decode 实例算力闲置。
- **假设（Assumption）**：解码阶段的注意力是内存受限的，因此其中一部分可以有利地放到 prefill 实例上执行，而不破坏解码循环的延迟。
- **机制（Mechanism）**：Adrenaline 把解码阶段的一部分注意力计算分离出来并卸载到 prefill 实例，使用低延迟的解码同步、资源高效的 prefill 同置，以及负载感知的卸载调度。
- **证据（Evidence）**：实验结果显示内存容量高 2.28x...（摘要被截断；无更多数字可用）。
- **边界（Boundary）**：摘要未说明
- **可偷的一招（Stealable move）**：在把两个阶段分开之后，把内存受限阶段中最易迁移的工作移回另一方如今闲置的算力上——按工作类型而不是按请求再平衡。
- **一句话卖点（Pitch）**：把部分解码注意力卸载到 prefill 实例，把每台机器浪费的那一半变成有用容量。

### 21. MuxServe: Flexible Spatial-Temporal Multiplexing for Multiple LLM Serving (arXiv 2024)
- **问题（Problem）**：把多个 LLM 作为端点来服务很难，因为模型热度会变化，固定分配会依哪个端点热而使内存或算力闲置。
- **假设（Assumption）**：模型可以按热度同置以复用内存，而 prefill 与 decode 可以分开并独立同置以复用算力。
- **机制（Mechanism）**：先形式化地表述复用问题，然后给出一个放置算法与一个自适应批调度策略，以找到使利用率最大化的同置方案，由统一资源管理器串联起来。
- **证据（Evidence）**：吞吐最高 1.8x，或在 99% SLO 达成率内多处理 2.9x 的请求。
- **边界（Boundary）**：摘要未说明
- **可偷的一招（Stealable move）**：沿不同轴复用不同资源——按预测热度打包内存，按阶段拆分再打包算力——而不是用一个标准打包一切。
- **一句话卖点（Pitch）**：考虑模型热度的时空复用使多 LLM 服务高效。

### 22. PEEK: Predictive Queue-Informed KV Cache Management for LLM Serving (arXiv 2026)
- **问题（Problem）**：前缀共享存在于等待队列中，但引擎从不把它暴露出来，因此准入顺序与驱逐都是在不知道哪些排队请求共享前缀的情况下决定的。
- **假设（Assumption）**：在待处理队列上维护一棵增量基数树（radix tree），并按请求与引擎的前缀缓存匹配，成本足够低可以在准入时运行，并且能暴露可利用的结构。
- **机制（Mechanism）**：在等待队列上维护一棵增量基数树，用双路遍历（dual-walk）计算每个等待请求的最长前缀匹配，先准入集群的"先驱"，使同批兄弟继承刚缓存好的前缀，通过协同设计的驱逐钩子保护祖先块，并用多车道步进（stride）调度器限制饿死。
- **证据（Evidence）**：真实系统：SGLang 与 vLLM 在五个工作负载上、至多 4xH100（DP=2 于 TP=2 之上），相比各自引擎最强的原生基线，缓存命中最高 3.0x/2.6x，TTFT 7.9x/7.1x，E2E 6.7x/5.5x，吞吐 3.6x/4.5x；在不存在前缀结构之处与基线在噪声范围内持平。
- **边界（Boundary）**：收益明确以前缀结构可利用为条件；在无此结构的工作负载上，系统仅与基线在噪声范围内持平。
- **可偷的一招（Stealable move）**：不仅看缓存，还要向待处理队列前瞻，并安排准入顺序使一个条目的工作被其后的条目复用，同时保护这份共享工作不被驱逐。
- **一句话卖点（Pitch）**：等待队列中已经含有复用结构，先准入先驱会让缓存自我强化。

### 23. A Shape-Adaptive Architecture with Disaggregated Quantization for Efficient LLM Serving (arXiv 2026)
- **问题（Problem）**：prefill 由大 GEMM 主导，decode 由小 GEMV 主导，而连续批处理加上 prefill-decode 分离使形状变得动态，固定加速器与系统行为错位。
- **假设（Assumption）**：脉动阵列（systolic array）执行的算力 tile 可以在运行时沿 GEMM 的全部三个维度重塑，且逐批选择该形状是划算的。
- **机制（Mechanism）**：DynaCore 在空间上（非对称的宽/高权衡）与时间上（Split-K 通过现有互连折叠）重塑最小有效单元（Minimum Efficient Unit, MEU），增加分离式量化——prefill 用双侧量化、decode 用仅权重量化——配混合精度内积数据通路，并在运行时逐批选择 MEU。
- **证据（Evidence）**：用真实服务轨迹进行架构评估：相比量化和可重构加速器显著降低服务级延迟，im...（摘要被截断；无数字可用）。
- **边界（Boundary）**：摘要未说明
- **可偷的一招（Stealable move）**：让硬件的工作 tile 尺寸成为逐批做出的调度决策，使一个单元既能服务大矩阵阶段，也能服务瘦向量阶段。
- **一句话卖点（Pitch）**：沿 GEMM 全部三个维度重塑算力 tile，加上与阶段匹配的量化，使加速器与服务实际行为对齐。

### 24. ENOVA: Autoscaling towards Cost-effective and Stable Serverless LLM Serving (arXiv 2024)
- **问题（Problem）**：多 GPU 无服务器集群同置着多样的应用，这种多样性导致服务质量低、GPU 利用率低，而自动扩缩必须同时决定配置与放置。
- **假设（Assumption）**：解构 LLM 服务的执行过程能得到一份可迁移到任意 GPU 集群的配置建议，且准确到可以据此自动扩缩。
- **机制（Mechanism）**：把执行过程分解为配置推荐模块（在任何 GPU 集群上自动部署）、性能检测模块（用于自动扩缩）以及部署执行引擎（用于多 GPU 集群调度）。
- **证据（Evidence）**：实验显示它显著优于其他最先进方法；摘要中未给出数字。
- **边界（Boundary）**：摘要未说明
- **可偷的一招（Stealable move）**：把自动扩缩拆成离线配置顾问与在线性能检测器，使同一系统通过重跑推荐而不是重调策略，就能移植到新的集群形态。
- **一句话卖点（Pitch）**：一个"推荐-检测-执行"栈，在多 GPU 集群上交付稳定、成本高效的无服务器 LLM 服务。

### 25. NELSSA: A GPU-PNM Heterogeneous System for Mixed-Length LLM Serving via Length-based Request Placement (arXiv 2026)
- **问题（Problem）**：工作负载混合了从几百到几十万 token 的上下文，但以 GPU 为中心的服务依赖受内存约束的大批次，对短请求贴合很差。
- **假设（Assumption）**：准入时的长度能预测哪个层级合适，且长上下文请求可以随上下文增长跨层级迁移而不重算。
- **机制（Mechanism）**：按基于长度的放置把短上下文请求路由到 GPU、长上下文请求路由到 PNM 层级，配以避免重算的运行时迁移、PNM 上的设备级稀疏注意力、GPU 解码 kernel，以及一个主机端运行时，通过 CXL 上的 RPC 与 RDMA 编排调度与跨层内存移动。
- **证据（Evidence）**：跨混合长度负载的端到端原型：解码吞吐最高高 5.5x（token/秒），P99 延迟最高低 15x（相比仅 GPU 基线）。
- **边界（Boundary）**：摘要未说明
- **可偷的一招（Stealable move）**：按决定资源适配性的工作负载特征来路由，并让层级边界可在请求中途跨越，使放置永不强制重算。
- **一句话卖点（Pitch）**：由基于 CXL 的分离所赋能的 GPU-PNM 分层，是面向持续演化工作负载的可扩展、灵活基础设施的有前景范式。
