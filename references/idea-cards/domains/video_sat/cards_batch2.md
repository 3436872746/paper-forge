> 中文版: [cards_batch2.zh.md](cards_batch2.zh.md)

### 1. Unleashing Collaborative Computing for Adaptive Video Streaming with Multi-objective Optimization in Satellite Terrestrial Networks (arXiv 2024)
- **Problem:** Satellite-terrestrial networks have too few resources to offload compute-intensive video streaming tasks, so service quality and QoE suffer.
- **Assumption:** The ground station bridging satellite and terrestrial networks can act as an agent that sees both sides, and multiple such agents negotiating beats centralized assignment.
- **Mechanism:** Casts task offloading as multi-objective optimization; first dynamically selects an end-to-end path balancing service time against resource utilization, then runs a multi-agent soft actor-critic (MA-SAC) per path to set adaptive bitrate and assign heterogeneous resources.
- **Evidence:** type: numerical evaluation; proposed scheme outperforms comparative schemes across various computing tasks on various criteria; no numbers given.
- **Boundary:** not stated in abstract
- **Stealable move:** Split the decision into a cheap discrete selection stage and a learned continuous allocation stage, so the learner only ever searches inside one already-chosen option.
- **Pitch:** Let ground stations negotiate as agents so that path choice and bitrate are optimized together rather than in sequence.

### 2. End-to-End Performance of Video Streaming With MPEG-DASH Over Satellite 5G IAB Networks (arXiv 2026)
- **Problem:** In an integrated satellite-terrestrial network, latency, throughput variation, and playback continuity interact, and it is unclear which transport and congestion-control pairing survives that.
- **Assumption:** An ns-3 framework built by adapting open-source modules reproduces 5G RAN, LEO backhaul, transport, and DASH behavior faithfully enough for the comparison to transfer.
- **Mechanism:** Simulation framework in ns-3 with adapted modules for 5G RAN, LEO backhaul, transport layer, and MPEG-DASH; evaluates TCP and QUIC under CUBIC, NewReno, and BBR on application-level and transport-level metrics.
- **Evidence:** type: simulation; metrics include playback duration, interruption duration, stall count, playback bitrate, throughput, latency, fairness; no single configuration uniformly optimal; QUIC-BBR most balanced with fewer interruptions and substantially lower latency.
- **Boundary:** The abstract admits no single configuration is uniformly optimal across all metrics; tradeoffs remain.
- **Stealable move:** Report the whole metric vector instead of collapsing to one QoE scalar, and let the shape of the tradeoff frontier be the contribution.
- **Pitch:** Measure transport and congestion control jointly over satellite 5G IAB, then name the configuration that is merely balanced rather than the one that wins a single metric.

### 3. Enabling High Error Tolerance in Satellite Video Transmissions by Generative Semantic Communication (arXiv 2026)
- **Problem:** Low device power and long distance to LEO relays give low SNR, so high error rates and frequent retransmissions block high-dimensional video.
- **Assumption:** Semantic content survives heavy corruption, and a generative decoder can reconstruct a watchable video from damaged semantics rather than needing clean bits.
- **Mechanism:** Transmitter couples a pre-trained video encoder with an LDPC encoder for forward error correction; receiver fine-tunes a generative video model using an efficient in-context adaptation algorithm to rebuild video from error-corrupted semantic information.
- **Evidence:** type: simulation; 2.5 dB higher video PSNR than conventional semantic communications at 45% error rate, and remains robust when the error rate exceeds 80%.
- **Boundary:** not stated in abstract
- **Stealable move:** Push error tolerance to the receiver by making it generative and adapting it at inference time, instead of spending transmitter bits on stronger protection.
- **Pitch:** Accept the errors, ship semantics, and let a generative receiver hallucinate the lost detail back.

