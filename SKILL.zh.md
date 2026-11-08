> 中文版 · English: [SKILL.md](SKILL.md)

---
name: paper-forge
description: End-to-end workflow for producing an empirical computer-systems paper. Use when planning or reviewing experiments, writing or revising a paper (title, abstract, introduction, contributions, related work, limits), preparing a submission (template, page limit, bibliography, anonymity, authors/COI), making figures, or responding to reviewers. Encodes gates, statistical rules, narrative patterns, and a casebook of silent traps.
---

# Paper Forge（论文锻造）

一套给实证类计算机论文用的生产线：**阶段 + 闸门 + 脚本 + 案例库**。
它不是论文摘要合集。下面每一条规则都来自一次**没有报错**的失败——它只是产出了一个看起来合理的数字，或者一句看起来合理的句子。

## 什么时候用

- 规划一批实验，或者审一份实验计划。
- 写或改论文的任何一节。
- 准备投稿：格式、页数预算、参考文献、匿名、作者与利益冲突。
- 做图或改图。
- 处理评审意见。

这个技能"在什么场景下用、用了拿到什么"：见 `README.zh.md`（中文）/ `README.md`。
本文件是压缩版的方法论。

## 六个阶段

| 阶段 | 目标 | 出门检查 |
|---|---|---|
| 0. 定框 | 一句话主张；什么会证伪它；贯穿全文的例子 | 主张可证伪，并且有反例臂 |
| 1. 设计 | 实验臂、对照、安慰剂、配对单元、预注册判据 | 每条臂都有地板；每条判据在跑之前就写死 |
| 2. 跑批 | 显式 `OUT`、`meta.txt`、种子、互不干扰 | 批次能从 manifest 原样复现 |
| 3. 分析 | 配对统计、置换地板、剂量-反应 | 每个写进论文的数字都能追到文件和脚本 |
| 4. 写作 | 标题 → 摘要 → 引言 → 证据 → 局限 | 读者十分钟内能说出主张和它的边界 |
| 5. 投稿 | 模板、页数、文献、匿名、利益冲突 | 从零编译能复现 PDF；机械审计全绿 |

## 一屏闸门（**每次**下命令或改文件之前过一遍）

1. **这个参数最终谁读它？** 配置文件或默认值可能覆盖你写的值。
2. **这条命令会写到哪里？那地方原来有没有东西？** 永远不要静默覆盖上一批数据。
3. **在哪台机器上跑？** 本机和服务器的路径长得很像；每条命令都标清机器。
4. **每一环的前提都核过了吗？** 不要靠失败去发现前提。
5. **安慰剂臂是哪一条？它的地板量了吗？** 没有臂就没有主张。
6. **是不是有两个东西一起变了？** 是的话，你没法归因。
7. **这个数是回源头算的，还是从摘要里抄的？**
8. **断言"代码里写了 X"之前，grep 过吗？**
9. **这次"干跑"会不会碰真实的进程和文件？**

全文与例子：`references/gates.zh.md`。

## 统计默认值

- 配对单元 = 一次运行（或一个种子），绝不是一条请求。
- 方括号默认写配对逐次差值的 `[最小,最大]`，**除非**文中写明是置信区间。
- 运行间噪声要报**同配置空跑的地板**；低于地板的不叫差异。
- 不烧机时的比较（仿真、离线回放）用**置换检验**。
- 区分"两两反转"与"整类分离"，两个都要报。
- 报 n、种子数，以及聚合口径（下中位数还是插值中位数）。

细节：`references/stats.zh.md`、`references/experiment-design.zh.md`。

## 写作脊柱

- 标题：研究什么、在什么条件下；除非评估真的覆盖了你点名的那些失效模式，否则别用"robust"。
- 摘要：五句话——问题、发现、机制、设计上的回应、边界。留三个记得住的数字，不是十个。
- 引言：六段——假设、用一个例子讲发现、为什么调参救不了、你用的不同信号、证据与边界、贡献。
- 贡献：写"发现了什么"，不写"做了哪个模块"。一条一句；不要重复正文已给的数字。
- 局限：三句话讲清范围；重复的限定集中放到这里，不要每节都叠一遍。

