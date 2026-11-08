> 中文版 · English: [cards_batch2.md](cards_batch2.md)

### 1. Application-Specific Power Side-Channel Attacks and Countermeasures: A Survey (arXiv 2025)
- **问题（Problem）：** 现有的功耗侧信道综述几乎只关注密码学实现，其他应用领域的攻击未被刻画。
- **假设（Assumption）：** 近期跨应用领域的功耗侧信道工作，可以沿应用特定（application-specific）的维度被有意义地分类和比较。
- **机制（Mechanism）：** 一份全面的综述，按应用领域对近期的功耗侧信道攻击与对策进行分类，并依应用特定的考量进行比较。
- **证据（Evidence）：** 对先前工作的综述，涵盖从密码学中提取密钥、ML 模型逆向工程、用户行为数据利用和指令级反汇编；未给出数字。
- **边界（Boundary）：** 摘要未说明
- **可偷的一招（Stealable move）：** 选择一个分类法（taxonomy）的比较轴时，按*应用领域*而非按底层物理信号，这样分类才贴合各领域防御者真正需要知道的东西。
- **一句话卖点（Pitch）：** 一份跨不同应用领域的功耗侧信道攻击与对策的全面综述。

### 2. A Survey on Acoustic Side Channel Attacks on Keyboards (arXiv 2023)
- **问题（Problem）：** 键盘承载凭据和隐私数据，麦克风质量不断提升，由此产生的声学泄露文献却很分散。
- **假设（Assumption）：** 从环境噪声中提取按键的那批工作已足够成熟，可以作为一个连贯的威胁来综述。
- **机制（Mechanism）：** 综述回顾现有研究，并解释攻击为何可行、适用的威胁模型，以及发起和增强攻击所用的方法。
- **证据（Evidence）：** 对现有研究的综述；未给出数字。
- **边界（Boundary）：** 摘要未说明
- **可偷的一招（Stealable move）：** 把一份威胁综述组织成三条独立的轴——物理可行性、威胁模型、方法——这样读者可以把威胁移植到自己的场景，而不只是读一份目录。
- **一句话卖点（Pitch）：** 一份对声学键盘侧信道研究的详尽回顾，涵盖可行性、威胁模型和攻击方法。

### 3. THOR: A Non-Speculative Value Dependent Timing Side Channel Attack Exploiting Intel AMX (arXiv 2025)
- **问题（Problem）：** 诸如 Intel AMX 的片上加速器对其输入数据的取值如何影响执行时间并不透明。
- **假设（Assumption）：** AMX 的执行时间取决于它所乘的数据取值（其稀疏性），因此仅凭时序就能泄露数据的一个属性。
- **机制（Mechanism）：** 一种基于软件的值相关时序攻击，利用一个新发现的 AMX 时序漏洞，在无需置信度分数、特权访问或物理接近的情况下推断神经网络权重稀疏性。
- **证据（Evidence）：** 真实系统攻击：在 50 分钟内完全恢复 64 个输入元素的权重稀疏性，比 Hertzbleed 的最大泄露速率快 631%。
- **边界（Boundary）：** 摘要未说明
- **可偷的一招（Stealable move）：** 不要攻击模型的输出——把加速器自身依赖数据的延迟当作预言机，这样即使受害者唯一暴露的是墙上时钟时间，攻击也能奏效。
- **一句话卖点（Pitch）：** Intel AMX 中一个取值相关的时序侧信道漏洞，无需置信度分数、特权或物理接近即可泄露权重稀疏性。

