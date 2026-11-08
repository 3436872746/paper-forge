> 中文版 · English: [cards_batch5.md](cards_batch5.md)

### 1. AUM: Unleashing the Efficiency Potential of Shared Processors with Accelerator Units for LLM Serving (HPCA 2026)
- **问题（Problem）：** 把带加速器单元（AU, Accelerator Unit）的 CPU 专门用于 LLM 服务是浪费；与通用负载共享又会造成最高 50% 的性能/效率下降，因为管理器对"加速器单元变体"（Accelerator Unit Variations）一无所知。
- **假设（Assumption）：** AU 的行为沿三个维度变化——使用模式、强制频率干扰、资源边界——且可以用一个离散的画像模型刻画。
- **机制（Mechanism）：** AUM：后台剖析器把使用/频率/资源刻画成离散模型；运行时控制器做使用感知的需求分析、频率感知的划分、边界感知的资源决策。
- **证据（Evidence）：** 真实系统；摘要中未说明数据集。
- **边界（Boundary）：** 摘要未说明。
- **可偷的一招（Stealable move）：** 把你的变化空间明确命名成一组 N 维坐标轴（此处为三维），再把每一维映射到"剖析器/控制器"协作流水线的一个阶段。
- **一句话卖点（Pitch）：** 剖析加速器单元变体的三个维度，再让一个控制器联合选择频率与资源边界。

### 2. MFS: An Efficient Model Family Serving System for LLMs (EuroSys 2026)
- **问题（Problem）：** 服务提供方提供模型族（如 Llama2 7B/13B/70B），但同族模型之间的协同尚未被利用。
- **假设（Assumption）：** 同族模型共享结构且有冗余参数，因此最大的模型可以封装较小的模型。
- **机制（Mechanism）：** 知识沉淀（Knowledge Precipitation）微调把最大的模型重构为容纳较小模型的多级服务流水线；分层批处理、共享中间特征与 KV-cache、多级采样。
- **证据（Evidence）：** 真实系统实验；摘要中未说明数据集。
- **边界（Boundary）：** 声称不损害生成内容质量；未说明其他限制。
- **可偷的一招（Stealable move）：** 把产品阵容变成一种架构：把小模型折进大模型，使一次前向传播服务多个档位。
- **一句话卖点（Pitch）：** 让族中最大的模型托管更小的兄弟模型，然后跨档位批处理并共享它们的缓存。

### 3. Frontier: Simulating the Next Generation of LLM Inference Systems (SOSP 2025)
- **问题（Problem）：** MoE 与分离式架构（disaggregated，PD、AF）产生的系统动态，现有模拟器无法建模。
- **假设（Assumption）：** 高保真模拟需要原生支持 MoE/专家并行（expert parallel）与精细化的算子模型，而不是外挂式扩展。
- **机制（Mechanism）：** 统一框架，覆盖共置与分离式系统；原生 EP MoE 支持；跨集群专家路由、用于隐藏延迟的高级流水线、精细化算子模型。
- **证据（Evidence）：** 模拟；摘要中未说明数据集。
- **边界（Boundary）：** 摘要中未给出保真度数字或限制。
- **可偷的一招（Stealable move）：** 把模拟器定位成"为硬件尚不存在的范式"服务的社区基座——先建好设计空间，再谈系统。
- **一句话卖点（Pitch）：** 围绕分离式与专家并行重建模拟器，让明天的服务设计今天就能被搜索。

### 4. From Exploration to Mastery: Enabling LLMs to Master Tools via Self-Driven Interactions (ICLR 2024)
- **问题（Problem）：** 以人为中心的工具文档既不充分也不准确，在 LLM 与外部工具之间制造了理解鸿沟。
- **假设（Assumption）：** LLM 自身与工具试错交互所产生的反馈，足以用来重写文档。
- **机制（Mechanism）：** DRAFT：三个阶段——经验收集、从经验中学习、文档重写——外加促进多样性的探索策略与工具自适应终止机制。
- **证据（Evidence）：** 在多个数据集上的实验；摘要中未说明数据集。
- **边界（Boundary）：** 摘要未说明。
- **可偷的一招（Stealable move）：** 把产物（文档）当作被学习的对象，并加一条显式的防过拟合停止规则，使迭代重写能够终止。
- **一句话卖点（Pitch）：** 让模型在工具上失败，再从这些失败中重写手册，直到不再改进。

