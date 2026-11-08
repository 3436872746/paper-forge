# paper-forge

A step-by-step workflow for empirical computer-systems papers, plus scripts that
check the mechanical parts.

**New here?** Read the Chinese walkthrough first — it explains every step in plain
language for someone who has never written a paper: **[README.zh.md](README.zh.md)**
(10 steps, each with *what to do / why / which file / exit check*, plus a glossary).

## The pipeline

```
1 topic → 2 literature → 3 one-sentence claim → 4 experiment design →
5 run → 6 analyse → 7 figures → 8 write → 9 pre-submission audit → 10 review & archive
```

| Step | You decide | Open this |
|---|---|---|
| 1 Topic | the question and what would falsify it | `references/writing.md`, `templates/abstract_intro.md` |
| 2 Literature | the three closest papers and your difference from each | `references/literature-review.md`, `references/idea-cards/INDEX.md` |
| 3 Claim | condition, change, metric, threshold | `references/writing.md` |
| 4 Design | arms, placebo, floor, paired unit, pre-registered criteria | `references/experiment-design.md`, `references/gates.md` |
| 5 Run | batch manifest, explicit OUT, seeds | `references/reproducibility.md` |
| 6 Analyse | paired differences above the floor; permutation when no machine time | `references/stats.md`, `scripts/stats_paired.py` |
| 7 Figures | one message per figure, vector first | `references/figures.md` |
| 8 Write | title, five-sentence abstract, six-paragraph intro, limits in one place | `references/writing.md` |
| 9 Audit | numbers, citations, pages, anonymity, from-zero build | `references/integrity-audit.md`, `references/submission.md`, `scripts/` |
| 10 Review | triage comments, revision whitelist, record what failed | `references/review-response.md`, `references/integrity-audit.md` |

## Contents

```
SKILL.md                     six phases and the one-screen gate
README.zh.md                 detailed Chinese walkthrough (start here)
references/
  gates.md                   9 gates, 14 rules, 7 disease types
  experiment-design.md       arms, controls, pre-registration, batch manifest
  stats.md                   paired unit, intervals, floor, permutation test
  writing.md                 title, abstract, intro, contributions, limits
  figures.md                 vector first, one message per figure
  submission.md              template, pages, anonymity, authors/COI
  review-response.md         triage, order of work, response letter
  reproducibility.md         artifacts, build hygiene, long jobs
  literature-review.md       search → screen → triage matrix → citation check
  integrity-audit.md         four audit layers, claim ledger, review rounds
  casebook.md                40 silent traps with a one-line check each
  examples.md                worked examples from published papers
  external-skills.md         what was distilled from 10 open research-skill repos
  idea-cards/
    INDEX.md                 all 250 papers (title, venue, year, DOI)
    design-moves.md          100 papers → 40 reusable moves
    cards_batch1..5.md       100 idea cards
    domains/llm_sched/       50 LLM-scheduling papers + cards + 18 moves
    domains/video_sat/       50 video/satellite papers + cards + 18 moves
    domains/security/        50 security papers + cards + 18 moves
scripts/
  check_refs.py              cite order vs .bbl, undefined refs, placeholders
  page_audit.py              pages, overfull boxes, references page
  stats_paired.py            paired differences, interval, permutation test
  build_from_zero.sh         build a package from zero and audit it
templates/
  ieee6p.tex                 IEEE conference 6-page starter, clean preamble
  abstract_intro.md          five-sentence abstract / six-paragraph intro skeleton
```

## Where the content comes from

- **250 papers as methodology inputs**: 100 general systems/ML + 50 LLM scheduling
  + 50 video/satellite + 50 security → idea cards and design moves. Abstracts only;
  unstated fields say `not stated in abstract`. Full list in
  `references/idea-cards/INDEX.md`.
- **Four existing skills**: `anti-defensive-writing` (tone without losing scope),
  `schematic-figure` and `dataviz` (figures), `pdf-figure-vector` (redraw as vector).
- **Ten open research-skill repositories** (55.8k down to 453 stars): see
  `references/external-skills.md` for what was taken and what was rejected.

## Install

Copy this directory into your skills folder (the folder must be named
`paper-forge`):

- Claude Code user-level: `~/.claude/skills/paper-forge/`
- Project-level: `<repo>/.claude/skills/paper-forge/`

Everything is plain Markdown plus standard-library Python; it also works as a
handbook without any agent.

## Principle

Every rule exists because a failure produced a plausible number or a plausible
sentence without raising an error. The skill is meant to be edited: add a new trap
to `casebook.md` with its check.

## License

MIT. No unpublished data, drafts, or results are included.
