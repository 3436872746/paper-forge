> 中文版 · English: [cards_batch1.md](cards_batch1.md)

### 1. A control-theoretic simplification of adaptive bitrate (ABR) video streaming (arXiv 2023)
- **问题（Problem）:** HTTP 之上的 ABR 提出了许多微妙的问题，却缺少一个原理清晰、基础的码率与缓冲区水位控制设计。
- **假设（Assumption）:** 码率/缓冲区的动力学是平坦（flat）的，因此可以一次性规划出一条前馈轨迹，而残余失配小到足以由反馈环吸收。
- **机制（Mechanism）:** 针对码率与缓冲区水位的基于平坦性（flatness）的前馈控制；通过 HEOL 设置闭环——该设置混合无模型控制与基于平坦性的控制——并给出一个由代数辨识得到的带宽闭式估计。
- **证据（Evidence）:** 分析加计算机实验，以体验质量（Quality of Experience，QoE）指标报告；未给出数字。
- **边界（Boundary）:** 摘要未说明
- **可偷的一招（Stealable move）:** 从近期的输入-输出历史中以闭式形式估计控制器所需的那一个未知参数，而不是为它训练一个预测器。
- **一句话卖点（Pitch）:** 三个基础的控制器理论答案，把一个微妙的启发式问题变成了教科书式的前馈加反馈。

### 2. Semantic-Aware Adaptive Video Streaming Using Latent Diffusion Models for Wireless Networks (arXiv 2025)
- **问题（Problem）:** 恒定码率与自适应码率流媒体浪费带宽和存储，并使 QoE 相对于内容实际所需有所下降。
- **假设（Assumption）:** I 帧可以被压缩为扩散潜变量（latent），并在接收端以高视觉质量重建，而 B/P 帧则作为廉价的细化元数据。
- **机制（Mechanism）:** 嵌入 FFmpeg 流水线的潜扩散模型（latent diffusion model）把 I 帧压缩到潜空间，而保留的 B 帧和 P 帧则充当调整元数据，由去噪和视频插帧（Video Frame Interpolation）进一步细化。
- **证据（Evidence）:** 实验结果；在 QoE 与资源效率上优于最先进方案；未给出数字。
- **边界（Boundary）:** 摘要未说明
- **可偷的一招（Stealable move）:** 为锚点帧传输生成式潜变量，为中间帧只传输廉价的残差元数据，让接收端去重建而不是去接收。
- **一句话卖点（Pitch）:** 生成式潜变量加插值元数据，为 5G 与后 5G 网络提供可扩展的实时流媒体。

### 3. Imitation Learning for Adaptive Video Streaming with Future Adversarial Information Bottleneck Principle (arXiv 2024)
- **问题（Problem）:** 基于强化学习（reinforcement learning，RL）的 ABR 提升了平均 QoE，但在单个会话内波动，且探索效率低。
- **假设（Assumption）:** 用未来吞吐量计算出的离线最优码率方案是一个可用的专家，而把状态压缩为与动作相关的信息，可以消除该专家引入的未来信息泄漏。
- **机制（Mechanism）:** 从由交替优化算法求解的混合整数非线性规划（MINLP）专家做模仿学习，并配以一个对抗式信息瓶颈，其"不利专家"是一个看不到未来信息的 MPC 策略。
- **证据（Evidence）:** 实验结果；平均 QoE 提升 7.30%，以及 30.（摘要被截断）
- **边界（Boundary）:** 摘要未说明
- **可偷的一招（Stealable move）:** 当你的神谕专家能看到未来时，再加入一个看不到未来的专家，并对任何使你能把两者区分开的表示施加惩罚。
- **一句话卖点（Pitch）:** 从离线最优中学习，而不继承它的千里眼。

### 4. DIGITWISE: Digital Twin-based Modeling of Adaptive Video Streaming Engagement (arXiv 2025)
- **问题（Problem）:** ABR 算法假设所有用户对画质伪影和网络问题反应相同，忽略了各自的敏感度差异。
- **假设（Assumption）:** 用户在某个会话中的参与度，可由其自身过去的观看会话加上当前会话的流媒体事件来预测。
- **机制（Mechanism）:** 一个按用户训练的数字孪生（digital twin），用监督学习在会话事件上训练，再加一个统一模型，两者都用 XGBoost 实现。
- **证据（Evidence）:** 在观看会话上的实证评估（数据来源摘要未说明）：相比不感知用户的模型，参与度预测误差最多降低 5.8%，平均参与度提升最高 8.6%。
- **边界（Boundary）:** 摘要未说明
- **可偷的一招（Stealable move）:** 为每个实体单独拟合一个模型，再拟合一个把它们汇集起来的模型，并把逐实体的增益作为个性化的价值来报告。
- **一句话卖点（Pitch）:** 参与度是个人的事；给每个观众一个数字孪生，就能先预测、再提升它。