### 5. KV Cache Transform Coding for Compact Storage in LLM Inference (ICLR 2025)
- **问题（Problem）：** 陈旧但可复用的 KV cache 占用稀缺的 GPU 内存，迫使卸载（offload）或重算。
- **假设（Assumption）：** KV cache 含有经典媒体压缩所利用的同类冗余；无需改动模型权重。
- **机制（Mechanism）：** KVTC：基于 PCA 的特征去相关、自适应量化、熵编码；只需短暂的初始校准。
- **证据（Evidence）：** 真实系统；Llama 3、Mistral NeMo、R1-Qwen 2.5，在 AIME25、GSM8K、LiveCodeBench、LongBench、MATH-500、MMLU、Qasper、RULER 上。
- **边界（Boundary）：** 压缩收益随情况而异——一般场景 20x，40x+ 仅限特定用例；除此之外未说明。
- **可偷的一招（Stealable move）：** 整套搬来成熟的编解码（codec）栈（去相关、量化、熵编码），而不是另造一个 KV 专用压缩器。
- **一句话卖点（Pitch）：** 整体借用媒体压缩：对 KV cache 去做相关、量化、熵编码，模型一动不动。

### 6. Manage the Workloads not the Cluster: Designing a Control Plane for Large-Scale AI Clusters (MLSys 2025)
- **问题（Problem）：** 集群管理器把加速器当作单一整体，在放置时一次性分配，导致功耗、内存与计算利用率失衡。
- **假设（Assumption）：** LLM 服务集群管理是一个装箱（bin-packing）问题，其中资源预算把硬件抽象掉。
- **机制（Mechanism）：** Shapeshifter 监测负载需求，把硬件抽象为多维预算，并在硬件分配之前持续重新平衡负载部署。
- **证据（Evidence）：** 摘要未说明（定位/愿景式论述；未报告评测）。
- **边界（Boundary）：** 明确是前瞻性议题；多维模型放置与不中断服务的再平衡留作未来工作。
- **可偷的一招（Stealable move）：** 把控制目标从硬件转向负载形态——重平衡的是抽象，而不是机器。
- **一句话卖点（Pitch）：** 不再装箱 GPU；装箱资源预算，并持续重塑负载，使功耗、内存与计算保持平衡。

### 7. BanditSpec: Adaptive Speculative Decoding via Bandit Algorithms (ICML 2025)
- **问题（Problem）：** 投机解码无视前缀 token 使用固定配置，或者需要离线/在线的草稿模型训练。
- **假设（Assumption）：** 超参数的选择可以在生成过程中在线学习，无需训练。
- **机制（Mechanism）：** 表述为多臂老虎机（multi-armed bandit）；UCB-Spec 与 EXP3-Spec；用新的"停止时间遗憾"（stopping time regret）分析，在随机与对抗奖励下均有界。
- **证据（Evidence）：** 用 LLaMA3 与 Qwen2 的真实系统实验；在多样 prompt 下模拟真实服务场景。
- **边界（Boundary）：** 吞吐只达到接近 oracle 最优；未说明质量/精度取舍。
- **可偷的一招（Stealable move）：** 发明一个任务特定的遗憾定义（"停止时间遗憾"）——它让系统启发式在理论上站得住。
- **一句话卖点（Pitch）：** 把解码超参数当作老虎机的臂，按前缀自适应，并给出信息论意义下的最优性界。

### 8. FlexPipe: Adapting Dynamic LLM Serving Through Inflight Pipeline Refactoring in Fragmented Serverless Clusters (EuroSys 2025)
- **问题（Problem）：** 静态流水线配置无法适应无服务器（serverless）集群中多变的请求模式与严重的资源碎片化。
- **假设（Assumption）：** 流水线粒度可以在运行时、在请求飞行途中重配，而不破坏正确性。
- **机制（Mechanism）：** 计算图约束下的细粒度模型划分；带一致性缓存迁移的在飞流水线重构（inflight pipeline refactoring）；在碎片化 GPU 上的拓扑感知分配。
- **证据（Evidence）：** 在 82-GPU 集群上的真实系统。
- **边界（Boundary）：** 摘要未说明。
- **可偷的一招（Stealable move）：** 把"缓存迁移"（cache transitions）命名为重配的一个子问题——只有当状态迁移安全时，重构才安全。
- **一句话卖点（Pitch）：** 在请求飞行途中重构流水线，把缓存一致性当作使这件事合法的硬约束。

