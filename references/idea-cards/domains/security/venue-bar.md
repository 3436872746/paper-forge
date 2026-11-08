# Venue bar — security (50 papers, 2023–2026)

> 中文版: [venue-bar.zh.md](venue-bar.zh.md)

This file lets someone working in this direction hold their draft or experiment plan against what the 50 papers in this corpus actually do, and self-audit before a reviewer does it for them.
It is derived only from the abstracts, so every claim below is a claim about what an abstract says, not about what the paper does.
Card citations use the convention `(cards 1-7, 2-13)`: batch-card, so `1-7` is card 7 of `cards_batch1.md` and `2-13` is card 13 of `cards_batch2.md`.

## 1. What these papers actually study

- **Can an attacker who controls retrieved or external content override the application's instruction, and can the model be made to treat that content as data rather than as an instruction?** The dominant question in the LLM half of the corpus, asked from both the attack and the training-time defence side `(cards 1-1, 1-3, 1-4, 1-5, 1-8)`.
- **Does the defence survive an attacker who already knows it?** Instruction-hierarchy defences are evaluated against backdoored fine-tuning data, and defences tuned on one attack family are run against automatically generated variants of it `(cards 1-8, 1-10, 1-3)`.
- **Which channel gets a policy-violating answer out of an aligned model, and how far does that channel transfer?** Templates, gradients, images, multi-turn escalation, retrieved historical narrative, and moral framing are each proposed as a distinct channel and each scored across several models `(cards 1-16, 1-17, 1-18, 1-19, 1-20)`.
- **Can a cheap, model-internal signal separate attack from benign input well enough to be gated by a threshold?** Classifiers over a curated corpus, refusal-loss geometry, and perturbation-response detectors are the three variants present `(cards 1-2, 1-6, 1-12)`.
- **Do existing benchmarks and defences still hold when the input distribution changes?** Longer contexts, attacks that tamper with a decision inside the task rather than replacing the task, and benchmark saturation are each used to show that a defence's reported number was an artefact of the test set `(cards 1-7, 1-9, 1-13)`.
- **What unprivileged observable leaks enough to reconstruct a secret or a protocol state?** Cache behaviour, EFLAGS/Jcc timing, NVLink congestion, AMX latency, and encrypted frame size are all treated as sufficient on their own `(cards 1-23, 1-25, 2-3, 1-21)`.
- **Is a known side channel practical with consumer hardware and under realistic noise?** The contribution is the re-run, not the channel: a smartphone microphone, a Zoom call, and a user's own typing rhythm `(cards 1-22, 2-2, 2-4)`.
- **Which seam in a build, package, or module pipeline lets an attacker act without touching the victim's code, and what property would close it?** Packaging order, dependency resolution, module interfaces, and runtime tool/context provenance are the seams; transparency, validity, separation, and provenance are the proposed closures `(cards 2-16, 2-18, 2-17, 2-25, 2-24)`.

A parallel thread — fuzzing, static analysis, and repair — asks how to get input past parsers and protocol layers to deep code, and how to know a crash actually confirms the vulnerability rather than a static match `(cards 2-6, 2-9, 2-10, 2-15, 2-14)`.

## 2. Evidence and scale baseline

Counts are readings of the cards' Evidence fields. Where an abstract is silent, the row says so; silence is not evidence of absence.

