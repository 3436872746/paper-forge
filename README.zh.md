# paper-forge：你会在什么时候用到它

它不是教程，也不会教你怎么做科研。
它是一个**随叫随到的检查器 + 参考库**：你带着手上正在做的东西来，它给你具体的检查、对照和修改意见。

---

## 一、什么情况下会用到它

| 你的处境 | 它会给你什么 | 你会拿到的产出 |
|---|---|---|
| 「我要做这个方向，但不知道顶会已经做到哪了」 | 这个方向的顶会基线：50 篇实际用了什么证据、什么规模、什么指标、什么没做 | 一页对照表（`venue-bar.md`），带「N/50 篇是这样」的计数 |
| 「我有个实验计划，不知道够不够」 | 按 `venue-bar.md` 的 12–15 条逐条对照你的计划 | 一张填好的自审表：顶会惯例 / 我的现状 / 差距 / 补法 |
| 「结果出来了，这点差异算不算差异」 | 统计口径 + `stats_paired.py` | 配对差值、区间、和你自己空跑出来的地板比较 |
| 「这句话我写得心里没底」 | claim–证据对齐检查，四态判定（对齐 / 说过头 / 无证据 / 证据不足） | 每条 claim 一行：状态 + 原因 + 该补哪个实验 |
| 「评审意见回来了，不知道先做哪个」 | 三分类（能立刻答 / 要补实验 / 只能承认边界）+ 稳定编号 | 处理顺序表；下一轮能证明每条都处理过 |
| 「投稿前最后一遍」 | 三个脚本 + 一份清单 | 引用/页数/从零编译的检查报告 |
| 「想找可借的招 / 找相关工作」 | 250 篇论文卡片 + 每个方向的招式库 | 10 条可迁移做法，每条指回原卡片和论文 |
| 「论文里的数字对不对得上」 | 四层审计链 | 数字 → 原始文件 → 脚本 的追溯表 |
| 「图画不清楚，或者要矢量图」 | 图规格 + 配套技能 | 一图一结论的检查清单；矢量重画 |
| 「这段写得太虚/太防御」 | `anti-defensive-writing` | 删掉语气，但保留适用范围 |

---

## 二、怎么叫它

在 Claude Code 里直接说话就行，不需要记命令：

- 「按 `llm_sched` 的 venue-bar 审一下我的实验计划」
- 「这两个 CSV 是同一批实验的两组，帮我算配对差异和地板」
- 「帮我把这段摘要里的 claim 逐条标状态」
- 「这三条评审意见帮我分一下类，先做哪个」
- 「投稿前跑一遍检查」
- 「我想找 KV cache 方向可借的设计招」

不在 Claude Code 里也能用：所有内容都是 Markdown，脚本只用 Python 标准库，直接打开对应文件或跑脚本即可。

---

## 三、你会拿到什么

不是「建议你多想想」这种话，而是能直接用的东西：

- **填好的自审表**：你的方案 vs 这个方向的顶会基线，差距逐条列。
- **claim 账本**：每条结论 → 证据文件 → 实验编号 → 状态。
- **triage 矩阵**：文献逐篇的问题 / 假设 / 证据 / 边界 / 你和它的差别。
- **检查报告**：引用顺序、页数、超框、从零编译是否通过。
- **差距清单**：哪一条缺了会被审稿人怎么问，以及补法在哪个文件。

---

## 四、东西都在哪

```
SKILL.md                       入口：六个阶段 + 每次动手前的九个问题
references/
  venue-bar 类：                ★ 你要的「这个方向顶会做了什么」
    idea-cards/venue-bar.md                     通用系统/ML 100 篇
    idea-cards/domains/llm_sched/venue-bar.md   LLM 推理调度
    idea-cards/domains/video_sat/venue-bar.md   视频/卫星传输
    idea-cards/domains/security/venue-bar.md    网络安全
  integrity-audit.md            四层审计链、claim 账本、评审轮次
  literature-review.md          检索、筛选、triage 表、引用核验
  gates.md                      9 道闸门 + 14 条铁律 + 7 种病型
  experiment-design.md          实验设计：臂、对照、预注册、批次卡
  stats.md                      配对、区间、地板、置换检验
  writing.md                    标题、摘要、引言、贡献、局限
  figures.md                    图：矢量、图注、一图一结论
  submission.md                 投稿：模板、页数、匿名、作者与 COI
  review-response.md            回评审：三分类、处理顺序、回复信
  reproducibility.md            可复现：产物、构建、长任务
  casebook.md                   40 个「不报错但会害你」的坑
  examples.md                   三篇已发表论文的完整拆解
  external-skills.md            10 个开源科研技能：拿走了什么、没拿什么
  idea-cards/
    INDEX.md                    250 篇清单（标题/会议/年份/DOI）
    design-moves.md             100 篇 → 40 条可借的招
    cards_batch1..5.md          100 张卡
    domains/<方向>/             50 篇 + 50 卡 + 18 条招 + venue-bar
scripts/
  check_refs.py                 引用顺序 / 未定义引用 / 占位符
  page_audit.py                 页数 / 超框 / 参考文献页
  stats_paired.py               配对差 + 区间 + 置换检验
  build_from_zero.sh            从零编译投稿包并审计
templates/
  ieee6p.tex                    IEEE 会议六页起步模板
  abstract_intro.md             摘要五句 / 引言六段骨架
```

---

## 五、这些内容从哪来

- **4 个已有技能**：`anti-defensive-writing`（删防御性措辞）、`schematic-figure` / `dataviz`（图）、`pdf-figure-vector`（矢量重画）。
- **10 个开源科研技能仓库**（55.8k → 453 star）：每条取用与拒绝都记在 `references/external-skills.md`。
- **250 篇论文**：100 篇通用系统/ML + 50 LLM 调度 + 50 视频/卫星 + 50 网安；清单在 `references/idea-cards/INDEX.md`。卡片只从摘要生成，摘要没写的就写 `not stated in abstract`。

---

## 六、它不做什么

- 不替你跑实验，也不替你判断数据意味着什么。
- 不给你「这个方向一定行」的判断；它只给这个语料里 N/50 篇是怎么做的。
- 卡片来自摘要，不是精读；引用某条机制前要回原文。
- 统计建议面向重复次数不多的系统实验，不适用于大规模线上 A/B。