### 5. Video Streaming Over QUIC: A Comprehensive Study (arXiv 2025)
- **问题（Problem）:** 由于在用的 QUIC 实现众多，它们的拥塞控制究竟如何影响 HTTP 自适应流媒体的 QoE 尚不清楚。
- **假设（Assumption）:** 由轨迹驱动的单服务器多客户端实验，能暴露出实践中真正重要的效应。
- **机制（Mechanism）:** 由轨迹驱动的实验，遍历不同的 QUIC 实现、拥塞控制、排队策略，以及点播（VoD）与低延迟直播场景下的协作式与竞争式流。
- **证据（Evidence）:** 由轨迹驱动的实验；未给出数字；结论是定性的（同一拥塞控制算法在不同实现下会产生显著的性能差异）。
- **边界（Boundary）:** 摘要未说明
- **可偷的一招（Stealable move）:** 固定算法、只改变实现，这样测到的任何差异都可归因于工程实现而非设计。
- **一句话卖点（Pitch）:** 相同的拥塞控制并不等于相同的性能，因此 ABR 与传输层需要跨层设计。

### 6. EVAN: Evolutional Video Streaming Adaptation via Neural Representation (arXiv 2024)
- **问题（Problem）:** 用传统编解码器，一旦做出决定就无法改变码率，结果要么浪费带宽，要么频繁卡顿重缓冲。
- **假设（Assumption）:** NeRV 权重可以部分传输，并且仍能在不解码相邻帧的情况下重建某一帧。
- **机制（Mechanism）:** 软演员-评论家（soft actor-critic）强化学习自适应地选择传输 NeRV 模型的哪些部分，并结合渐进式播放来避免重缓冲。
- **证据（Evidence）:** 实验；重缓冲减少 50%，以及接近 20%。（摘要被截断）
- **边界（Boundary）:** 摘要未说明
- **可偷的一招（Stealable move）:** 选一种当只有一部分到达时也能优雅降级的表示，这样传输量可以在决定之后裁剪，而不是之前。
- **一句话卖点（Pitch）:** 神经表示把码率自适应从一次性选择变成了可调的旋钮。

### 7. A Global Perspective on the Past, Present, and Future of Video Streaming over Starlink (arXiv 2024)
- **问题（Problem）:** 低地球轨道（LEO）的吞吐量波动与丢包，比地面网络造成更多的码率切换和重缓冲。
- **假设（Assumption）:** 来自 85 个国家、超过一百万户家庭的住户遥测数据，能代表 LEO 流媒体行为的普遍情况。
- **机制（Mechanism）:** 首次对 LEO 上的点播流媒体做全球测量，然后通过仿真以及在超过一百万户家庭上做的真实 A/B 测试，操纵现有的拥塞控制与 ABR 算法。
- **证据（Evidence）:** 覆盖 85 个国家、超过一百万户家庭的真实轨迹，加仿真与已部署的 A/B 测试；整体质量与地面网络相当，但切换与重缓冲上升；未给出更多数字。
- **边界（Boundary）:** 摘要未说明
- **可偷的一招（Stealable move）:** 在你测量过的同一人群上用 A/B 测试验证所提修复，使测量与干预共享同一分母。
- **一句话卖点（Pitch）:** 视频与拥塞控制算法必须适应快速演进的网络格局。