| dimension | what appears in this corpus | how many of the 50 | example cards |
|---|---|---|---|
| attack vs defence vs measurement vs benchmark | 17 attack papers; 9 defence papers; 5 benchmark/measurement papers; 12 fuzzing/static-analysis/repair tooling papers; 7 surveys, SoKs, or taxonomies. Every abstract states its own type | in the abstracts of 50/50 cards (type is always stated); the split is 17 / 9 / 5 / 12 / 7 | 1-16 (attack), 1-3 (defence), 1-14 (benchmark), 2-10 (tooling), 2-17 (SoK) |
| number of models/systems evaluated | an explicit count of two or more models, systems, devices, or deployment sites — most often 2 to 8 models, or tens to hundreds of deployment sites | in the abstracts of 16/50 cards; 1/50 reports a single case only; the other 33/50 give no count, including all seven surveys | 1-13 (13 held-out models), 1-19 (8 LLMs), 1-21 (30 routers, 80 networks), 2-19 (450 domains) |
| threat-model explicitness | the abstract states the attacker's position or capability as a distinct claim — what access, knowledge, placement, or equipment the attacker has | in the abstracts of 14/50 cards; the remaining 36 either imply the threat through the attack description or do not discuss it | 1-7 (attack defined by authority), 1-21 (off-path attacker despite WPA2/WPA3), 2-3 (no privilege, no proximity, no confidence scores), 1-14 (a stated threat model as a deliverable) |
| whether an adaptive or stronger attacker is evaluated | defence side: the defence is tested on attacks outside its development set or rewritten to evade it (4/50). Attack side: the attack is produced by a search or optimizer rather than a fixed hand-written artefact (7/50) | in the abstracts of 11/50 cards | 1-3 (attacks more sophisticated than training), 1-7 (detection-optimized rewrites), 1-10 (automated variant search), 1-1 and 1-17 (gradient-optimized attack), 2-20 (RL-discovered attack policy) |
| whether a false-positive or utility cost is reported | a number for benign inputs: utility retained, benign rejection rate held by a threshold, or runtime overhead on ordinary traffic | in the abstracts of 6/50 cards; two further cards report a benign-input latency figure only, with no effect on benign correctness | 1-3 (utility similar to pre-defence), 1-4 (little or no utility impact), 1-12 (benign queries maintained by threshold), 2-19 (hundreds of ms on first load, negligible on reload) |
| whether a real deployment or commodity hardware is used | real networks, real consumer devices, real chips, real production corpora, or physical robots | in the abstracts of 10/50 cards; the rest evaluate in simulation, on synthetic corpora, or say nothing about the platform | 1-21 (80 real Wi-Fi networks), 1-22 (smartphone microphone, Zoom), 2-24 (physical-world manipulation tasks), 2-14 (OSS-Fuzz corpus) |
| whether a baseline defence is compared | a named existing defence is run against the same attack or the same inputs | in the abstracts of 5/50 cards. Many more compare against a baseline attack or a baseline tool, which is a different claim | 1-7 (detection-and-removal and tool-policy defences), 1-8 (instruction hierarchy), 1-9 (state-of-the-art defences), 2-18 (three Java mitigations) |
| whether code or data are released | the abstract states a public code, data, or harness release | in the abstracts of 6/50 cards; the other 44 do not say | 1-3, 1-4, 1-11, 1-14 (open harness and leaderboard), 1-18, 2-19 (open-sourced prototype) |

Metadata note: 41/50 carry arXiv-only venue metadata and 9/50 name a venue (CCS 3, NeurIPS 2, USENIX Security 1, S&P 1, ICML 1, ICLR 1). The bar below is therefore a bar drawn from preprints for most of the corpus.

## 3. The implied checklist