### 4. Dissecting the Performance of Satellite Network Operators (CoNEXT 2023)
- **Problem:** Satellite network operators expanded fast and no comprehensive measurement of their performance or efficiency existed.
- **Assumption:** Public measurement datasets can be mined to attribute individual measurements to specific operators, so opportunistic data substitutes for owning a testbed.
- **Mechanism:** Devises a methodology to identify measurements performed via satellite operators, applies it to M-Lab and RIPE datasets to characterize low-level performance and footprint, then recruits paid testers on Starlink, HughesNet, and ViaSat for web browsing and video streaming.
- **Evidence:** type: public trace datasets plus recruited paid testers; characterization of up to 18 operators across different orbits.
- **Boundary:** not stated in abstract
- **Stealable move:** Reuse an existing public measurement corpus to answer a question it was not designed for, then validate the reframing with a small paid panel.
- **Pitch:** The first comprehensive study of satellite operators, done by mining public data and confirming it with paid testers.

### 5. StarStream: Live Video Analytics over Space Networking (arXiv 2025)
- **Problem:** Live video analytics systems were built for terrestrial networks, but the LEO uplink bottleneck and volatile conditions degrade service where remote-area and disaster use cases need them most.
- **Assumption:** LEO network performance is regular enough that a learned predictor can forecast it better than reacting to current conditions.
- **Mechanism:** Extensive in-the-wild Starlink measurements first; then StarStream, an LSN-adaptive streaming framework built from a Transformer-based network performance predictor and a content-aware configuration optimizer.
- **Evidence:** type: real-world measurement on Starlink plus trace-driven experiments with real network and video processing data; no numbers given.
- **Boundary:** not stated in abstract
- **Stealable move:** Measure the volatile network in the wild first, then let a forecast of the next network state pick the configuration instead of a reaction to the last one.
- **Pitch:** Live video analytics over LEO needs a predictor of the satellite link, not a faster reaction to it.

### 6. Robust Live Streaming over LEO Satellite Constellations: Measurement, Analysis, and Handover-Aware Adaptation (arXiv 2025)
- **Problem:** Frequent satellite handovers cause repeated rebuffering, and learning-based ABR algorithms trained even on LEO traces fail on the abrupt variation a handover creates.
- **Assumption:** A middleware that cannot retrain the ABR can still rescue it by injecting handover-derived network signals and by modulating playback speed.
- **Mechanism:** Measurement study of live streaming on LEO networks, then SARA, a lightweight middleware that modulates video playback speed and feeds ABR algorithms insights derived from LEO network characteristics so bitrate selection survives handovers.
- **Evidence:** type: measurement plus extensive evaluation; rebuffering time reduced by an average of 39.41%, latency slightly improved by 0.65%, overall bitrate loss of 0.13%.
- **Boundary:** not stated in abstract
- **Stealable move:** Fix a black-box controller by wrapping it with a signal-injection and playback-speed layer rather than retraining it, and buy tolerance by spending a little playback time.
- **Pitch:** Wrap any ABR algorithm in handover awareness and playback-speed control, and take 39% off rebuffering for 0.13% of bitrate.

### 7. Watching Stars in Pixels: The Interplay of Traffic Shaping and YouTube Streaming QoE over GEO Satellite Networks (arXiv 2023)
- **Problem:** GEO networks combine high latency with TCP proxies and traffic shapers, and nobody had characterized how that triad affects YouTube QoE.
- **Assumption:** Analyzing production session traces suffices to attribute the shortfall to specific mechanisms (proxy behavior, shaping, application chunk pipelining).
- **Mechanism:** Analyzes over 2k YouTube video sessions across a production GEO network with a 900 Kbps shaping rate, comparing TCP against gQUIC sessions against the resolution the bitrates should have supported.
- **Evidence:** type: trace analysis on a production GEO network; 28% of TCP and 18% of gQUIC sessions rebuffer; median resolution only 380p for TCP and 299p for gQUIC; gQUIC uses only 63% of network capacity; YouTube's chunk request pipelining is imperfect.
- **Boundary:** not stated in abstract
- **Stealable move:** Use the gap between the performance a setting should have delivered and what it did deliver as the measurement instrument, then explain the shortfall mechanism by mechanism.
- **Pitch:** The data-saver setting should have streamed 360p seamlessly and did not, and the reasons are the proxies and the app, not the link.