### 8. LiveVV: Human-Centered Live Volumetric Video Streaming System (arXiv 2023)
- **问题（Problem）:** 体积视频（volumetric video）的数据量远大于普通视频，在有限带宽与严苛时延下，其实时直播仍未解决，尽管点播版本已有。
- **假设（Assumption）:** 静态与动态体积内容可以分开处理，复用低视差的静态数据并配合基于显著性（saliency）的抽取，可保持可接受的质量。
- **机制（Mechanism）:** 多视角轻量采集模块、场景分割与复用、体积自适应码率算法（volumetric adaptive bitrate，VABR）以及渲染，整合在一个整体系统中。
- **证据（Evidence）:** 大量真实场景实验（摘要被截断）
- **边界（Boundary）:** 摘要未说明
- **可偷的一招（Stealable move）:** 把内容拆成两部分：变化慢的部分只发送一次，变化快的部分逐帧发送；带宽预算只花在快的那部分上。
- **一句话卖点（Pitch）:** 首个从采集到渲染的整体式体积视频实时直播系统。

### 9. Improving ABR Performance for Short Video Streaming Using Multi-Agent Reinforcement Learning with Expert Guidance (arXiv 2023)
- **问题（Problem）:** 面向长视频的 ABR 算法在短视频上会灾难性失效，因为控制器必须在预取的同时联合选择播放哪个视频以及以什么码率播放。
- **假设（Assumption）:** 视频 ID 决策与码率决策可以拆成两个协作的智能体而不丢失联合最优，且手写规则是足够好的起点。
- **机制（Mechanism）:** 多智能体强化学习，缓冲区管理与码率自适应分别由独立智能体负责，先通过模仿手工专家规则初始化再微调，优化由 QoE 与带宽浪费构成的复合效用。
- **证据（Evidence）:** 大量实验；效用分比最先进方案提升 53.2%，且训练复杂度与推理时间都低。
- **边界（Boundary）:** 摘要未说明
- **可偷的一招（Stealable move）:** 把耦合的离散选择拆成每条决策轴一个智能体，并先用手写规则初始化每个智能体，再让强化学习微调。
- **一句话卖点（Pitch）:** 把"播哪个视频"与"用什么码率"分开，短视频直播就不再失败。

### 10. LL-GABR: Energy Efficient Live Video Streaming Using Reinforcement Learning (arXiv 2024)
- **问题（Problem）:** 直播 ABR 的 QoE 模型忽略了在移动设备上更高码率并不等于更高感知质量，于是为看不见的收益烧电池。
- **假设（Assumption）:** 感知质量加上能耗、时延、重缓冲与流畅度，可以由一个策略统一优化，且该策略能在不同视频标题与编码阶梯（encoding ladder）之间迁移而无需重训。
- **机制（Mechanism）:** 深度强化学习，其 QoE 以感知视频质量替代码率并加入能耗项，训练时对视频、环境与网络设置均不敏感（agnostic）。
- **证据（Evidence）:** 轨迹驱动的实验；相比最先进方案，感知 QoE 最多提升 44%，能效高 73%，净能耗低 11%。
- **边界（Boundary）:** 摘要未说明
- **可偷的一招（Stealable move）:** 把目标函数里的代理量替换为用户真正感知的量，然后把代理量一直悄悄掩盖的资源代价加回来。
- **一句话卖点（Pitch）:** 优化观众感知到的东西，而不是码率，电池自然跟上。

### 11. SafeLink-Agent: Agentic Maintenance for Adaptive Bitrate Controllers over Dynamic Starlink Networks (arXiv 2026)
- **问题（Problem）:** 针对某一种网络状况设计或训练的 ABR 控制器，在最新暴露出来的困难 Starlink 网络画像上会失效。
- **假设（Assumption）:** 大语言模型（LLM）能把汇总后的故障转成可用的候选补丁，而重放验证是决定是否提交这些补丁的可靠闸门。
- **机制（Mechanism）:** 故障汇总送入基于 LLM 的智能体式补丁提议器，重放验证决定每个补丁能否安全提交；规则型控制器与学习型控制器共用同一套流程。
- **证据（Evidence）:** 真实 Starlink 网络；在滚动维护中 RobustMPC 的严重会话比例从 2.60% 降到 0.40%，累计严重会话从 45 降到 7；学习型控制器在经核验的自适应审计下从 39.01% 降到 9.79%。
- **边界（Boundary）:** 摘要未说明
- **可偷的一招（Stealable move）:** 交付修复而不是重训：让模型提议补丁，只接纳那些在已录故障上重放能通过的补丁。
- **一句话卖点（Pitch）:** 当底下的网络变了，控制器应该被维护，而不是被重新设计。

