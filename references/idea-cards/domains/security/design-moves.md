# Design moves — security corpus (2023–2026)

50 abstract-only cards (25 per batch) → 18 reusable moves, grouped by phase.
Corpus: prompt injection, jailbreak, side channels, fuzzing, supply chain, membership inference / model extraction, adversarial ML.
Venue labels are arXiv unless the card recorded otherwise (CCS, USENIX Security, S&P, NeurIPS, ICML, ICLR);
cards are abstract-only; card numbers run 1–25 per batch, so `(cards 1-7, 2-13)`
means batch 1 card 7 and batch 2 card 13.

---

## A. Framing the problem

1. **Define the threat by authority, not by syntax or location.** Treat an input as adversarial when it tries to determine a decision, or steer control flow, that its source has no authority over; syntax-based definitions miss the attacks that matter, so enumerate the decision's parts and let the weakest part — not the headline objective — set the benchmark and the defense claim. (cards 1-7, 2-25)

2. **Name the properties first and read the gaps off the empty cells.** Write down the small set of properties a secured system must satisfy, then map every existing defense into that grid so the gaps are the empty cells rather than a reading list. Choose the axes for the decision a defender must make — application domain, feasibility, threat model, method, platform generation — because an omitted axis turns a transfer claim into an assumption. (cards 2-17, 2-1, 2-2, 2-5)

## B. Designing the experiment

3. **Ship the evaluation as a generator with an oracle, not a frozen suite.** Hand-crafted sets overstate robustness, so make the evaluation a generator with a black-box success oracle: search variants, select a small effective subset, and re-run construction to refresh it. Pin the threat model, system prompt, template, and scorer alongside the data, because in adversarial evaluations the measuring stack moves the number. (cards 1-1, 1-10, 1-13, 1-14)

4. **Put the adversary upstream of the defense's own training pipeline, and at every knowledge level.** Treat the defense's training data as attack surface — an adversary who can poison it can switch the defense off — and run the same tool under graded assumptions (nothing, side information, full source) so the paper reports what each attacker class actually reaches. (cards 1-8, 2-9)

5. **Re-price the result in the regime where it will be deployed.** A clean-lab, short-input, special-hardware result is only an upper bound; re-run with commodity equipment, realistic noise, and deployment scale, model the nuisance variable instead of averaging it away, and plot effectiveness against the regime parameter. (cards 1-9, 1-22, 2-4)

6. **Use a cheap, noisy predictor as an ordering oracle for an expensive verifier.** Let the predictor choose what the verifier checks, so its false positives cost wasted verification time rather than a wrong published conclusion; close the loop in both directions so the verifier's findings also revise the predictor's search space. (cards 2-7, 2-11)

## C. Measurement and analysis

7. **Refuse the single aggregate number.** Report per-component, per-objective, and per-regime results, because one score hides both the residual hole and the cost paid on the standard axis; score the protective objective and the primary task on the same inputs, and search over a multi-objective front rather than one weighted sum. (cards 1-7, 1-11, 2-13)

8. **Audit the metric before trusting it.** When the standard score is similarity to a reference artifact, show that it does not measure the property you care about — a repaired system can be textually unlike the reference and still correct, or similar and still broken — and score behavior instead. (cards 2-14)

9. **Turn the attack into a measurement instrument.** Run the adversarial machinery not only to break the system but to probe what it internally prefers, so a values or policy question becomes an empirical measurement with a rate rather than an assertion. (cards 1-20)

## D. Mechanisms worth stealing

10. **Put the rule in the weights by training on the confusion case.** Instead of filtering at the boundary, synthesize the exact confusion the adversary exploits — a legitimate instruction with a hostile one embedded in the data channel — and train the model to prefer the safe completion for that contaminated input. The boundary then becomes a learned property rather than a formatting convention the front end can be talked out of. (cards 1-3, 1-4)

11. **Build the effect from pieces that are individually innocuous.** Split the work between a scouting role that gathers harmless fragments and a composing role that assembles them, escalate through a ladder of small commitments, or stack primitives at different granularities glued by a fixed template; the composition, not any single artifact, carries the payload and beats scaling one primitive. (cards 1-16, 1-17, 1-19)

12. **Detect by the system's response to perturbation, not by classifying the input.** Apply small structural perturbations and measure how far the output distribution, or the model's own loss landscape, moves — value plus smoothness is inherited from training and survives across families that share nothing textually; where a family has a necessary step, check only that step in a parallel shadow path. (cards 1-6, 1-12, 1-15)

13. **Turn the thing you are hunting into the search's coverage signal.** Instrument the mechanism whose abuse you want to find — state transitions, interface crossings, decision points — and use it as both the coverage metric and the localization signal, so new coverage and newly suspicious behavior are two readings of one measurement. (cards 2-15)

14. **When content is protected, measure what the protection leaves observable — or pre-supply it.** Size, timing, contention on a shared fabric, and state never reset between contexts all classify behavior without reading the protected content, so treat any shared resource as a channel; on the defense side, make the observation worthless by pre-supplying the state the adversary wants to measure, so defense and performance optimization become one mechanism. (cards 1-21, 1-23, 1-24, 1-25, 2-3)

15. **Attack the glue, not the components.** Look for implicit precedence — any build, link, load, or dispatch step where two identically named things can coexist and one silently wins — and for the seam where one component's output becomes another's instruction; both are attack surface that requires no modification of the target's own code. (cards 2-18, 2-24)

## E. Writing and adoption

16. **Ship the artifact as something a practitioner can run, and extend what they already run.** A tool or explorable artifact gets adopted where a table does not, and adding new predicates or policies to an existing trusted engine inherits its solver and its users; keep the unit of extension small and composable so coverage grows by composition rather than redesign. (cards 2-23, 2-21, 2-19)

17. **Anchor every proposed control to a named real incident.** A control set derived only from a closed taxonomy is not auditable; tying each control to an incident makes relevance and coverage checkable against reality. (cards 2-22)

## F. Boundaries and what does not transfer

18. **Label the evidence grade and the substrate, and let neither imply more than was shown.** Say whether the result was argued, demonstrated on one case, or measured at scale, and name the platform or ecosystem it was measured on; a single case is not a scale claim, and one substrate is not a class. (cards 1-15, 2-7, 2-16, 2-25)
