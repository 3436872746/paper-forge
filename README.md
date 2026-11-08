# paper-forge

A reusable workflow for empirical computer-systems papers: gates, statistical
rules, narrative patterns, submission checks, and a casebook of silent traps.

## Install

Copy this directory into your skills folder:

- Claude Code (user-level): `~/.claude/skills/paper-forge/`
- Project-level: `<repo>/.claude/skills/paper-forge/`

Then invoke it by describing the task ("review this paper's abstract", "plan a
batch with a placebo arm", "prepare the submission") or explicitly.

## Contents

```
SKILL.md                     the six phases and the one-screen gate
references/gates.md          9 gates, 14 rules, 7 disease types
references/experiment-design.md
references/stats.md
references/writing.md
references/figures.md
references/submission.md
references/review-response.md
references/reproducibility.md
references/casebook.md       40 traps with one-line checks
scripts/check_refs.py
scripts/page_audit.py
scripts/stats_paired.py
scripts/build_from_zero.sh
templates/ieee6p.tex
templates/abstract_intro.md
```

## Pair with

- `anti-defensive-writing` — remove hedging without removing scope.
- `schematic-figure` and `dataviz` — figures.
- `pdf-figure-vector` — redraw an existing figure as vector.

## Principle

Every rule here exists because a failure produced a plausible number or a
plausible sentence. The skill is meant to be edited: when a new silent trap is
found, add it to `casebook.md` with its check.
