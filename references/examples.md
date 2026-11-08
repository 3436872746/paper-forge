# Worked examples from published papers

> 中文版: [examples.zh.md](examples.zh.md)

Use these as illustrations. They are public, citable, and unrelated to any
unpublished manuscript.

## 1. The asymmetry of inexact sizes

**Wierman & Nuyens, "Scheduling despite inexact job-size information,"
SIGMETRICS 2008.** A size-based policy with noisy estimates can be analysed as an
`epsilon`-SMART policy; the achievable response time degrades smoothly with the
accuracy of the estimate, but not symmetrically.

Use it for: a claim of the form "the direction of the error matters more than its
average size" — support it with this line of work, not with your own numbers in
the introduction.

Pattern: `[named estimator property] -> [which direction of error is dangerous] ->
[bound or measurement]`.

## 2. Tail versus mean

**Classical SRPT results (e.g. Bansal & Harchol-Balter, SIGMETRICS 2001;
Wierman & Harchol-Balter, SIGMETRICS 2003).** SRPT optimises mean response time
while worsening the tail for long jobs; the policy's benefit and its unfairness
live in different metrics.

Use it for: "report at least one tail metric" and for separating aggregate from
class-level claims. The published literature already shows that a mean-only
evaluation hides the cost.

## 3. Prediction can hurt even when exact

**"Beyond Prediction: Tail-Aware Scheduling for LLM Inference," ICML 2026.** Even
with perfect length knowledge, prediction-driven orderings give limited control
over P90-P99; the paper argues for observable signals and soft priorities.

Use it for: the "why a better predictor is not the whole answer" paragraph.

## 4. Imprecise request information in serving

**JITServe, NSDI 2026.** SLO-aware serving with imprecise request information uses
an upper-bound estimate and progressive refinement; its own evaluation notes that
the bound is not conservative on real data.

Use it for: the difference between a nominal quantile and an empirical coverage
claim (see `stats.md`).

## 5. Under-estimation is worse than over-estimation

**Dell'Amico, "Revisiting Size-Based Scheduling with Estimated Job Sizes," 2014.**
Performance depends on workload skew, and under-estimation degrades scheduling far
more than over-estimation.

Use it for: motivating why a class that is systematically under-estimated is the
dangerous case, without invoking your own workload.

## How to cite examples in a draft

- One published example per claim is enough; do not stack five.
- Quote the mechanism, not the number, unless the number is the claim.
- Never use an unpublished manuscript as the illustrative example in a
  methodology text.
