# External research skills we distilled (10 repos)

> 中文版: [external-skills.zh.md](external-skills.zh.md)

> Collected 2026-11-08. Selection: GitHub search sorted by stars, restricted to
> repositories whose subject is **academic research / paper writing**, read from
> their READMEs. We took **ideas only** — no text, code, or dependency was copied,
> and every rule below was re-written for this repo. Star counts are as read on
> that date.
>
> Rule for using this page: it is a provenance record, not a reading list. If a
> rule here already lives in a reference file, that file is the authority.

| # | Repo | Stars | What it is |
|---|---|---|---|
| 1 | `Imbad0202/academic-research-skills` | 55.8k | Five Claude Code skills: deep research, paper writing, reviewer, 10-stage pipeline, PRISMA screener |
| 2 | `alirezarezvani/claude-skills` | 29.5k | Very large multi-domain skill catalog (411 skills) with gate/orchestration conventions |
| 3 | `wanshuiyin/Auto-claude-code-research-in-sleep` (ARIS) | 18.8k | ~87 composable skills chaining into review, writing, rebuttal workflows |
| 4 | `Orchestra-Research/AI-Research-SKILLs` | 14.3k | 98-skill catalog; the transferable part is artifact, rigor-review and ideation skills |
| 5 | `Master-cai/Research-Paper-Writing-Skills` | 8.2k | One minimal paper-writing skill, section-scoped references |
| 6 | `poco-ai/Agentero` | 1.9k | Local research workbench: PDF library, notes, citation graph, BibTeX |
| 7 | `PaperDebugger/paperdebugger` | 1.6k | In-editor research → critique → revision loop for LaTeX |
| 8 | `LeonChaoX/qinyan-academic-skills` | 1.0k | 187-skill academic catalog with a five-skill manuscript suite |
| 9 | `WenyuChiou/ai-research-skills` | 607 | Eight-stage research lifecycle with typed manifests and handoffs |
| 10 | `lingzhi227/agent-research-skills` | 453 | 31 small composable skills across six lifecycle phases |

---

## 1. academic-research-skills

**Took**

- A **fail-closed declaration before every run**: the skill asks what experiments
  this run uses, even for a literature-only task, so "no experiments" is a
  recorded answer rather than a silent default.
- **Claim-level provenance verdicts** with four outcomes: aligned / overstated /
  not supported / provenance insufficient. The check judges the link between claim
  and evidence — never whether the experiment itself was correct.
- **Citation locators + an opt-in audit**: fetch the source and ask whether the
  sentence is actually supported; flag claim-not-supported, fabricated reference,
  anchorless citation.
- **Reviewer is read-only**, produces criterion-bound narrative, and never a
  numeric total mapped to accept/reject.
- **Anti-sycophancy protocol**: score each rebuttal 1–5, concede only at ≥4, no
  consecutive concessions, track the concession rate.
- **Declared data-access level** per task (raw / redacted / verified only).
- **Honest limits**: a reproducibility lock is documented as configuration
  documentation, not a replay guarantee.

**Rejected**: 13/12/10-agent orchestration, cross-model handoff envelopes, model
tiering, the distribution-channel matrix.

---

## 2. claude-skills (broad catalog)

**Took**

- Tools must run `--help` cleanly and be **zero-dependency** (stdlib only).
- A **"does it fire" test**: ask the skill a plainly worded question and record
  whether it triggers — a cheap trigger suite, published rather than claimed.
- **Human gate**: a plan is not closed until a *named* person reviewed it and no
  blocker is open.
- **Run forensics**: compare what the agent said it did with the transcript of
  what it actually did.
- **Evidence-traced edits**: only change the process when the session history
  supports the change.
- A fixed **discuss → map → decompose → execute → verify** loop before any write.

**Rejected**: the 411-skill breadth, marketplace packaging, persona theatre,
"tier" branding.

---

## 3. ARIS (Auto-Research-In-Sleep)

**Took**

- **Four-layer audit chain with split ownership**: code integrity → result means
  claim → paper reports the number correctly → citation supports the sentence.
  The executor never judges its own integrity.
