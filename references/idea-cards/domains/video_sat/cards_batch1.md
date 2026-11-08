### 1. A control-theoretic simplification of adaptive bitrate (ABR) video streaming (arXiv 2023)
- **Problem:** ABR over HTTP raises numerous delicate questions yet lacks a principled, elementary control design for bitrate and buffer level.
- **Assumption:** The bitrate/buffer dynamics are flat, so a feedforward trajectory can be planned once and residual mismatch is small enough for a feedback loop to absorb.
- **Mechanism:** Flatness-based feedforward control for bitrate and buffer level, loop closing via the HEOL setting that mixes model-free and flatness-based control, plus a closed-form bandwidth estimate from algebraic identification.
- **Evidence:** Analysis plus computer experiments reported with Quality of Experience metrics; no numbers given.
- **Boundary:** not stated in abstract
- **Stealable move:** Estimate the one unknown parameter your controller needs in closed form from the recent input-output history, instead of training a predictor for it.
- **Pitch:** Three elementary control-theoretic answers turn a delicate heuristic problem into textbook feedforward-plus-feedback.

### 2. Semantic-Aware Adaptive Video Streaming Using Latent Diffusion Models for Wireless Networks (arXiv 2025)
- **Problem:** Constant and adaptive bitrate streaming waste bandwidth and storage and degrade QoE relative to what the content actually requires.
- **Assumption:** I-frames can be compressed into a diffusion latent and reconstructed at the receiver at high visual quality, with B/P frames as cheap refinement metadata.
- **Mechanism:** Latent diffusion models embedded in the FFmpeg pipeline compress I-frames to a latent space, while retained B-frames and P-frames act as adjustment metadata refined by denoising and Video Frame Interpolation.
- **Evidence:** Experimental results; outperforms state-of-the-art solutions on QoE and resource efficiency; no numbers given.
- **Boundary:** not stated in abstract
- **Stealable move:** Transmit a generative latent for the anchor frames and only cheap residual metadata for the in-between frames, letting the receiver reconstruct rather than receive.
- **Pitch:** Generative latents plus interpolation metadata give scalable real-time streaming for 5G and post-5G networks.

### 3. Imitation Learning for Adaptive Video Streaming with Future Adversarial Information Bottleneck Principle (arXiv 2024)
- **Problem:** RL-based ABR improves average QoE but fluctuates within individual sessions, and exploration is inefficient.
- **Assumption:** The offline optimal bitrate plan computed with future throughput is a usable expert, and compressing state to action-relevant information removes the future-info leakage it induces.
- **Mechanism:** Imitation learning from an MINLP expert solved by an alternative optimization algorithm, paired with an adversarial information bottleneck whose adverse expert is an MPC policy with no future information.
- **Evidence:** Experimental results; 7.30% average QoE improvement and a 30. (abstract truncated)
- **Boundary:** not stated in abstract
- **Stealable move:** When your oracle expert sees the future, add a second expert that cannot see it and penalize any representation that lets you tell the two apart.
- **Pitch:** Learn from the offline optimum without inheriting its clairvoyance.

### 4. DIGITWISE: Digital Twin-based Modeling of Adaptive Video Streaming Engagement (arXiv 2025)
- **Problem:** ABR algorithms assume all users react alike to artifacts and network issues, ignoring individual sensitivity.
- **Assumption:** A user's engagement in a session is predictable from their own past viewing sessions plus the streaming events of the current one.
- **Mechanism:** A per-user digital twin trained by supervised learning on session events, plus a unified model, both implemented with XGBoost.
- **Evidence:** Empirical evaluation on viewing sessions (data source not stated in abstract): reduces engagement prediction error by up to 5.8% over non-user-aware models and yields up to 8.6% average engagement increase.
- **Boundary:** not stated in abstract
- **Stealable move:** Fit one model per entity, then fit a second model that pools them, and report the per-entity gain as the value of personalization.
- **Pitch:** Engagement is personal, and a digital twin of each viewer can predict and then raise it.

