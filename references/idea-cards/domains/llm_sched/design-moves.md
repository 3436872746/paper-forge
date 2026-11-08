# Design moves — 50 LLM inference scheduling papers (2023–2026)

> 中文版: [design-moves.zh.md](design-moves.zh.md)

Corpus: 50 cards, 2023–2026, LLM inference scheduling — serving, scheduling, KV cache, SLOs, prefill/decode disaggregation, batching, speculative decoding — deduplicated into 18 moves.
Venue labels are arXiv unless the card recorded another venue (ATC, ASPLOS, MLSys); cards are abstract-only, so each move is bounded by what an abstract supports.
Card numbers run 1–25 per batch: `(cards 1-7, 2-13)` means batch 1 card 7 and batch 2 card 13.

---

## A. Framing the problem

1. **State one explicit scalar objective for the whole system, then make every layer optimize it.**
   When heterogeneous hardware, mixed request classes, or separate layers each carry their own notion of efficiency, their local optima cancel. Replace them with one value-per-unit objective chosen by the operator, so admission, batching, and placement are scored on the same scale and can be traded against each other.
   (cards 1-6, 1-12)

2. **Lift the unit of optimization from the individual call to the dependency graph that produced it.**
   Calls arrive as members of a job whose structure is revealed only at runtime, and optimizing each call alone discards both reusable intermediate results and slack on the job's longest remaining path. Make the graph the unit of admission, caching, and scheduling, and rank ready work by the risk of missing the job's completion horizon.
   (cards 1-17, 1-24, 2-3)

3. **Define fairness as a bounded disparity between co-running units, not as an equal share of throughput.**
   Equal long-run throughput can hide large per-unit latency degradation, and a shared batch's cost is set by its largest member. State the guarantee as a bound on how far any unit's progress or latency may drift from its solo value, then enforce that bound directly instead of equalizing shares.
   (cards 1-14, 1-22)

## B. Designing the experiment

4. **Give every layer the same forward-looking estimate, and keep per-request detail out of the global decision.**
   A hierarchy whose upper layer acts on lagging counters while the lower layer applies a static heuristic leaks exactly the information the decision needs. Give both layers one shared prediction of demand and cost, hide fine-grained per-item detail from the global layer, and choose the coupled knobs jointly under that forecast rather than tuning each layer in isolation.
   (cards 1-1, 1-4, 1-13, 2-1, 2-8)

5. **Order and reserve on a predicted observable, and reserve the peak of the predicted curve rather than a point estimate or a worst case.**
   Unpredictable durations make the classical ordering policies unusable, so predict the one cheap-to-observe quantity that orders the queue and re-derive the policy at the granularity the system can act on. When the prediction must become a reservation, reserve the peak of the predicted occupancy curve, since a point estimate frees too late and a worst case queues too long.
   (cards 1-9, 1-18)

6. **Put the policy inside the simulator and validate the pair against a real deployment before it carries a design claim.**
   Replaying a fixed trace against a policy cannot reproduce the interaction between scheduling, data movement, and hardware, so the simulator agrees with itself rather than with the system. Model policy and hardware in one runtime loop, and report the simulator's error against measured deployments before it is allowed to rank designs.
   (card 36)

## C. Measurement and analysis

7. **Characterize the workload per class and publish the trace or generator as the shared baseline before you optimize.**
   A system tuned to an assumed workload distribution is measured against the wrong thing, and aggregate statistics hide the per-class heterogeneity that scheduling decisions depend on. Release the trace, or a generator that composes class-aware components, so later work shares one baseline and mixtures can be reconfigured without new collection.
   (cards 1-20, 2-6)

8. **Add the cost axis the design must budget and report it at parity of the primary metric.**
   Energy, emissions, and device write lifetime are resources the mechanism consumes, not free side effects, and one of them can cap deployment lifetime before latency does. Report them alongside the primary metric at equal attainment rather than as a separate best case.
   (cards 1-3, 2-10)

