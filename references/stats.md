# Statistics for systems papers

## Unit of analysis

- Machine-time batches: the **round** is the paired unit (same arrival set,
  rotating order). Requests inside a round are not independent.
- Offline replays: the **seed** is the unit (same request order and arrival
  stream across policies).
- Never report a per-request CI for a policy comparison.

## Aggregation and conventions

State all three in the paper:

1. which median (lower median vs interpolated; for even n they differ);
2. which rounds are analysed (e.g. last six of eight, two discarded for warm-up);
3. whether a ratio is computed per request then medianed, or from medians.

A 6.7x vs 6.5x discrepancy can be nothing but the median convention.

## Brackets: min–max or CI?

Default: brackets are `[min,max]` of paired per-run differences, not confidence
intervals. If a section uses CIs, say so there and give the method:

> All intervals in this paragraph are 95% paired bootstrap CIs over the 20 seeds
> (10,000 resamples).

Do not mix the two silently in one paper.

## Floors

- Identical arms: floor = max paired deviation per round, in the metric's unit.
- No identical arm: use the run-to-run spread of the same policy, and say so.
- A difference below the floor is not a difference.
- Placebo ≠ floor: a shuffled-key policy is a *baseline*, not measurement noise.

## Paired tests

- Paired bootstrap: resample the paired units; report the CI of the median
  (or mean) paired difference.
- Permutation: shuffle the class label / arm label within the pooled set; report
  the observed statistic against the null distribution. Use when the comparison
  is offline and cheap.
- Report the number of units with the sign of the effect (e.g. 20/20 seeds).

## Claims

- Difference in ratios and difference in absolute units are different claims.
- "Retains 99.9% of the gain" is a statement about medians; it does not bound
  tail behaviour or class-level outcomes.
- Report at least one tail metric when a policy reorders jobs.
- Distinguish **pairwise inversion** (a fraction of pairs) from **whole-class
  separation** (no overlap at all). The first is common; the second is the
  condition that justifies a strong failure claim.

## Multiple comparisons

When enumerating classes/pairs, state how many were tested and use a permutation
null; do not report the maximum of many comparisons as if it were pre-registered.
