# Integrity audit — four layers, one owner each

> 中文版: [integrity-audit.zh.md](integrity-audit.zh.md)

The rule this file exists for: **nobody audits their own work**, and a claim may be
stated only as strongly as its evidence earns.

## The four layers

| Layer | Question | Typical failure | Output |
|---|---|---|---|
| 1. Code integrity | Did the experiment do what the script says? | Config default overrides the flag; silent overwrite; dead engine reported as success | `run_manifest` + a spot recomputation |
| 2. Result → claim | Does this result mean what we think? | Two variables changed; difference below the floor; wrong aggregation | paired stats + floor |
| 3. Paper → file | Does the paper report the number that is in the file? | Stale number from an earlier batch; unit or median-convention drift | number-to-file table |
| 4. Citation → sentence | Does the cited work support this sentence? | Overstated mechanism; version mismatch; secondary citation | citation locator audit |

Each layer is a separate pass. The person (or agent) who ran the experiment does
not sign off on layers 2–4.

## Claim ledger

Keep one file (e.g. `claims.yml`). Every claim in the paper has a row:

```yaml
- id: C3
  text: "Splitting the cache reduces p99 miss latency by more than the floor."
  status: aligned            # aligned | overstated | not_supported | insufficient
  evidence_artifacts:        # must be non-empty; empty forces status: insufficient
    - runs/20261012_split/metrics.csv
    - scripts/paired_stats.py
  experiment_ids: [E2]
  citation_locators: [sec/table2]
  boundary: "only at 70% load and above"
  verified_by: "second pass, 2026-11-08"
  reason: ""                 # required when status is not aligned
```

Rules:

- **Empty evidence ⇒ `insufficient`**, with a written reason. It cannot be typed
  `aligned`.
- The audit judges the **link** between claim and evidence; it does not judge
  whether the experiment itself was correct (that is layer 1).
- A claim whose boundary is empty is not finished.

## Declaration before every run

Before any batch or analysis pass, record:

- which experiments this pass uses (or "literature only, no experiments");
- the commit / script hash;
- the machine and seed;
- what this pass is **not** going to check.

This turns "I forgot to include the control arm" into a visible omission instead
of a silent default.

## Review rounds

- Start each review round with a **fresh context**. Do not hand the reviewer the
  fix summary; a continued thread tends to inflate scores.
- Cap rounds. When the cap is reached, report what is still open instead of
  continuing.
- Prefer **reframing the claim** over running another experiment.
- Write the **strongest rejection memo** in one pass, then have a separate pass
  (not the defender) classify each point: answered / partly / unresolved, with a
  file:line reference.

## Stable issue IDs

Number every finding (`R1`, `R2`, ...) and keep them across rounds. The next round
must state, per ID: fixed / consciously rejected / still open and why. This is the
only way to prove progress rather than re-discovering the same issues.

## Revision whitelist

For a revision round, write down:

- allowed paths;
- forbidden operations (e.g. "no new citation", "no new numerical claim");
- a maximum number of edits.

Then diff against the whitelist. A revision that adds a new claim is not a
revision.

## Restatement regression

After each revision, re-read the claim statements (title, abstract, contributions,
conclusion). If any of them drifted stronger, revert or record why the new
strength is supported.

## Session epilogue

At the end of a session, record in the project memory:

- decisions taken;
- experiments run (with their manifest);
- **dead ends and pivots**, and who proposed them.

Dead ends are first-class. A failed idea becomes a ban on repeating it, and a null
result honestly reported is raw material for the next claim.

## Pre-submission audit checklist

1. Every claim ID has a non-empty evidence list.
2. Every number in the paper appears in the number-to-file table.
3. The table is recomputed from the raw files, not copied from an earlier draft.
4. Every citation has a locator and passed the four-point check in
   `literature-review.md` §6.
5. No claim is stronger than in the previous round without new evidence.
6. Each open issue ID has a status.
7. The "what this check cannot establish" paragraph is present.
8. A second person (or a fresh pass) signed layers 2–4.
