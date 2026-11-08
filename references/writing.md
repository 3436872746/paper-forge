# Writing a systems paper

> 中文版: [writing.zh.md](writing.zh.md)

## Title

Name the phenomenon and the setting. Avoid adjectives that the evaluation does not
prove (robust, optimal, universal, first). If the contribution is a conditional
mechanism, the title should not promise unconditional safety.
Test: a reader who knows nothing else can say what is studied and under what
condition.

## Abstract — five sentences

1. **Problem**: what practitioners do today and the assumption it hides.
2. **Finding**: the counter-intuitive result; give the two contrasting numbers.
3. **Mechanism**: why the two numbers differ (the structure).
4. **Design response**: what you built, and the condition under which it acts.
5. **Boundary**: what the evaluation characterizes; what it does not establish.

Rules:
- Three memorable numbers, not ten.
- Do not let one experiment stand for another's claim (a control without the
  comparator cannot support the mechanism).
- Every "improves" is qualified by the tested condition.

## Introduction — six paragraphs

1. **The assumption**: the field orders by an estimate; the shared premise.
2. **The finding**, with a running example: one concrete workload, one failure,
   two numbers that one factor cannot explain.
3. **Why tuning cannot fix it**: monotone keys share one order; rescaling or
   better within-class accuracy does not repair the cross-class order.
4. **The different signal**: what lever remains; the system and its gate.
5. **Evidence and boundary**: what was tested; one sentence on when it fails.
6. **Contributions**: three findings, not three modules; no repeated numbers.

## Sections

- Every subsection opens with the claim it establishes, then the numbers.
- One idea per paragraph. If a paragraph needs two "however"s, split it.
- Put repeated caveats in Limits; do not re-litigate the same limitation in four
  sections.
- Related work: three axes of positioning, one sentence each; never write "we are
  the first". Write what this paper does not claim, then what it does.

## Contributions

Shape: `[Finding]. [Evidence span].`
Bad: "We design a detector, a controller, and a scheduler."
Good: "The policy changes the latency tail, not the average; four variants share
the same tail (Section X)."

## Claim–evidence ledger

Maintain a table from the first draft:

```
claim | section | evidence (batch/figure/table) | scope condition | owner
```

Delete the claim if the evidence cell is empty. When editing for space, check the
ledger: cut wording, not the evidence. The ledger also feeds the rebuttal.

## Defensive writing

Pair with the `anti-defensive-writing` skill. The rule: keep scope, remove tone.
Deleting "we do not claim X" is allowed only if X is not a real limitation the
evaluation leaves open; otherwise move the clause to Limits once.

## Titles and names

- System name: one word, pronounceable, not an acronym that collides with a
  baseline.
- Increment versions in the filename (`..._v1`, `..._v2`), never "final".

## Page budget

- Write to the limit from the outline, not after the fact.
- A full column is ~55 lines; estimate every paragraph.
- When over: compress wording first, then table internals, then figure size;
  never delete a scope limitation or a negative result.
