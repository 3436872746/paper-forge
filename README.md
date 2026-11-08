# paper-forge — when you use it, and what you get

Not a tutorial. A checker and reference library you call while working:
you bring the draft, plan or results you already have, and it returns specific
checks, comparisons and edits.

中文说明：[README.zh.md](README.zh.md)

## When you would use it

| Situation | What it gives you | What you end up with |
|---|---|---|
| "I am entering this direction; what do top-venue papers actually do?" | The venue bar for that direction: 50 papers' evidence types, scale, metrics, and what they leave out | A one-page comparison, with `N/50` counts |
| "Is my experiment plan enough?" | The venue bar's 12–15 checks applied to your plan | A filled self-audit table: venue norm / my draft / gap / fix |
| "Is this difference real?" | Paired statistics plus your own identical-arm floor | Paired differences, interval, floor verdict |
| "Is this sentence defensible?" | Claim–evidence alignment with four statuses (aligned / overstated / unsupported / insufficient) | One line per claim: status, reason, which experiment to add |
| "Reviews are back; what first?" | Triage into answer-now / needs-experiment / concede-boundary, with stable IDs | An ordered plan; next round proves each item was handled |
| "Last check before submitting" | Three scripts plus a checklist | A report on citations, pages, and a from-zero build |
| "I need related work and stealable moves" | 250 idea cards and per-direction move lists | Ten transferable moves, each traced to a card and paper |
| "Do the numbers in the paper match the files?" | Four audit layers | A number → file → script trace table |
| "The figure is unclear, or needs to be vector" | Figure rules plus companion skills | A one-message-per-figure check; vector redraw |
| "This paragraph hedges too much" | `anti-defensive-writing` | Tone removed, scope kept |

## How you call it

In Claude Code, just say what you have:

- "Audit my experiment plan against the `llm_sched` venue bar."
- "These two CSVs are two arms of the same batch — paired differences and floor."
- "Mark the status of each claim in this abstract."
- "Triage these reviewer comments."
- "Run the pre-submission checks."

Without Claude Code: everything is Markdown, and the scripts use only the Python
standard library.

## What you get

Not advice to "think harder" — artifacts:

- a filled self-audit table against the venue bar;
- a claim ledger: claim → evidence file → experiment id → status;
- a literature triage matrix: problem / assumption / evidence / boundary / your difference;
- an audit report: citations, pages, overfull boxes, from-zero build;
- a gap list: which missing item triggers which reviewer objection, and where the fix lives.

## Where things are

```
SKILL.md                     entry point: six phases, one-screen gate
references/
  idea-cards/venue-bar.md                   general systems/ML (100 papers)
  idea-cards/domains/llm_sched/venue-bar.md LLM inference scheduling
  idea-cards/domains/video_sat/venue-bar.md video / satellite transmission
  idea-cards/domains/security/venue-bar.md  security
  integrity-audit.md         four audit layers, claim ledger, review rounds
  literature-review.md       search → screen → triage matrix → citation check
  gates.md                   9 gates, 14 rules, 7 disease types
  experiment-design.md       arms, controls, pre-registration, batch manifest
  stats.md                   paired unit, intervals, floor, permutation test
  writing.md                 title, abstract, intro, contributions, limits
  figures.md                 vector first, one message per figure
  submission.md              template, pages, anonymity, authors/COI
  review-response.md         triage, order of work, response letter
  reproducibility.md         artifacts, build hygiene, long jobs
  casebook.md                40 silent traps with a one-line check
  examples.md                worked examples from published papers
  external-skills.md         what was taken from 10 open research-skill repos
  idea-cards/INDEX.md        all 250 papers (title, venue, year, DOI)
  idea-cards/design-moves.md 100 papers → 40 reusable moves
  idea-cards/cards_batch1..5.md
  idea-cards/domains/<pack>/ 50 papers + 50 cards + 18 moves + venue bar
scripts/                     check_refs.py, page_audit.py, stats_paired.py,
                             build_from_zero.sh
templates/                   ieee6p.tex, abstract_intro.md
```

## What is inside, and where it came from

- **250 papers** (100 general systems/ML + 50 LLM scheduling + 50 video/satellite
  + 50 security) → idea cards and design moves. Abstracts only; unstated fields
  say `not stated in abstract`.
- **Four existing skills**: tone, figures, charts, vector redraw.
- **Ten open research-skill repositories**, 55.8k to 453 stars — what was taken
  and what was rejected is recorded in `references/external-skills.md`.

## What it does not do

- It does not run experiments or decide what your data means.
- It does not assert a venue norm the corpus does not show; counts are `N/50`.
- Cards come from abstracts; verify a mechanism against the paper before citing it.
- The statistics advice targets small-repeat systems experiments, not online A/B.