### 8. Media-over-Multipath-QUIC for Realtime Video Applications (arXiv 2026)
- **Problem:** Multipath schedulers see only bytes, so they cannot distinguish a keyframe anchoring a second of video from an enhancement frame whose loss costs one image.
- **Assumption:** The metadata the scheduler lacks already flows through the relay, so a rule interface at the relay is enough to close the gap without teaching the transport about video.
- **Mechanism:** MoMQ extends MoQT so applications and relay operators install declarative rules at the edge relay that match Object metadata and express delivery preferences against labeled paths; the relay evaluates the rules mechanically while containing no video logic.
- **Evidence:** type: live testbed spanning Starlink and WiFi; four rules cut P99.9 frame completion time from 384.7 ms to 114.1 ms, reduce required playback buffer by 61.5%, and are the only configuration meeting the 150 ms interactive target; same rules hold across relays in two countries and subscribers on two continents.
- **Boundary:** The advantage is retained only "wherever the paths remain disjoint".
- **Stealable move:** Give the lower layer a declarative rule interface that the upper layer populates, instead of teaching the lower layer the upper layer's semantics.
- **Pitch:** The knowledge the scheduler needs is already in flight, so turn relay metadata into path decisions.

### 9. Securing Satellite Communications: Real-Time Video Encryption Scheme on Satellite Payloads (arXiv 2025)
- **Problem:** Real-time video encryption on satellite embedded devices is blocked by the compute limits of payloads and by power draw that causes overheating and safety risk.
- **Assumption:** Two 1D chaotic maps give adequate security at a cost that fits a payload's power and thermal budget.
- **Mechanism:** Encrypts video using two 1D chaotic maps, deployed on a satellite for the first time; also implemented on an FPGA platform and on a Raspberry Pi 4B.
- **Evidence:** type: real system deployed on a satellite, plus FPGA and Raspberry Pi 4B experiments; statistical testing for resilience against attacks; exceptional real-time performance and low power consumption; no numbers given.
- **Boundary:** not stated in abstract
- **Stealable move:** Make the platform's power and thermal envelope a first-class design constraint and validate the same design on the real target and on a cheap proxy board.
- **Pitch:** Encrypt video on orbit with two chaos maps, cheap enough to stay real-time and cool on a payload.

### 10. Dynamic Pacing for Real-time Satellite Traffic (arXiv 2025)
- **Problem:** Google's congestion control and WebRTC's one-size-fits-all sender-side pacing queue degrade in LEO, where high altitude and fast satellite movement add delay and instability.
- **Assumption:** Handover activity is predictable enough from the network's own signals that the pacing queue can be sized for the period about to be entered.
- **Mechanism:** Data-driven queue management that tunes the maximum pacing queue capacity based on predicted handover activity, minimizing latency in no-handover periods and prioritizing stability when handover activity rises.
- **Evidence:** type: emulation plus real Starlink constellation; up to 3x video bitrate improvement and 62% reduction in freeze rate in emulation; up to 41% freeze-rate reduction and 40% decrease in mean packet loss on real Starlink versus WebRTC's default pacing queue.
- **Boundary:** not stated in abstract
- **Stealable move:** Turn a fixed-size buffer into one whose size follows a predicted physical cycle of the link, so the same mechanism buys latency in quiet phases and stability in rough ones.
- **Pitch:** Size the pacing queue by the handover calendar, not by a constant.

