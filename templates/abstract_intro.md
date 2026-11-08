# Abstract and Introduction templates

## Abstract (five sentences)

1. **Problem.** `<Setting> relies on <assumption>; the impact of <the failure mode>
   remains poorly understood.`
2. **Finding.** `We show that <factor A> can matter more than <factor B>: under
   <named condition>, <metric> moves from <A> to <B>, whereas <the control> moves
   it by only <C>.`
3. **Mechanism.** `This difference arises because <named mechanism>; <why the obvious
   fix cannot repair it>.`
4. **Design.** `We present <System>, which <what it adds> and acts only when
   <detection condition> and <direction condition>; under the tested condition,
   <result>.`
5. **Boundary.** `Evaluation with <datasets> characterizes both the benefits and
   limits of <the mechanism>: it can <positive>, but <what it does not fix> and
   <what it can make worse>.`

Checklist: three numbers; every adjective tested; conditional mechanism carries its
condition; no number from a batch without its comparator.

## Introduction (six paragraphs)

1. **Assumption.** The field orders by `<signal>`; the shared premise. One citation
   cluster, no history.
2. **Finding + running example.** One workload, one group, one reversal; two
   numbers that one factor cannot explain. If the two numbers come from different
   batches, say "a separate controlled comparison".
3. **Why tuning cannot fix it.** The obvious parametric fixes preserve the same
   order; name the property and say why rescaling does not repair it.
4. **The different signal.** A signal the estimator does not produce; the system; the
   gate (detector + deployment-known direction); default behaviour when silent.
5. **Evidence and boundary.** One sentence listing the evaluation families; one
   sentence on when the mechanism helps and when it does not; pointer to Limits.
6. **Contributions.** Three findings, one sentence each, no repeated numbers.

Anti-patterns: starting with the system; a limitation in every paragraph; the same
number in the abstract and the contributions; "robust" without a sweep.
