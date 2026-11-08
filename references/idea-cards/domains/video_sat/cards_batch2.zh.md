> 中文版 · English: [cards_batch2.md](cards_batch2.md)

### 1. Unleashing Collaborative Computing for Adaptive Video Streaming with Multi-objective Optimization in Satellite Terrestrial Networks (arXiv 2024)
- **问题（Problem）:** 星地网络资源太少，难以卸载计算密集的视频流媒体任务，因此服务质量与 QoE 受损。
- **假设（Assumption）:** 连接卫星网与地面网的地面站可以充当一个能同时看到两侧的智能体，而多个这样的智能体协商优于集中式分配。
- **机制（Mechanism）:** 把任务卸载建模为多目标优化；先动态选择一条在服务时间与资源利用率之间取得平衡的端到端路径，再对每条路径运行一个多智能体软演员-评论家（multi-agent soft actor-critic，MA-SAC），用于设定自适应码率并分配异构资源。
- **证据（Evidence）:** 类型：数值评估；所提方案在多种计算任务、多项判据上均优于对比方案；未给出数字。
- **边界（Boundary）:** 摘要未说明
- **可偷的一招（Stealable move）:** 把决策拆成一个廉价的离散选择阶段和一个学到的连续分配阶段，使学习器始终只在某个已经选定的选项内部搜索。
- **一句话卖点（Pitch）:** 让地面站作为智能体协商，使路径选择与码率一起优化，而不是先后优化。

### 2. End-to-End Performance of Video Streaming With MPEG-DASH Over Satellite 5G IAB Networks (arXiv 2026)
- **问题（Problem）:** 在星地融合网络中，时延、吞吐量波动与播放连续性相互作用，尚不清楚哪种传输层与拥塞控制组合能挺过这一切。
- **假设（Assumption）:** 通过改造开源模块搭建的 ns-3 框架，能足够忠实地复现 5G 无线接入网（RAN）、LEO 回传、传输层与 DASH 的行为，使比较结论可迁移。
- **机制（Mechanism）:** ns-3 中的仿真框架，含改造过的 5G RAN、LEO 回传、传输层与 MPEG-DASH 模块；在应用层与传输层指标上评估 CUBIC、NewReno、BBR 下的 TCP 与 QUIC。
- **证据（Evidence）:** 类型：仿真；指标包括播放时长、中断时长、卡顿次数、播放码率、吞吐量、时延、公平性；没有任何单一配置在所有指标上都最优；QUIC-BBR 最为均衡，中断更少、时延显著更低。
- **边界（Boundary）:** 摘要承认没有任何单一配置在所有指标上都最优；权衡依然存在。
- **可偷的一招（Stealable move）:** 报告整个指标向量，而不是压缩成一个 QoE 标量，让权衡前沿的形状本身成为贡献。
- **一句话卖点（Pitch）:** 在卫星 5G IAB 上联合测量传输层与拥塞控制，然后点名那个"仅仅均衡"的配置，而不是那个在单一指标上取胜的配置。

### 3. Enabling High Error Tolerance in Satellite Video Transmissions by Generative Semantic Communication (arXiv 2026)
- **问题（Problem）:** 设备功率低、到 LEO 中继的距离远，导致信噪比（SNR）低，高误码率与频繁重传阻碍了高维视频。
- **假设（Assumption）:** 语义内容能在严重损坏下存活，生成式解码器可以从受损语义重建出可观看的视频，而无需干净的比特。
- **机制（Mechanism）:** 发送端把预训练的视频编码器与用于前向纠错的低密度奇偶校验（LDPC）编码器耦合；接收端用高效的上下文内（in-context）适配算法微调一个生成式视频模型，从受错误污染的语义信息中重建视频。
- **证据（Evidence）:** 类型：仿真；在 45% 误码率下视频 PSNR 比传统语义通信高 2.5 dB，且误码率超过 80% 时依然稳健。
- **边界（Boundary）:** 摘要未说明
- **可偷的一招（Stealable move）:** 把容错推到接收端：让它具备生成能力并在推理时适配，而不是把发送端的比特花在更强的保护上。
- **一句话卖点（Pitch）:** 接受错误，发送语义，让生成式接收端把丢失的细节"幻觉"回来。