### 11. Broadened-beam Uniform Rectangular Array Coefficient Design in LEO SatComs Under Quality of Service and Constant Modulus Constraints (arXiv 2024)
- **Problem:** Beam design for LEO must at once satisfy QoS under curvature-driven path-loss variation, keep constant modulus for amplifier efficiency, and suppress out-of-beam radiation.
- **Assumption:** A Kronecker-product decomposition into two uniform linear array subproblems preserves design quality while collapsing the number of coefficients to optimize.
- **Mechanism:** Formulates a broadened-beam URA coefficient design problem, decomposes it into two ULA subproblems via Kronecker product beamforming, then solves each non-convex subproblem with semidefinite relaxation and a convex iterative algorithm.
- **Evidence:** type: simulation; suppresses out-of-beam radiation and meets the design criteria; capacities at least four times those of array-steering-vector beamformers "when the beam trans" (abstract truncated).
- **Boundary:** not stated in abstract
- **Stealable move:** Factor a hard coupled 2D design problem into two identical 1D subproblems so a relaxation technique becomes applicable and the variable count collapses.
- **Pitch:** Broaden the LEO beam under QoS, constant modulus, and interference constraints and get four times the capacity.

### 12. Multipath Adaptive Video Streaming with Multiple Description Neural Video Codec over 5G Networks (arXiv 2026)
- **Problem:** Decoding dependencies in monolithic and layered codecs make multipath delivery fragile, so transient under-delivery of critical data triggers stalls under 5G blockage and handover.
- **Assumption:** Several independently decodable but mutually refinable descriptions spanning the whole chunk are enough to convert a missing path into a quality loss rather than an undecodable chunk.
- **Mechanism:** NeuralMDC, a neural multiple-description codec encoding each chunk into independent, mutually refinable description streams, plus a user-space multipath streaming system that maps streams to heterogeneous 5G paths with simple scheduling logic.
- **Evidence:** type: trace-driven emulation and operational 5G experiments; QoE improved by 26%-44% over monolithic, layered, and neural streaming systems, video quality by up to 41.8%, stall ratio kept below 0.32%.
- **Boundary:** not stated in abstract
- **Stealable move:** Redesign the coding unit so it matches the scheduler's resilience unit, which lets the scheduler stay simple instead of compensating for dependencies.
- **Pitch:** Make every chunk piece independently playable so any subset of paths still yields video.

### 13. QSMVM: QoS-aware and social-aware multimetric routing protocol for video-streaming services over MANETs (arXiv 2023)
- **Problem:** Routing video streams over infrastructure-free MANETs forces a choice between the quality of the forwarding path and trust in the peers that form it.
- **Assumption:** Tie strength between users is a measurable proxy for path trust and can be folded into an existing routing metric at tolerable QoS cost.
- **Mechanism:** Extends the authors' multipath multimedia dynamic source routing (MMDSR) protocol so the forwarding algorithm's decisions include a tie-strength social metric alongside QoS metrics.
- **Evidence:** not stated in abstract
- **Boundary:** The abstract admits a trade-off: trust is raised only while QoS is not affected significantly, so trust and QoS are not jointly maximized.
- **Stealable move:** Add a social scalar as one weighted term inside an existing routing metric rather than redesigning the protocol around it.
- **Pitch:** Route video over the peers you trust, as long as QoS barely notices.

### 14. Deep Adaptive Rate Allocation in Volatile Heterogeneous Wireless Networks (arXiv 2026)
- **Problem:** In vehicular multi-access networks, link quality fluctuates faster than multipath schedulers and transport protocols can react.
- **Assumption:** Path state is forecastable well enough that acting on the forecast removes the observation-reaction lag instead of just adding noise.
- **Mechanism:** Transformer-based path state forecasting plus DARA, a deep reinforcement learning scheduler computing congestion window fractions per path via a DQN driven by a six-component normalized reward with weight-mediated conflict resolution.
- **Evidence:** type: Mininet-based MP-DCCP testbed with traces from mobile users in vehicular environments; better file transfer time than learning-based schedulers under moderate-volatility traces, resolution gains maintained across all tested conditions, and substantial rebuffering gains under sub-second buffers where state-of-the-art schedulers nearly continuously stall.
- **Boundary:** File-transfer gains are claimed only under moderate-volatility traces; no failure regime is reported.
- **Stealable move:** Put the predictor in front of the controller so each action targets the state that is about to exist, not the one just measured.
- **Pitch:** Forecast the path, then split the traffic for the network you are about to have.

