> 中文版 · English: [README.md](README.md)

# 想法卡片 — 250 篇论文（2023–2026）

目的：从近期论文中提炼**可复用的设计动作（design moves）**，而不是对它们做摘要。每张卡片只根据论文摘要生成；未陈述的字段会明确说明。

## 文件

```
_corpus.json       the 100-paper general corpus (title, venue, year, abstract, doi)
_batchN.json       input slices for distillation
cards_batchN.md    20 cards per batch (5 files, 100 cards)
design-moves.md    deduplicated moves, after reading the cards
venue-bar.md       what these 100 papers actually study, evidence/scale counts,
                   a 12-15 item checklist, reviewer questions, self-audit table

domains/
  llm_sched/       50 papers: LLM inference scheduling
  video_sat/       50 papers: video streaming and satellite/LEO transmission
  security/        50 papers: prompt injection, jailbreak, side channels, fuzzing,
                   supply chain, adversarial ML
    _corpus.json   that domain's 50 papers
    _batch1,2.json 25-paper input slices
    cards_batch1,2.md  25 cards per batch
    design-moves.md    deduplicated moves for the domain
    venue-bar.md       what the 50 papers actually study, evidence/scale counts,
                       a 12-15 item checklist, reviewer questions, self-audit table
```

## 选取

**通用语料（100 篇）。** 会议/期刊：OSDI、NSDI、SOSP、ASPLOS、EuroSys、MLSys、ATC、ISCA、HPCA、MICRO、SIGMETRICS、VLDB、SoCC、ICML、ICLR、NeurIPS、ACL、EMNLP。查询：LLM serving、请求调度、输出长度预测、预测引导的调度、KV-cache 调度、SLO/尾延迟、分离式（disaggregated）与多租户服务、投机解码（speculative decoding）。

**领域包（各 50 篇）。** 通过 arXiv API 用主题特定的查询构建，年份 2023–2026，按相关性排序，按标题词与摘要长度过滤，并与通用语料去重。当作者记录过时，会议/期刊取自 `journal_ref` / `comment`；否则卡片写 `arXiv`——那才是诚实的标签，且不影响设计动作。

| 包 | 查询主题 |
|---|---|
| `llm_sched` | LLM serving + 调度、KV cache、SLO、prefill/decode 分离、批处理、投机解码 |
| `video_sat` | ABR 流媒体、低延迟传输、卫星视频、LEO 网络、多路径、QoE、直播视频 |
| `security` | 提示注入、越狱（jailbreak）、侧信道、模糊测试（fuzzing）、供应链、成员推断 / 模型抽取、对抗性机器学习 |

## 卡片结构

- 问题 / 假设 / 机制 / 证据 / 边界 / 可窃取的动作（Stealable move）/ 一句话推介（Pitch）。

**可窃取的动作**是唯一意在直接复用的字段；其余是判断该动作能否迁移所需的上下文。

## 如何使用

- 设计实验时，按阶段（设计、分析、写作、图）扫 `design-moves.md`。
- 写相关工作时，用卡片把一篇论文放到正确的坐标轴上，然后在引用某个机制之前读论文本身。
- 不要引用你未在论文中核实过的摘要级主张。