1. **State the attacker's capability as a sentence a reader could falsify** — what they can write, read, execute, time, or observe, and what they cannot. A reviewer in this direction needs the boundary before they can judge whether your result means anything outside your setup — `(cards 1-7, 1-21, 2-3, 1-14)` — if missing, the likely objection is "I cannot tell whether this attacker exists in my deployment, so I cannot use this result".
2. **Evaluate against an attacker that is optimized against you or held out from your development set** — a defence scored only on the attacks it was tuned on measures your tuning, not your defence — `(cards 1-3, 1-7, 1-10, 1-1)` — if missing: "the evaluation set is the training set with different punctuation".
3. **Report the cost on benign inputs, not only the attack success rate** — a detector with no false-positive number is not deployable, and the field has been burned by defences whose only stated cost is "negligible" — `(cards 1-3, 1-4, 1-12, 1-11)` — if missing: "what happens to my legitimate traffic?"
4. **Evaluate on at least two model families or systems, or explain why one is representative** — transfer and generality are the two claims this literature most often makes and least often supports — `(cards 1-12, 1-13, 1-16, 1-19, 2-15)` — if missing: "single-model result; I expect this to move on the next checkpoint".
5. **Compare against a named baseline defence, not only against no defence** — beating the undefended model is not a contribution; beating the obvious existing defence is — `(cards 1-7, 1-8, 1-9, 2-18)` — if missing: "why is this better than the defence already in the stack?"
6. **State the deployment assumptions that make the defence applicable** — context length, where in the stack it sits, what it needs to see, what latency budget it consumes, and whether it needs model weights — `(cards 1-14, 1-15, 1-21, 2-19)` — if missing: "this was evaluated in a regime unlike any deployment, so the number is an upper bound".
7. **Report the operational cost you impose, in the units the operator pays in** — milliseconds per request, memory, page-load time, or GPU time, measured on ordinary traffic and not only on the attack — `(cards 1-15, 1-24, 2-19)` — if missing: "no overhead number, so I assume it is prohibitive".
8. **Report what your method does not cover, at the granularity of the component it misses** — the strongest papers here name the sub-case that still gets through and give its rate — `(cards 1-7, 1-9, 1-12)` — if missing: "the evaluation targets the easy component; the weak one is untested".
9. **Separate the measurement stack from the result** — system prompt, chat template, scorer, judge model, query budget, and decoding settings belong in the paper, because in adversarial evaluation the harness moves the number — `(cards 1-14, 1-13, 1-9)` — if missing: "your rate is a property of your harness and will not reproduce".
10. **Give every rate a base** — N cases, N queries, N attempts, N seconds, N iterations; a percentage with no denominator cannot be compared to anything in this corpus — `(cards 1-10, 1-16, 1-19, 1-21)` — if missing: "83.9% of what?"
11. **Test the input distribution you claim, not the convenient one** — long contexts, layered protocol formats, realistic noise, real user behaviour; several papers here exist only because the short clean version overstated the defence — `(cards 1-9, 2-6, 2-4)` — if missing: "the evaluation conditions are the ones your method was designed for".
12. **Confirm the vulnerability or the fix by execution, not by similarity or static match** — a matched vulnerable function is not a triggerable bug, and a patch similar to the reference patch is not a fix — `(cards 2-10, 2-15, 2-14, 2-6)` — if missing: "your hit rate is a false-positive rate in disguise".
13. **Disclose a live vulnerability before you publish the exploit** — the one card in this corpus that breaks a deployed protocol states who was told and what mitigation was proposed; a reviewer will ask — `(cards 1-21)` — if missing: "was any vendor contacted, and on what timeline?"
14. **Release the artefact, or state precisely what a reader would need to rebuild it** — code, prompts, data, harness; where release is impossible, say what was withheld and why — `(cards 1-3, 1-4, 1-11, 1-14)` — if missing: "not reproducible, and in this literature that usually means not comparable".
15. **Distinguish "we found a vulnerability" from "we can find this class of vulnerability"** — a single demonstrated case is a case study, and the abstract should say so rather than generalizing — `(cards 2-7, 2-6, 1-10)` — if missing: "one instance, presented as a method".

## 4. The ten questions a reviewer will ask in this direction

1. **"What exactly can your attacker do, and what can they not do?"** — A good answer is one sentence of capabilities plus one sentence of exclusions, placed before the first result.
2. **"Was this defence developed on the attacks you tested it on?"** — A good answer names the held-out or optimized attacker and reports the number on it separately from the development set.
3. **"What does this cost me on legitimate traffic?"** — A good answer gives a false-positive or utility number with its denominator, plus the latency at the operating threshold.
4. **"Why these models, and would this hold on the next release?"** — A good answer gives at least two families and says which result is architecture-specific.
5. **"What is the baseline, and why is it the right one?"** — A good answer is a named existing defence run by you on your own inputs, not a number quoted from its paper.
6. **"Where does this sit in a real system, and what has to be true for it to run?"** — A good answer is a deployment diagram in words: input path, trust boundary, latency budget, and failure mode when the component is unavailable.
7. **"Which part of your threat does this not address?"** — A good answer names the uncovered component and gives its measured success rate rather than describing it as future work.
8. **"Is your number a property of the attack or of your evaluation harness?"** — A good answer pins prompt, template, scorer, and query budget, and shows the number under at least one perturbation of the harness.
9. **"Can I reproduce this from what you have written?"** — A good answer is a released artefact, or an explicit list of what was withheld and the access conditions.
10. **"What did you learn that survives the failure of your own method?"** — A good answer is a mechanism-level statement — which channel, which observable, which design property — that stays true even if the specific defence is broken.

