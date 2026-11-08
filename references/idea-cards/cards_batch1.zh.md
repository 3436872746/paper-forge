> 中文版 · English: [cards_batch1.md](cards_batch1.md)

**这一页是什么**：一批论文卡片。每张七个字段：问题、假设、机制、证据、边界、可偷的一招、一句话卖点。
**怎么用**：先扫「可偷的一招」；要引用某条机制前，回原文读。

### 1. Taming Throughput-Latency Tradeoff in LLM Inference with Sarathi-Serve (OSDI 2024)
- **问题（Problem）**：批处理把 prefill 与 decode 交织在一起，因此高吞吐与低延迟相互冲突。
- **假设（Assumption）**：等长的 prefill 分块让新请求无需暂停 decode 即可加入；均匀的批次可缩小流水线气泡。
- **机制（Mechanism）**：分块 prefill（chunked-prefills）加上无停顿调度，后者允许请求在批次中途加入。
- **证据（Evidence）**：类型：真实系统；尾延迟约束下的模型与硬件；A100 上的 Mistral-7B（摘要被截断）。
- **边界（Boundary）**：摘要未说明
- **可偷的一招（Stealable move）**：把延迟重新表述为批次均匀性问题：让每次迭代的时长相等，而不是推迟某个阶段。
- **一句话卖点（Pitch）**：把 prefill 切块，使 decode 永不停顿，从而用大批次赢得吞吐而不付尾延迟代价。

### 2. WLB-LLM: Workload-Balanced 4D Parallelism for Large Language Model Training (OSDI 2025)
- **问题（Problem）**：LLM 训练中的负载不均衡，集中在流水线并行与上下文并行两个层面。
- **假设（Assumption）**：不均衡有两个可分离的来源：不同 micro-batch 之间文档长度不一，以及上下文并行组内每篇文档的工作量不均。
- **机制（Mechanism）**：面向流水线并行的负载感知变长文档打包（packing）；面向上下文并行的细粒度按文档分片（sharding）。
- **证据（Evidence）**：类型：真实系统；不同模型规模上的实验；在其内部训练框架中平均 1.23x 加速。
- **边界（Boundary）**：摘要未说明
- **可偷的一招（Stealable move）**：先点明不均衡发生在哪一层并行，再按实测工作量而不是按数量来打包工作单元。
- **一句话卖点（Pitch）**：通过打包文档并按文档（而非按批次）分片，来均衡 4D 并行训练。

### 3. Understanding Stragglers in Large Model Training Using What-if Analysis (OSDI 2025)
- **问题（Problem）**：千卡 GPU 训练会卡在少数慢 worker 上，而 straggler 并不总是硬件故障。
- **假设（Assumption）**：把真实 trace 与模拟的无 straggler 运行作对比，可以分离出它们真正的代价。
- **机制（Mechanism）**：五个月集群 trace 加 what-if 模拟，回答频率/影响、时空模式与根因。
- **证据（Evidence）**：类型：trace 加模拟；ByteDance 五个月的 LLM 训练集群 trace。
- **边界（Boundary）**：摘要未说明
- **可偷的一招（Stealable move）**：把反事实的“假如 X 不存在”模拟作为测量工具，而不只是诊断手段。
- **一句话卖点（Pitch）**：模拟一个没有 straggler 的世界，从而精确给 straggler 定价，再解释它们出现在哪里、为什么出现。

### 4. Parrot: Efficient Serving of LLM-based Applications with Semantic Variable (OSDI 2024)
- **问题（Problem）**：请求级的公共 API 迫使服务盲目优化请求，丢掉了应用层结构。
- **假设（Assumption）**：若客户端可以标注 prompt 变量，服务就能恢复跨请求的数据依赖。
- **机制（Mechanism）**：Semantic Variable 抽象标注输入/输出 prompt 变量，构成数据流水线；服务随后运行传统的数据流（dataflow）分析。
- **证据（Evidence）**：类型：真实系统；在流行且实用的 LLM 应用用例上做了大量评估；提升最高达一个数量级。
- **边界（Boundary）**：摘要未说明
- **可偷的一招（Stealable move）**：只需暴露一个声明式的客户端标注，就能让经典编译器分析适用于新负载。
- **一句话卖点（Pitch）**：让客户端为 prompt 变量命名，然后优化整个应用的数据流，而不是孤立地优化请求。