### 4. Acoustic Side Channel Attack on Keyboards Based on Typing Patterns (arXiv 2024)
- **问题（Problem）：** 现有的键盘声学攻击忽略打字模式和环境噪声，因此其报告的结果在现实条件下不成立。
- **假设（Assumption）：** 用户的打字节奏是可建模的混杂因素，并且一旦建模，嘈杂的真实环境仍留有可利用的声学信号。
- **机制（Mechanism）：** 提出一种适用的方法，在真实环境中实施攻击时显式考虑用户的打字模式。
- **证据（Evidence）：** 案例研究：在真实世界场景下，所有案例的平均成功率为 43%。
- **边界（Boundary）：** 摘要未说明
- **可偷的一招（Stealable move）：** 把用户特定的干扰变量（节奏、习惯、工作负载）提升为一等建模对象，而不是把它平均掉，并在嘈杂的现实条件下而非干净的实验室条件下报告准确率。
- **一句话卖点（Pitch）：** 一种在真实环境中考虑打字模式的可用键盘声学攻击，平均成功率达到 43%。

### 5. A Survey of Side-Channel Attacks in Context of Cache -- Taxonomies, Analysis and Mitigation (arXiv 2023)
- **问题（Problem）：** 缓存内存，尤其是末级缓存（last-level cache），已变得极其庞大，使可观测的共享缓存行为成为首要攻击面，而相关的微架构特定知识却很分散。
- **假设（Assumption）：** 缓存侧信道攻击及其缓解措施可以按微架构、跨核利用、方法论和目标来组织。
- **机制（Mechanism）：** 综述总结了基础原理、攻击面与分类法，比较不同微架构，按若干参数分析文献，并分析基于硬件和基于软件的缓解措施及其优劣与权衡。
- **证据（Evidence）：** 对现有文献的综述；未给出数字。
- **边界（Boundary）：** 摘要未说明
- **可偷的一招（Stealable move）：** 让*硬件世代*成为比较表中一等列，这会迫使某项缓解措施跨芯片的可移植性成为明确的主张，而不是假设。
- **一句话卖点（Pitch）：** 一份对缓存侧信道攻击的详细研究，比较不同微架构并分析缓解措施的权衡。

### 6. Protocol-Aware Firmware Rehosting for Effective Fuzzing of Embedded Network Stacks (CCS 2025)
- **问题（Problem）：** 基于重宿主（rehosting）的嵌入式固件模糊测试无法到达深层网络栈代码，因为复杂的多层协议输入格式难以满足，而现有方法需要人工或硬件。
- **假设（Assumption）：** 固件对网络协议的使用可以被自动推断出来，且足够好地在任意模糊测试数据外围合成有效的封装报文。
- **机制（Mechanism）：** Pemu 自动检测并处理固件中的网络协议使用，并透明地生成封装模糊测试数据的有效网络报文，让输入流入更深的固件层。
- **证据（Evidence）：** 真实评估显示相对三个现有重宿主工具在代码覆盖率上持续提升，另外重新发现了已知漏洞并识别出 f...（摘要被截断）
- **边界（Boundary）：** 摘要未说明
- **可偷的一招（Stealable move）：** 当输入格式是分层的，从程序推断出外层格式并用有效的外层包裹载荷，这样变异预算花在你关心的那一层，而不是花在通过解析器上。
- **一句话卖点（Pitch）：** 协议感知的重宿主把模糊测试输入推过协议解析器，实现更深、逐层的固件分析。

### 7. Poster: Machine Learning for Vulnerability Detection as Target Oracle in Automated Fuzz Driver Generation (arXiv 2025)
- **问题（Problem）：** ML 漏洞检测器有效但误报率高，而模糊测试有效却需要针对人工挑选函数手写驱动。
- **假设（Assumption）：** ML 检测器的判定足够可靠，可以据此选择对哪个函数做模糊测试，而一次确认性的崩溃足以验证所预测的漏洞。
- **机制（Mechanism）：** 一个工作流：(1) 用 ML 漏洞检测模型作为目标预言机识别可能的易受攻击函数，(2) 自动生成模糊测试驱动，(3) 对该函数模糊测试以找到能证实该推断的缺陷。
- **证据（Evidence）：** 在 libgd 一个已知漏洞上的演示，并计划大规模评估；未给出数字。
- **边界（Boundary）：** 仅报告了单个案例研究；大规模评估被明确留作未来工作。
- **可偷的一招（Stealable move）：** 把廉价而有噪声的预测器当作*排序预言机*来指挥一个昂贵的验证器，这样它的误报只浪费验证时间，而不会变成错误发表的结论。
- **一句话卖点（Pitch）：** 一个自动化的模糊测试驱动生成工作流，把 ML 漏洞检测器当作目标预言机，并在 libgd 的一个漏洞上做了展示。