### 15. Swarm: Cost-Efficient Video Content Distribution with a Peer-to-Peer System (arXiv 2024)
- **Problem:** At ByteDance scale, centralized CDN infrastructure makes content distribution costs prohibitively high.
- **Assumption:** Edge residual resources of ordinary devices can match CDN streaming quality if a centralized tracker handles discovery and mapping despite peer heterogeneity.
- **Mechanism:** Hybrid system combining a CDN with P2P: a centralized tracker cluster control plane overseeing a data plane of edge residual resources, mapping clients to servers, with proprietary multipath parallel transmission between clients and peer servers.
- **Evidence:** type: real system in production; stable for six years, managing over a hundred thousand peer servers, serving nearly a hundred million users daily, saving hundreds of millions of RMB annually, performance on par with traditional CDNs.
- **Boundary:** not stated in abstract
- **Stealable move:** Keep the control plane centralized and decentralize only the data plane, taking P2P's savings without paying its heterogeneity penalty.
- **Pitch:** Put the tracker in charge and the peers to work, and cut CDN cost without cutting quality.

### 16. Deep Reinforcement Learning with Importance Weighted A3C for QoE enhancement in Video Delivery Services (arXiv 2023)
- **Problem:** In A3C-based ABR, the behaviour policy and the target policy drift apart, so updates are computed on stale, unsynchronized experience and come out suboptimal.
- **Assumption:** The lag can be corrected by reweighting experience rather than by imposing synchronization on the learners.
- **Mechanism:** ALISA, an actor-learner architecture with importance sampling that assigns weight to experience according to its relevance, addressing the lag between behaviour and target policies.
- **Evidence:** type: comparison within the Pensieve framework; up to 25%-48% higher average QoE than Pensieve, and more versus fixed-rule BB, BOLA, and RB.
- **Boundary:** not stated in abstract
- **Stealable move:** When a learner must consume stale experience, reweight it by relevance instead of discarding it or waiting for fresh samples.
- **Pitch:** Correct the off-policy lag with importance weights and get 25-48% more QoE than Pensieve.

### 17. XLR (piXel Loss Rate): a Lightweight Indicator to Measure Video QoE in IP Networks (arXiv 2024)
- **Problem:** Operators need video QoE at arbitrary network locations, where the reference video is unavailable and measurement must not add latency.
- **Assumption:** The perceptual damage of transmission errors is recoverable from a lightweight analysis of the compressed bitstream alone.
- **Mechanism:** Defines XLR (pixel loss rate) as an objective indicator, characterized and evaluated; it is estimated by a lightweight analysis on the compressed bitstream, yielding a No-Reference operational method.
- **Evidence:** type: analysis plus experiments; good correlation with subjective Mean Opinion Scores, comparable results to state-of-the-art Full-Reference metrics, reliable bitstream-based estimation, a linear-dimension score; no numbers given.
- **Boundary:** not stated in abstract
- **Stealable move:** Define the metric so that its estimator consumes only what already crosses the wire, which makes it computable at every hop with no reference and no added latency.
- **Pitch:** Read QoE off the packets already passing, with no reference video and no delay.

### 18. ProCAVE: A Self-Adaptive, Full-Lifecycle Edge Caching Framework for Video Streaming via Predictive Bandwidth Estimation and Preference-Aware Deep Reinforcement Learning (arXiv 2026)
- **Problem:** Edge delivery systems built on reactive ABR heuristics and loosely coupled cache policies cannot keep up with rapid wireless swings, and treat user preference separately from delivery.
- **Assumption:** Short-term throughput is forecastable and a single high-dimensional global state lets bitrate and cache control be optimized together rather than negotiated.
- **Mechanism:** ProCAVE unifies a lightweight Transformer for short-term throughput forecasting, a PPO-driven ABR agent, and a DDPG-based continuous cache controller operating on a high-dimensional global state.
- **Evidence:** type: trace-driven experiments using MovieLens preference traces and Ghent 4G bandwidth measurements; improves byte hit rate, reduces backhaul load, and improves QoE versus FlyCache and other baselines; no numbers given.
- **Boundary:** not stated in abstract
- **Stealable move:** Couple two controllers by handing them one shared global state instead of tuning two policies against each other's outputs.
- **Pitch:** Forecast the link, then let ABR and cache act as one controller.