细节：`references/writing.zh.md`；配合 `anti-defensive-writing` 技能。

## 图

矢量优先；图注写结论，不写"左图是 X、右图是 Y"；一张图只讲一件事；在 100% 缩放下检查；图的大小是页数预算的一部分，不是装饰。
细节：`references/figures.zh.md`；配合 `schematic-figure` 与 `dataviz`。

## 脚本

```
scripts/check_refs.py     # 引用顺序 vs .bbl、未定义引用、占位符
scripts/page_audit.py     # 页数、超框、参考文献页、图所在页
scripts/stats_paired.py   # 配对自助区间、置换检验、地板
scripts/build_from_zero.sh
```

## 案例库与范例

`references/casebook.zh.md` —— 40 个沉默陷阱（过期的 .bbl、中位数口径写错、一句话里混了两批数据、压页数的小手段、防御性叠句……）。投稿前把这张陷阱表读一遍；每条都配一行检查。

`references/examples.zh.md` —— 从**已发表**论文里拆出来的范例（Wierman & Nuyens 2008；SRPT 公平性；Beyond Prediction, ICML 2026；JITServe, NSDI 2026；Dell'Amico 2014）。只当例子用；永远不要把未发表的稿子当范例。

## 点子卡片（250 篇，2023–2026）

`references/idea-cards/design-moves.zh.md` —— **40 条可复用的设计招式**，按阶段分组（定框、实验设计、测量、机制、写作与落地、边界），从 100 篇顶会摘要里蒸馏。

`references/idea-cards/cards_batch1..5.zh.md` —— 100 张源卡片（问题、假设、机制、证据、边界、可偷的一招、一句话卖点）。用卡片把一篇论文放到正确的轴上；引用某条机制前回原文读。

**方向包** —— 另外三组各 50 篇，卡片字段相同，每组都有自己的 `design-moves.zh.md`：

```
references/idea-cards/domains/llm_sched/   LLM 推理调度
references/idea-cards/domains/video_sat/   视频流 + 卫星/低轨传输
references/idea-cards/domains/security/    提示注入、越狱、侧信道、fuzz、供应链、对抗 ML
```

方向包从 arXiv 摘要构建；除非作者在摘要里写了会议，卡片就写 `arXiv`。先扫这个包的 `design-moves.zh.md`，再看卡片。

每个包还有一份 **`venue-bar.zh.md`（顶会基线）**：这 50 篇实际在研究什么、证据与规模基线（带计数）、12–15 条检查项、审稿人最会问的 10 个问题、一张空白自审表，以及不要照抄的做法。

## 对照顶会基线提建议与自审

当用户问"这样够不够"、"还该补什么"、"帮我审一下计划"时，不要凭口味回答：

1. 先判断方向，打开对应包的 `venue-bar.zh.md`。
2. 用用户的草稿把自审表填起来：我的现状 / 差距 / 动作。
3. 每条差距都要引用检查项编号和它背后的卡片号。
4. 每条差距都去 `design-moves.zh.md` 找能补上的那一招。
5. 绝不宣称语料里没有的"顶会惯例"。计数一律写"N/50 篇摘要里"，不写"大家都这样"。
6. 最后给出对这份草稿最可能致命的三个审稿问题。

## 文献综述与完整性审计

- `references/literature-review.zh.md` —— 三列检索词、两轮筛选、triage 矩阵、引用四点核验、停止规则。
- `references/integrity-audit.zh.md` —— 四层审计链与各自负责人、带状态枚举的 claim 账本、每次运行前的声明、每轮换新上下文的评审、稳定问题编号、修改白名单、会话复盘。

## 停止规则

- 永远不要为了省版面删证据；删措辞，不删事实。
- 永远不要报一个脚本无法从文件复算出来的数字。
- 差异落在同配置空跑地板以内的，永远不要说它"真实存在"。
- 评审指出缺陷时，先从产物（PDF/源码）核实，再动笔改。
