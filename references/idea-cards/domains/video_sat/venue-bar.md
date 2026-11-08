# Venue bar — video streaming and satellite/LEO transmission (50 papers, 2023–2026)

This file is a comparison bar for someone drafting a paper or an experiment plan on adaptive video streaming, satellite/LEO transmission, and QoE: it states what the 50 papers in this corpus actually do, so a draft can be audited against it before submission.

It is derived only from the abstracts and the abstract-level idea cards in this folder. Where an abstract is silent, truncated, or omitted a detail, this file says "the abstracts do not say" and does not fill the gap from outside knowledge.

Card citations use the convention `(cards 1-7, 2-13)`: the first number is the batch file, the second is the card number inside that file.

## 1. What these papers actually study

- **Choosing a bitrate under a link the controller cannot see.** The dominant question is how to pick a representation when throughput is volatile, unknown, or non-stationary, whether the controller is control-theoretic, rule-based, imitation-learned, or RL-learned `(cards 1-1, 1-3, 1-6, 1-9, 2-16, 2-18, 2-19, 2-21)`.
- **Measuring LEO/Starlink behaviour and turning handover into an adaptation signal.** A second cluster measures real satellite access links and then modifies the player, the pacing queue, or the handoff decision itself `(cards 1-7, 1-11, 1-12, 1-23, 2-5, 2-6, 2-10)`.
- **Treating transport and congestion control as part of the streaming system.** QUIC implementations, BBR versus CUBIC, gQUIC versus TCP, multipath scheduling, and WebRTC pacing are studied as causes of QoE, not as fixed substrate `(cards 1-5, 2-2, 2-7, 2-8, 2-10, 2-14)`.
- **Changing the unit of transmission: learned, neural, multiple-description, and generative codecs.** These papers argue that the chunk or layer is the wrong resilience unit and replace it with neural weights, independent descriptions, semantic packets, or diffusion latents `(cards 1-2, 1-6, 1-13, 1-16, 1-19, 2-3, 2-12)`.
- **Building or validating a QoE model.** A smaller cluster asks what QoE is made of and whether a network-only signal can predict it, using engagement models, subjective databases, and no-reference indicators `(cards 1-4, 1-24, 1-25, 2-17, 2-23)`.
- **Immersive video where the viewport or the frame, not the segment, is the budget unit.** 360-degree, volumetric, and XR papers allocate bandwidth to what the user is looking at or to the frames that matter `(cards 1-8, 1-14, 1-17, 2-19, 2-22)`.
- **Task-critical real-time video with a human or robot in the loop.** Teleoperation, drone video, remote vehicle control, and remote music performance evaluate the task outcome, not only the picture `(cards 1-8, 1-15, 1-18, 1-20, 1-21, 1-24, 2-8, 2-9)`.
- **The satellite system layer and the delivery infrastructure beneath streaming.** Beam design, DVB versus 5G NR NTN, payload encryption, satellite-terrestrial offloading, P2P/CDN, edge caching, and IPFS sit under the same QoE claim `(cards 1-22, 2-1, 2-9, 2-11, 2-15, 2-18, 2-24, 2-25)`.

## 2. Evidence and scale baseline

Counting rule: a dimension counts only when the abstract states it. A truncated abstract (visible as a cut-off sentence in the card) and a silent abstract are recorded as "the abstracts do not say", never as "the paper does not do it". Every number below is a count of abstracts, not a universal fact about the venue.