### 19. BOLA360: Near-optimal View and Bitrate Adaptation for 360-degree Video Streaming (arXiv 2023)
- **Problem:** 360-degree video costs an order of magnitude more bandwidth than 2D video, and a rebuffering event is worse because freezing can cause cybersickness.
- **Assumption:** The user's future field of view is predictable well enough that segments outside it can simply not be downloaded.
- **Mechanism:** BOLA360, an online ABR algorithm running inside the client player that downloads only segments likely to fall in the field of view and continually adapts per-segment bitrate for smooth playback; proven near-optimal against an offline QoE-maximizing algorithm.
- **Evidence:** type: analytical proof plus evaluation across a wide range of network and head movement profiles; 13.6% to 372.5% more QoE than state-of-the-art algorithms (abstract truncated).
- **Boundary:** not stated in abstract
- **Stealable move:** When demand exceeds supply, spend the budget only where the user is actually attending; predicting attention is itself the compression scheme.
- **Pitch:** Stream only what the head is looking at, and prove that doing so is near-optimal.

### 20. Objective Video Quality Assessment in FWA-Based Over-the-Top Content Delivery Across Open Source 5G Networks (arXiv 2026)
- **Problem:** It is unclear how transmission mode, modulation order, and concurrent load jointly determine UHD video quality over real 5G fixed wireless access.
- **Assumption:** Frame-level full-reference metrics computed over a real testbed are faithful enough to guide deployment decisions that would otherwise come from simulation.
- **Mechanism:** Automated streaming campaigns on a real open-source 5G testbed, crossing SISO/MIMO with 64-QAM/256-QAM and one to five concurrent users, delivering 4K streams via MPEG-DASH and scoring PSNR, SSIM, and VMAF.
- **Evidence:** type: real open-source 5G testbed experiment, explicitly contrasted with simulation-based approaches; MIMO consistently outperforms SISO; MIMO with 256-QAM held VMAF above the visually lossless threshold with five concurrent users, while SISO configurations degraded significantly.
- **Boundary:** not stated in abstract
- **Stealable move:** Sweep the physical-layer knobs as a full factorial grid and report quality per cell, so the deployment rule can be read directly off the table.
- **Pitch:** Here is the quality table for UHD over 5G FWA, measured rather than simulated.

### 21. Stateless Network-Aware Adaptive Bitrate Streaming over IPFS (arXiv 2026)
- **Problem:** Network-aware ABR over IPFS depends on continuously synchronized state between consumers and providers, and that state goes stale under peer churn, provider migration, partitions, and shifting content distribution.
- **Assumption:** Locally observable request-time signals plus client-carried state are sufficient to stay network-aware without any provider-side state.
- **Mechanism:** Stateless network-aware ABR that recomputes bitrate per segment from only local request-time observations, with the client embedding its adaptation state in HTTP headers so context travels with the request and stays under client control.
- **Evidence:** not stated in abstract (abstract truncated)
- **Boundary:** not stated in abstract
- **Stealable move:** Move the state to whichever party owns it and carry it in the request itself, so churn cannot desynchronize anything.
- **Pitch:** Stay network-aware without synchronized state by putting the adaptation state in the request header.

