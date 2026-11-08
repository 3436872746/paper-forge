> 中文版 · English: [SKILL.md](SKILL.md)

---
name: paper-forge
description: End-to-end workflow for producing an empirical computer-systems paper. Use when planning or reviewing experiments, writing or revising a paper (title, abstract, introduction, contributions, related work, limits), preparing a submission (template, page limit, bibliography, anonymity, authors/COI), making figures, or responding to reviewers. Encodes gates, statistical rules, narrative patterns, and a casebook of silent traps.
---

# Paper Forge（论文锻造）

**这一页是干什么的**：它是一份方法论入口。告诉你在做实验、写论文、投稿的每个阶段，该检查什么。

**什么时候看它**：你准备跑一批实验、要写某一节、要投稿、或收到评审意见的时候。

这套东西里的每一条规则，都来自一次**没有报错**的失败。它只是产出了一个看起来合理的数字，或者一句看起来合理的句子。

---

## 一、六个阶段（每个阶段都有"出门条件"）

| 阶段 | 你要做的事 | 不满足就别进下一阶段 |
|---|---|---|
| 0. 定框 | 写一句话主张；写清什么结果会证明你错 | 这句话可被证伪，并且有一个反例实验 |
| 1. 设计 | 定实验组、对照组、空跑组、比较单位、成功标准 | 每组都有"空跑噪声有多大"的估计；标准在跑之前写死 |
| 2. 跑批 | 每批一个输出目录，写批次卡（命令、代码版本、种子、机器） | 别人看这个目录能原样再跑一遍 |
| 3. 分析 | 算配对差；和空跑地板比；看剂量-反应 | 每个数字都能追到文件和脚本 |
| 4. 写作 | 标题 → 摘要 → 引言 → 证据 → 局限 | 读者十分钟内能说出你的主张和它成立的条件 |
| 5. 投稿 | 模板、页数、文献、匿名、作者与利益冲突 | 从零编译能复现 PDF；机械检查全过 |

---

## 二、动手前的九个问题

每次下命令或改文件之前，逐条问一遍。答不上来就先别做。

1. **这个参数最后谁读它？** 配置文件里的默认值可能把你写的覆盖掉。
2. **这条命令会写到哪里？那地方原来有没有东西？** 重跑没换输出目录，会静默覆盖上一批原始数据。
3. **在哪台机器上跑？** 本机和服务器的路径几乎一样，命令里要写清。
4. **每一步的前提都核过了吗？** 不要靠失败去发现前提。
5. **空跑组是哪一组？它的噪声有多大？** 没量过噪声，就没法判断差异。
6. **是不是有两个东西一起变了？** 是的话，你没法说清是谁的功劳。
7. **这个数是回原始文件算的，还是从摘要里抄的？**
8. **说"代码里写了 X"之前，grep 过吗？**
9. **这次"试运行"会不会碰真实的进程或文件？**

展开和例子：`references/gates.zh.md`。

---

## 三、统计的默认做法

- **比较单位**是一次运行（或一个种子），不是一条请求。
- **区间**默认写配对差值的 `[最小, 最大]`；写置信区间要明确标出来。
- **先量地板**：同样配置跑两次，差异有多大。比地板小的，不叫差异。
- **不烧机时**的比较（仿真、离线回放）用**置换检验**（permutation test：把标签打乱很多次，看真实差异是不是比随机还大）。
- 区分"两两反转"和"整类分离"，两个都报。
- 报 n（样本数）、种子数，以及聚合方式（下中位数还是插值中位数）。

细节：`references/stats.zh.md`、`references/experiment-design.zh.md`。

---

## 四、写作要点

- **标题**：写清研究什么、在什么条件下。别用没测过的形容词。
- **摘要五句**：问题、发现、机制、设计上的回应、边界。
- **引言六段**：假设、用例子讲发现、为什么调参救不了、你用的不同信号、证据与边界、贡献。
- **贡献**：写"发现了什么"，不写"做了哪个模块"。
- **局限**：集中写在一节，不要每节都道歉一遍。

细节：`references/writing.zh.md`（有 Sarathi-Serve 的完整例子）。语气配合 `anti-defensive-writing`。

---

## 五、图

矢量优先；图注写结论不写面板；一张图一个结论；100% 缩放下检查；图的大小算进页数。
细节：`references/figures.zh.md`；配合 `schematic-figure`、`dataviz`。

---

## 六、四个脚本

```
scripts/check_refs.py     # 引用顺序、未定义引用、占位符
scripts/page_audit.py     # 页数、超框、参考文献页、图在哪页
scripts/stats_paired.py   # 配对差、区间、置换检验、地板
scripts/build_from_zero.sh
```

---

## 七、案例库与范例

`references/casebook.zh.md`：40 个"不报错但会害你"的坑。投稿前读一遍，每条配一行检查。
`references/examples.zh.md`：从已发表论文里拆出来的写法范例。只当例子用，别拿未发表的稿子当范例。

---

## 八、点子卡片（250 篇，2023–2026）

- `references/idea-cards/design-moves.zh.md`：40 条可借的设计招式，按阶段分组。
- `references/idea-cards/cards_batch1..5.zh.md`：100 张卡片（问题、假设、机制、证据、边界、可偷的一招、一句话卖点）。
- 三个方向包，各 50 篇：`domains/llm_sched/`、`domains/video_sat/`、`domains/security/`。

卡片只从摘要生成；摘要没写的，卡片里写"摘要未说明"。**引用某条机制前，回原文读。**

---

## 九、对照"顶会基线"提建议和自审

每个方向包都有一份 `venue-bar.zh.md`：这 50 篇实际做了什么、证据和规模怎么配的、15 条检查项、审稿人最会问的 10 个问题、一张空白自审表。

用户问"这样够不够"、"还该补什么"、"帮我审一下计划"时：

1. 判断方向，打开对应的 `venue-bar.zh.md`。
2. 用他的草稿把自审表填起来：我的现状 / 差距 / 动作。
3. 每条差距都要写清检查项编号和背后的卡片号。
4. 每条差距都去 `design-moves.zh.md` 找补法。
5. 不宣称语料里没有的"惯例"。计数一律写"N/50 篇摘要里"。
6. 最后给出最可能致命的三个审稿问题。

---

## 十、文献综述与完整性审计

- `references/literature-review.zh.md`：检索词怎么拆、怎么筛、怎么记、引用怎么核。
- `references/integrity-audit.zh.md`：四层检查、claim 账本、每轮评审怎么开、修改白名单。

---

## 十一、停止规则（四条红线）

- 不为了省版面删证据；删措辞，不删事实。
- 不报一个脚本复算不出来的数字。
- 差异在地板以内的，不说它"真实存在"。
- 评审指出缺陷时，先从产物（PDF/源码）核实，再动笔改。