| dimension | what appears in this corpus | how many of the 50 | example cards |
|---|---|---|---|
| Evaluation substrate: real testbed, deployment, or hardware | Physical 5G/optical/satellite links, on-orbit payloads, production systems, real flight recordings, recruited testers, and deployed A/B tests | in the abstracts of 19/50 cards | 1-7, 1-18, 2-8, 2-20, 2-15 |
| Evaluation substrate: simulation or numerical model only | ns-3 system-level simulation, link-level simulation, and pure numerical optimisation with no physical link | in the abstracts of 9/50 cards | 1-1, 1-13, 1-14, 2-2, 2-11 |
| Evaluation substrate: traces or recorded measurements | Replayed throughput traces, production session logs, public measurement corpora, vendor traces | in the abstracts of 12/50 cards | 1-5, 1-10, 1-12, 2-7, 2-18 |
| Evaluation substrate: emulated impairments | NetEm with a Gilbert-Elliott loss model, Mininet with MP-DCCP, trace-driven emulation | in the abstracts of 4/50 cards | 1-24, 2-10, 2-12, 2-14 |
| Evaluation substrate: not stated | The abstract reports "experiments" or "results" without saying on what | in the abstracts of 9/50 cards | 1-2, 1-3, 1-6, 2-13, 2-21 |
| Link technology: satellite / LEO / GEO | Starlink, Kuiper, ViaSat, HughesNet, generic LEO relays, GEO production networks, satellite-terrestrial integration, LEO 5G IAB | in the abstracts of 18/50 cards | 1-7, 1-12, 2-2, 2-7, 2-11 |
| Link technology: 5G, as an evaluated setting | Real 5G testbeds, 5G FWA, 5G urban emulation, operational 5G multipath, 5G NR NTN | in the abstracts of 9/50 cards | 1-14, 1-20, 2-12, 2-20, 2-23 |
| Link technology: 4G / LTE | 4G rural emulation, Ghent 4G bandwidth traces, 4G/5G monitoring | in the abstracts of 3/50 cards | 1-24, 2-18, 2-23 |
| Link technology: Wi-Fi | Wi-Fi as one leg of a multipath connection only | in the abstracts of 1/50 card | 2-8 |
| Link technology: none named | "Internet fluctuations", "diverse network conditions", or no link at all | in the abstracts of at least 9/50 cards | 1-1, 1-9, 2-16 |
| Scale: explicit number of traces, sessions, users, participants, or operators | 1M+ households in 85 countries; 375 trials; 179 videos and 54 participants; 2k+ sessions; 100k+ peer servers; 18 operators | in the abstracts of 8/50 cards | 1-7, 1-24, 1-25, 2-7, 2-15 |
| Baselines: names a specific competing system or configuration | RobustMPC; ADJSCC and three named semantic baselines; DCVC-RT; CUBIC/NewReno/BBR; TCP versus gQUIC; WebRTC default; BOLA, BB, RB, Pensieve; FlyCache | in the abstracts of 10/50 cards | 1-11, 1-13, 2-2, 2-16, 2-18 |
| Baselines: "state of the art" with no name | "state-of-the-art solutions", "existing ABRs", "comparative schemes", "baseline approaches" | in the abstracts of 10/50 cards | 1-2, 1-6, 2-1, 2-6, 2-19 |
| Metrics: QoE named as objective or measured quantity | QoE as the scalar to maximise, or as a named metric family (often undefined in the abstract) | in the abstracts of 26/50 cards | 1-12, 2-12, 2-19, 2-25 |
| Metrics: rebuffering, stall, or freeze | Rebuffering time, stall count, freeze rate, severe-session ratio, stall ratio | in the abstracts of 13/50 cards | 1-12, 1-24, 2-6, 2-12 |
| Metrics: latency as a measured quantity | End-to-end latency, video latency, playback latency, P99.9 frame completion time | in the abstracts of 6/50 cards | 1-18, 1-20, 2-2, 2-8 |
| Metrics: PSNR / SSIM / VMAF | Objective full-reference quality, sometimes with FVD or MSE | in the abstracts of 4/50 cards | 1-13, 1-24, 2-3, 2-20 |
| Metrics: energy or power | Energy consumption, long-term energy constraint, payload power, edge-server energy | in the abstracts of 5/50 cards | 1-10, 1-17, 2-9, 2-25 |
| Human or subjective component | Usability tests, human task performance, a 54-participant subjective study, correlation with subjective MOS, a user viewing-behaviour dataset | in the abstracts of 5/50 cards | 1-21, 1-24, 1-25, 2-17, 2-22 |
| Ablation or component analysis | Explicit component analysis, matched synthetic-noise control, 20-variant model benchmark | in the abstracts of 3/50 cards | 1-12, 1-15, 2-23 |
| Artifact released | Code and data, GitHub repository, dataset and visualisation tool | in the abstracts of 4/50 cards | 1-23, 1-24, 2-22, 2-24 |

## 3. The implied checklist