### 5. Video Streaming Over QUIC: A Comprehensive Study (arXiv 2025)
- **Problem:** With many QUIC implementations in use, it is unclear how their congestion control actually affects HTTP adaptive streaming QoE.
- **Assumption:** Trace-driven single-server multi-client experiments expose the effects that matter in practice.
- **Mechanism:** Trace-driven experiments sweeping QUIC implementations, congestion control, queuing strategies, and cooperative versus competitive streams across VoD and low-latency live scenarios.
- **Evidence:** Trace-driven experiments; no numbers given; findings are qualitative (same CC across implementations produces significant performance variation).
- **Boundary:** not stated in abstract
- **Stealable move:** Hold the algorithm fixed and vary only the implementation, so any measured difference is attributable to engineering rather than to design.
- **Pitch:** Identical congestion control is not identical performance, so ABR and transport need a cross-layer design.

### 6. EVAN: Evolutional Video Streaming Adaptation via Neural Representation (arXiv 2024)
- **Problem:** With conventional codecs the bitrate cannot be changed once the decision is made, producing either wasted bandwidth or frequent rebuffering.
- **Assumption:** NeRV weights can be transmitted partially and still reconstruct a frame without decoding adjacent frames.
- **Mechanism:** Soft actor-critic reinforcement learning adaptively selects which NeRV model portions to transmit, combined with progressive playback to avoid rebuffering.
- **Evidence:** Experiments; 50% reduction in rebuffering and nearly 20% . (abstract truncated)
- **Boundary:** not stated in abstract
- **Stealable move:** Pick a representation that degrades gracefully when only part of it arrives, so transmission can be trimmed after the decision rather than before.
- **Pitch:** Neural representation turns bitrate adaptation from a one-shot choice into an adjustable dial.

### 7. A Global Perspective on the Past, Present, and Future of Video Streaming over Starlink (arXiv 2024)
- **Problem:** LEO throughput fluctuation and packet loss drive more bitrate switches and rebuffers than terrestrial networks.
- **Assumption:** Household telemetry from over one million homes in 85 countries is representative of LEO streaming behaviour generally.
- **Mechanism:** First global measurement of on-demand streaming over LEO, then manipulation of existing congestion control and ABR algorithms via simulation and real A/B tests on over one million households.
- **Evidence:** Real-world trace of over one million households across 85 countries, plus simulation and deployed A/B tests; overall quality matches traditional networks while switches and rebuffers rise; no further numbers given.
- **Boundary:** not stated in abstract
- **Stealable move:** Validate the proposed fix with an A/B test on the same population you measured, so the measurement and the intervention share a denominator.
- **Pitch:** Video and congestion control algorithms must adapt to rapidly evolving network landscapes.

### 8. LiveVV: Human-Centered Live Volumetric Video Streaming System (arXiv 2023)
- **Problem:** Volumetric video's far larger data size makes live streaming unresolved under limited bandwidth and stringent latency, though VoD versions exist.
- **Assumption:** Static and dynamic volumetric content can be processed separately, and reusing low-disparity static data plus saliency-based decimation preserves acceptable quality.
- **Mechanism:** Multi-view lightweight capture modules, scene segmentation and reuse, a volumetric adaptive bitrate algorithm (VABR), and rendering, in one holistic system.
- **Evidence:** Extensive real-world experime (abstract truncated)
- **Boundary:** not stated in abstract
- **Stealable move:** Split content into a slowly changing part sent once and a fast part sent per frame, and budget bandwidth only on the fast part.
- **Pitch:** The first holistic live volumetric video streaming system, from capture to rendering.

### 9. Improving ABR Performance for Short Video Streaming Using Multi-Agent Reinforcement Learning with Expert Guidance (arXiv 2023)
- **Problem:** Long-video ABR algorithms fail catastrophically on short video, where the controller must jointly choose which video and at which bitrate while prefetching.
- **Assumption:** The video-ID decision and the bitrate decision can be separated into two cooperating agents without losing the joint optimum, and hand-written rules are a good enough starting point.
- **Mechanism:** Multi-agent reinforcement learning with separate buffer-management and bitrate-adaptation agents, initialized by imitating hand-crafted expert rules then fine-tuned, optimizing a compound utility of QoE and bandwidth wastage.
- **Evidence:** Extensive experiments; 53.2% improvement in utility score over state of the art, with low training complexity and inference time.
- **Boundary:** not stated in abstract
- **Stealable move:** Decompose a coupled discrete choice into one agent per decision axis, and initialize every agent from hand-written rules before letting RL fine-tune.
- **Pitch:** Separate "which video" from "which bitrate" and short video streaming stops failing.