### 4. Dissecting the Performance of Satellite Network Operators (CoNEXT 2023)
- **问题（Problem）:** 卫星网络运营商扩张迅速，但此前没有对其性能或效率的全面测量。
- **假设（Assumption）:** 可以挖掘公开测量数据集，把单次测量归因到具体运营商，从而用机会性数据替代自建测试床。
- **机制（Mechanism）:** 设计一套识别经由卫星运营商完成的测量的方法，应用于 M-Lab 与 RIPE 数据集以刻画底层性能与覆盖范围，然后招募付费测试者在 Starlink、HughesNet 与 ViaSat 上进行网页浏览与视频播放。
- **证据（Evidence）:** 类型：公开轨迹数据集加招募的付费测试者；刻画了不同轨道上最多 18 家运营商。
- **边界（Boundary）:** 摘要未说明
- **可偷的一招（Stealable move）:** 复用已有的公开测量语料来回答一个它本来不是为此设计的问题，再用一个小规模付费样本验证这一重新框定。
- **一句话卖点（Pitch）:** 首个关于卫星运营商的综合研究，靠挖掘公开数据完成，并用付费测试者加以确认。

### 5. StarStream: Live Video Analytics over Space Networking (arXiv 2025)
- **问题（Problem）:** 实时视频分析系统是为地面网络构建的，但 LEO 上行瓶颈与剧烈波动的条件，恰恰在偏远地区与灾害场景最需要它们的地方使服务退化。
- **假设（Assumption）:** LEO 网络性能足够规律，以至于学到的预测器能比"对当前状况作出反应"更好地预判它。
- **机制（Mechanism）:** 先做大量野外 Starlink 实测；再做 StarStream，一个自适应 LSN 的流媒体框架，由基于 Transformer 的网络性能预测器与内容感知的配置优化器构成。
- **证据（Evidence）:** 类型：Starlink 上的真实测量，加上使用真实网络与视频处理数据的轨迹驱动实验；未给出数字。
- **边界（Boundary）:** 摘要未说明
- **可偷的一招（Stealable move）:** 先在野外测量这个波动的网络，再让对下一时刻网络状态的预测来选择配置，而不是对上一时刻的状态作出反应。
- **一句话卖点（Pitch）:** LEO 上的实时视频分析需要的是对卫星链路的预测器，而不是更快的反应。

### 6. Robust Live Streaming over LEO Satellite Constellations: Measurement, Analysis, and Handover-Aware Adaptation (arXiv 2025)
- **问题（Problem）:** 频繁的卫星切换造成反复重缓冲，而即便是在 LEO 轨迹上训练过的学习型 ABR 算法，也会在切换造成的突变上失效。
- **假设（Assumption）:** 一个无法重训 ABR 的中间件，仍可通过注入由切换推导出的网络信号、并调节播放速度来挽救它。
- **机制（Mechanism）:** 先对 LEO 网络上的直播做测量研究；再做 SARA，一个轻量中间件，调节视频播放速度，并把由 LEO 网络特性推导出的洞见喂给 ABR 算法，使码率选择能挺过切换。
- **证据（Evidence）:** 类型：测量加大量评估；重缓冲时间平均减少 39.41%，时延略微改善 0.65%，总体码率损失 0.13%。
- **边界（Boundary）:** 摘要未说明
- **可偷的一招（Stealable move）:** 修复黑盒控制器的办法是给它套上一个信号注入与播放速度层，而不是重训它；用花掉一点播放时间来换取容忍度。
- **一句话卖点（Pitch）:** 给任何 ABR 算法套上切换感知与播放速度控制，就能用 0.13% 的码率换掉 39% 的重缓冲。