### 8. Vulnerability Detection Through an Adversarial Fuzzing Algorithm (arXiv 2023)
- **问题（Problem）：** 模糊测试耗时且耗费算力，使没有专职安全人员的开源志愿者和小开发者难以企及。
- **假设（Assumption）：** 叠加在进化算法上的对抗性扰动能生成比普通进化式模糊测试走得更远的测试用例。
- **机制（Mechanism）：** 在当前进化算法之上构建对抗方法，为更远、更高效的模糊测试生成测试用例。
- **证据（Evidence）：** 实验对比报告对抗攻击显著提高现有模糊测试器的推进速度并发现更多崩溃；未给出数字。
- **边界（Boundary）：** 摘要未说明
- **可偷的一招（Stealable move）：** 把模糊测试器自身的种子种群当作攻击面并对其做对抗性扰动，使搜索压力指向路径分歧，而不是依赖随机变异。
- **一句话卖点（Pitch）：** 一个给进化式模糊测试器加上的对抗性扩展，探索更多路径、更快发现更多缺陷，同时仍能在个人设备上运行。

### 9. Systematic Meets Unintended: Prior Knowledge Adaptive 5G Vulnerability Detection via Multi-Fuzzing (arXiv 2023)
- **问题（Problem）：** 5G 与 NextG 的软件化扩大了攻击面，但安全研究只研究孤立方面，缺乏跨攻击者知识水平的整体视角。
- **假设（Assumption）：** 漏洞可以在三种分级知识假设下被揭示、检测和预测，且一个框架也能充当防御仿真的数字孪生。
- **机制（Mechanism）：** 三种模糊测试策略——Listen-and-Learn（黑盒，无协议知识）、Synchronize-and-Learn（黑盒，加上攻击者可获取的用户信息与基于概率的模糊测试）、Source-and-Learn（对有效比特的白盒模糊测试）。
- **证据（Evidence）：** 真实平台 srsRAN 5G：Listen-and-Learn 识别出 129 个 RRC 连接漏洞，平均检测时间 0.072 s；Synchronize-and-Learn 以远少的用例在精确率和召回率上胜过现有模型；Source-and-Learn 发现三个中间人漏洞；声称该方案可扩展到其他开源（摘要被截断）。
- **边界（Boundary）：** 摘要未说明
- **可偷的一招（Stealable move）：** 交付一个能在*分级知识假设*（一无所知、攻击者可获得的旁信息、完整源码）下运行的工具，这样一篇论文就能报告每一类攻击者实际能触及什么。
- **一句话卖点（Pitch）：** 一种系统化的多重模糊测试方法，在有和无先验知识假设下揭示、检测并预测 5G 漏洞。

### 10. TransferFuzz: Fuzzing with Historical Trace for Verifying Propagated Vulnerability Code (arXiv 2024)
- **问题（Problem）：** 代码复用传播漏洞，但检测复用的易受攻击代码无法判断该缺陷在新软件中是否真的可触发，从而产生误报。
- **假设（Assumption）：** 在模糊测试或执行原始易受攻击二进制时收集的运行时信息携带的指引，能迁移到包含同一函数的不同二进制。
- **机制（Mechanism）：** 从基础易受攻击二进制中提取历史轨迹，并应用 Key Bytes Guided Mutation 与嵌套模拟退火（Nested Simulated Annealing）算法，在目标二进制上做轨迹引导的模糊测试。
- **证据（Evidence）：** 在广泛认可的基准数据集上评估：验证速度比现有方法快 2.5 到 26.2 倍，并把 CVE 报告中列出的 15 个漏洞的影响软件范围扩大，增加...（摘要被截断）
- **边界（Boundary）：** 摘要未说明
- **可偷的一招（Stealable move）：** 当同一份代码存在于两个产物中时，从你已能攻破的那个中收获*求解历史*，并把它作为你攻不破的那个的搜索先验重放——迁移轨迹，而不只是代码匹配。
- **一句话卖点（Pitch）：** 一个轨迹引导的验证框架，确认通过代码复用传播的漏洞在新软件中是否真的可触发。