### 10. LL-GABR: Energy Efficient Live Video Streaming Using Reinforcement Learning (arXiv 2024)
- **Problem:** Live ABR QoE models ignore that on mobile devices a higher bitrate does not mean higher perceived quality, so they burn battery for no visible gain.
- **Assumption:** Perceived quality plus energy, latency, rebuffering, and smoothness can be optimized by one policy that transfers across video titles and encoding ladders without retraining.
- **Mechanism:** Deep reinforcement learning whose QoE uses perceived video quality instead of bitrate and adds energy consumption, trained to be agnostic to video, environment, and network settings.
- **Evidence:** Trace-driven experiments; up to 44% better perceptual QoE, 73% higher energy efficiency, and 11% lower net energy consumption than state of the art.
- **Boundary:** not stated in abstract
- **Stealable move:** Replace the proxy in your objective with the quantity users actually perceive, and then add back the resource cost the proxy was silently hiding.
- **Pitch:** Optimize what viewers perceive, not the bitrate, and the battery follows.

### 11. SafeLink-Agent: Agentic Maintenance for Adaptive Bitrate Controllers over Dynamic Starlink Networks (arXiv 2026)
- **Problem:** ABR controllers designed or trained for one network condition fail on newly exposed hard Starlink profiles.
- **Assumption:** An LLM can turn summarized failures into usable candidate patches, and replay verification is a sound gate for committing them.
- **Mechanism:** Failure summarization feeds an LLM-based agentic patch proposer, and replay verification decides whether each patch is safely committed, under one workflow for rule-based and learned controllers.
- **Evidence:** Real Starlink networks; RobustMPC severe-session ratio 2.60% to 0.40% and cumulative severe sessions 45 to 7 in rolling maintenance; learned controllers 39.01% to 9.79% under verified adaptive auditing.
- **Boundary:** not stated in abstract
- **Stealable move:** Ship repairs instead of retraining: let a model propose patches and admit only those that pass replay on recorded failures.
- **Pitch:** Controllers should be maintained, not redesigned, when the network underneath them changes.

### 12. SafeSABR: Risk-Calibrated Adaptive Bitrate Streaming over Starlink Networks (arXiv 2026)
- **Problem:** Learned ABR achieves high average QoE on Starlink while exposing severe session-level rebuffering that the average hides.
- **Assumption:** A safe-capacity lower bound can be computed at runtime and is conservative enough to block unsafe bitrates without destroying QoE.
- **Mechanism:** Three stages: behavior-cloning pretraining for a high-QoE prior, risk-calibrated reinforcement learning fine-tuning to cut severe-tail tendencies, and a runtime safety auditor that checks requested bitrates against safe-capacity lower bounds.
- **Evidence:** Real Starlink traces against online, prediction-assisted, and learned baselines; severe-stall sessions 22.8% to 7.2%, worst-5% session rebuffering 54.30 s to 22.68 s at a 1.8% QoE cost. (abstract truncated)
- **Boundary:** not stated in abstract
- **Stealable move:** Optimize the tail explicitly, then clamp each action against a worst-case bound computed at runtime, trading a small mean cost for a large tail gain.
- **Pitch:** Move learned ABR from average-QoE chasing toward a safer QoE-severe-risk frontier.

### 13. Goal-Oriented Semantic Communication for Wireless Video Transmission via Generative AI (arXiv 2025)
- **Problem:** Video must cross a bandwidth-constrained noisy wireless channel with both low latency and high quality.
- **Assumption:** Keyframes carry the semantics worth sending, the rest can be interpolated, and a diffusion model conditioned on channel gain can strip channel noise from the received representation.
- **Mechanism:** A semantic encoder selects keyframes and extracts semantic information, a semantic decoder reconstructs them and interpolates the full video, and an SD-based denoiser conditioned on instantaneous channel gain (SD-GSC) or a parallel version learning the gain distribution (PSD-GSC) cleans the received signal.
- **Evidence:** Simulation; versus ADJSCC, Latent-Diff DNSC, DeepWiVe, and DVST: PSNR +69%, +58%, +33%, +38%, MSE -52%, -50%, -41%, -45%, FVD -38%, -32%, -22%, -24%; unknown channel gives 17% PSNR improvement, a (abstract truncated)
- **Boundary:** not stated in abstract
- **Stealable move:** Condition the denoiser on the channel state when it is known, and on a learned channel distribution when it is not, rather than training a single blind denoiser.
- **Pitch:** Send semantics, reconstruct with a generative model, and denoise with knowledge of the channel.