## D. Mechanisms worth stealing

9. **Pay the expensive joint decision once, offline, and reduce online control to a lookup or a cheap local re-plan.**
   A multi-dimensional placement decision is too costly to re-solve per request, but its inputs move slowly. Compute the plan offline, index it by runtime features, and leave only a lightweight re-schedule for failures and shifts, so adaptation never restarts live work.
   (cards 2-12, 2-24)

10. **Open the boundary: publish what is reusable or partially executable, and split output so the consumer can start early.**
    A handoff treated as an opaque gap forces the consumer to wait for the whole producer even when most of the result is already determined. Let the producer declare the structure of what it will hand over, and which part can be executed before its input is complete, so usable pieces reach the consumer early.
    (cards 1-5, 1-15, 1-23)

11. **Generate two cheap candidates and choose between them from live state, so no corrective movement is ever needed.**
    Correcting a placement after the fact costs movement and the contention that comes with it, while choosing between two precomputed options at arrival costs almost nothing. Generate the candidates cheaply and independently, then let a live-state check pick the winner per decision.
    (cards 2-5, 2-14)

12. **Partition work by the trait that predicts which resource it will stress, and keep the partition boundary crossable mid-item.**
    One policy applied to a heterogeneous mix spends half its effort on the wrong bottleneck; a partition by the predictive trait lets each side carry its own queue and discipline. Keep the boundary crossable so an item that outgrows its partition moves without recomputing its work.
    (cards 2-9, 2-25)

13. **Separate work by kind along whichever axis is affordable, then move each unit back across the boundary to the side whose bottleneck it matches.**
    Dedicated pools remove interference but leave half of each resource idle, and full spatial separation is unaffordable on some interconnects. Separate spatially when it pays and by time-slicing and rotation when it does not, then send each fragment of work to the side whose bottleneck it matches rather than routing whole requests.
    (cards 1-7, 2-2, 2-15, 2-20)

14. **Re-derive the classical policy in the metric that actually bounds the contended resource, then coarsen the signal until the guarantee breaks.**
    Heuristics inherited from a different cost model carry guarantees that no longer apply, because the ordering should be built on the quantity that bounds the scarce resource rather than on elapsed time. Once the ordering is right, coarsen its input and report the coarsest signal at which the bound still holds.
    (cards 1-8, 1-16)

15. **Bolt an explicit account onto the rule you already want, so the guarantee is inherited and the correction is bounded.**
    Instead of deriving a new policy that happens to be fair, add a deficit or debt account to the rule already in use and let the accounting supply the property. The same account caps how far a corrective mechanism may fire, which is what keeps a short-first bias from starving the tail.
    (cards 1-2, 1-11)

## E. Writing and adoption

16. **Promote a constraint everyone treats as fixed into a decision variable, and report the saving in the resource it frees.**
    Caps, margins, and headroom are usually held fixed while the software knobs are tuned, which puts the cheaper operating point out of reach. Make the constraint a decision variable, optimize it jointly with the software parameter, and state the result as machines, energy, or cost saved rather than as latency won.
    (cards 1-10, 2-17)

17. **Ship the improvement as an option over the incumbent, outside the correctness-critical path, with the incumbent still measured as an arm.**
    A mechanism that replaces a working component must win everywhere or it is rejected at the tail. Ship it as a selector that can fall back to the incumbent per input, keep the predictor out of memory management and batching, and report the inputs on which the selector declines to act.
    (cards 1-21, 1-25)

## F. Boundaries and what does not transfer

18. **Publish the envelope of the mechanism, including the layer that fails to scale and the regime where it does nothing.**
    A benefit that survives only inside a parameter range is a claim about that range, so sweep the parameters it depends on and report the regime where it collapses alongside the regime where it wins. Where the structure being exploited is absent, say that the system matches the baseline within noise, and when a layer of the deployment stops scaling, report that layer as a result rather than a footnote.
    (cards 1-19, 2-7, 2-22)