### 7. Watching Stars in Pixels: The Interplay of Traffic Shaping and YouTube Streaming QoE over GEO Satellite Networks (arXiv 2023)
- **问题（Problem）:** 对地静止轨道（GEO）网络把高时延与 TCP 代理、流量整形器结合在一起，此前没有人刻画过这三者如何影响 YouTube 的 QoE。
- **假设（Assumption）:** 分析生产环境中的会话轨迹，足以把差距归因到具体的机制（代理行为、流量整形、应用层分块流水线）。
- **机制（Mechanism）:** 分析某生产 GEO 网络上超过 2k 个 YouTube 视频会话，整形速率为 900 Kbps，把 TCP 会话与 gQUIC 会话，与其码率本应支撑的分辨率作对比。
- **证据（Evidence）:** 类型：生产 GEO 网络上的轨迹分析；28% 的 TCP 会话与 18% 的 gQUIC 会话发生重缓冲；中位分辨率 TCP 仅 380p、gQUIC 仅 299p；gQUIC 只用到网络容量的 63%；YouTube 的分块请求流水线并不理想。
- **边界（Boundary）:** 摘要未说明
- **可偷的一招（Stealable move）:** 把"某个设置本应交付的性能"与"它实际交付的性能"之间的差距当作测量仪器，然后逐一机制地解释这一差距。
- **一句话卖点（Pitch）:** 省流模式本应无缝播放 360p，但它没有；原因是代理和应用，而不是链路。

### 8. Media-over-Multipath-QUIC for Realtime Video Applications (arXiv 2026)
- **问题（Problem）:** 多路径调度器只能看到字节，因此无法区分一个锚定了一秒视频的关键帧，和一个丢了只损失一幅图像的增强帧。
- **假设（Assumption）:** 调度器缺少的元数据其实已经流经中继（relay），因此在数据中继处设一个规则接口就足以弥合差距，无需让传输层懂视频。
- **机制（Mechanism）:** MoMQ 扩展 MoQT，使应用与中继运营方能在边缘中继上安装声明式规则，规则匹配 Object 元数据并针对带标签的路径表达投递偏好；中继机械地评估这些规则，本身不包含任何视频逻辑。
- **证据（Evidence）:** 类型：横跨 Starlink 与 WiFi 的真实测试床；四条规则把 P99.9 帧完成时间从 384.7 ms 降到 114.1 ms，把所需播放缓冲降低 61.5%，并且是唯一满足 150 ms 交互目标的配置；同样的规则在两个国家的不同中继上、在两个大洲的订阅者上都成立。
- **边界（Boundary）:** 优势只在"路径始终保持不相交的地方"得以保留。
- **可偷的一招（Stealable move）:** 给下层一个由上层填充的声明式规则接口，而不是教下层去理解上层的语义。
- **一句话卖点（Pitch）:** 调度器所需的知识已经在飞行中，所以把中继元数据变成路径决策即可。

### 9. Securing Satellite Communications: Real-Time Video Encryption Scheme on Satellite Payloads (arXiv 2025)
- **问题（Problem）:** 卫星嵌入式设备上的实时视频加密受制于载荷的算力上限，以及会引起过热与安全风险的功耗。
- **假设（Assumption）:** 两个一维混沌映射即可提供足够的安全性，其代价符合载荷的功耗与散热预算。
- **机制（Mechanism）:** 用两个一维混沌映射加密视频，首次部署在卫星上；同时在现场可编程门阵列（FPGA）平台与 Raspberry Pi 4B 上实现。
- **证据（Evidence）:** 类型：部署在卫星上的真实系统，加上 FPGA 与 Raspberry Pi 4B 实验；用统计检验考察抗攻击能力；实时性能优异、功耗低；未给出数字。
- **边界（Boundary）:** 摘要未说明
- **可偷的一招（Stealable move）:** 把平台的功耗与散热包络当作一等设计约束，并在真实目标与一块廉价代理板上验证同一设计。
- **一句话卖点（Pitch）:** 用两个混沌映射在轨道上加密视频，代价低到能在载荷上保持实时且不发烫。

