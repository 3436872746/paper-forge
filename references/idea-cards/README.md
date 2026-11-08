# Idea cards — 100 top-conference papers (2023–2026)

Purpose: extract **reusable design moves** from recent systems/ML papers, not to
summarise them. Each card is generated from the paper's abstract only; unstated
fields say so.

## Files

```
_corpus.json     the 100 selected papers (title, venue, year, abstract, doi)
_batchN.json     input slices for distillation
cards_batchN.md  20 cards per batch (5 files, 100 cards)
design-moves.md  deduplicated moves, after reading the cards
```

## Selection

Venues: OSDI, NSDI, SOSP, ASPLOS, EuroSys, MLSys, ATC, ISCA, HPCA, MICRO,
SIGMETRICS, VLDB, SoCC, ICML, ICLR, NeurIPS, ACL, EMNLP. Years 2023–2026.
Queries: LLM serving, request scheduling, output-length prediction,
prediction-guided scheduling, KV-cache scheduling, SLO/tail latency,
disaggregated and multi-tenant serving, speculative decoding.

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