### 12. SafeSABR: Risk-Calibrated Adaptive Bitrate Streaming over Starlink Networks (arXiv 2026)
- **问题（Problem）:** 学习型 ABR 在 Starlink 上取得了高平均 QoE，同时暴露出被平均值掩盖的严重会话级重缓冲。
- **假设（Assumption）:** 一个安全容量下界可以在运行时计算，并且足够保守，能在不破坏 QoE 的前提下拦下不安全的码率。
- **机制（Mechanism）:** 三个阶段：行为克隆预训练以获得高 QoE 先验；风险校准的强化学习微调以削减严重尾部倾向；运行时安全审计器把请求的码率与安全容量下界比对。
- **证据（Evidence）:** 真实 Starlink 轨迹，对比在线、预测辅助与学习型基线；严重卡顿会话从 22.8% 降到 7.2%，最差 5% 会话的重缓冲从 54.30 s 降到 22.68 s，代价是 1.8% 的 QoE 损失。（摘要被截断）
- **边界（Boundary）:** 摘要未说明
- **可偷的一招（Stealable move）:** 显式优化尾部，然后把每个动作按运行时计算的最坏情况界进行钳制，用小的均值代价换取大的尾部收益。
- **一句话卖点（Pitch）:** 让学习型 ABR 从追逐平均 QoE，转向更安全的 QoE-严重风险前沿。

### 13. Goal-Oriented Semantic Communication for Wireless Video Transmission via Generative AI (arXiv 2025)
- **问题（Problem）:** 视频必须穿过带宽受限、有噪声的无线信道，同时满足低时延与高质量。
- **假设（Assumption）:** 关键帧承载了值得发送的语义，其余可插值；以信道增益为条件的扩散模型可以从接收表示中剥离信道噪声。
- **机制（Mechanism）:** 语义编码器挑选关键帧并提取语义信息，语义解码器重建关键帧并插值出完整视频，而一个以瞬时信道增益为条件的基于稳定扩散（SD）的去噪器（SD-GSC），或一个学习增益分布的并行版本（PSD-GSC），负责清洗接收信号。
- **证据（Evidence）:** 仿真；相比 ADJSCC、Latent-Diff DNSC、DeepWiVe 与 DVST：PSNR 分别 +69%、+58%、+33%、+38%，MSE -52%、-50%、-41%、-45%，FVD -38%、-32%、-22%、-24%；信道未知时 PSNR 提升 17%，一个（摘要被截断）
- **边界（Boundary）:** 摘要未说明
- **可偷的一招（Stealable move）:** 信道状态已知时让去噪器以其为条件，未知时则以学到的信道分布为条件，而不是训练一个单一的盲去噪器。
- **一句话卖点（Pitch）:** 发送语义，用生成模型重建，并借助对信道的了解去噪。

### 14. Real-time Extended Reality Video Transmission Optimization Based on Frame-priority Scheduling (arXiv 2024)
- **问题（Problem）:** 5G 上的实时扩展现实（XR）视频需要同时满足低时延与高数据率，而无线资源有限。
- **假设（Assumption）:** 各帧的重要性不等，这种排序可被无线调度器利用，而不是把数据包当作同质处理。
- **机制（Mechanism）:** 把问题建模为基于帧优先级的无线资源调度，用一个多步深度 Q 网络（Deep Q-network，DQN）框架求解，并配以基于卷积神经网络（CNN）的网络模型。
- **证据（Evidence）:** 仿真；传输质量提升 49.9%–80.2%。
- **边界（Boundary）:** 摘要未说明
- **可偷的一招（Stealable move）:** 让调度器向前看几步、评估未来帧的价值，而不是只依据队首项做决定。
- **一句话卖点（Pitch）:** 实时 XR 向 5G 要的，是按帧优先级调度，而不是按包序调度。