### 10. Dynamic Pacing for Real-time Satellite Traffic (arXiv 2025)
- **问题（Problem）:** Google 的拥塞控制与 WebRTC 千篇一律的发送端 pacing 队列在 LEO 上会退化，因为高轨高度与卫星快速运动带来了时延与不稳定。
- **假设（Assumption）:** 从网络自身的信号出发，切换活动足够可预测，从而可以按即将进入的时段来设定 pacing 队列大小。
- **机制（Mechanism）:** 数据驱动的队列管理，根据预测的切换活动调节 pacing 队列的最大容量，在无切换时段最小化时延，在切换活动上升时优先保证稳定。
- **证据（Evidence）:** 类型：仿真加真实 Starlink 星座；仿真中视频码率最高提升 3 倍、卡顿率降低 62%；真实 Starlink 上相比 WebRTC 默认 pacing 队列，卡顿率最高降低 41%、平均丢包下降 40%。
- **边界（Boundary）:** 摘要未说明
- **可偷的一招（Stealable move）:** 把固定大小的缓冲变成大小跟随链路可预测物理周期变化的缓冲，这样同一机制在平静期换来低时延、在动荡期换来稳定。
- **一句话卖点（Pitch）:** 按切换日历而不是按常数来设定 pacing 队列大小。

### 11. Broadened-beam Uniform Rectangular Array Coefficient Design in LEO SatComs Under Quality of Service and Constant Modulus Constraints (arXiv 2024)
- **问题（Problem）:** LEO 的波束设计必须同时：在曲率导致的路径损耗变化下满足服务质量（QoS）、为放大器效率保持恒模（constant modulus）、并抑制波束外辐射。
- **假设（Assumption）:** 用 Kronecker 积分解成两个均匀线阵（ULA）子问题，既能保持设计质量，又能大幅缩减需要优化的系数个数。
- **机制（Mechanism）:** 构造一个展宽波束的均匀矩形阵列（URA）系数设计问题，通过 Kronecker 积波束成形分解为两个 ULA 子问题，再用半定松弛与一个凸迭代算法求解每个非凸子问题。
- **证据（Evidence）:** 类型：仿真；抑制波束外辐射并满足设计判据；"当波束传…"时容量至少是阵列导向矢量波束成形器的四倍（摘要被截断）。
- **边界（Boundary）:** 摘要未说明
- **可偷的一招（Stealable move）:** 把一个困难的耦合二维设计问题分解为两个相同的 1D 子问题，让松弛技术得以适用，变量个数也随之坍缩。
- **一句话卖点（Pitch）:** 在 QoS、恒模与干扰约束下展宽 LEO 波束，容量提升四倍。

### 12. Multipath Adaptive Video Streaming with Multiple Description Neural Video Codec over 5G Networks (arXiv 2026)
- **问题（Problem）:** 单体式与分层式编解码器中的解码依赖使多路径传输变得脆弱，关键数据的瞬时欠交付会在 5G 遮挡与切换时触发卡顿。
- **假设（Assumption）:** 若干个可独立解码但又能相互细化的描述，覆盖整个分块，就足以把"路径缺失"变成质量损失，而不是一个无法解码的分块。
- **机制（Mechanism）:** NeuralMDC，一种神经多描述编解码器，把每个分块编码为独立且可相互细化的描述流；再加一个用户空间多路径流媒体系统，用简单的调度逻辑把各流映射到异构 5G 路径上。
- **证据（Evidence）:** 类型：轨迹驱动的仿真与在网 5G 实验；相比单体式、分层式与神经流媒体系统，QoE 提升 26%–44%，视频质量最高提升 41.8%，卡顿率保持在 0.32% 以下。
- **边界（Boundary）:** 摘要未说明
- **可偷的一招（Stealable move）:** 重新设计编码单元，使其与调度器的抗损单元对齐，这样调度器就能保持简单，而不必去补偿依赖关系。
- **一句话卖点（Pitch）:** 让每个分块碎片都能独立播放，这样任意路径子集都仍能产出视频。