### 9. Cauchy: A Cost-Efficient LLM Serving System through Adaptive Heterogeneous Deployment (SoCC 2025)
- **问题（Problem）：** 各框架把 prefill 与 decode 共置在同构 GPU 上，忽略了两者资源需求的差异，也未充分利用异构 GPU。
- **假设（Assumption）：** 成本效率由 prefill-decode 配对所选的"GPU 组合"（GPU Combo）决定。
- **机制（Mechanism）：** 部署各种组合以满足有效吞吐的 QoS；分层调度——组合内机会式调度、跨组合按有效吞吐加权的轮询；动态自动扩缩容。
- **证据（Evidence）：** 真实系统实验；摘要中未说明数据集/trace。
- **边界（Boundary）：** 声称严格维持 SLO；未说明其他限制。
- **可偷的一招（Stealable move）：** 把决策单元设为异构配对（"组合"）而不是单块 GPU，并在其上做两级调度。
- **一句话卖点（Pitch）：** 按成本把 prefill 与 decode 匹配到不同 GPU 型号，再做两级调度：组合内与跨组合。

### 10. Demystifying Cost-Efficiency in LLM Serving over Heterogeneous GPUs (ICML 2025)
- **问题（Problem）：** 当请求的计算与内存需求差异很大时，同构 GPU 的做法会降低成本效率。
- **假设（Assumption）：** 不同 GPU 型号的计算/内存特性与不同的请求需求相匹配；成本效率由 GPU 组成、部署配置与负载分配共同决定。
- **机制（Mechanism）：** 先做全面基准测试以确立该主张，再用 MILP 调度算法在价格预算与实时 GPU 可用性约束下选出最具成本效率的方案。
- **证据（Evidence）：** 基准测试研究加 trace 驱动评测；多样负载 trace、变化的 GPU 可用性、多模型服务。
- **边界（Boundary）：** 摘要未说明。
- **可偷的一招（Stealable move）：** 先以测量/基准章节确立设计空间，再把选择问题表述为 MILP——"先祛魅，再优化"。
- **一句话卖点（Pitch）：** 先做基准证明"组成"确实重要，再把异构 GPU 分配作为 MILP 在价格与可用性预算下求解。

### 11. DeltaZip: Efficient Serving of Multiple Full-Model-Tuned LLMs (EuroSys 2023)
- **问题（Problem）：** 由于请求模式零散、突发且多变，同时服务多个全参数微调的 LLM 很困难。
- **假设（Assumption）：** 微调只对预训练模型做出小幅改动，因此增量（delta）压缩效果好且不损质量。
- **机制（Mechanism）：** 用与服务系统协同设计的压缩算法激进压缩模型增量（最高 10x）。
- **证据（Evidence）：** 真实系统；摘要中未说明数据集。
- **边界（Boundary）：** 增量压缩针对全模型微调；未说明其他设置。
- **可偷的一招（Stealable move）：** 把有损压缩器与调度器协同设计，使压缩比成为服务旋钮，而不是固定成本。
- **一句话卖点（Pitch）：** 每个微调只存压缩后的增量，并围绕这一假设协同设计系统，从而成倍提升吞吐。

### 12. Rethinking Key-Value Cache Compression Techniques for Large Language Model Serving (MLSys 2025)
- **问题（Problem）：** 尽管 KV 压缩算法很多，生产采纳却很少；性能测量也不完整。
- **假设（Assumption）：** 这个缺口是证据层面的，而非算法层面的——现有基准掩盖了部署中真正要紧的东西。
- **机制（Mechanism）：** 综述算法设计与基准研究；找出缺失的测量环节；对代表性方法做实证评估；按样本而非聚合分析精度。
- **证据（Evidence）：** 综述加实证重评；摘要中未说明基准。
- **边界（Boundary）：** 范围限于服务场景的 KV cache 压缩；未说明其他限制。
- **可偷的一招（Stealable move）：** 报告逐样本的精度尾部，而不只是均值；并测量包含输出长度膨胀在内的端到端延迟。
- **一句话卖点（Pitch）：** 证明 KV 压缩在均值上好看，却在个别样本上崩溃，并拖慢真实服务。

