> 中文版 · English: [examples.md](examples.md)

# 来自已发表论文的完整示例（Worked examples）

把这些当作示例来用。它们是公开的、可引用的，并且与任何未发表的稿件无关。

## 1. 不精确尺寸的不对称性（The asymmetry of inexact sizes）

**Wierman & Nuyens, "Scheduling despite inexact job-size information," SIGMETRICS 2008.**
一个基于尺寸、但估计带有噪声的策略，可以被当作 `epsilon`-SMART 策略来分析；可达到的响应时间
随着估计精度的提高而平滑下降，但这种下降并不对称。

用法：对于"误差的方向比其平均幅度更重要"这类论断——用这一脉工作来支撑它，而不是在引言里用
你自己的数字。

模式（Pattern）：`[有名字的估计器性质] -> [哪个方向的误差危险] -> [界或测量]`。

## 2. 尾部与均值（Tail versus mean）

**经典 SRPT 结果（例如 Bansal & Harchol-Balter, SIGMETRICS 2001；Wierman &
Harchol-Balter, SIGMETRICS 2003）。** SRPT 优化平均响应时间，同时使长任务的尾部变差；该策略
的收益与它的不公平性，活在不同的指标里。

用法：用于"至少报告一个尾部指标"，以及用于把聚合论断与类别级论断分开。已发表的文献已经表明，
只做均值评估会掩盖代价。

## 3. 即便预测精确，预测也可能有害（Prediction can hurt even when exact）

**"Beyond Prediction: Tail-Aware Scheduling for LLM Inference," ICML 2026.** 即便长度信息是完美的，
由预测驱动的排序对 P90-P99 的控制也相当有限；该文主张使用可观测信号（observable signals）与软优先级
（soft priorities）。

用法：用于"为什么一个更好的预测器并不是全部答案"那一段。

## 4. 服务中的不精确请求信息（Imprecise request information in serving）

**JITServe, NSDI 2026.** 在请求信息不精确时做 SLO 感知的服务，使用一个上界估计（upper-bound
estimate）与渐进细化（progressive refinement）；它自己的评估指出，这个界在真实数据上并不保守
（conservative）。

用法：用于区分名义分位数（nominal quantile）与经验覆盖率（empirical coverage）论断（见
`stats.md`）。

## 5. 低估比高估更糟（Under-estimation is worse than over-estimation）

**Dell'Amico, "Revisiting Size-Based Scheduling with Estimated Job Sizes," 2014.**
性能取决于负载偏斜（workload skew），而低估对调度的损害远大于高估。

用法：用于论证为什么一个被系统性低估的类别才是危险的情形，而不必引入你自己的负载。

## 如何在草稿中引用示例（How to cite examples in a draft）

- 每个论断一个已发表的示例就够了；不要堆五个。
- 引机制，不引数字，除非数字本身就是那个论断。
- 绝不要把未发表的稿件当作方法论文本里的示例。
