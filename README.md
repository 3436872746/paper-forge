# paper-forge

A reusable workflow for empirical computer-systems papers: gates, statistical
rules, narrative patterns, submission checks, and a casebook of silent traps.

中文详细说明（给零基础同学）：**[README.zh.md](README.zh.md)**

## What it does

Use it when you are:

- framing a claim and want it falsifiable;
- designing an experiment batch (arms, placebo, floor, paired unit, pre-registered criteria);
- running batches (explicit `OUT`, manifest, seeds, no interference);
- analysing results (paired statistics, permutation floor, dose–response);
- writing or revising any section (title, abstract, intro, contributions, limits, related work);
- making or revising figures;
- preparing a submission (template, pages, bibliography, anonymity, authors/COI);
- triaging reviewer comments.

It is **not** a paper-summary collection. Every rule exists because a failure
produced a plausible number or a plausible sentence without raising an error.

## Install

Copy this directory into your skills folder:

- Claude Code (user-level): `~/.claude/skills/paper-forge/`
- Project-level: `<repo>/.claude/skills/paper-forge/`

Then invoke it by describing the task ("review this paper's abstract", "plan a
batch with a placebo arm", "prepare the submission") or explicitly.
Without Claude Code, everything is plain Markdown plus standard-library Python.

## Contents

```
SKILL.md                     the six phases and the one-screen gate
README.zh.md                 detailed Chinese guide: what it does, where things are
references/gates.md          9 gates, 14 rules, 7 disease types
references/experiment-design.md
references/stats.md
references/writing.md
references/figures.md
references/submission.md
references/review-response.md
references/reproducibility.md
references/casebook.md       40 traps with one-line checks
references/examples.md       worked examples from published papers
references/idea-cards/       250 papers -> design moves (2023-2026)
                              100 general systems/ML + 3 domain packs x 50
                              (LLM inference scheduling, video/satellite
                               transmission, security)
scripts/check_refs.py        cite order vs .bbl, labels/refs, placeholders
scripts/page_audit.py        pages, overfull, references page, figure pages
scripts/stats_paired.py      paired differences + interval + permutation test
scripts/build_from_zero.sh   build a submission package from zero and audit it
templates/ieee6p.tex         IEEE conference 6-page starter, clean preamble
templates/abstract_intro.md  five-sentence abstract / six-paragraph intro skeleton
```

## How the idea cards work

Each card has seven fields: Problem / Assumption / Mechanism / Evidence /
Boundary / **Stealable move** / Pitch. Cards are generated from abstracts only;
anything the abstract does not state is marked `not stated in abstract`.
The **Stealable move** is the only field meant to be reused directly.
Verify any mechanism against the paper before citing it.

## Pair with

- `anti-defensive-writing` — remove hedging without removing scope.
- `schematic-figure` and `dataviz` — figures.
- `pdf-figure-vector` — redraw an existing figure as vector.

## Principle

Every rule here exists because a failure produced a plausible number or a
plausible sentence. The skill is meant to be edited: when a new silent trap is
found, add it to `casebook.md` with its check.

## License

MIT. No unpublished data, drafts, or results are included.
