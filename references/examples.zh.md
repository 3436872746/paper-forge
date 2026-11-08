> 中文版 · English: [examples.md](examples.md)

# 来自已发表论文的完整示例（worked examples）

**这一页是干什么的**：这里给出五个可以直接引用的已发表例子，用来撑起方法性论断。你不需要自己造例子，也不需要拿未发表的稿子当例子。

**什么时候看它**：

- 你想在引言里说"误差的方向比误差的大小更重要"的时候。
- 你要解释为什么必须报告一个尾部指标的时候。
- 你要论证"更好的预测器不等于更好的调度"的时候。
- 你要区分名义分位数和经验覆盖率的时候。
- 你要说明哪一类请求才是危险情形的时候。

## 1. 不精确尺寸的不对称性（The asymmetry of inexact sizes）

这一节做什么：给你一个例子，说明误差的方向比它的平均幅度更重要。

**例子**：**Wierman & Nuyens, "Scheduling despite inexact job-size information," SIGMETRICS 2008.** 一个基于尺寸、但估计带噪声的策略，可以当作 `epsilon`-SMART 策略来分析。可达到的响应时间随估计精度提高而平滑下降，但这种下降并不对称。写法是：在引言里说"误差的方向比平均幅度更重要"时，引这一脉工作，不要用你自己的数字。

**为什么**：这条线已经证明了方向本身就是机制的一部分，你只需指过去。

**句式**：`[有名字的估计器性质] -> [哪个方向的误差危险] -> [界或测量]`。

## 2. 尾部与均值（Tail versus mean）

这一节做什么：给你一个例子，说明均值和尾部必须分开报告。

**例子**：**经典 SRPT 结果（例如 Bansal & Harchol-Balter, SIGMETRICS 2001；Wierman & Harchol-Balter, SIGMETRICS 2003）。** SRPT 优化平均响应时间，同时让长任务的尾部变差。这个策略的收益和它的不公平性，活在不同的指标里。写法是：用它支撑"至少报告一个尾部指标"，也用它把聚合论断和类别级论断分开。

**为什么**：已发表的文献已经表明，只做均值评估会掩盖代价。

## 3. 即便预测精确，预测也可能有害（Prediction can hurt even when exact）

这一节做什么：给你一个例子，说明更好的预测器不是全部答案。

**例子**：**"Beyond Prediction: Tail-Aware Scheduling for LLM Inference," ICML 2026.** 即便长度信息是完美的，由预测驱动的排序对 P90-P99 的控制也相当有限。该文主张使用可观测信号（observable signals）与软优先级（soft priorities）。写法是：放进"为什么一个更好的预测器并不是全部答案"那一段。

**为什么**：它把"预测器再好也不够"从你的猜测，变成别人已经量过的事实。

## 4. 服务中的不精确请求信息（Imprecise request information in serving）

这一节做什么：给你一个例子，说明名义分位数不等于经验覆盖率。

**例子**：**JITServe, NSDI 2026.** 在请求信息不精确时做 SLO 感知的服务，使用一个上界估计（upper-bound estimate）与渐进细化（progressive refinement）。它自己的评估指出，这个界在真实数据上并不保守（conservative）。写法是：用它区分名义分位数（nominal quantile）与经验覆盖率（empirical coverage）论断（见 `stats.md`）。

**为什么**：名义 95% 和实际覆盖率是两件事，这个案例把区别摆在明面上。

## 5. 低估比高估更糟（Under-estimation is worse than over-estimation）

这一节做什么：给你一个例子，说明哪一类请求才是危险情形。

**例子**：**Dell'Amico, "Revisiting Size-Based Scheduling with Estimated Job Sizes," 2014.** 性能取决于负载偏斜（workload skew），而低估对调度的损害远大于高估。写法是：用它论证为什么一个被系统性低估的类别才是危险的情形，不必先引入你自己的负载。

**为什么**：危险情形的判据来自文献，你就不用拿自己的数据去证明它。

## 6. 在草稿里怎么引这些例子（How to cite examples in a draft）

这一节做什么：三条引用规矩，防止把例子用成装饰。

**例子**：一句话里放一个例子就够。比如"SRPT 改善均值，同时恶化长任务尾部 [Bansal & Harchol-Balter 2001]"，到此为止，不要再堆四篇。

**为什么**：堆五个会让读者以为你一篇都没读过。

- 每个论断一个已发表的示例就够了；不要堆五个。
- 引机制，不引数字，除非数字本身就是那个论断。
- 绝不要把未发表的稿件当作方法论文本里的示例。

## 一页速查

- 一个论断配一个已发表例子。
- 引机制，不引数字。
- 误差方向比平均幅度更重要，引 2008。
- 均值好了尾部可能更差，引 SRPT。
- 预测再准也不够，引 ICML 2026。
- 名义分位数不是硬上界，引 JITServe。
- 被低估的类别最危险，引 2014。
- 未发表的稿子，一律不许当例子。