- **Assurance as a second axis**: effort scales breadth; assurance (draft vs
  submission) decides whether audits block. At submission, a failing audit blocks
  the "ready" label.
- **Fresh-context reviewer every round**, never a continued thread, and no fix
  summaries handed to the reviewer.
- **Persisted loop state** plus hard caps: max rounds, a compute ceiling above
  which work is skipped and flagged, "prefer reframing over new experiments".
- **Claims–evidence matrix** produced before prose.
- **Kill-argument gate**: one pass writes the strongest rejection memo; an
  independent adjudicator (not a defender) classifies each point as answered /
  partly answered / unresolved, with file:line.
- **Restatement regression**: after each fix round, re-check that the claim
  statement did not drift.
- **Edit whitelist** for revision rounds: allowed paths, forbidden operations
  (new citation, new numerical claim), per-round diff gate, max edits.
- **Failure is first-class**: failed ideas become a banlist that seeds the next
  ideation round.
- Every proof claim labelled: proved / imported / conjectural / repaired /
  unsupported.

**Rejected**: cross-model routing to specific vendors, overnight autopilot,
87-skill breadth, self-rewriting meta-optimisation.

---

## 4. AI-Research-SKILLs

**Took**

- **Progressive disclosure**: a short `SKILL.md` (when to use, quick patterns,
  links) plus a `references/` bundle fetched on demand — the loaded instruction
  stays small.
- Research recorded as a **traversable artifact directory**, not just a prose
  report: claims, exploration graph, evidence, code stubs.
- **Session epilogue**: at the end of a session, write decisions, experiments,
  dead ends and pivots to that directory, tagged by provenance (user /
  ai-suggested / ai-executed / user-revised).
- **Rigor review across six named dimensions**: evidence relevance,
  falsifiability, scope calibration, argument coherence, exploration integrity,
  methodological rigor — severity-ranked, not a single score.
- **Two loops**: an inner loop that fixes the current thing, an outer loop that
  periodically asks whether the question is still the right one.
- Null results are content, not an appendix.
- Ideation by **explicit lenses**, not "brainstorm freely".
- Plotting is a separate skill from prose.

**Rejected**: framework manuals (serving/training stacks), installers,
always-on operation, "autonomous research" marketing.

---

## 5. Research-Paper-Writing-Skills

**Took**

- **Section-scoped references**: guidance is fetched per section, not one giant
  writing chapter.
- **Claim–evidence alignment as its own task**, separate from polishing prose.
- **Pre-submission self-review from the reviewer's seat**, not the author's.
- Portable packaging: one `SKILL.md` + `references/` tree, no runtime.
- An **attribution header** saying whose knowledge it is and what the packager
  added.

**Rejected**: the vendor agent metadata file.

---

## 6. Agentero

**Took**

- State the **division of labour** up front: humans pose questions, judge value,
  read deeply, draw conclusions; agents do bulk retrieval, metadata, extraction,
  first-pass summaries.
- **Extract before reading**: convert PDF formulas, pseudocode and tables to
  Markdown/LaTeX before any model reads the paper; raw two-column PDF parsing is
  a hallucination source.
- **Context assembly as a first-class artifact**: paper + notes + past
  interactions in one place.
- Build the **citation graph from the paper's own reference list**; use BibTeX as
  the interchange format.
- Migration keeps tags, notes and attachments — provenance survives the move.

**Rejected**: the desktop GUI, local model recommendations, vendor mirrors.

---

## 7. paperdebugger

**Took**

- **Research → critique → revision as three separate passes**, never one-shot
  "improve my paper".
- **Citation verification as an explicit stage**, not a hope.
- **Read-only by default**: the tool proposes; the human presses the button.
- Feedback as **inline comments anchored to the exact sentence**, not chat.
- A **prompt library**: named reusable templates per task.
- **Per-section revision passes** rather than one global style instruction.

**Rejected**: Chrome/Overleaf lock-in, the Go microservice stack, API coupling.

---

## 8. qinyan-academic-skills

**Took**

- **One skill per manuscript stage, each declaring a single primary output** —
  name the deliverable before writing instructions.
- **Polishing preserves meaning** and runs an anti-overclaim check; a rewrite may
  not silently strengthen a claim.