### 22. Understanding User Behavior in Volumetric Video Watching: Dataset, Analysis and Prediction (ACM MM 2023)
- **Problem:** Volumetric video needs very high bandwidth, so streaming must prioritize the viewport, but no 3D volumetric viewing dataset with fine-grained interactivity features existed to tell anyone what to prioritize.
- **Assumption:** Viewport, gaze, and motion preference are regular enough across videos and users to be learned and predicted.
- **Mechanism:** Releases a large-scale, multi-dimensional volumetric video viewing behavior dataset; analyzes viewport, gaze, and motion preference; designs a transformer-based viewport prediction model fusing gaze and motion features.
- **Evidence:** type: dataset plus analysis plus prediction benchmark; high accuracy at various conditions; no numbers given (abstract truncated).
- **Boundary:** not stated in abstract
- **Stealable move:** Ship the dataset and the predictor in the same paper, so the behavioral analysis becomes the justification for the model's input features.
- **Pitch:** Nobody could prioritize a volumetric viewport without the data, so here is the data, the analysis, and the predictor.

### 23. Video Quality Monitoring for Remote Autonomous Vehicle Control (arXiv 2025)
- **Problem:** Remote operators must intervene in real time, but 4G/5G signal variability, mobility handovers, and transient congestion make reliable low-latency video hard.
- **Assumption:** Video quality can be predicted far enough ahead to act proactively, and the same predictor is viable both onboard the vehicle and at the edge.
- **Mechanism:** A blueprint of subsystems covering onboard data collection, capture and compression, transmission to edge, streaming data management, AI deployment and inference, and proactive decisions from predicted quality; benchmarks 20 variants of LSTM, GRU, and encoder-only Transformer plus DNN and linear baselines, studies onboard versus edge inference, and discusses explainable AI for accountability.
- **Evidence:** type: proof-of-concept benchmark on a hybrid dataset of field-trial measurements plus synthetic stress segments; reports accuracy and inference latency; no numbers given (abstract truncated).
- **Boundary:** not stated in abstract
- **Stealable move:** Frame the contribution as a placement question, benchmarking the identical predictor at both ends of the link so latency alone decides.
- **Pitch:** Predict video quality before it degrades, then hand the wheel to the operator before it is too late.

### 24. A 3D Framework for Improving Low-Latency Multi-Channel Live Streaming (arXiv 2024)
- **Problem:** Multi-channel live streaming strains data volume, cross-stream synchronization, and consistent quality under varying networks at once.
- **Assumption:** Compositing several video inputs into one rendered scene at the source removes the redundancy without giving up per-channel control.
- **Mechanism:** Consolidates multi-camera video into a single stream using multiple virtual 3D canvases in a game engine (Unity 3D); each input is mapped onto a world-space canvas and captured by an in-world camera, yielding one-channel output that supports one-to-many broadcasting, one-to-one calling, and real-time channel control.
- **Evidence:** type: real system, open-sourced, built in Unity 3D; outperforms some existing multi-channel live streaming solutions in latency reduction and user interaction responsiveness; no numbers given.
- **Boundary:** not stated in abstract
- **Stealable move:** Collapse N parallel streams into one composite stream at the source so synchronization becomes a rendering problem rather than a transport problem.
- **Pitch:** Render many video channels onto one 3D canvas and stream a single scene instead of many streams.

### 25. Towards Low-Latency and Energy-Efficient Hybrid P2P-CDN Live Video Streaming (arXiv 2024)
- **Problem:** OTT providers struggle to build a scalable framework that cuts server energy while still delivering low-latency, high-quality live video.
- **Assumption:** Peer, edge, and CDN resources can be enumerated as a common multi-layer action space, making fetching and transcoding jointly placeable rather than separately heuristed.
- **Mechanism:** Hybrid P2P-CDN framework combining NFV and edge computing, with a multi-layer architecture and an action tree over all available resources from peers, edge, and CDN servers to distribute video fetching and transcoding tasks.
- **Evidence:** type: testbed experiment against baselines; improves user QoE, reduces client serving latency, and improves edge server energy consumption; no numbers given.
- **Boundary:** not stated in abstract
- **Stealable move:** Enumerate every placement choice for a workload as an explicit action tree, so resource heterogeneity becomes a search space instead of a pile of heuristics.
- **Pitch:** One action tree over peers, edge, and CDN, so live streaming gets cheaper and faster at the same time.