### 5. WaferLLM: Large Language Model Inference at Wafer Scale (OSDI 2025)
- **问题（Problem）**：为共享内存 GPU 调优的 LLM 推理系统未能充分利用晶圆级 mesh 加速器。
- **假设（Assumption）**：一个专门的代价模型 PLMR 足以刻画晶圆硬件特征，从而驱动调度。
- **机制（Mechanism）**：PLMR 引导的晶圆级并行，加上面向 mesh 架构的 MeshGEMM 与 MeshGEMV。
- **证据（Evidence）**：类型：Cerebras WSE2 上的真实系统；对比 A100、SGLang、vLLM；利用率最高 200x，GEMV 606x，推理 10-20x。
- **边界（Boundary）**：摘要未说明
- **可偷的一招（Stealable move）**：给代价模型起名，并让它生成调度；一个简短的模型名使硬件假设可被引用。
- **一句话卖点（Pitch）**：给晶圆级硬件配上自己的代价模型与 kernel，然后展示 GPU 时代的系统白白浪费了 200x。

### 6. ServerlessLLM: Low-Latency Serverless Inference for Large Language Models (OSDI 2024)
- **问题（Problem）**：serverless LLM 的冷启动主要耗时在从远端存储拉取大体积 checkpoint。
- **假设（Assumption）**：近 GPU 的存储与内存可以本地保存 checkpoint，因此远端下载可以避免。
- **机制（Mechanism）**：加载优化的 checkpoint 格式配合多层加载；在线推理迁移；按 checkpoint 局部性调度。
- **证据（Evidence）**：类型：真实系统；微基准与真实场景；相较最先进的 serverless 系统延迟降低 10-200x。
- **边界（Boundary）**：摘要未说明
- **可偷的一招（Stealable move）**：改变持久化的格式来服务加载器，而不是围绕固定格式去优化加载器。
- **一句话卖点（Pitch）**：以加载器友好的格式在本地保存 LLM checkpoint，把 serverless 冷启动最多缩短 200x。

### 7. DistServe: Disaggregating Prefill and Decoding for Goodput-optimized Large Language Model Serving (OSDI 2024)
- **问题（Problem）**：共置 prefill 与 decode 会产生干扰，并把两个阶段的资源与并行方案耦合在一起。
- **假设（Assumption）**：TTFT 与 TPOT 是两个独立的应用约束，因此每个阶段都值得有自己的方案和自己的 GPU。
- **机制（Mechanism）**：阶段解耦的放置；每阶段的资源与并行协同优化；带宽感知的放置以限制迁移通信。
- **证据（Evidence）**：类型：真实系统；多种 LLM、应用、延迟要求；多服务 7.4x 请求，或 12.6x（摘要被截断）。
- **边界（Boundary）**：摘要未说明
- **可偷的一招（Stealable move）**：用一个耦合目标替换为两个分别满足的延迟约束，然后在二者之下最大化 goodput。
- **一句话卖点（Pitch）**：把 prefill GPU 与 decode GPU 分开，使每个延迟目标都能在不超配的情况下达成。

### 8. InfiniGen: Efficient Generative Inference of Large Language Models with Dynamic KV Cache Management (OSDI 2024)
- **问题（Problem）**：KV cache 随序列长度与批次规模增长，给基于 offloading 的服务带来压力。
- **假设（Assumption）**：下一层 attention 所需的重要 token 可以由当层输入加上下一层的部分 query 权重与 key cache 廉价地推测出来。
- **机制（Mechanism）**：一次极简的 rehearsal 推测重要 token；只把这些 KV 条目从主机内存预取。
- **证据（Evidence）**：类型：真实系统；若干代表性 LLM；相较此前的管理方法最高 3.00x，精度更好。
- **边界（Boundary）**：摘要未说明
- **可偷的一招（Stealable move）**：把带宽问题变成预测问题：推测复用集合，然后只取它。
- **一句话卖点（Pitch）**：推测哪些 KV 条目重要，只预取它们，在速度与精度上双双超过完全 offloading。

