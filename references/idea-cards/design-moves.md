# Design moves — distilled from 100 papers (2023–2026)

> 中文版: [design-moves.zh.md](design-moves.zh.md)

100 cards -> 40 reusable moves, grouped by phase. Each move is an imperative and a
one-line reason. The cards (with titles/venues) are in `cards_batch1..5.md`; the
selection and venue breakdown are in `README.md`.

About the corpus: it is deliberately broader than LLM serving. Roughly 70 cards
are serving/scheduling/prediction; the rest are cross-field systems and ML papers
kept because their *move* transfers (simulation, benchmarks, evaluation audits,
position papers). Relevance is judged per move, not per paper.

---

## A. Framing the problem (7)

1. **Name the gap as a proper noun and make the artifact reusable.** A named gap
   survives the abstract; a reusable artifact (generator, benchmark, simulator)
   makes the contribution citable after the speedup is forgotten.
2. **Open with a taxonomy of barriers; give exactly one contribution per barrier.**
   The reader can map claims to the paper's structure without a second pass.
3. **Organize around one tension** (effective vs efficient; accuracy vs latency)
   rather than a list of methods.
4. **Enumerate N sub-problems up front and ship the first systematic study of the
   space.** Claiming a space is stronger than claiming a point.
5. **Show one low-level primitive solving three seemingly unrelated problems.**
   A single mechanism with three consequences is a system paper's strongest frame.
6. **Import an abstraction from a neighboring field** (stream processing,
   instruction pipelining, codecs) and make it the paper's spine.
7. **Move the control target from the hardware to the workload shape** when the
   hardware is already saturated; rebalancing the abstraction is the contribution.

## B. Designing the experiment (8)

8. **Use the counterfactual "what if X were absent" as the measurement
   instrument.** It isolates the mechanism instead of correlating with it.
9. **Price the worst-case reservation explicitly, then replace it with a
   predictor plus a stated misprediction policy.** The policy is part of the
   design, not an implementation detail.
10. **Add an explicit fallback arm that protects the tail under overload.** A
    policy that cannot degrade gracefully cannot be deployed.
11. **Replace one coupled objective with two separately met constraints**, then
    maximize the throughput metric under both.
12. **Report the cost on the standard case in the same sentence as the win on the
    new case.** One-sided reporting is the most common reject reason.
13. **Validate the simulator against traces before letting it carry design
    claims.** A simulator that is not anchored is a hypothesis, not evidence.
14. **Put the detector/classifier inside the optimization loop**, so re-sampling
    is scored against the strongest available detector rather than a weak proxy.
15. **Ablate each layer separately** (micro-architectural vs scheduling vs
    cluster) so that cross-layer claims stay auditable.

## C. Measurement and statistics (8)

16. **Measure where end-to-end latency actually goes before optimizing the stage
    everyone else optimizes.** The bottleneck is often outside the engine.
17. **Quantify the idle or opportunity fraction of the other workload class**
    before proposing a hybrid design; that number is the design's budget.
18. **Audit the metric itself.** Show that two accepted evaluation protocols can
    merely chance-agree before trusting saturated numbers.
19. **Introduce a metric that exposes what the field's favorite metric cannot
    explain** (e.g., a tail or class-level statistic beside the mean).
20. **Report per-sample or per-class tails, not just averages.**
21. **Report cost/energy at component granularity**, not one aggregate number.
22. **Report the fraction of peak retained under contention**, not only the
    average speedup.
23. **Build the evaluation from real logged queries or real incidents**, and
    report stability across runs as a result.

## D. Systems mechanisms (10)

24. **Equalize iteration durations (batch uniformity) instead of delaying a
    phase.** The tail is set by the slowest step, not the average step.
25. **Pack work units by measured workload, not by count.** Count-based packing
    moves the imbalance rather than removing it.
26. **Change the persisted format to serve the loader**, not the loader to fit a
    fixed format.
27. **Predict the reuse set or access pattern, then fetch or place only that.**
    Turning a bandwidth problem into a prediction problem is often cheaper.
28. **Treat estimation error as a budget you spend down over time**, not as a
    fixed worst-case bound.
29. **Expose one continuous knob and tune it per request or per segment.**
    Granularity of the decision is often the whole gain.
30. **Map an SLO requirement onto a knob that does not change output quality**
    (caching fraction, speculation depth, parallelism) so the constraint is
    enforceable without a quality regression.
31. **Distill an expensive decision into an executable artifact** (plan table,
    lookup, small model) so its cost is paid once, not per call.
32. **Keep the fast path byte-identical and put the improvement in an
    asynchronous side channel**; the paper can then claim zero regression by
    construction.
33. **Use a lookup table of measured plans indexed by runtime features** instead
    of one config tuned for the average case.
34. **Co-design the compressor with the scheduler** so the compression ratio
    becomes a serving knob rather than a fixed cost.

## E. Writing, figures, adoption (7)

35. **Claim optimality for a class, not for a point.** A class claim survives new
    hardware; a point claim dates the paper.
36. **Number each empirical finding and cite it as the license for the
    corresponding system component.** Every component then has a reason to exist.
37. **Lead with an analytical model, then show the controller that follows from
    it.** The model is the argument; the controller is the evidence.
38. **Ship the optimization as a one-line drop-in for an existing engine.**
    Adoption cost is part of the argument, not an afterthought.
39. **State the workload regimes where the mechanism is inactive.** An explicit
    "off" condition is stronger than a vague robustness claim.
40. **Make correctness a per-request option with cost proportional to demand.**
    Paying for a guarantee only where it is asked for is a deployment argument.

## F. Boundaries and negative results (5)

41. **Publish the negative result with the full list of settings tried.** It
    bounds the method and pre-empts the reviewer's first experiment.
42. **Add a second externality axis (energy, carbon) and show it is additive**,
    not competing, before claiming a trade-off.
43. **Argue scalability across resource sizes, not at one point.**
44. **Name the artifact your relaxation introduces and repair it as a named
    algorithm.** The repair is the reviewable contribution.
45. **Report the issues your profiler/analyzer found and the post-fix gains as
    evidence the tool is useful**, not only its own overhead.

---

## How to apply a move

For a new paper, pick 3–5 moves from different groups: one framing move, one
experiment-design move, one measurement move, one writing/adoption move. More than
five becomes a list of slogans.