### 13. QSMVM: QoS-aware and social-aware multimetric routing protocol for video-streaming services over MANETs (arXiv 2023)
- **问题（Problem）:** 在无基础设施的移动自组网（MANET）上路由视频流，迫使你在转发路径的质量与构成这条路径的节点之间的信任之间做选择。
- **假设（Assumption）:** 用户之间的联结强度（tie strength）是路径信任的一个可测量的代理量，并且能以可容忍的 QoS 代价并入现有路由度量。
- **机制（Mechanism）:** 扩展作者自己的多路径多媒体动态源路由（MMDSR）协议，使转发算法的决策中在 QoS 度量之外还包含一个联结强度社交度量。
- **证据（Evidence）:** 摘要未说明
- **边界（Boundary）:** 摘要承认存在权衡：只有在 QoS 不受显著影响的前提下才会提升信任，因此信任与 QoS 并未被联合最大化。
- **可偷的一招（Stealable move）:** 把一个社交标量作为一个加权项加入现有路由度量，而不是围绕它重新设计协议。
- **一句话卖点（Pitch）:** 在你信任的节点上路由视频，只要 QoS 几乎察觉不到。

### 14. Deep Adaptive Rate Allocation in Volatile Heterogeneous Wireless Networks (arXiv 2026)
- **问题（Problem）:** 在车联网多接入网络中，链路质量的波动比多路径调度器与传输协议能反应的速度更快。
- **假设（Assumption）:** 路径状态足够可预测，因此依据预测行动能消除"观测-反应"滞后，而不只是引入噪声。
- **机制（Mechanism）:** 基于 Transformer 的路径状态预测，加上 DARA：一个深度强化学习调度器，用一个 DQN 计算每条路径上的拥塞窗口占比，奖励由六个分量归一化构成，并通过权重调解进行冲突消解。
- **证据（Evidence）:** 类型：基于 Mininet 的 MP-DCCP 测试床，使用车联网环境中移动用户的轨迹；在中等波动轨迹下，文件传输时间优于基于学习的调度器，分辨率收益在所有测试条件下都得以保持，在亚秒级缓冲下取得显著的减少重缓冲收益——在这类场景中，最先进的调度器几乎持续卡顿。
- **边界（Boundary）:** 文件传输增益仅在中等波动的轨迹下被主张；未报告失效情形。
- **可偷的一招（Stealable move）:** 把预测器放在控制器前面，使每个动作针对即将存在的状态，而不是刚刚测到的状态。
- **一句话卖点（Pitch）:** 先预测路径，再为你即将拥有的网络分配流量。

### 15. Swarm: Cost-Efficient Video Content Distribution with a Peer-to-Peer System (arXiv 2024)
- **问题（Problem）:** 在字节跳动这样的规模下，集中式内容分发网络（CDN）基础设施使内容分发成本高得难以承受。
- **假设（Assumption）:** 尽管对等节点（peer）异构，只要由集中式 tracker 负责发现与映射，普通设备的边缘残余资源就能达到 CDN 的流媒体质量。
- **机制（Mechanism）:** 一个 CDN 与点对点（P2P）结合的混合系统：由集中式 tracker 集群构成控制面，统辖由边缘残余资源构成的数据面，把客户端映射到服务器，并在客户端与对等服务器之间使用专有的多路径并行传输。
- **证据（Evidence）:** 类型：生产环境中的真实系统；稳定运行六年，管理超过十万台对等服务器，每日服务近一亿用户，每年节省数亿元人民币，性能与传统 CDN 相当。
- **边界（Boundary）:** 摘要未说明
- **可偷的一招（Stealable move）:** 让控制面保持集中、只把数据面去中心化，既拿到 P2P 的节省，又不付异构性的代价。
- **一句话卖点（Pitch）:** 让 tracker 掌舵、让对等节点干活，降低 CDN 成本而不降低质量。