### 15. AnalogDepth: Multi-view Geometry from FPV drones under Analog Video Transmission (arXiv 2026)
- **问题（Problem）:** 第一人称视角（FPV）无人机上的模拟视频传输会产生具有空间结构的退化，与标准数据增广所用的加性白高斯噪声（AWGN）不同，并且会严重削弱一个最先进的几何基础模型。
- **假设（Assumption）:** 一组真实录制的噪声库能复现真正重要的结构，因此在其上训练的蒸馏可迁移到未见过的飞行。
- **机制（Mechanism）:** 参数高效的学生-教师知识蒸馏，用于适配 Depth Anything 3，在 DINOv2 骨干中注入 LoRA；从噪声库注入真实噪声，并与功率谱密度（PSD）匹配的高斯合成以及 AWGN 作对比。
- **证据（Evidence）:** 真实 FPV 飞行；跨三个室内场景的六段真实序列；用噪声库训练相比预训练 DA3 与两种高斯变体，一致地降低了逐帧深度 RMSE 与 3D Chamfer 距离；未给出数字。
- **边界（Boundary）:** 摘要未说明
- **可偷的一招（Stealable move）:** 采集真实的失真而不是合成它，然后针对统计量匹配的合成基线做消融，使收益可归因于结构而非严重程度。
- **一句话卖点（Pitch）:** 让适配奏效的，是复现真实模拟噪声的空间结构，而不是它的功率谱。

### 16. Semantic-Aware Neural Video Codec for Error-Resilient Low-Latency Transmission (arXiv 2026)
- **问题（Problem）:** 物理 AI 系统需要在会丢包、不可靠信道上传输低时延、面向任务的视频。
- **假设（Assumption）:** 神经编解码器的表示可以按语义与特征重要性划分为若干数据包，这些包在丢失情况下仍可独立解码。
- **机制（Mechanism）:** 在 DCVC-RT 之上，一种感知语义与特征的编码策略把编码表示拆分成按重要性分层的包，放在有优先级的流上；一个抗错误的熵模型去除包间依赖；整个系统在抽象出的多级丢包信道上端到端训练。
- **证据（Evidence）:** 在丢包条件下与基线 DCVC-RT 对比的实验；较不重要的区域优雅降级，而任务相关内容得到更好的保留；未给出数字。
- **边界（Boundary）:** 摘要未说明
- **可偷的一招（Stealable move）:** 去掉单元之间的依赖，使任何一个都能被独立丢弃；再按重要性给单元排序，并把排序映射到传输优先级。
- **一句话卖点（Pitch）:** 内容感知的包重要度加上独立可解码性，把丢包变成了优雅降级。

### 17. Quality of Experience Optimization for Real-time XR Video Transmission with Energy Constraints (arXiv 2024)
- **问题（Problem）:** 实时 XR 逐帧传输，要求低时延且对波动高度敏感，而设备还要面对长期能耗预算。
- **假设（Assumption）:** 李雅普诺夫（Lyapunov）优化可把长期能耗约束转化为逐帧问题，其解仍接近约束最优。
- **机制（Mechanism）:** 帧级 QoE 模型；用李雅普诺夫优化把问题降为单帧优化；子信道分配；以及用于码率选择的基于长短期记忆网络（LSTM）的深度 Q 网络。
- **证据（Evidence）:** 数值结果；相比基线，平均 QoE 提升 0.04 至 0.46，平均视频质量波动降低 29% 至 50%，帧传输成功率提升 5% 至 48%。
- **边界（Boundary）:** 摘要未说明
- **可偷的一招（Stealable move）:** 把长时程预算约束变成每一步的漂移惩罚，使短视的控制器也仍然遵守预算。
- **一句话卖点（Pitch）:** 帧级 QoE 加基于漂移的能耗控制，让实时 XR 既流畅又可持续。

### 18. Real-Time Transmission of Uncompressed High-Definition Video Via A VCSEL-Based Optical Wireless Link With Ultra-Low Latency (arXiv 2025)
- **问题（Problem）:** 未经压缩、未加密的高分辨率视频需要一种超可靠低时延通信（URLLC）介质，其带宽足以把时延压到远低于编解码器与无线所能达到的水平。
- **假设（Assumption）:** 把相机的串行数字接口（SDI）信号直接调制到激光强度上，可在不使用任何编码的情况下实现无差错传输。
- **机制（Mechanism）:** 光保真（light fidelity）上的 SDI：相机的 SDI 输出在光学无线链路上调制一个 940 nm 垂直腔面发射激光器（VCSEL）的强度。
- **证据（Evidence）:** 真实实验演示；以 2.97 Gb/s 无差错传输全高清（FHD）、以 5.94 Gb/s 传输 4K UHD，实测端到端时延低于 35 ns。
- **边界（Boundary）:** 摘要未说明
- **可偷的一招（Stealable move）:** 完全跳过编解码器，直接传输设备的原始接口信号，这样时延由物理决定而不是由编码决定。
- **一句话卖点（Pitch）:** 现成的 SDI 器件加一个 VCSEL，就能得到可扩展、廉价、亚微秒级的无线广播链路。