- **Stable issue identifiers** on review findings, so round 2 can prove each
  earlier finding was addressed or consciously rejected.
- **Review (find issues) ≠ assessment (prioritise them)**; the output is a
  ranked, traceable list.
- Figure export and **preflight validation are one step**: a figure is not done
  until it passes.
- **Estimand-aware statistics**: name the quantity being estimated before
  choosing the test.
- **Reporting audit** as a separate activity from analysis: re-check the
  manuscript's numbers against the plan.

**Rejected**: 187-skill breadth, `curl | bash` install, the "Nature-style" label.

---

## 9. ai-research-skills

**Took**

- **Anti-leakage schema**: a claim with no evidence artifact is forced to
  `status: gap` with a written reason; it cannot be typed `supported`.
- **Three-gate verdict before committing to a topic**: is the gap still open, is
  closing it a real contribution, is it feasible in the time left — each with a
  verdict and a reason.
- **Typed handoffs**: each stage's output is the next stage's input, carrying
  provenance back to the gap it serves.
- Read-only work proceeds automatically; **semantic acceptance is an explicit
  human gate**.
- **Worked-example artifacts** per stage, not descriptions.
- Time envelopes labelled as observed, not benchmarked.
- An explicit limitations section saying what is *not* machine-checked.

**Rejected**: the runtime dependency, the full orchestrator, Zotero/Obsidian
coupling.

---

## 10. agent-research-skills

**Took**

- **Backward traceability as a hard rule**: every number in the PDF links back
  to the code that produced it.
- **Bounded loops** instead of "keep trying": fixed retries, fixed review rounds,
  fixed novelty-search rounds.
- **Progressive experiment ladder**: implement → tune → research → ablate, so
  ablations are planned rather than added after the results arrive.
- **Table generation encodes the reporting convention** (bold best, significance
  marks, multi-dataset layout) in a script, not in prose.
- **Figure feedback loop**: inspect the rendered figure as an image before
  accepting it.
- Self-review against an actual venue form, with several reviewer personas and a
  meta-review.
- Compilation is part of the workflow, with an automatic error-correction pass.
- **Cross-artifact consistency** (pseudocode vs diagram, math vs code) is its own
  step.

**Rejected**: repo-mining skill, the global installer, storing keys in a home
file.

---

## What landed where

| Practice | Landed in |
|---|---|
| Literature triage, screening, citation verification | `references/literature-review.md` (new) |
| Four-layer audit chain, claim status, edit whitelist, kill argument | `references/integrity-audit.md` (new) |
| Ten-step pipeline, plain-language explanations, glossary | `README.zh.md` |
| Claim–evidence alignment, reviewer-seat self-review | `references/review-response.md`, `references/writing.md` |
| Stable issue IDs, review vs assessment | `references/integrity-audit.md` |
| Extract PDF → text before reading; citation graph | `references/literature-review.md` |
| Bounded loops, fresh-context reviewer, persisted state | `references/integrity-audit.md` |
| Number → code traceability, table/figure generation checks | `references/reproducibility.md` (already), extended in `integrity-audit.md` |

## The twelve rules we actually kept

1. **Nobody audits their own work.** The runner, the writer and the number-checker
   are separate passes; reviewer threads start fresh each round.
2. **Evidence or it is a gap.** A claim without a named evidence artifact is
   forced to `gap` with a reason.
3. **Claim status is an enum**, not a vibe: aligned / overstated / not supported /
   insufficient.
4. **Audit the chain, not the paper**: code integrity → result means claim →
   paper reports the number → citation supports the sentence.
5. **Every number traces to a file and a script**, checked mechanically before
   submission.
6. **Read-only until a named human gate passes**; edits are insertions the human
   chooses.
7. **Critique is a separate pass from revision**, and revision from insertion.
8. **Stable issue IDs** so later rounds can prove each finding was handled.
9. **Bound every loop**: max rounds, compute ceiling, edit whitelist; prefer a
   cheaper reframing over a new experiment.
10. **Record dead ends and pivots**, with provenance, because a null result is
    raw material.
11. **Polish may reword but never strengthen** a claim.
12. **Say what the check cannot establish**; label limits on the same page as the
    result.