### 14. Real-time Extended Reality Video Transmission Optimization Based on Frame-priority Scheduling (arXiv 2024)
- **Problem:** Real-time XR video over 5G needs simultaneously low latency and high data rate under finite radio resources.
- **Assumption:** Frames carry unequal importance, and that ordering can be exploited by the radio scheduler rather than treating packets as homogeneous.
- **Mechanism:** Models the problem as frame-priority-based radio resource scheduling, solved by a multi-step Deep Q-network framework with a CNN-based network model.
- **Evidence:** Simulation; transmission quality improved 49.9%-80.2%.
- **Boundary:** not stated in abstract
- **Stealable move:** Let the scheduler look several steps ahead at future frame value instead of deciding only from the head-of-line item.
- **Pitch:** Scheduling by frame priority, not packet order, is what real-time XR needs from 5G.

### 15. AnalogDepth: Multi-view Geometry from FPV drones under Analog Video Transmission (arXiv 2026)
- **Problem:** Analog video transmission on FPV drones creates spatially structured degradation unlike the AWGN used in standard augmentation, and it severely degrades a state-of-the-art geometry foundation model.
- **Assumption:** A bank of real recorded noise reproduces the structure that matters, so distillation trained on it transfers to unseen flights.
- **Mechanism:** Parameter-efficient student-teacher knowledge distillation adapting Depth Anything 3, with LoRA injected into the DINOv2 backbone, and real-noise injection from a noise bank compared against PSD-matched Gaussian synthesis and AWGN.
- **Evidence:** Real FPV flights; six real sequences across three indoor scenes; training with the noise bank consistently lowers per-frame depth RMSE and 3D Chamfer distance versus pretrained DA3 and both Gaussian variants; no numbers given.
- **Boundary:** not stated in abstract
- **Stealable move:** Collect the real corruption instead of synthesizing it, then ablate against a matched-statistics synthetic baseline so the gain is attributable to structure rather than to severity.
- **Pitch:** Replicating the spatial structure of real analog noise, not its power spectrum, is what makes adaptation work.

### 16. Semantic-Aware Neural Video Codec for Error-Resilient Low-Latency Transmission (arXiv 2026)
- **Problem:** Physical AI systems need low-latency, task-oriented video over unreliable channels where packets are lost.
- **Assumption:** Neural codec representations can be partitioned by semantic and feature importance into packets that remain independently decodable under loss.
- **Mechanism:** On top of DCVC-RT, a semantic- and feature-aware coding strategy splits encoded representations into importance-tiered packets on prioritized streams, an error-resilient entropy model removes inter-packet dependencies, and the system is trained end-to-end over abstracted multi-level packet erasure channels.
- **Evidence:** Experiments against baseline DCVC-RT under packet erasures; graceful degradation in less important regions while task-relevant content is better preserved; no numbers given.
- **Boundary:** not stated in abstract
- **Stealable move:** Remove dependencies between units so any one can be dropped independently, then rank units by importance and map the ranking onto transport priority.
- **Pitch:** Content-aware packet importance plus independent decodability turns packet loss into graceful degradation.

### 17. Quality of Experience Optimization for Real-time XR Video Transmission with Energy Constraints (arXiv 2024)
- **Problem:** Real-time XR is transmitted frame-by-frame with low-latency requirements and high sensitivity to fluctuation, while devices face a long-term energy budget.
- **Assumption:** Lyapunov optimization can convert the long-term energy constraint into a per-frame problem whose solution stays near the constrained optimum.
- **Mechanism:** A frame-level QoE model, Lyapunov optimization to reduce the problem to single-frame optimization, subchannel allocation, and an LSTM-based Deep Q-Network for bitrate selection.
- **Evidence:** Numerical results; average QoE improvements of 0.04 to 0.46, average video quality variation reduced 29% to 50%, frame transmission success rate improved 5% to 48% over baselines.
- **Boundary:** not stated in abstract
- **Stealable move:** Turn a long-horizon budget constraint into a per-step drift penalty so a myopic controller still respects the budget.
- **Pitch:** Frame-level QoE plus drift-based energy control makes real-time XR both smooth and sustainable.