### 19. Multiple description video coding for real-time applications using HEVC (arXiv 2023)
- **问题（Problem）:** 为了抗丢包而在多条信道上发送同一份编码流，在不可靠无线链路上要耗费大量带宽。
- **假设（Assumption）:** 两个互补描述加一个自适应 IDR 周期，能以远低于流复制的复杂度与成本，获得相当的鲁棒性。
- **机制（Mechanism）:** 一种低复杂度、低时延的双信道多描述编码（Multiple Description Coding）方案，带有自适应的即时解码刷新（Instantaneous Decoder Refresh，IDR）帧周期，并与 HEVC 标准兼容。
- **证据（Evidence）:** 对比评估；在更低复杂度下对高丢包率有更好的抵抗能力；未给出数字。
- **边界（Boundary）:** 摘要未说明
- **可偷的一招（Stealable move）:** 在描述层付一次冗余代价，而不是在每条信道上复制整条流。
- **一句话卖点（Pitch）:** 鲁棒的多信道视频，而不必付出把一切都发两遍的代价。

### 20. 5G Aero: A Prototyping Platform for Evaluating Aerial 5G Communications (arXiv 2025)
- **问题（Problem）:** 为小型无人机（UAV）提供可靠、高吞吐、低时延的 5G，对航空与工业 4.0 应用至关重要，但仍研究不足。
- **假设（Assumption）:** 小型机体上的商用现货（commercial off-the-shelf，COTS）5G 模块能满足 3GPP 的时延要求，且不会实质性牺牲飞行时间。
- **机制（Mechanism）:** 一个紧凑的、针对 5G 优化的无人机原型，在室内实验中于视距（LoS）与非视距（NLoS）条件下评估命令与控制（C2）包时延与视频时延。
- **证据（Evidence）:** 真实系统测量；在 LoS 与 NLoS 下均满足 3GPP 的 C2 时延，LoS 下满足视频时延，NLoS 下视频时延可接受；5G 模块使飞行时间仅下降 1%，可忽略不计。
- **边界（Boundary）:** 摘要未说明
- **可偷的一招（Stealable move）:** 用平台自身的预算（电池、重量、飞行时间）来报告新能力的代价，而不只是对照目标指标。
- **一句话卖点（Pitch）:** 当前的 5G 已能支撑先进的无人机作业，而且几乎不付电池代价。

### 21. Architecture Design of a Networked Music Performance Platform for a Chamber Choir (arXiv 2023)
- **问题（Problem）:** 有指挥的合唱团无法用普通会议工具远程排练，这些工具缺少合奏表演所需的时延与音频保真度。
- **假设（Assumption）:** 逐步递进的架构改进，每一步都由可用性测量来论证，最终会收敛到一个适用于中型合奏团的可用平台。
- **机制（Mechanism）:** 三个迭代的架构步骤：从普通视频会议平台，到专用的网络音乐表演（networked music performance，NMP）设备与工具，再到在专业低时延音视频工作站上增加视频传输；每一步都伴随同步的可用性测试部署。
- **证据（Evidence）:** 真实部署，含定性与定量测量；统计分析显示每次迭代后排练质量都有显著提升；未给出数字。
- **边界（Boundary）:** 摘要未说明
- **可偷的一招（Stealable move）:** 用可部署版本之间的实测差值来论证架构，让每个组件都靠一组前后对比来证明自己的位置。
- **一句话卖点（Pitch）:** 迭代地搭建平台，每次测量合唱团，让测量结果来选择最终架构。

### 22. Simulative Comparison of DVB-S2X/RCS2 and 3GPP 5G NR NTN Technologies in a Geostationary Satellite Scenario (arXiv 2025)
- **问题（Problem）:** 标准化组织在争论 DVB 卫星规范与 5G NR NTN 的优劣，但当两者在不同假设下仿真时，比较并不可靠。
- **假设（Assumption）:** 把几何、波束布局与链路预算固定到 3GPP NTN 参考参数化上，可使两种技术的比较公平。
- **机制（Mechanism）:** 两个建立在同一 ns-3 基座上的系统级仿真器，SNS3 与 ALIX 5G (TN-)NTN；系统级结果由覆盖各技术调制编码方案（MCS）与波形的链路级仿真来喂养。
- **证据（Evidence）:** 系统级与链路级仿真；在用户前向链路上 DVB-S2X 的频谱效率高于 NR PDSCH，而在回传链路上 NR PUSCH 在系统层面更优；未给出数字。
- **边界（Boundary）:** 摘要未说明
- **可偷的一招（Stealable move）:** 把正面对比中每一个自由参数都钉死在一个已发表的参考配置上，这样你报告的差异就不可能是实验设置的产物。
- **一句话卖点（Pitch）:** 在单一共享参数化下，两种技术都无法同时赢下两条链路。