### 11. Formal and Fuzzing Amplification: Targeting Vulnerability Detection in 5G and Beyond (arXiv 2023)
- **问题（Problem）：** 5G 软件化要求在协议级规格逻辑和实现栈两个层面都提供保障，而形式化方法与模糊测试各只覆盖其中一个层面。
- **假设（Assumption）：** 来自形式化验证的攻击轨迹能有效播种模糊测试用例生成，而模糊测试反馈反过来能有效收窄或拓宽形式化验证的范围。
- **机制（Mechanism）：** 一个把两者耦合起来的分层框架：对关键协议的形式化验证指导模糊测试用例生成，模糊测试反馈拓宽形式化验证；应用于 5G NSA RRC 连接，使用比特级模糊测试和命令级基于变异的模糊测试。
- **证据（Evidence）：** 建立了 1 个攻击模型，并在 5G NSA RRC 连接流程上检测出 53 个漏洞；据称检测出的漏洞进一步精炼了后续检测的搜索空间（摘要被截断）。
- **边界（Boundary）：** 摘要未说明
- **可偷的一招（Stealable move）：** 在抽象层分析器与实现层测试器之间建立*双向*闭环，使双方的发现成为对方的搜索空间先验，而不是一次性的流水线。
- **一句话卖点（Pitch）：** 一个分层结合形式化与模糊测试覆盖的框架，从协议逻辑一直到实现栈来检测 5G 漏洞。

### 12. Multi-Agent Collaborative Fuzzing with Continuous Reflection for Smart Contracts Vulnerability Detection (arXiv 2025)
- **问题（Problem）：** 智能合约模糊测试器漏掉复杂漏洞，因为它们优先考虑代码覆盖率而非漏洞发现，且缺乏对状态化合约的语义理解，于是产生运行时失败的事务序列。
- **假设（Assumption）：** LLM 智能体可以从运行时拒绝反馈中学习合约语义，从而生成有效的、攻击形态的事务序列。
- **机制（Mechanism）：** SmartFuzz 用 LLM 驱动的智能体作为模糊测试引擎，其中包含把序列生成视为自演化的持续反思过程（Continuous Reflection Process）、把模糊测试拆成按依赖排序子任务的反应式协作链（Reactive Collaborative Chain），以及一个从全局与局部视图生成并精炼序列的多智能体团队。
- **证据（Evidence）：** 在真实世界...上的大量实验（摘要被截断）
- **边界（Boundary）：** 摘要未说明
- **可偷的一招（Stealable move）：** 把一个长的、有依赖顺序的输入分解为由专门智能体拥有的子任务，让它们对运行时拒绝进行反思，这样有效性成为学到的约束而不是事后过滤。
- **一句话卖点（Pitch）：** 一个协作式反思的 LLM 智能体模糊测试器，把事务序列自演化地推向复杂的智能合约漏洞。

### 13. AI-Driven Fuzzing for Vulnerability Assessment of 5G Traffic Steering Algorithms (arXiv 2026)
- **问题（Problem）：** 5G 流量引导算法面临干扰尖峰、切换风暴和局部中断等对抗性条件，常规测试不会系统性地探查。
- **假设（Assumption）：** 在场景参数上做多目标遗传搜索，比传统测试战役更能暴露隐藏的失效模式。
- **机制（Mechanism）：** 基于非支配排序遗传算法 II（NSGA-II）的 AI 驱动模糊测试框架，用 NVIDIA Sionna 在六种场景下对五个流量引导算法进行评估。
- **证据（Evidence）：** NVIDIA Sionna 仿真：比传统测试多检测出 34.2% 的漏洞总量和 5.8% 的严重失效，并在多样性和边界情形发现上更优。
- **边界（Boundary）：** 摘要承认在严重失效检测上观察到方差，凸显了稀有漏洞的随机性。
- **可偷的一招（Stealable move）：** 用帕累托多目标搜索而非单一聚合分数来驱动模糊测试器，这样在不同轴上表现糟糕的边界情形不会被塌缩成单一排名。
- **一句话卖点（Pitch）：** 一个基于 NSGA-II 的 AI 模糊测试框架，暴露 5G 流量引导中的隐藏漏洞，指向有韧性的、面向 6G 的网络。