### 16. Deep Reinforcement Learning with Importance Weighted A3C for QoE enhancement in Video Delivery Services (arXiv 2023)
- **问题（Problem）:** 在基于异步优势演员-评论家（A3C）的 ABR 中，行为策略与目标策略会逐渐偏离，因此更新是在过时、未同步的经验上算出来的，结果次优。
- **假设（Assumption）:** 这种滞后可以通过对经验重新加权来纠正，而不必对学习器施加同步。
- **机制（Mechanism）:** ALISA，一种带重要性采样的演员-学习器架构，按相关性给经验赋权，以解决行为策略与目标策略之间的滞后。
- **证据（Evidence）:** 类型：在 Pensieve 框架内的比较；平均 QoE 比 Pensieve 高最多 25%–48%，也高于固定规则的 BB、BOLA 与 RB。
- **边界（Boundary）:** 摘要未说明
- **可偷的一招（Stealable move）:** 当学习器必须消费过时经验时，按相关性对其重新加权，而不是丢弃它或等待新样本。
- **一句话卖点（Pitch）:** 用重要性权重纠正离策略滞后，QoE 比 Pensieve 高 25–48%。

### 17. XLR (piXel Loss Rate): a Lightweight Indicator to Measure Video QoE in IP Networks (arXiv 2024)
- **问题（Problem）:** 运营商需要在任意网络位置获得视频 QoE，而在这些位置参考视频不可得，且测量不能增加时延。
- **假设（Assumption）:** 传输错误的感知损伤，可以仅通过对压缩码流的轻量分析恢复出来。
- **机制（Mechanism）:** 定义 XLR（像素丢失率，pixel loss rate）作为一个客观指标，并对其加以刻画与评估；它通过压缩码流上的轻量分析来估计，形成一种无参考（No-Reference）的运维方法。
- **证据（Evidence）:** 类型：分析加实验；与主观平均意见分（MOS）相关性良好，结果与最先进的全参考（Full-Reference）指标相当，基于码流的估计可靠，分数具有线性量纲；未给出数字。
- **边界（Boundary）:** 摘要未说明
- **可偷的一招（Stealable move）:** 把指标定义成：其估计器只消费已经在链路上流过的内容，这样它在每一跳都可计算，既无需参考也不增加时延。
- **一句话卖点（Pitch）:** 从已经在经过的数据包中读出 QoE，无需参考视频、不增时延。

### 18. ProCAVE: A Self-Adaptive, Full-Lifecycle Edge Caching Framework for Video Streaming via Predictive Bandwidth Estimation and Preference-Aware Deep Reinforcement Learning (arXiv 2026)
- **问题（Problem）:** 建立在反应式 ABR 启发式与松耦合缓存策略之上的边缘分发系统跟不上无线的快速波动，并且把用户偏好与分发分开处理。
- **假设（Assumption）:** 短期吞吐量可预测，且单一高维全局状态能让码率与缓存控制一起优化，而不是彼此协商。
- **机制（Mechanism）:** ProCAVE 统一了三者：用于短期吞吐量预测的轻量 Transformer、近端策略优化（PPO）驱动的 ABR 智能体，以及基于深度确定性策略梯度（DDPG）、在高维全局状态上运行的连续缓存控制器。
- **证据（Evidence）:** 类型：使用 MovieLens 偏好轨迹与 Ghent 4G 带宽测量的轨迹驱动实验；相比 FlyCache 与其他基线，提升字节命中率、降低回传负载并改善 QoE；未给出数字。
- **边界（Boundary）:** 摘要未说明
- **可偷的一招（Stealable move）:** 通过给两个控制器同一个共享全局状态来耦合它们，而不是让两个策略针对彼此的输出反复调参。
- **一句话卖点（Pitch）:** 先预测链路，再让 ABR 与缓存像一个控制器那样行动。

### 19. BOLA360: Near-optimal View and Bitrate Adaptation for 360-degree Video Streaming (arXiv 2023)
- **问题（Problem）:** 360 度视频的带宽开销比 2D 视频高一个数量级，而一次重缓冲的后果更糟，因为画面冻结会引发晕动症（cybersickness）。
- **假设（Assumption）:** 用户未来的视场（field of view）足够可预测，因此视野之外的片段可以直接不下载。
- **机制（Mechanism）:** BOLA360，一个运行在客户端播放器内的在线 ABR 算法，只下载可能落入视场的片段，并持续调整逐段码率以保证流畅播放；已证明相对离线 QoE 最大化算法接近最优。
- **证据（Evidence）:** 类型：解析证明，加上覆盖广泛网络与头部运动画像的评估；QoE 比最先进算法高 13.6% 至 372.5%（摘要被截断）。
- **边界（Boundary）:** 摘要未说明
- **可偷的一招（Stealable move）:** 当需求超过供给时，只把预算花在用户真正关注的地方；预测注意力本身就是压缩方案。
- **一句话卖点（Pitch）:** 只串流头部正在看的内容，并证明这样做接近最优。