### 23. Joint Optimization of Handoff and Video Rate in LEO Satellite Networks (INFOCOM 2025)
- **问题（Problem）:** 在 LEO 网络中，卫星切换（handoff）与视频码率由彼此分离的机制决定，尽管两者各自决定了对方所看到的吞吐量。
- **假设（Assumption）:** 联合选择卫星与码率，并让分布式执行体（actor）用全局信息训练，胜过在切换之后再去适配码率。
- **机制（Mechanism）:** 一个视频感知的移动性管理框架，为单用户提供模型预测控制（MPC）与 RL 算法，并扩展到多个相互竞争的用户，采用集中式训练、分布式推理。
- **证据（Evidence）:** 轨迹驱动的仿真加测试床实验，其动机来自仿真模型与真实数据集；未给出数字；代码与数据已发布。
- **边界（Boundary）:** 摘要未说明
- **可偷的一招（Stealable move）:** 让控制环与其下方改变信道的层耦合起来，共同决策，而不是事后适配。
- **一句话卖点（Pitch）:** 卫星移动时，码率决策也必须在同一步里移动。

### 24. VISTA: A Benchmark for Real-Time Video Streaming under Network Impairments in Surgical Teleoperation (arXiv 2026)
- **问题（Problem）:** 缺少可复现的评估，来考察前向视频路径上的损伤如何影响接收质量与人类任务表现。
- **假设（Assumption）:** 使用 NetEm 的 Linux 流量控制（Linux Traffic Control）与 Gilbert-Elliott 丢包模型能复现真正重要的损伤情形，而反向控制信道保持稳定。
- **机制（Mechanism）:** 五种模拟条件（医院局域网、5G 城市、4G 乡村、LEO、GEO）、标准化的钉转移（peg transfer）任务，以及网络服务质量（QoS）、PSNR/SSIM/VMAF 与卡顿率的同步测量。
- **证据（Evidence）:** 375 次试验的基准；成功率从 97%（局域网）到 79%（5G）、35%（4G）、71%（LEO）、12%（GEO）；成功者的平均完成时间从 80 s 到 117 s、211 s、152 s、255 s。
- **边界（Boundary）:** 摘要未说明
- **可偷的一招（Stealable move）:** 在测视频指标的同时测量下游的人类任务结果，这样指标的相干性是被确立的，而不是被假定的。
- **一句话卖点（Pitch）:** 网络损伤直接决定远程操作能否成功，而现在这一点可以被复现。

### 25. Satellite Streaming Video QoE Prediction: A Real-World Subjective Database and Network-Level Prediction Models (arXiv 2024)
- **问题（Problem）:** QoE 模型需要大量在多样的真实播放中断下由主观意见标注的视频，而这种数据在卫星流媒体领域尚不存在。
- **假设（Assumption）:** 仅凭网络参数就携带了足够的信息来预测人类感知分数。
- **机制（Mechanism）:** LIVE-Viasat 真实世界卫星 QoE 数据库，包含来自真实流媒体服务的 179 个视频；一项 54 人参与的主观研究，同时收集连续时间分数与回溯性分数；以及一个新模型 SatQA，把网络参数映射为预测感知。
- **证据（Evidence）:** 主观数据库加模型评估；179 个真实世界视频，54 名参与者；在其上评估了主流 QoE 模型；SatQA 仅用网络（摘要被截断）
- **边界（Boundary）:** 摘要未说明
- **可偷的一招（Stealable move）:** 在同一项研究里同时收集连续时间分数与回溯性分数，这样瞬时质量与记忆效应就能被分开。
- **一句话卖点（Pitch）:** 真实的卫星中断、人工标注，以及一个 ISP 可直接使用的纯网络预测器。
