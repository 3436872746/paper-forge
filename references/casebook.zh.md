> 中文版 · English: [casebook.md](casebook.md)

# 案例集（Casebook）——沉默的陷阱（silent traps）

每条：症状（symptom）-> 根因（root cause）-> 检查（check）。全部来自真实论文；细节已泛化，
没有任何一条指向未发表的稿件。已发表的完整示例见 `examples.md`。投稿前先把这份清单读一遍。

## 数据与批次（Data and batches）

1. **完美数字（Perfect numbers）**。延迟接近零、失败恰好为零、满载系统上 SLO 100%。
   根因：引擎已经死了，而代理（proxy）在报告成功。
   检查：通过同一条路径发一个哨兵请求（sentinel request）；看延迟分布。
2. **批次被覆盖（Overwritten batch）**。没有新 OUT 的重跑静默替换了一个批次。
   检查：`OUT` 必须不存在，或者必须声明为重跑复用。
3. **模型标签写错（Wrong model label）**。输出目录写的是 14B；引擎其实是 7B。
   检查：`EXPECT_MODEL` 守卫 + `meta.txt` 记录实际查询的模型。
4. **预热被计入（Warm-up counted）**。最前面几轮包含校准漂移（calibration drift）。
   检查：预先登记（pre-register）分析哪几轮；地板（floor）在同一批轮次上计算。
5. **一句话里两个批次（Two batches in one sentence）**。来自不同批次的数字被当作配对（paired）
   来比较。检查：每个句子只点明一个批次，或者写明"separate"（分开的）。
6. **把有放回采样当作单位（Sampling with replacement as the unit）**。重复四次的请求并不独立。
   检查：配对单位是种子/轮次（seed/round）。
7. **杀错了 PID（Killed the wrong PID）**。宽模式匹配命中了别的用户的进程。
   检查：pidfile + 精确 PID + 复查；绝不用 `pkill -f`。
8. **setsid 报的"完成"（"Done" from setsid）**。shell 任务结束了；批次没有。
   检查：进程检查加记录计数。

## 测量（Measurement）

9. **预算 vs 实际（Budget vs realization）**。`max_tokens` 是客户端上限，不是生成长度。
   检查：使用实际长度（realized-length）字段；在正文中说明这一点。
10. **中位数约定（Median convention）**。取下中位数还是插值中位数，会让一个比值偏移几个百分点。
    检查：写明约定；两种都算一遍。
11. **分位数预测器的覆盖率（Coverage of a quantile predictor）**。95% 分位数不是硬上界；
    报告经验覆盖率（empirical coverage），而不是名义水平（nominal level）。
12. **聚合掩盖类别（Aggregate hides class）**。短请求的中位数可能接近最优（near-oracle），
    而某一类别差了 50 倍。检查：报告一个类别级或尾部指标。
13. **地板取自错误的臂（Floor from the wrong arm）**。地板必须来自完全相同的实验臂（arm），
    而不是来自一个会带来真实后果的安慰剂（placebo）策略。
14. **CI 与 min-max 混用（CI vs min-max）**。一篇论文里混用 `[min,max]` 和 95% CI。
    检查：只定义一次，并标注例外。
15. **需要置换检验（Permutation needed）**。离线重放（offline replay）比较时没有零分布
    （null distribution）。检查：打乱标签（shuffle labels），报告零带（null band）。
16. **G 最大值依赖流顺序（G max depends on the stream order）**。窗口统计量在一个任意顺序上
    计算。检查：报告多个顺序上的最大值，或固定顺序。
17. **配对数少于声称数（Fewer than the stated pairs）**。`C(7,2)=21`，但只测了其中一部分；
    正文说"显著反转"却不给分母。检查：数一遍。

## 论断与行文（Claims and prose）

18. **平均误差与它的分布（Average error vs its distribution）**。"估计器错了"不等于"顺序错了"。
    检查：给出排序上的后果。
19. **方向写反（Direction reversed）**。写成"让长任务类别被服务得晚"，而注入实际让它排到最前。
    检查：抽一个请求，沿关键路径（key）走一遍。
20. **没有稳健性扫描就说"稳健"（"Robust" without a robustness sweep）**。检查：每个形容词都
    被检验过。
21. **没有对照臂的对照（A control without its comparator）**。一个没有基线臂（baseline arm）的
    负载被引来当作机制的证据。检查：论断要点明比较对象。
22. **有条件的机制当作普适结论卖（Conditional mechanism sold as universal）**。检查：摘要和
    标题都带上该条件。
23. **防御性堆叠（Defensive stacking）**。同一个局限在四个小节里解释。检查：Limits 里一句话，
    摘要里一个从句。
24. **为省空间删范围（Deleting scope to save space）**。检查：砍措辞；台账（ledger）保护证据。
25. **引用失实（Citation mischaracterised）**。凭记忆描述先前系统的机制。检查：读那一节的原文
    并引用它。
26. **双盲下用第一人称自引（Self-citation in first person）**。检查：第三人称。

## 版式与投稿（Layout and submission）

27. **手工调间距以塞进页数（Manual spacing to fit pages）**。十几行 `\setlength` 把浮动体压缩。
    检查：去掉不必要的东西；如果确有必要，就在源码里说明。
28. **在 Table I 之前引用表（Table referenced before Table I）**。检查：首次引用按递增顺序。
29. **过期的参考文献（Stale bibliography）**。改了引用却没有重跑 bibtex。
    检查：首次使用顺序 == `.bbl` 顺序。
30. **从旧目录打包（Package built from an old directory）**。检查：在空文件夹里做从零构建。
31. **拿错了 zip（The wrong zip）**。一个同命名模式的长版本被当作投稿上传了。
    检查：看模板 + 页数，不要看文件名。
32. **匿名元数据泄漏（Anonymous metadata leak）**。PDF 标题/作者、致谢、本地路径。
    检查：元数据 + `strings`。
33. **摘要字数限制（Abstract word limit）**。投稿表单里的摘要不是论文的摘要。
    检查：数字单里那段文本。
34. **缺作者/COI（Missing authors/COI）**。desk reject（直接拒稿）。检查：摘要截止前把名单列全；
    作者之后不能改。
35. **漏掉 AI 披露（AI disclosure omitted）**。检查当前 CFP，并明确做出决定。

## 工具与环境（Tools and environment）

36. **经包装器传 heredoc 会吃掉反斜杠（Heredoc through a wrapper eats backslashes）**。用编辑器
    写 `.tex`/脚本，不要用穿过另一层 shell 的 shell heredoc。
37. **Windows 上的 Python 看不到 Unix 环境变量（Windows Python does not see Unix env vars）**。
    用参数传递；运行前打印选中的批次。
38. **import 会执行修复脚本（Import executes a fixer）**。一个没有 `__main__` 的模块，在被 import
    以取其批次表时写进了论文里。检查：用 `ast` 解析，绝不 import。
39. **两份图（Two copies of a figure）**。LaTeX 用的是工作目录里的那一份，不是 `figs/` 里的。
    检查：两份都更新，或设置 `\graphicspath`。
40. **编码（Encoding）**。控制台编解码器（GBK）会在脚本中途打断中文/Unicode 输出。
    检查：设置 `PYTHONIOENCODING=utf-8`。