### 20. Objective Video Quality Assessment in FWA-Based Over-the-Top Content Delivery Across Open Source 5G Networks (arXiv 2026)
- **问题（Problem）:** 尚不清楚传输模式、调制阶数与并发负载如何共同决定真实 5G 固定无线接入（FWA）上的超高清（UHD）视频质量。
- **假设（Assumption）:** 在真实测试床上计算的帧级全参考指标足够忠实，可用于指导那些原本要靠仿真得出的部署决策。
- **机制（Mechanism）:** 在真实开源 5G 测试床上进行自动化流媒体实验，交叉 SISO/MIMO 与 64-QAM/256-QAM，以及 1 至 5 个并发用户，通过 MPEG-DASH 传输 4K 流，并打 PSNR、SSIM 与 VMAF 分。
- **证据（Evidence）:** 类型：真实开源 5G 测试床实验，明确与基于仿真的方法作对照；MIMO 一致优于 SISO；在五个并发用户下，256-QAM 的 MIMO 使 VMAF 保持在视觉无损阈值之上，而 SISO 配置显著退化。
- **边界（Boundary）:** 摘要未说明
- **可偷的一招（Stealable move）:** 把物理层旋钮当作全因子网格来扫，并逐格报告质量，这样部署规则可以直接从表里读出来。
- **一句话卖点（Pitch）:** 这是 5G FWA 上 UHD 的质量表，是测出来的，不是仿出来的。

### 21. Stateless Network-Aware Adaptive Bitrate Streaming over IPFS (arXiv 2026)
- **问题（Problem）:** 星际文件系统（IPFS）上的网络感知 ABR 依赖消费者与提供者之间持续同步的状态，而对等节点更替（churn）、提供者迁移、网络分区与内容分发变化都会使该状态过期。
- **假设（Assumption）:** 本地可观测的请求时信号加上客户端携带的状态，就足以保持网络感知，而无需任何提供者侧状态。
- **机制（Mechanism）:** 无状态的网络感知 ABR，仅依据本地请求时观测逐段重算码率；客户端把其自适应状态嵌入 HTTP 头，使上下文随请求一起传递，并始终处于客户端控制之下。
- **证据（Evidence）:** 摘要未说明（摘要被截断）
- **边界（Boundary）:** 摘要未说明
- **可偷的一招（Stealable move）:** 把状态移到拥有它的一方，并让状态随请求本身携带，这样节点更替就无法造成任何失同步。
- **一句话卖点（Pitch）:** 把自适应状态放进请求头，就能在不依赖同步状态的情况下保持网络感知。

### 22. Understanding User Behavior in Volumetric Video Watching: Dataset, Analysis and Prediction (ACM MM 2023)
- **问题（Problem）:** 体积视频需要极高带宽，因此流媒体必须优先视口（viewport）；但此前没有带细粒度交互特征的三维体积观看数据集，来告诉人们该优先什么。
- **假设（Assumption）:** 视口、注视（gaze）与运动偏好在不同视频与用户之间足够规律，可以被学习与预测。
- **机制（Mechanism）:** 发布一个大规模、多维度的体积视频观看行为数据集；分析视口、注视与运动偏好；设计一个基于 transformer 的视口预测模型，融合注视与运动特征。
- **证据（Evidence）:** 类型：数据集加分析加预测基准；在各种条件下精度都高；未给出数字（摘要被截断）。
- **边界（Boundary）:** 摘要未说明
- **可偷的一招（Stealable move）:** 在同一篇论文里同时交付数据集与预测器，使行为分析成为模型输入特征的理由。
- **一句话卖点（Pitch）:** 没有数据就无法对体积视口做优先级，所以这里是数据、分析和预测器。