### 18. Real-Time Transmission of Uncompressed High-Definition Video Via A VCSEL-Based Optical Wireless Link With Ultra-Low Latency (arXiv 2025)
- **Problem:** Uncompressed, unencrypted high-resolution video needs a URLLC medium with enough bandwidth to keep latency far below what codecs and radios allow.
- **Assumption:** Directly modulating the camera's serial digital interface signal on a laser's intensity yields error-free transmission without any coding.
- **Mechanism:** SDI over light fidelity: the camera's SDI output modulates the intensity of a 940 nm vertical cavity surface emitting laser over an optical wireless link.
- **Evidence:** Real experimental demonstration; error-free FHD at 2.97 Gb/s and 4K UHD at 5.94 Gb/s with measured end-to-end latency under 35 ns.
- **Boundary:** not stated in abstract
- **Stealable move:** Skip the codec entirely and transmit the raw device interface signal, so latency is set by physics rather than by encoding.
- **Pitch:** Off-the-shelf SDI components plus a VCSEL give scalable, inexpensive, sub-microsecond wireless broadcast links.

### 19. Multiple description video coding for real-time applications using HEVC (arXiv 2023)
- **Problem:** Sending the same encoded stream over several channels to survive loss costs a great deal of bandwidth on unreliable wireless links.
- **Assumption:** Two complementary descriptions plus an adaptive IDR period give comparable robustness at much lower complexity and cost than stream duplication.
- **Mechanism:** A low-complexity, low-latency two-channel Multiple Description Coding scheme with an adaptive Instantaneous Decoder Refresh frame period, compatible with the HEVC standard.
- **Evidence:** Comparative evaluation; better resistance to high packet loss rates at lower complexity; no numbers given.
- **Boundary:** not stated in abstract
- **Stealable move:** Pay redundancy once at the description level instead of duplicating the whole stream on every channel.
- **Pitch:** Robust multi-channel video without the cost of simply sending everything twice.

### 20. 5G Aero: A Prototyping Platform for Evaluating Aerial 5G Communications (arXiv 2025)
- **Problem:** Reliable high-throughput low-latency 5G for small UAVs is critical for aerial and Industry 4.0 use but remains underexplored.
- **Assumption:** A commercial off-the-shelf 5G module on a small airframe can meet 3GPP latency requirements without materially costing flight time.
- **Mechanism:** A compact 5G-optimized UAV prototype, evaluated in indoor experiments under LoS and NLoS for C2 packet latency and video latency.
- **Evidence:** Real system measurements; meets 3GPP C2 latency in both LoS and NLoS and video latency in LoS, acceptable video latency in NLoS; the 5G module causes a negligible 1% decrease in flight time.
- **Boundary:** not stated in abstract
- **Stealable move:** Report your new capability's cost against the platform's own budget (battery, weight, flight time), not only against the target metric.
- **Pitch:** Current 5G already supports advanced UAV operations, with almost no battery penalty.

### 21. Architecture Design of a Networked Music Performance Platform for a Chamber Choir (arXiv 2023)
- **Problem:** A conducted choir cannot rehearse remotely with ordinary conferencing tools, which lack the latency and audio fidelity ensemble performance requires.
- **Assumption:** Successive architectural increments, each justified by usability measurement, converge on a workable platform for medium-sized ensembles.
- **Mechanism:** Three iterative architecture steps, from a regular video conferencing platform, to dedicated NMP devices and tools, to added video transmission over professional low-latency audio and video workstations, each deployed with simultaneous usability tests.
- **Evidence:** Real deployments with qualitative and quantitative measurements; statistical analysis shows significant rehearsal-quality improvement after each iteration; no numbers given.
- **Boundary:** not stated in abstract
- **Stealable move:** Justify an architecture by measured deltas between deployable versions, so each component earns its place with a before-and-after.
- **Pitch:** Build the platform in iterations, measure the choir each time, and let the measurements choose the final architecture.

