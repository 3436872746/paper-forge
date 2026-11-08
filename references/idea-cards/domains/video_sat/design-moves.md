# Design moves — distilled from 50 papers (2023–2026)

> 中文版: [design-moves.zh.md](design-moves.zh.md)

Corpus: 50 idea cards on video streaming and satellite/LEO transmission — adaptive
bitrate, low latency, Starlink/LEO, multipath, QoE, live video — published 2023–2026.
Venue labels are arXiv unless the authors recorded otherwise (three cards name a
venue: INFOCOM, CoNEXT, ACM MM). Cards are abstract-only, so every move below records
what an abstract claims, not what a full paper establishes. Card numbers run 1–25 per
batch: `(cards 1-7, 2-13)` means batch 1 card 7 and batch 2 card 13. 50 cards → 18
deduplicated moves.

---

## A. Framing the problem

1. **Replace the proxy in your objective with the quantity users actually perceive,
   then add back the resource cost the proxy was quietly hiding.** Optimizing the
   proxy pays full price for work nobody can see; switching to the percept makes that
   hidden cost reappear as reclaimable budget. (cards 1-10)

2. **Frame the contribution as a siting or allocation question, enumerate the
   placements explicitly, and run the identical artifact at both candidate sites.**
   An explicit placement map turns heterogeneous resources into a search space rather
   than a pile of heuristics, and holding the artifact fixed leaves siting cost as the
   only explanation for the difference. (cards 2-23, 2-25)

3. **Ship the measurement artifact and the model it licenses as one package, with
   the analysis standing as the justification for the model's inputs.** A dataset
   alone is a resource; a dataset plus an analysis that names which features carry
   the signal is an argument. (cards 2-22)

## B. Designing the experiment

4. **Freeze everything you are not claiming about — the algorithm, the
   parameterization, the population — so the one thing you vary is the only candidate
   explanation.** Pin all free parameters to one published reference configuration, or
   sweep them as a full factorial grid and report the result per cell; a difference you
   cannot attribute is not a result. (cards 1-5, 1-22, 2-20)

5. **Ground the study in recorded reality rather than synthesized conditions, and
   ablate against a synthetic baseline matched on the same statistics.** Collecting the
   real corruption — or repurposing a public corpus for a question it was never
   designed for — plus a matched-severity control separates the structure of an effect
   from its magnitude. (cards 1-15, 2-4)

6. **Validate the fix on the same population you measured, so measurement and
   intervention share a denominator.** A deployed A/B test on the measured population is
   the cheapest way to stop the population itself from explaining the improvement.
   (cards 1-7)

## C. Measurement and analysis

7. **Define the metric so its estimator needs no external reference: either the gap
   between what the setting promised and what it delivered, or a quantity read only from
   units that already cross the wire.** Both are computable wherever observation is
   cheap, add no measurement latency, and cannot be flattered by choosing a convenient
   reference. (cards 2-7, 2-17)

8. **Measure the human at two levels — the downstream task outcome the system exists
   to support, and the experience as reported both moment to moment and in retrospect.**
   The first establishes that the machine metric matters; the second separates
   momentary quality from how the session is later remembered. (cards 1-24, 1-25)

9. **Report the tail and the per-entity breakdown beside the mean, and price a
   per-entity model against a pooled one to measure what personalization is worth.**
   An average win can hide a worse worst case and a set of users who gained nothing.
   (cards 1-12, 1-4)

## D. Mechanisms worth stealing

10. **Act on the state that is about to exist rather than the one just measured: put
    the forecast in front of the controller, and look several steps ahead at the value
    of the next unit.** Reacting to the last observation bakes the observation-reaction
    lag into the decision; acting on the forecast removes it rather than merely adding
    noise. (cards 1-14, 2-5, 2-10, 2-14)

11. **Design the unit of encoding so any subset of it is independently usable, then
    rank units by importance and let transport priority follow the ranking.**
    Independent usability converts a missing unit into a quality loss instead of a
    failure, and pays redundancy once at the unit level rather than duplicating the
    whole payload on every path. (cards 1-6, 1-16, 1-19, 2-12)

12. **Carry the cross-layer contract with the request — as rules or as state — and let
    the lower layer evaluate it mechanically instead of learning the upper layer's
    semantics.** The knowledge already exists upstream; a declarative interface keeps
    the lower layer simple and immune to shared state that churn can desynchronize.
    (cards 2-8, 2-21)

13. **Maintain a deployed controller by wrapping it or patching it, admitting a patch
    only when it passes replay on recorded failures.** Retraining and redesign are the
    expensive responses to a changed environment; a wrapper plus a replay gate rescues
    controllers you did not write and cannot retrain. (cards 1-11, 2-6)

14. **Structure a joint decision before you learn it: split separable axes into a
    cheap discrete stage followed by a learned continuous stage, and give controllers
    that act on each other's conditions a single shared state.** Starting the learner
    from the hand-written rule it replaces shrinks the search space, and two controllers
    tuned against each other's outputs only converge on a compromise neither would
    choose. (cards 1-9, 2-1, 1-23, 2-18)

## E. Writing and adoption

15. **Quote every win with its price, on the resource the platform actually budgets.**
    State the average result, the tail result, and what was spent to obtain it in the
    same sentence, and price the change against power, weight, or throughput rather than
    only against the target metric. (cards 2-6, 1-20)

16. **Adopt in increments: fold the new objective in as one weighted term inside the
    mechanism that already exists, and let each component earn its place through a
    measured before-and-after between two deployable versions.** A scalar added to an
    existing metric gets adopted; a redesigned mechanism does not. (cards 2-13, 1-21)

## F. Boundaries and what does not transfer

17. **Name the regime in which your gain holds and the regime in which the mechanism
    goes inactive.** An explicit off-condition — paths that stop being disjoint, load
    that stops being moderate — bounds the claim and pre-empts the first experiment a
    reviewer would run. (cards 2-8, 2-14)

18. **When no configuration dominates, say so, report the whole metric vector, and
    make the shape of the trade-off the claim instead of naming a winner.** A
    merely-balanced configuration described honestly is a stronger result than a victory
    declared on the one axis where you lead. (cards 2-2)