### 14. Fixing Security Vulnerabilities with AI in OSS-Fuzz (arXiv 2024)
- **问题（Problem）：** OSS-Fuzz 已在 1000 个以上项目中找到超过 10,000 个漏洞，但许多仍未修补，因为修复是手工的。
- **假设（Assumption）：** 如果 LLM 智能体以执行漏洞利用输入为依据，而不是以散文式的问题描述为依据，它就能定位并修补安全缺陷。
- **机制（Mechanism）：** 为安全修补定制 AutoCodeRover 智能体，依赖对漏洞利用输入的测试执行来提取与修复相关的代码元素。
- **证据（Evidence）：** 基于 OSS-Fuzz 漏洞数据的经验：智能体自主性相对固定控制流的方法（如 Agentless）有帮助，并且补丁质量无法通过与参考代码的代码相似度来衡量，例如 CodeBLEU 分数...（摘要被截断）
- **边界（Boundary）：** 摘要明确指出，像 CodeBLEU 这样的代码相似度指标不是安全补丁质量的有效度量，因此标准评估信号不成立。
- **可偷的一招（Stealable move）：** 让修复智能体以可复现的执行而非散文为依据，并以行为方式给修复打分——复现器是否在测试不失败的情况下不再崩溃——而不是与参考补丁做文本相似度比较。
- **一句话卖点（Pitch）：** AutoCodeRover 的一个 LLM 智能体扩展，利用由漏洞利用触发的代码定位来自主修补 OSS-Fuzz 安全漏洞。

### 15. WhisperFuzz: White-Box Fuzzing for Detecting and Locating Timing Vulnerabilities in Processors (arXiv 2024)
- **问题（Problem）：** 黑盒与灰盒模糊测试能发现处理器时序漏洞，但无法定位或解释它们，也不给设计者覆盖率反馈。
- **假设（Assumption）：** 处理器时序行为植根于微架构状态转换，因此这些转换可以同时充当定位信号和覆盖率。
- **机制（Mechanism）：** 首个带静态分析的白盒模糊测试器：在寄存器传输级从设计中提取微架构状态转换，对设计插桩以监视这些转换作为覆盖率，并测量被测设计的处理时间以捕捉轻微异常变化。
- **证据（Evidence）：** 真实 RTL 设计：在 BOOM、Rocket Core 和 CVA6 上发现 12 个新的时序漏洞，其中八个违反 "（摘要被截断）。
- **边界（Boundary）：** 摘要未说明
- **可偷的一招（Stealable move）：** 把你正在试图发现的机制本身变成模糊测试器的覆盖率度量，这样“新覆盖率”与“新可疑行为”就是同一信号的两个读法。
- **一句话卖点（Pitch）：** 首个带静态分析的白盒模糊测试器，用于检测和定位处理器时序漏洞，并评估微架构时序覆盖率。