### 9. JITServe: SLO-aware LLM Serving with Imprecise Request Information (NSDI 2025)
- **问题（Problem）**：SLO 差异很大，而请求信息不精确，因此调度器优化的是聚合指标而不是应用需求。
- **假设（Assumption）**：不精确的估计可以在生成过程中被细化，因此初始的保守可以逐步放宽。
- **机制（Mechanism）**：基于不精确估计调度并不断细化；分组边际 goodput 最大化，按需即时分配“刚好够”的带宽；具有可证明保证的批次组成。
- **证据（Evidence）**：类型：真实系统；真实的 chat、deep-research 与 agentic-pipeline 负载。
- **边界（Boundary）**：摘要未说明
- **可偷的一招（Stealable move）**：把估计误差当作随时间花掉的预算，而不是固定的最坏情况上界。
- **一句话卖点（Pitch）**：在请求信息不精确时从保守起步，随着生成揭示真相逐步放宽保证。

### 10. ForestColl: Throughput-Optimal Collective Communications on Heterogeneous Network Fabrics (NSDI 2024)
- **问题（Problem）**：集合通信是大型模型的瓶颈，而在异构网络结构上设计调度很难。
- **假设（Assumption）**：广播/聚合生成树对任意拓扑都可能是吞吐最优的。
- **机制（Mechanism）**：多项式时间、可扩展的生成树调度生成，覆盖交换式网络与加速器直连链路。
- **证据（Evidence）**：类型：真实系统；AMD MI250 与 NVIDIA DGX A100/H100 集群；优于厂商库与此前的生成器。
- **边界（Boundary）**：摘要未说明
- **可偷的一招（Stealable move）**：声称为某一拓扑类的优化性，而不是调优单一网络结构，并把多项式生成时间作为可扩展性来卖。
- **一句话卖点（Pitch）**：为任意网络结构生成可证明最优的集合通信调度，取代为单一拓扑打造的厂商库。

### 11. PlanetServe: A Decentralized, Scalable, and Privacy-Preserving Overlay for Democratizing Large Language Model Serving (NSDI 2025)
- **问题（Problem）**：服务可扩展性阻碍小组织与个人部署 LLM 创新。
- **假设（Assumption）**：点对点 overlay 中的去中心化贡献节点可以提供服务容量。
- **机制（Mechanism）**：GenTorrent overlay 解决四个问题：overlay 组织、LLM 通信隐私、资源高效的转发、服务质量验证。
- **证据（Evidence）**：类型：去中心化节点上的真实系统原型；相较无 overlay 转发的基线延迟降低超过 50%。
- **边界（Boundary）**：摘要未说明
- **可偷的一招（Stealable move）**：一开始就列举 N 个子问题，并用一个系统作为它们的首次系统研究交付，宣称占领一个空间。
- **一句话卖点（Pitch）**：把去中心化节点汇成私有 overlay，用很小的安全开销换取服务延迟减半。

### 12. ServeGen: Workload Characterization and Generation of Large Language Model Serving in Production (NSDI 2025)
- **问题（Problem）**：真实的 LLM 服务负载理解不足；此前的分析在规模与范围上都太窄。
- **假设（Assumption）**：生产负载最好按客户端组合行为来合成。
- **机制（Mechanism）**：对一个覆盖 LLM、多模态与推理模型的全球云服务做深入刻画，然后按客户端生成负载。
- **证据（Evidence）**：类型：生产 trace；云推理服务；一个生产用例避免了 50% 的超配。
- **边界（Boundary）**：摘要未说明
- **可偷的一招（Stealable move）**：把生成器作为交付物，使 trace 研究交付的是一个可复用基准而不是一份发现清单。
- **一句话卖点（Pitch）**：按客户端刻画生产 LLM 服务，再生成真实负载，把超配砍掉一半。