### 22. Simulative Comparison of DVB-S2X/RCS2 and 3GPP 5G NR NTN Technologies in a Geostationary Satellite Scenario (arXiv 2025)
- **Problem:** Standardization groups debate DVB satellite specs against 5G NR NTN, but comparisons are unreliable when the two are simulated under different assumptions.
- **Assumption:** Fixing geometry, beam layout, and link budget to the 3GPP NTN reference parameterization makes a two-technology comparison fair.
- **Mechanism:** Two system-level simulators on the same ns-3 base, SNS3 and ALIX 5G (TN-)NTN, with system-level results fed by link-level simulations across each technology's MCS and waveforms.
- **Evidence:** System-level and link-level simulation; DVB-S2X shows higher spectral efficiency than NR PDSCH on the forward user link, while NR PUSCH is better at system level on the return link; no numbers given.
- **Boundary:** not stated in abstract
- **Stealable move:** Pin every free parameter of a head-to-head comparison to one published reference configuration, so the difference you report cannot be an artifact of the setup.
- **Pitch:** Under a single shared parameterization, neither technology wins both links.

### 23. Joint Optimization of Handoff and Video Rate in LEO Satellite Networks (INFOCOM 2025)
- **Problem:** In LEO networks, satellite handoff and video bitrate are decided by separate mechanisms even though each determines the throughput the other sees.
- **Assumption:** Choosing satellite and bitrate jointly, and letting distributed actors be trained with global information, beats adapting bitrate after handoff.
- **Mechanism:** A video-aware mobility management framework with MPC and RL algorithms for a single user, extended to multiple competing users, using centralized training with distributed inference.
- **Evidence:** Trace-driven simulation plus testbed experiments, motivated by simulation models and real-world datasets; no numbers given; code and data released.
- **Boundary:** not stated in abstract
- **Stealable move:** Couple your control loop with the layer that changes the channel underneath it, co-deciding rather than adapting afterwards.
- **Pitch:** When the satellite moves, so must the bitrate decision, in the same step.

### 24. VISTA: A Benchmark for Real-Time Video Streaming under Network Impairments in Surgical Teleoperation (arXiv 2026)
- **Problem:** Reproducible evaluation of how impairments on the forward video path affect received quality and human task performance is missing.
- **Assumption:** Linux Traffic Control with NetEm and a Gilbert-Elliott loss model reproduce the impairment regimes that matter, while the reverse control channel stays stable.
- **Mechanism:** Five emulated conditions (Hospital LAN, 5G Urban, 4G Rural, LEO, GEO), a standardized peg transfer task, and synchronized measurement of network QoS, PSNR/SSIM/VMAF, and freeze rate.
- **Evidence:** Benchmark over 375 trials; success rate 97% (LAN) to 79% (5G), 35% (4G), 71% (LEO), 12% (GEO); mean completion time for successes 80 s to 117 s, 211 s, 152 s, 255 s.
- **Boundary:** not stated in abstract
- **Stealable move:** Measure the downstream human task outcome alongside the video metric, so the metric's relevance is established rather than assumed.
- **Pitch:** Network impairments directly determine whether a remote operation succeeds, and now that can be reproduced.

### 25. Satellite Streaming Video QoE Prediction: A Real-World Subjective Database and Network-Level Prediction Models (arXiv 2024)
- **Problem:** QoE models need large sets of videos labeled by subjective opinion under diverse authentic playback disruptions, and that data did not exist for satellite streaming.
- **Assumption:** Network parameters alone carry enough information to predict human perception scores.
- **Mechanism:** The LIVE-Viasat Real-World Satellite QoE Database of 179 videos from real streaming services, a 54-participant subjective study collecting both continuous-time and retrospective scores, and a new SatQA model mapping network parameters to predicted perception.
- **Evidence:** Subjective database plus model evaluation; 179 real-world videos, 54 participants; prevalent QoE models evaluated on it; SatQA predicts QoE using only netw (abstract truncated)
- **Boundary:** not stated in abstract
- **Stealable move:** Collect continuous-time scores alongside retrospective ones in the same study, so momentary quality and memory effects can be separated.
- **Pitch:** Real satellite disruptions, human labels, and a network-only predictor ISPs can use.