## 5. Self-audit table

| # | Check (from §3) | Venue bar in this corpus | My draft | Gap | Action |
|---|---|---|---|---|---|
| 1 | Attacker capability stated as falsifiable sentences (what they can write, read, execute, time, observe; what they cannot) | 14/50 state it explicitly in the abstract; the mode in this corpus is to imply it | | | |
| 2 | Evaluation against an optimized or held-out attacker, not the fixed set used for development | 11/50 report one; defence-side papers are the minority at 4/50 | | | |
| 3 | Benign-input cost reported (false-positive rate or utility), with denominator | 6/50 report it; 2 more report latency only | | | |
| 4 | At least two model families or systems evaluated | 16/50 give an explicit count of two or more | | | |
| 5 | A named baseline defence compared on your own inputs | 5/50 | | | |
| 6 | Deployment assumptions stated (stack position, trust boundary, latency budget, access to weights) | 4/50 in the abstracts `(cards 1-14, 1-15, 1-21, 2-19)` | | | |
| 7 | Operational cost in operator units (ms/request, memory, page load) measured on ordinary traffic | 3/50 in the abstracts `(cards 1-15, 1-24, 2-19)` | | | |
| 8 | Uncovered component named, with its measured rate rather than "future work" | 3/50 `(cards 1-7, 1-9, 1-12)` | | | |
| 9 | Measurement stack pinned (prompt, template, scorer, judge, query budget, decoding) | 2/50 in the abstracts `(cards 1-14, 1-13)` | | | |
| 10 | Every rate carries a base (N cases, queries, attempts, seconds, iterations) | 4/50 in the abstracts `(cards 1-10, 1-16, 1-19, 1-21)` | | | |
| 11 | Evaluated on the realistic input distribution (long context, layered format, real noise, real user behaviour) | 3/50 in the abstracts `(cards 1-9, 2-6, 2-4)` | | | |
| 12 | Vulnerability or fix confirmed by execution, not by static match or code similarity | 3/50 in the abstracts `(cards 2-10, 2-14, 2-6)` | | | |
| 13 | Responsible-disclosure timeline stated for a live vulnerability | 1/50 `(cards 1-21)` | | | |
| 14 | Artefact released, or withholding stated with access conditions | 6/50 state a release | | | |
| 15 | Claim scoped to what was shown (single case vs a class of vulnerabilities) | The corpus splits: some papers say "preliminary insights", others generalize from one demonstration `(cards 2-7, 2-16)` | | | |

## 6. What not to copy

- **The fixed attack suite as the whole evaluation.** Most of the detection and defence cards are scored on a named set of attacks drawn from prior work, with no attacker that reacts to the defence. It is the single most common weakness in this corpus (only 11/50 report anything adaptive), and the papers that do report an adaptive result are the ones that change how a defence is judged `(cards 1-1, 1-3, 1-7, 1-10)`.
- **A defence reported as attack-success-rate alone.** Six of fifty abstracts give a benign-side number. Reporting "ASR falls to under X%" with no false-positive rate, no latency, and no statement of the threshold leaves the reviewer to assume the worst about your operating point `(cards 1-3, 1-4, 1-12)`.
- **A threat model that is only the name of an attack family.** "We defend against prompt injection" states a scenario, not a capability. The cards that spell out the attacker are also the ones a reader can check against their own setting `(cards 1-21, 2-3, 1-7)`.
- **Clean-condition numbers presented as deployment numbers.** Several papers in this corpus exist precisely because an earlier clean-condition number overstated the result; short contexts, lab acoustics, and synthetic input formats all flatter the method. If your evaluation conditions are your design conditions, say so `(cards 1-9, 2-4, 2-6)`.
- **A single demonstration, written as a method.** One vulnerable application, one target binary, or one CVE is a case study. The honest cards in this corpus label that as preliminary and put the large-scale evaluation in the plan `(cards 2-7, 2-16, 2-6)`.
