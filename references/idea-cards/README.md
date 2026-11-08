# Idea cards — 250 papers (2023–2026)

Purpose: extract **reusable design moves** from recent papers, not to summarise
them. Each card is generated from the paper's abstract only; unstated fields say
so.

## Files

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

## Selection

**General corpus (100).** Venues: OSDI, NSDI, SOSP, ASPLOS, EuroSys, MLSys, ATC,
ISCA, HPCA, MICRO, SIGMETRICS, VLDB, SoCC, ICML, ICLR, NeurIPS, ACL, EMNLP.
Queries: LLM serving, request scheduling, output-length prediction,
prediction-guided scheduling, KV-cache scheduling, SLO/tail latency,
disaggregated and multi-tenant serving, speculative decoding.

**Domain packs (50 each).** Built from the arXiv API with topic-specific queries,
year 2023–2026, relevance-ranked, filtered by title terms and abstract length,
deduplicated against the general corpus. Venue is taken from `journal_ref` /
`comment` when the authors recorded it, otherwise the card says `arXiv` —
that is the honest label, and it does not affect the design move.

| Pack | Query themes |
|---|---|
| `llm_sched` | LLM serving + scheduling, KV cache, SLO, prefill/decode disaggregation, batching, speculative decoding |
| `video_sat` | ABR streaming, low-latency transmission, video over satellite, LEO networks, multipath, QoE, live video |
| `security` | prompt injection, jailbreak, side channels, fuzzing, supply chain, membership inference / model extraction, adversarial ML |

## Card schema

- Problem / Assumption / Mechanism / Evidence / Boundary / Stealable move / Pitch.

The **Stealable move** is the only field meant to be reused directly; the rest is
context needed to judge whether the move transfers.

## How to use

- When designing an experiment, scan `design-moves.md` by phase (design, analysis,
  writing, figures).
- When writing related work, use the cards to place a paper on the right axis,
  then read the paper itself before citing a mechanism.
- Do not cite an abstract-level claim you have not verified in the paper.