### 13. Cortex: Achieving Low-Latency, Cost-Efficient Remote Data Access For LLM via Semantic-Aware Knowledge Caching (NSDI 2025)
- **问题（Problem）**：agent 反复查询远端知识；精确匹配缓存错过语义等价的复用。
- **假设（Assumption）**：embedding 相似度加上一个轻量 LLM 裁判是安全的缓存命中判据。
- **机制（Mechanism）**：Semantic Element（embedding 加上延迟、成本、静态性元数据）与 Seri 两阶段检索；语义感知的命中定义、成本感知的淘汰、主动预取；judger 与主 LLM 共置。
- **证据（Evidence）**：类型：真实系统；代表性搜索负载；在保持正确性的前提下吞吐最高 3.6x。
- **边界（Boundary）**：摘要未说明
- **可偷的一招（Stealable move）**：给缓存条目标注性能元数据，使淘汰与预取使用成本与静态性，而不只是新近度。
- **一句话卖点（Pitch）**：用语义重新定义缓存命中，用小裁判验证它们，降低跨区域 agent 延迟。

### 14. MegaScale: Scaling Large Language Model Training to More Than 10,000 GPUs (NSDI 2024)
- **问题（Problem）**：超过 10,000 GPU 的训练在长作业上威胁效率与稳定性。
- **假设（Assumption）**：许多稳定性故障只在规模上出现，因此深度可观测性是杠杆。
- **机制（Mechanism）**：block/optimizer、计算通信重叠、算子优化、数据流水线、网络调优的全栈协同设计；外加针对故障与 straggler 的诊断工具。
- **证据（Evidence）**：类型：真实系统；生产部署；12,288 GPU 上训练 175B 达到 55.2% MFU，相较 Megatron-LM 1.34x。
- **边界（Boundary）**：摘要未说明
- **可偷的一招（Stealable move）**：把运维经验作为一等贡献：报告发现并修复的故障，而不只是加速比。
- **一句话卖点（Pitch）**：全栈协同设计并深度插桩，在一万二千块 GPU 上守住 55% MFU。

### 15. ZipLLM: Efficient LLM Storage via Model-Aware Synergistic Data Deduplication and Compression (NSDI 2025)
- **问题（Problem）**：模型中心存储数十 PB，其中主要是微调变体；去重与压缩要么对 LLM 无感知，要么互不兼容。
- **假设（Assumption）**：微调模型与基座模型的差异是稀疏且结构化的，按位相似性可以聚类模型族。
- **机制（Mechanism）**：大规模 Hugging Face 刻画；BitX 在 XOR 差上做无损 delta 压缩；tensor 级去重与压缩围绕族聚类统一起来。
- **证据（Evidence）**：类型：trace；所有公开的 Hugging Face LLM 仓库；存储减少 54%，比此前工作再多 20% 以上。
- **边界（Boundary）**：摘要未说明
- **可偷的一招（Stealable move）**：给每条实证发现编号，并把它引作对应系统组件的授权依据。
- **一句话卖点（Pitch）**：聚类模型族，然后去重与 delta 压缩一起做，把中心存储削减 54%。

### 16. FlexLLM: Token-Level Co-Serving of LLM Inference and Finetuning with SLO Guarantees (NSDI 2024)
- **问题（Problem）**：服务栈把推理与微调隔离在不同集群上，浪费硬件。
- **假设（Assumption）**：PEFT 微调与推理可以在 token 粒度共享同一次迭代，同时保持 SLO。
- **机制（Mechanism）**：静态编译（依赖并行化、图剪枝）最高减少 80% 激活内存；token 级微调加混合 token 调度器。
- **证据（Evidence）**：类型：真实系统；LLaMA-3.1-8B、Qwen-2.5-14B/32B；在 20 req/s 下满足 SLO；微调吞吐 1.9-4.8x 与 2.5-6.8x。
- **边界（Boundary）**：仅限基于 PEFT 的微调；其余摘要未说明。
- **可偷的一招（Stealable move）**：报告峰值争用下保留的峰值进度比例（76%），而不只是平均加速比。
- **一句话卖点（Pitch）**：在一次迭代中融合推理与微调 token，在保持延迟 SLO 的同时把微调吞吐提高三倍。