### 13. Efficient Deployment of Large Language Model across Cloud-Device Systems (SoCC 2024)
- **问题（Problem）：** 云集群成本高，且在 SLA 面前网络不稳定；云-端协同因 LLM 各算子运算强度（operational intensity）不同、序列长度动态变化而变得复杂。
- **假设（Assumption）：** 给定序列长度下算子级的计算-内存比，可预测该算子应当在哪里运行。
- **机制（Mechanism）：** 贪心的算子级调度；把运算强度与 GPU 利用率关联起来用于运行时估计的硬件模型；用于评测与部署的云-端 LLM 编译框架。
- **证据（Evidence）：** 摘要未说明（框架设计，承诺给出量化评测）。
- **边界（Boundary）：** 摘要未说明。
- **可偷的一招（Stealable move）：** 以算子粒度而非请求粒度做路由——计算/内存比在单次推理内部就会变化。
- **一句话卖点（Pitch）：** 按算子切分推理，依据各算子的计算-内存比在云与端硬件之间路由。

### 14. MoE-Lightning: High-Throughput MoE Inference on Memory-constrained GPUs (ASPLOS 2024)
- **问题（Problem）：** MoE 模型对没有高端 GPU 的用户来说太大，而卸载（offloading）又没有用尽资源。
- **假设（Assumption）：** 分层 Roofline 模型可以预测、流水化调度可以达到内存限制下的吞吐上界。
- **机制（Mechanism）：** 带分页权重的 CGOPipe CPU-GPU-I/O 流水线；用 HRM 分层 roofline 性能模型寻找高吞吐策略。
- **证据（Evidence）：** 真实系统；单块 T4（16GB）上的 Mixtral 8x7B，以及 2-4 块 T4 上的 Mixtral 8x22B 与 DBRX。
- **边界（Boundary）：** 受 GPU 内存吞吐上限约束；更大的 MoE 需要多块低成本 GPU。
- **可偷的一招（Stealable move）：** 给系统配一个由 roofline 推出的上界，并证明你逼近它——这个上界就是论证。
- **一句话卖点（Pitch）：** 给 MoE 权重分页、做 CPU-GPU-I/O 流水线，并用分层 roofline 驱动策略逼近内存上界。

### 15. Hydra: Scale-out FHE Accelerator Architecture for Secure Deep Learning on FPGA (HPCA 2025)
- **问题（Problem）：** FHE 加速器为提高吞吐而堆叠并行计算簇，却无法利用应用级并行，也不能靠增加节点来扩展。
- **假设（Assumption）：** 应用级并行确实存在，且可以在任意计算节点间集中调度。
- **机制（Mechanism）：** 横向扩展（scale-out）的多服务器架构；由宿主服务器上的中央调度机制统一管理，每个节点负责模型的一部分。
- **证据（Evidence）：** 真实系统/硬件；CNN 与 LLM 负载，FPGA 实现。
- **边界（Boundary）：** 节点数"在理论上"任意；除扩展性外的限制未说明。
- **可偷的一招（Stealable move）：** 用跨一系列计算资源规模的性能来论证可扩展性，而不是只给一个点。
- **一句话卖点（Pitch）：** FHE 深度学习横向扩展而非纵向：把模型分散到多台服务器，由一个中央调度器统管。

### 16. History Doesn't Repeat Itself but Rollouts Rhyme: Accelerating Reinforcement Learning with RhymeRL (ASPLOS 2026)
- **问题（Problem）：** LLM 的强化学习浪费 GPU：rollout 主导运行时，批内长度不均衡又制造气泡。
- **假设（Assumption）：** 相邻训练轮次之间的 rollout 响应高度相似——这是一种分布性的、而非记忆性的冗余。
- **机制（Mechanism）：** HistoSpec：从历史 rollout token 序列起草的投机解码器；HistoPipe：利用历史 rollout 分布均衡各 worker 的两级调度。
- **证据（Evidence）：** 真实系统；最高 2.6x 加速；摘要中未说明模型/数据集。
- **边界（Boundary）：** 此前的异步/截断修法可能损害精度；本文声称不会。
- **可偷的一招（Stealable move）：** 把训练循环自身的历史当作起草来源——上一个 epoch 就是一个免费的投机模型。
- **一句话卖点（Pitch）：** 用上一个 epoch 的 rollout 起草新的 rollout；按历史长度分布调度 worker 以消除气泡。