### 16. GoSurf: Identifying Software Supply Chain Attack Vectors in Go (arXiv 2024)
- **问题（Problem）：** Go 的依赖生态让单个被攻陷的包能级联进入关键系统，而现有供应链分类法忽略了攻击者用来隐藏恶意代码的语言特性。
- **假设（Assumption）：** 为良性目的而构建的 Go 特性具有可识别的静态模式，能把它们的合法使用与用于隐蔽传播的滥用区分开。
- **机制（Mechanism）：** 一个覆盖包生命周期的 12 种 Go 特有攻击向量的分类法，外加 GoSurf——一个依据该分类法分析 Go 包攻击面的静态分析工具。
- **证据（Evidence）：** 在一批广泛使用的真实 Go 包语料上评估静态分析；未给出数字。
- **边界（Boundary）：** 摘要把结果作为“初步洞见”（preliminary insights）提供，用于排定审计工作的优先级，而不是一个完整的检测器。
- **可偷的一招（Stealable move）：** 从生态自身良性的构建与解析语义中推导出生态特定的攻击分类法，再把每种滥用编码为静态模式——这套做法可迁移到任何语言生态。
- **一句话卖点（Pitch）：** 一个 Go 特有的、含 12 种攻击向量的分类法，配一个对包攻击面排序以供审计的静态分析工具。

### 17. SoK: Analysis of Software Supply Chain Security by Establishing Secure Design Properties (arXiv 2024)
- **问题（Problem）：** 供应链安全有许多方法和框架，但对一条安全的链必须满足哪些性质没有共同的说法，因此无法比较。
- **假设（Assumption）：** 供应链安全可分解为四个攻击阶段和三个性质——透明性、有效性、分离性——它们共同刻画一条安全化的链。
- **机制（Mechanism）：** 一份系统化梳理，识别四个攻击阶段，提出三个安全性质，用案例研究把当前方法与框架映射到这些性质上，并分析其相对已知攻击的优劣。
- **证据（Evidence）：** 对现有方法的系统化梳理加实践中供应链的案例研究；未给出数字。
- **边界（Boundary）：** 摘要强调以行为者和以操作为中心的供应链安全技术仍存在空白。
- **可偷的一招（Stealable move）：** 先命名一小组安全*性质*，再把每一项现有防御映射进这个网格——研究空白就从空格子里掉出来，而不用逐篇去读。
- **一句话卖点（Pitch）：** 一份系统化梳理，把透明性、有效性和分离性确立为安全软件供应链的设计性质。

### 18. Maven-Hijack: Software Supply Chain Attack Exploiting Packaging Order (arXiv 2024)
- **问题（Problem）：** Maven 以某种顺序打包依赖，JVM 之后按此顺序解析类，因此较早依赖中的重复类可以静默地覆盖应用的核心行为。
- **假设（Assumption）：** 一个与合法类具有相同全限定名的恶意类，放在打包顺序更早的依赖中，会在运行时胜出，而无需修改主代码库或库名。
- **机制（Mechanism）：** 把一个同名恶意类注入更早的依赖中，通过攻陷 Corona-Warn-App 的数据库连接逻辑加以演示；评估了 sealed JAR、Java Modules 和带重复类检测的 Maven Enforcer 插件。
- **证据（Evidence）：** 针对 Corona-Warn-App 的真实案例研究，外加对三种缓解措施的评估；未给出数字。
- **边界（Boundary）：** 摘要的结论是当前 Java 构建与依赖流程需要改进的保障措施，其中 Maven Enforcer 的重复类检测是最实用的防御，而不是完整的防御。
- **可偷的一招（Stealable move）：** 猎取隐式的*优先级顺序*——任何构建、链接或加载步骤，其中两个同名事物可以共存且其中之一静默胜出——作为无需修改受害者自身代码的攻击面。
- **一句话卖点（Pitch）：** 一种利用 Maven 打包顺序和 JVM 类解析的新型供应链攻击，在一款广泛使用的开源接触者追踪应用上做了展示。

