---
name: paper-forge
description: End-to-end workflow for producing an empirical computer-systems paper. Use when planning or reviewing experiments, writing or revising a paper (title, abstract, introduction, contributions, related work, limits), preparing a submission (template, page limit, bibliography, anonymity, authors/COI), making figures, or responding to reviewers. Encodes gates, statistical rules, narrative patterns, and a casebook of silent traps.
---

# Paper Forge

A production line for empirical CS papers: **phases + gates + scripts + casebook**.
It is not a collection of paper summaries. Every rule below came from a failure that
did not raise an error — it produced plausible numbers or plausible prose.

## When to use

- Planning a batch of experiments or reviewing an experiment plan.
- Writing or revising any section of a paper.
- Preparing a submission: format, page budget, bibliography, anonymity, authors/COI.
- Making or revising figures.
- Triaging reviewer comments.

## Six phases

| Phase | Goal | Exit check |
|---|---|---|
| 0. Frame | One-sentence claim; what would falsify it; the running example | Claim is falsifiable and has a counterfactual arm |
| 1. Design | Arms, controls, placebo, paired unit, pre-registered criteria | Every arm has a floor; every criterion is written before the run |
| 2. Run | Batches with explicit OUT, meta.txt, seeds, no interference | Batch is reproducible from its manifest |
| 3. Analyse | Paired statistics, permutation floors, dose-response | Every reported number traces to a file and a script |
| 4. Write | Title → abstract → intro → evidence → limits | Reader in 10 minutes can state the claim and its boundary |
| 5. Submit | Template, pages, bibliography, anonymity, COI | From-zero build reproduces the PDF; mechanical audit clean |

## The one-screen gate (run before **every** command or edit)

1. **Who consumes this parameter?** A config/default may override what you typed.
2. **Where does this write? What was there before?** Never overwrite a batch silently.
3. **Which machine?** Local and server paths look alike; label every command.
4. **Is every precondition already verified?** Do not discover them through failure.
5. **What is the placebo arm and its floor?** No arm, no claim.
6. **Are two things changing together?** If yes, you cannot attribute.
7. **Is this number recomputed from source, or copied from a summary?**
8. **Did you grep the code before asserting what it does?**
9. **Does this "dry run" touch real processes/files?**

Full text and examples: `references/gates.md`.

## Statistical defaults

- Paired unit = the run (or seed), never the request.
- Brackets are `[min,max]` of paired per-run differences **unless** the text says CI.
- For run-to-run noise, report an identical-arm floor; nothing below it is a difference.
- For non-machine-time comparisons (simulation, offline replay), use a permutation test.
- Distinguish pairwise inversion from whole-class separation; report both.
- Report n, seeds, and the aggregation convention (lower median vs interpolated median).

Details: `references/stats.md`, `references/experiment-design.md`.

## Writing spine

- Title: what is studied, under what condition; avoid "robust" unless the
  evaluation shows robustness across the failure modes you name.
- Abstract: five sentences — problem, finding, mechanism, design response, boundary.
  Keep three memorable numbers, not ten.
- Introduction: six paragraphs — assumption, finding with a running example, why
  tuning keys cannot fix it, the different signal, evidence + boundary, contributions.
- Contributions: findings, not modules. One claim per bullet; no number already given.
- Limits: scope in three sentences; move repeated caveats here instead of stacking
  them in every section.

Details: `references/writing.md`; pair with the `anti-defensive-writing` skill.

## Figures

Vector first; caption states the takeaway, not the panel layout; one message per
figure; check at 100% zoom; figure size is part of the page budget, not decoration.
Details: `references/figures.md`; pair with `schematic-figure` and `dataviz`.

## Scripts

```
scripts/check_refs.py     # cite order vs .bbl, labels/refs, placeholders
scripts/page_audit.py     # pages, overfull, references page, figure pages
scripts/stats_paired.py   # paired bootstrap CI, permutation test, floor
scripts/build_from_zero.sh
```

## Casebook

`references/casebook.md` — 40 silent traps (stale .bbl, wrong median convention,
two batches in one sentence, page-limit hacks, defensive-stacking, ...). Read the
trap list once before submission; each entry has a one-line check.

## Stop rules

- Never delete evidence to gain space; cut wording, not facts.
- Never report a number that a script cannot reproduce from a file.
- Never call a difference real if it is inside the identical-arm floor.
- When a reviewer alleges a defect, verify from the artifact (PDF/source) before editing.