### 17. HydraServe: Minimizing Cold Start Latency for Serverless LLM Serving in Public Clouds (NSDI 2025)
- **问题（Problem）**：公有云无法保证 serverless LLM 性能，因为模型规模与运行时依赖使冷启动很长。
- **假设（Assumption）**：冷启动可按阶段分解，因此阶段可以重叠、输入可以预先就位。
- **机制（Mechanism）**：主动模型分发；worker 内冷启动阶段重叠；争用感知的 GPU 放置；把 worker 组合并为 endpoint 的流水线整合。
- **证据（Evidence）**：类型：真实系统；多种配置；冷启动降低 1.7-4.7x，SLO 达成率提升 1.43-1.74x。
- **边界（Boundary）**：摘要未说明
- **可偷的一招（Stealable move）**：把延迟指标分解为阶段，并把跨阶段重叠作为机制来主张，而不只是“某个阶段更快”。
- **一句话卖点（Pitch）**：预先就位模型、重叠启动阶段、避开网络争用，把 serverless 冷启动缩小数倍。

### 18. Supercharging Packet-level Network Simulation of Large Model Training via Memoization and Fast-Forwarding (NSDI 2026)
- **问题（Problem）**：包级模拟忠实但慢；现有补救要么简化网络，要么限制并行加速。
- **假设（Assumption）**：训练流量呈现重复的争用模式与稳态，因此冗余事件可以跳过而误差可忽略。
- **机制（Mechanism）**：Wormhole：网络分区、状态 memoization 与复用、基于速率的稳态检测、保一致性的 fast-forwarding。
- **证据（Evidence）**：类型：模拟；相较 ns-3 744x（MoE 510x），误差低于 1%；多线程下 1012x。
- **边界（Boundary）**：近似；误差限定在 1% 以下。
- **可偷的一招（Stealable move）**：用显式的误差界换取速度，建立在检测到的稳态之上，而不是用简化模型。
- **一句话卖点（Pitch）**：memoize 争用并跳过稳态，使包级训练模拟快三个数量级、误差 1%。

### 19. Stratum: System-Hardware Co-Design with Tiered Monolithic 3D-Stackable DRAM for Efficient MoE Serving (MICRO 2025)
- **问题（Problem）**：MoE 层承载海量数据，使硬件部署复杂化。
- **假设（Assumption）**：expert 使用可按主题预测，因此跨垂直内存层的放置可以依从访问可能性。
- **机制（Mechanism）**：Mono3D DRAM 近存计算、混合键合的逻辑与 DRAM die、到 GPU 的硅中介层；垂直内存层按访问可能性分配，由基于主题的 expert 预测引导。
- **证据（Evidence）**：类型：摘要未说明；解码吞吐最高 8.29x，另一指标 7.66x（被截断）。
- **边界（Boundary）**：摘要未说明
- **可偷的一招（Stealable move）**：预测访问模式（主题到 expert），并用该预测把数据跨延迟层放置。
- **一句话卖点（Pitch）**：把 DRAM 分层堆叠，预测某主题需要哪些 expert，并把它们放在延迟允许的位置。

### 20. FloatAP: Supporting High-Performance Floating-Point Arithmetic in Associative Processors (MICRO 2024)
- **问题（Problem）**：关联处理器擅长整数运算，但缺少 AI/ML 与科学计算所需的浮点支持。
- **假设（Assumption）**：直接的位串行 AP 算术无法提供足够的 FP 吞吐，但尾数对齐可以在位与组件维度并行化。
- **机制（Mechanism）**：面向加法与归约的位并行与组件并行向量尾数对齐；乘法与点积复用加法树；可通过 RISC-V V 扩展编程。
- **证据（Evidence）**：类型：摘要未说明（未给出评估数字）。
- **边界（Boundary）**：摘要未说明
- **可偷的一招（Stealable move）**：复用既有结构（加法树）而不是新增单元，因此收益不花新面积。
- **一句话卖点（Pitch）**：并行化尾数对齐并复用加法树，让基于 CAM 的关联处理器在浮点上跑得快。