### 17. EdgeAgent: Orchestrating On-Device LLM inference for End-User Multi-Agent Systems on CPU-GPU Unified Memory Architectures (ASPLOS 2026)
- **问题（Problem）：** 多智能体端侧推理在内存受限的 decode 期间遭受 UMA 总线争用、起草难度的极大波动，以及工具引发的停顿。
- **假设（Assumption）：** 序列可预测性在运行时是可观测的，并能同时驱动起草预算与智能体挂起。
- **机制（Mechanism）：** 零拷贝、UMA 感知的张量并行，配非对称内存布局；由实时可预测性决定动态起草预算；异步"挂起并让出"以驱逐停住的智能体。
- **证据（Evidence）：** 在 Apple M4 SoC 上的真实系统；相对批量投机解码，UMA 执行快 1.29x、整系统快 1.77x。
- **边界（Boundary）：** 摘要未说明。
- **可偷的一招（Stealable move）：** 报告能隔离各层贡献（微架构 vs 调度）的消融实验，使跨层主张仍可审计。
- **一句话卖点（Pitch）：** 为统一内存协同设计张量、为停住的智能体协同设计调度，以预测出的可预测性来限定带宽浪费。

### 18. LLM-42: Enabling Determinism in LLM Inference with Verified Speculation (SOSP 2026)
- **问题（Problem）：** 浮点非结合性加上动态批处理，使输出在多次运行间变化；关闭批处理会毁掉吞吐，而批次无关（batch-invariant）内核又带来固定开销。
- **假设（Assumption）：** 一段 token 序列在多次运行中通常产出相同的下一个 token，且内核会按形状复用归约（reduction）调度。
- **机制（Mechanism）：** 快速的非确定性解码路径加"校验-回滚"：在固定批大小下重放以获得确定性参考，一致则提交，不一致则回滚。
- **证据（Evidence）：** 真实系统；摘要中未说明数据集。
- **边界（Boundary）：** 开销只与需要确定性的那部分流量成正比；未说明其他限制。
- **可偷的一招（Stealable move）：** 只为被要求的地方购买保证——把正确性做成逐请求的选项，代价与需求成正比。
- **一句话卖点（Pitch）：** 先快速、非确定性地解码，再对照固定批次重放做校验，只回滚不一致的部分。

### 19. Linux AGX: An Adaptive GPU eXtension to Linux Fair Scheduling for Physical AI and Robotic Systems (SOSP 2026)
- **问题（Problem）：** Linux 公平调度只看 CPU 的服务与睡眠-唤醒事件，因此无法识别门控 GPU 的供给（feeder）时间片，也无法跟踪移动中的关键路径，使嵌入式机器人上的 GPU 空转。
- **假设（Assumption）：** 关键路径可在线上观测，并可编码为一个有界的逐任务重要性分数，作为有效权重施加。
- **机制（Mechanism）：** 用户态剖析器计算有界的逐任务分数；内核把它作为有效权重施加，同时保留 EEVDF/CFS 的选取逻辑、截止时间与公平性。
- **证据（Evidence）：** 真实系统；证明比例公平性得以保持，并给出 GPU 启动延迟的界。
- **边界（Boundary）：** 只有在有界提升未被截断时，该界才与 K 无关；否则为合并（coalescing）界。
- **可偷的一招（Stealable move）：** 只改现有调度器的权重接口——"与调度器无关、不新增队列"是有力的采纳论据。
- **一句话卖点（Pitch）：** 不动 EEVDF 的选取逻辑；喂给它一个 GPU 感知的重要性权重，并保住公平性证明。

### 20. HealthServe: A Public Health-Aware Inference Framework (SIGMETRICS 2026)
- **问题（Problem）：** LLM 推理排放 CO2 与标准污染物（PM2.5、SO2、NOx），其健康损害取决于排放地点当时的气象与人口暴露。
- **假设（Assumption）：** 健康影响可以量化为一个健康成本指标，与碳排并列作为调度目标。
- **机制（Mechanism）：** 把健康影响评估应用于推理；采用社会认知优化（Social Cognitive Optimization）的分层调度，维护按工况索引的决策库以供复用。
- **证据（Evidence）：** 在横跨美国多个数据中心地点的异构 GPU 集群上的真实系统。
- **边界（Boundary）：** 在美国地点评测；声称与现有碳感知方法收益可叠加，而非替代。
- **可偷的一招（Stealable move）：** 在既有的可持续性目标上加第二个外部性维度，并证明它是叠加的，而非竞争的。
- **一句话卖点（Pitch）：** 按公共卫生成本与碳排共同调度推理，并为反复出现的运行工况复用缓存决策。