### 19. What Gets Measured Gets Managed: Mitigating Supply Chain Attacks with a Link Integrity Management System (CCS 2025)
- **问题（Problem）：** Web 持续增长，而依赖监控工具与完整性标准滞后，没有稳健、可推广、高性能的方式来验证 Web 资源的完整性。
- **假设（Assumption）：** 声明资源预期与非预期性质的可定制策略，可以在浏览时以可接受的额外开销被验证并强制执行。
- **机制（Mechanism）：** LiMS 是一个透明系统，为资源声明完整性策略、验证这些策略，并对网站访客强制执行，基本策略可组合成综合策略。
- **证据（Evidence）：** 在 450 个在排名与类别上多样的代表性域名样本上模拟的原型部署：初次页面加载有数百毫秒开销，重载时开销可忽略，无论网速如何；存档数据显示策略构建块贴合真实依赖使用模式，管理开销极小。
- **边界（Boundary）：** 摘要未说明
- **可偷的一招（Stealable move）：** 让声明式*策略*成为可扩展单元——每个站点选择加入的少量原始可组合检查——这样覆盖率靠组合增长，而不是靠重新设计验证系统。
- **一句话卖点（Pitch）：** 一个透明的链接完整性管理系统，以极小开销为 Web 浏览筑牢供应链保障。

### 20. Reinforcement Learning for Supply Chain Attacks Against Frequency and Voltage Control (ICML 2023)
- **问题（Problem）：** 电力系统现代化让恶意软件通过发电控制设备的供应链进入运行，绕过网络防御直击物理层。
- **假设（Assumption）：** 强化学习智能体可以发现人类攻击者不会手工设计的、针对频率与电压调节的扰动策略。
- **机制（Mechanism）：** 用强化学习开发智能攻击，将其纳入针对发电控制设备的供应链攻击，模拟影响频率与电压调节的扰动。
- **证据（Evidence）：** 对影响频率与电压调节的扰动进行仿真；未给出数字。
- **边界（Boundary）：** 摘要未说明
- **可偷的一招（Stealable move）：** 在仿真中把学习智能体放在*攻击者*一侧以枚举最坏情形扰动，再把学到的策略复用为防御设计的红队生成器。
- **一句话卖点（Pitch）：** 由 RL 生成的智能攻击通过供应链送达发电控制设备，为电力系统防御提供指引。

### 21. Finding Software Supply Chain Attack Paths with Logical Attack Graphs (arXiv 2025)
- **问题（Problem）：** MulVal 为网络化系统生成逻辑攻击图，但无法表示供应链威胁传播，因此像 XZ 被攻陷或 3CX 双重攻击这样的现代案例无法覆盖。
- **假设（Assumption）：** 供应链资产、依赖、交互和攻陷可以用 MulVal 现有语法中的谓词和规则表达，并与网络分析组合。
- **机制（Mechanism）：** 用新的谓词和交互规则扩展 MulVal，建模供应链资产、依赖、交互、攻陷、附加安全机制、初始状态和已知威胁，并与现有网络威胁分析双向集成。
- **证据（Evidence）：** 演示该扩展的实际应用；动机案例包括 XZ 被攻陷和 3CX 双重供应链攻击；未给出数字。
- **边界（Boundary）：** 摘要未说明
- **可偷的一招（Stealable move）：** 扩展一个既有、可信的分析引擎而不是新建一个，这样新威胁类别继承其求解器，并与该引擎已建模的威胁组合。
- **一句话卖点（Pitch）：** 一个 MulVal 扩展，把供应链威胁传播与现有的基于网络的逻辑攻击图分析集成起来。

### 22. Software supply chain: review of attacks, risk assessment strategies and security controls (arXiv 2023)
- **问题（Problem）：** 研究关注供应链攻击的预防与检测，但对攻击本身缺乏广泛概览，也缺乏全面的风险评估。
- **假设（Assumption）：** 系统性文献综述能产出攻击趋势的连贯图景，外加可映射到真实事件的管控措施。
- **机制（Mechanism）：** 系统性文献综述，分析常见的供应链攻击及其最新趋势，识别开源与第三方供应链的风险，并介绍与实际事件关联的安全管控。
- **证据（Evidence）：** 对现有研究的系统性文献综述；未给出数字。
- **边界（Boundary）：** 摘要未说明
- **可偷的一招（Stealable move）：** 把每项提出的管控锚定到一个具名的真实事件上，这样管控集合可以对现实进行审计，而不是只从一个封闭的分类法推导。
- **一句话卖点（Pitch）：** 一份把供应链攻击、风险评估与安全管控同真实事件联系起来的系统性综述。