### 23. Video Quality Monitoring for Remote Autonomous Vehicle Control (arXiv 2025)
- **问题（Problem）:** 远程操作员必须实时干预，但 4G/5G 信号波动、移动性切换与瞬时拥塞使可靠的低时延视频难以获得。
- **假设（Assumption）:** 视频质量能被提前足够久地预测以采取主动行动，且同一预测器在车上与在边缘都可行。
- **机制（Mechanism）:** 一份子系统蓝图，覆盖车载数据采集、采集与压缩、向边缘传输、流媒体数据管理、AI 部署与推理，以及根据预测质量的主动决策；基准测试了 LSTM、门控循环单元（GRU）、仅编码器 Transformer 的 20 个变体，外加深度神经网络（DNN）与线性基线；研究了车上推理与边缘推理的对比；并讨论了可解释 AI 用于问责。
- **证据（Evidence）:** 类型：在由现场试验测量加合成压力段构成的混合数据集上做概念验证基准；报告精度与推理时延；未给出数字（摘要被截断）。
- **边界（Boundary）:** 摘要未说明
- **可偷的一招（Stealable move）:** 把贡献框定为一个"放置位置"的问题，在链路两端对同一个预测器做基准，让时延单独决定。
- **一句话卖点（Pitch）:** 在视频质量下降之前预测它，并在为时未晚时把方向盘交给操作员。

### 24. A 3D Framework for Improving Low-Latency Multi-Channel Live Streaming (arXiv 2024)
- **问题（Problem）:** 多信道直播同时给数据量、跨流同步以及在变化网络下的一致质量带来压力。
- **假设（Assumption）:** 在源端把多路视频输入合成为一个渲染场景，可在不放弃逐信道控制的前提下消除冗余。
- **机制（Mechanism）:** 利用游戏引擎（Unity 3D）中的多个虚拟 3D 画布，把多机位视频合并为单一流；每路输入映射到一块世界空间画布上，并由一台世界内相机拍摄，得到单信道输出，支持一对多广播、一对一通话以及实时信道控制。
- **证据（Evidence）:** 类型：真实系统，已开源，用 Unity 3D 构建；在降低时延与用户交互响应性上优于一些现有多信道直播方案；未给出数字。
- **边界（Boundary）:** 摘要未说明
- **可偷的一招（Stealable move）:** 在源端把 N 路并行流合并为一条合成流，使同步变成渲染问题而不是传输问题。
- **一句话卖点（Pitch）:** 把多路视频信道渲染到一块 3D 画布上，串流一个场景而不是许多路流。

### 25. Towards Low-Latency and Energy-Efficient Hybrid P2P-CDN Live Video Streaming (arXiv 2024)
- **问题（Problem）:** 过顶（OTT）提供商难以构建一个既可削减服务器能耗、又仍能交付低时延高质量直播的可扩展框架。
- **假设（Assumption）:** 对等节点、边缘与 CDN 资源可以被枚举为一个共同的多层动作空间，使抓取与转码可以联合放置，而不是分别用启发式处理。
- **机制（Mechanism）:** 结合网络功能虚拟化（NFV）与边缘计算的混合 P2P-CDN 框架，采用多层架构，并以覆盖来自对等节点、边缘与 CDN 服务器的全部可用资源构成一棵动作树，来分发视频抓取与转码任务。
- **证据（Evidence）:** 类型：针对基线的测试床实验；提升用户 QoE、降低客户端服务时延，并改善边缘服务器能耗；未给出数字。
- **边界（Boundary）:** 摘要未说明
- **可偷的一招（Stealable move）:** 把某个负载的每一种放置选择枚举成一棵显式的动作树，使资源异构性变成一个搜索空间，而不是一堆启发式。
- **一句话卖点（Pitch）:** 一棵覆盖对等节点、边缘与 CDN 的动作树，让直播同时变得更便宜、更快。