1. **Name the link and say how its numbers were obtained.** A reviewer cannot judge a streaming result without knowing whether the throughput came from a trace, a measurement, an emulator, or a formula — provenance is what makes the result transferable `(cards 1-7, 1-24, 2-2, 2-7, 2-20)`. *If missing, the objection is:* "Which network is this, and why should I believe it is mine?"
2. **Ground the evaluation in at least one trace or measurement from the regime you generalise to.** The corpus repeatedly shows that the satellite regime differs from terrestrial traces in switches, tails, and handover `(cards 1-5, 1-12, 2-6, 2-7, 2-18)`. *If missing, the objection is:* "This was tuned on synthetic bandwidth and never saw a handover."
3. **Compare against at least two competing controllers, one of which you did not write.** A single comparison cannot separate your mechanism from your tuning `(cards 1-11, 1-13, 2-2, 2-16, 2-18)`. *If missing, the objection is:* "This is one system against one strawman."
4. **Include a strong non-learned baseline when the contribution is learned.** Rule-based and MPC controllers remain competitive and are the reference point reviewers use `(cards 1-11, 2-2, 2-16, 2-19)`. *If missing, the objection is:* "Did you beat BOLA or just beat an untuned learner?"
5. **Write the QoE model term by term and justify every weight.** The corpus contains many QoE claims and few stated derivations; where subjective data exists it is used to check the model `(cards 1-25, 2-17, 1-10, 1-17)`. *If missing, the objection is:* "Your result is an artefact of your weights."
6. **Report the tail, not only the mean.** Satellite papers in this corpus explicitly separate average QoE from severe-session behaviour `(cards 1-11, 1-12, 2-6, 1-24)`. *If missing, the objection is:* "A good average with 20% severe sessions is not a streaming system."
7. **Report latency as a measured number and state where it is measured.** Glass-to-glass, player-side, and transport-side latency are different claims `(cards 1-18, 1-20, 2-2, 2-8, 2-10)`. *If missing, the objection is:* "Low latency relative to what, measured where?"
8. **Evaluate during handover, blockage, or outage, not only on a stationary link.** Handover is the event that breaks learned ABR in the LEO work `(cards 1-11, 1-12, 1-23, 2-6, 2-12)`. *If missing, the objection is:* "Your controller has never seen the event your paper is about."
9. **Validate any perceptual claim with human or subjective data.** Where the claim is about perceived quality, the corpus's strong examples bring people in `(cards 1-25, 1-24, 1-21, 2-17)`. *If missing, the objection is:* "You are asserting perception from a bitstream metric."
10. **Report what the gain costs.** Bitrate, buffer, energy, latency, and QoE are traded explicitly in the stronger satellite papers `(cards 1-12, 2-6, 1-10, 1-20)`. *If missing, the objection is:* "What did you give up, and to whom?"
11. **State the number of trials, sessions, or participants, and the spread.** Single aggregated percentages are the norm in this corpus; the exceptions state their denominator `(cards 1-24, 1-25, 2-7, 1-11)`. *If missing, the objection is:* "Averaged over how many runs, with what variance?"
12. **State what happens outside the training or tuning distribution.** Several papers define an explicit severe or failure regime rather than assuming the tested range is the range `(cards 1-11, 1-12, 2-8, 2-3)`. *If missing, the objection is:* "What happens on the link profile you did not test?"
13. **Report overhead: training cost, inference time, compute, or added bandwidth.** Embedded and satellite settings make this a first-class constraint `(cards 1-9, 2-23, 2-9, 1-12)`. *If missing, the objection is:* "This cannot run on the device you target."
14. **Ablate the component you credit for the gain.** Without it, the mechanism and the extra capacity are indistinguishable `(cards 1-12, 1-15, 2-23)`. *If missing, the objection is:* "Which of your three parts is doing the work?"
15. **Release code, data, or traces, or give enough detail to rebuild the setup.** The corpus's reproducible examples release an artifact or pin every parameter `(cards 1-23, 1-24, 2-22, 2-24)`. *If missing, the objection is:* "I cannot check this, so I cannot recommend acceptance."

## 4. The ten questions a reviewer will ask in this direction

1. **"What exactly is the network trace, and why is it the right one for your claim?"**
   A good answer: a named regime (Starlink, LEO, GEO, 5G FWA, 4G rural), its provenance, the collection window, and a per-condition breakdown rather than one pooled number.
2. **"Where do the weights in your QoE model come from?"**
   A good answer: the formula, the source of each coefficient (prior work, fitting on subjective scores, or an explicit sensitivity sweep), and a result showing the ranking survives reasonable reweighting.
3. **"Show me the worst 5% of sessions, not the mean."**
   A good answer: a tail metric (worst-5% rebuffering, severe-session rate, P99 stall), reported alongside the mean, with the trade stated.
4. **"Which controller in your comparison did you not write, and did it run on the same input?"**
   A good answer: at least one external controller, same traces, same encoding ladder, same buffer, same QoE model, plus a tuned-rule baseline.
5. **"Where is latency measured, and does it include client decode and render?"**
   A good answer: the measurement point named (sender, transport, player, or glass-to-glass), the instrumentation, and the clock/synchronisation method.
6. **"What does your system do across a handover or an outage?"**
   A good answer: a time-series around the event, the recovery time, whether the buffer absorbed it, and the worst observed event rather than the average.
7. **"Your claim is about perceived quality — where are the human ratings?"**
   A good answer: a subjective study or a validated objective predictor with its correlation to MOS, and an explicit statement of which claim the objective metric can and cannot support.
8. **"Over how many runs or sessions is that percentage averaged, and what is the spread?"**
   A good answer: trial count, seeds or session count, confidence intervals or interquartile range, and a statement that the difference exceeds run-to-run variation.
9. **"What does it cost to run, and what does it give up?"**
   A good answer: training and inference cost, added bandwidth or buffer, energy, and the measured loss in the metric that was traded away.
