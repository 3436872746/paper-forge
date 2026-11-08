# Responding to reviewers

## Triage every comment into one of three buckets

1. **Factual defect** — a number, a citation, a claim/evidence mismatch.
   Verify from the artifact (compiled PDF / source / raw file), fix, and say what
   changed. Do not argue before verifying; several "defects" are misreadings, and
   several are real.
2. **Framing disagreement** — the reviewer wants a different story or scope.
   Decide whether the paper can carry it. If not, state the scope in Limits and
   answer in the response letter; do not silently change the claim.
3. **Out of scope** — a new system, a new workload, a hardware study.
   Say so, then offer the cheapest evidence that bounds the concern (a post-hoc
   statistic on existing data, a clearly labelled simulation).

## Order of work

1. Verify every alleged error from the artifact; record the verdict (real / not).
2. For real errors, fix and log the root cause (see `gates.md`).
3. For framing, write the one paragraph that will appear in Limits.
4. Only then decide whether a new experiment is needed.

A new experiment is justified when (a) the reviewer's alternative explanation is
plausible, (b) it can be answered inside the existing setup, (c) its cost is
bounded, and (d) the answer would change a sentence in the paper either way.
Otherwise, answer with existing data.

## Response letter

- One numbered item per comment; quote the comment in one line.
- State: what we changed (section/page) or why we did not.
- For a negative result, say it plainly: it bounds the method, it does not
  invalidate the finding.
- Never promise a number you have not computed.

## Things that repeatedly turn out to be true

- The reviewer is often right about the *sentence*, wrong about the *system*.
- A claim that needs four conditions to hold will be read as unconditional.
- A result that only appears in one aggregate metric hides class-level or tail
  effects; add the second metric before the reviewer asks.
- "We could not reproduce it" from a reviewer usually means the description was
  incomplete, not that the result is false.