### 23. Journey to the Center of Software Supply Chain Attacks (arXiv 2023)
- **问题（Problem）：** 对攻击者实际如何实施开源软件供应链攻击没有一般性的说明。
- **假设（Assumption）：** 这些攻击可以被组织成一个通用分类法，保障措施可由此直接推出。
- **机制（Mechanism）：** 提出关于攻击者如何实施开源供应链攻击的通用分类法、一份缓解它们的保障措施清单，以及带有工业用例的 “Risk Explorer for Software Supply Chains” 工具。
- **证据（Evidence）：** 分类法加一个实践者工具，以工业用例说明；未给出数字。
- **边界（Boundary）：** 摘要未说明
- **可偷的一招（Stealable move）：** 把分类法作为可探索的工具交付而不是一张表——产物才是实践者会采用的东西，其用例则成为相关性的证据。
- **一句话卖点（Pitch）：** 一份开源软件供应链攻击的通用分类法，配保障措施与面向实践者的 Risk Explorer 工具。

### 24. Robot Collapse: Supply Chain Backdoor Attacks Against VLM-based Robotic Manipulation (arXiv 2024)
- **问题（Problem）：** 针对 VLM 驱动的机器人操作的推理时攻击已被充分研究，但通过模型供应链注入机器人策略的后门在很大程度上仍未探索。
- **假设（Assumption）：** 恶意模块可以通过后门关系插入模块化机器人策略，劫持从 LLM 到 VLM 的通路。
- **机制（Mechanism）：** TrojanRobot 向模块化机器人策略注入后门模块；朴素设计使用经后门微调的 VLM，而主打方案 “LVLM-as-a-backdoor” 通过被植入后门的系统提示使用上下文内指令学习，攻击类型包括排列、停滞和有意攻击。
- **证据（Evidence）：** 在 18 个真实世界操作任务和 4 个 VLM 上的物理世界与模拟器实验，验证了 TrojanRobot 的优越性（摘要被截断）。
- **边界（Boundary）：** 摘要未说明
- **可偷的一招（Stealable move）：** 把注入瞄准*模块之间的接缝*——一个模型的输出成为另一个模型指令的接口——而不是任何单个模型内部，因为供应链恰恰就是这层胶。
- **一句话卖点（Pitch）：** 一个面向模型供应链攻击的后门注入框架，攻陷基于 VLM 的机器人操作策略。

### 25. SOK: A Taxonomy of Attack Vectors and Defense Strategies for Agentic Supply Chain Runtime (ICLR 2026)
- **问题（Problem）：** LLM 智能体在运行时检索数据并调用工具，把攻击面从构建期产物移到推理期依赖，而运行时风险研究是碎片化的。
- **假设（Assumption）：** 智能体运行时威胁可以被系统化为一条数据供应链（瞬时上下文注入 vs 持久记忆投毒）和一条工具供应链（发现、实现、调用）。
- **机制（Mechanism）：** 把现有研究统一成一个运行时框架，沿这两条供应链对威胁分类，识别无需代码漏洞的自传播生成式蠕虫的“病毒式智能体循环”（Viral Agent Loop），并主张一种零信任运行时架构（Zero-Trust Runtime Architecture），把上下文视为不可信控制流，工具执行受密码学来源（provenance）约束。
- **证据（Evidence）：** 对现有研究的系统化梳理加一个新概念（Viral Agent Loop）；未给出数字。
- **边界（Boundary）：** 零信任运行时架构是被论证的，而非被评估的。
- **可偷的一招（Stealable move）：** 围绕*什么可以作为控制*而不是数据存放在哪里来重划安全边界：把检索到的上下文视为不可信控制流，并基于来源（provenance）而非语义合理性来把关工具执行。
- **一句话卖点（Pitch）：** 一份智能体供应链攻击的运行时分类法，呼吁转向零信任运行时架构。