10. **"Can I rebuild this from the paper?"**
    A good answer: code, traces or a generator, hyperparameters, encoding ladders, and the exact baseline versions and configurations.

## 5. Self-audit table

| # | Check (from §3) | Venue bar in this corpus | My draft | Gap | Action |
|---|---|---|---|---|---|
| 1 | Name the link and how its numbers were obtained | 18/50 involve a satellite link; 9/50 name no link at all; 9/50 report simulation only `(1-7, 1-12, 2-2)` | | | |
| 2 | Ground the evaluation in a trace or measurement from the claimed regime | 12/50 use traces or recorded measurements; 19/50 report a real testbed or deployment `(1-5, 2-7, 2-18)` | | | |
| 3 | Compare against at least two competing controllers | 10/50 name a specific competitor; 10/50 say "state of the art" without naming it `(1-11, 2-2, 2-16)` | | | |
| 4 | Include a strong non-learned baseline | RobustMPC kept in the loop, CUBIC/NewReno/BBR swept, BOLA/BB/RB/Pensieve compared `(1-11, 2-2, 2-16)` | | | |
| 5 | Justify the QoE model term by term | 26/50 name QoE as the objective; 5/50 bring human or subjective data; the abstracts never state the weights `(1-25, 2-17)` | | | |
| 6 | Report the tail, not only the mean | 13/50 mention stall, rebuffer or freeze; the stronger ones report worst-5% and severe-session rate `(1-11, 1-12, 2-6)` | | | |
| 7 | Report latency as a measured number and say where | 6/50 report a measured latency `(1-18, 1-20, 2-2, 2-8)` | | | |
| 8 | Evaluate across handover, blockage, or outage | 7/50 evaluate handover or handoff, 5 of them satellite `(1-11, 1-12, 1-23, 2-6)` | | | |
| 9 | Validate perceptual claims with human or subjective data | 5/50 use human data; only one reports a new 54-participant subjective study `(1-21, 1-24, 1-25, 2-22)` | | | |
| 10 | Report what the gain costs | 1.8% QoE cost for a tail gain; 0.13% bitrate for 39% less rebuffering; energy and flight-time costs reported `(1-12, 2-6, 1-10, 1-20)` | | | |
| 11 | State trials or sessions and the spread | 8/50 state an explicit scale figure: 1M+ households, 375 trials, 179 videos and 54 participants, 2k+ sessions `(1-7, 1-24, 1-25, 2-7)` | | | |
| 12 | State behaviour outside the tuned distribution | Severe/failure regimes are defined explicitly and one method limits its claim to disjoint paths `(1-11, 1-12, 2-8, 2-3)` | | | |
| 13 | Report overhead: training, inference, compute, bandwidth | Training complexity and inference time, onboard vs edge inference latency, payload power `(1-9, 2-23, 2-9)` | | | |
| 14 | Ablate the component credited for the gain | 3/50 show an explicit ablation or variant analysis `(1-12, 1-15, 2-23)` | | | |
| 15 | Release code, data, or traces, or give rebuild detail | 4/50 release code, data, or a dataset `(1-23, 1-24, 2-22, 2-24)` | | | |

## 6. What not to copy

- **Simulation-only evaluation of a claim about perception or user experience.** Nine abstracts in this corpus evaluate only in a simulator or a numerical model, and several of those still speak about QoE or visual quality as if a user had been observed `(cards 1-1, 1-13, 1-14, 2-1, 2-3)`. A 2026 reviewer reads that as a modelling paper, not a streaming result, and will ask for at least an emulated or traced link before accepting a perceptual claim.
- **Naming "state of the art" instead of a baseline.** Ten abstracts compare against an unnamed "state of the art", "existing ABRs", or "baseline approaches" `(cards 1-2, 1-6, 2-1, 2-6, 2-19)`. This is no longer accepted: the reader cannot tell whether the comparison was tuned, and the gain cannot be attributed.
- **Reporting one aggregated percentage with no denominator or spread.** Numerous abstracts report a single improvement figure with no trial count, no seed count, and no variance `(cards 1-3, 1-6, 1-9, 1-10)`. The corpus's more defensible results either state their scale or report a tail `(cards 1-24, 1-25, 1-11)`, and that is the bar to copy.
- **A hand-written QoE weighted sum treated as ground truth.** QoE is named as the objective in 26 abstracts, but the weights and their provenance are not stated in any abstract, and only a few connect the model to human scores `(cards 1-1, 1-10, 1-17, 2-17)`. Presenting such a sum without a sensitivity check makes every downstream conclusion conditional on an unstated choice.
- **Optimising the mean and calling the result robustness.** Several learned controllers report average QoE gains while the satellite papers show that the average hides severe sessions `(cards 1-11, 1-12, 2-6)`. Reporting a mean-only improvement as robustness is the specific move a reviewer in this direction now looks for and rejects.
