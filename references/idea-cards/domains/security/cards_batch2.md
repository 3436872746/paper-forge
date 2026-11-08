### 1. Application-Specific Power Side-Channel Attacks and Countermeasures: A Survey (arXiv 2025)
- **Problem:** Existing power side-channel surveys focus almost only on cryptographic implementations, leaving attacks in other application domains uncharacterized.
- **Assumption:** Recent power side-channel work across application domains can be meaningfully classified and compared along application-specific axes.
- **Mechanism:** Comprehensive survey classifying recent power side-channel attacks and countermeasures by application domain and comparing them on application-specific considerations.
- **Evidence:** Survey of prior work across key extraction from cryptography, reverse engineering of ML models, user behavior data exploitation, and instruction-level disassembly; no numbers given.
- **Boundary:** not stated in abstract
- **Stealable move:** Choose the comparison axis of a taxonomy by *application domain* rather than by underlying physical signal, so the classification tracks what defenders in each field actually need to know.
- **Pitch:** A comprehensive survey of power side-channel attacks and countermeasures across different application domains.

### 2. A Survey on Acoustic Side Channel Attacks on Keyboards (arXiv 2023)
- **Problem:** Keyboards carry credentials and private data, microphone quality keeps improving, and the resulting acoustic leakage literature is scattered.
- **Assumption:** The body of work extracting keystrokes from ambient noise is mature enough to be reviewed as one coherent threat.
- **Mechanism:** Survey reviewing existing research and explaining why the attacks are feasible, the applicable threat models, and the methodologies used to launch and enhance them.
- **Evidence:** Survey of existing research; no numbers given.
- **Boundary:** not stated in abstract
- **Stealable move:** Structure a threat survey on three separate axes — physical feasibility, threat model, method — so a reader can transplant the threat into their own setting instead of only reading a catalog.
- **Pitch:** A thorough review of acoustic keyboard side-channel research covering feasibility, threat models, and attack methods.

### 3. THOR: A Non-Speculative Value Dependent Timing Side Channel Attack Exploiting Intel AMX (arXiv 2025)
- **Problem:** On-chip accelerators like Intel AMX are opaque about how the values of their input data affect execution time.
- **Assumption:** AMX execution time depends on the data values it multiplies (their sparsity), so timing alone reveals a property of the data.
- **Mechanism:** Software-based value-dependent timing attack exploiting a novel AMX timing vulnerability to infer neural-network weight sparsity without confidence scores, privileged access, or physical proximity.
- **Evidence:** Real-system attack: full recovery of weight sparsity for 64 input elements within 50 minutes, 631% faster than the maximum leakage rate of Hertzbleed.
- **Boundary:** not stated in abstract
- **Stealable move:** Do not attack a model's outputs — treat the accelerator's own data-dependent latency as the oracle, so the attack works even when the only thing the victim exposes is wall-clock time.
- **Pitch:** A novel value-dependent timing side-channel vulnerability in Intel AMX that leaks weight sparsity without confidence scores, privilege, or proximity.

### 4. Acoustic Side Channel Attack on Keyboards Based on Typing Patterns (arXiv 2024)
- **Problem:** Existing keyboard acoustic attacks ignore typing patterns and environmental noise, so their reported results do not survive realistic conditions.
- **Assumption:** A user's typing rhythm is a modelable confounder, and a noisy real environment still leaves exploitable acoustic signal once it is modeled.
- **Mechanism:** Proposes an applicable method that explicitly takes the user's typing pattern into account when attacking in a realistic environment.
- **Evidence:** Case studies: average success rate of 43% across all case studies under real-world scenarios.
- **Boundary:** not stated in abstract
- **Stealable move:** Promote the user-specific nuisance variable (rhythm, habit, workload) to a first-class modeled quantity instead of averaging it away, and report accuracy under the noisy realistic condition rather than the clean-lab one.
- **Pitch:** An applicable keyboard acoustic attack that accounts for typing patterns in realistic environments, reaching 43% average success.

### 5. A Survey of Side-Channel Attacks in Context of Cache -- Taxonomies, Analysis and Mitigation (arXiv 2023)
- **Problem:** Cache memory, especially the last-level cache, has grown enormously, making observable shared-cache behavior a leading attack surface whose microarchitecture-specific knowledge is scattered.
- **Assumption:** Cache side-channel attacks and their mitigations can be organized by microarchitecture, cross-core exploitation, methodology, and target.
- **Mechanism:** Survey summarizing fundamentals, attack surfaces and taxonomies, comparing microarchitectures, analyzing the literature on several parameters, and analyzing hardware- and software-based mitigations with strengths, weaknesses, and trade-offs.
- **Evidence:** Survey of existing literature; no numbers given.
- **Boundary:** not stated in abstract
- **Stealable move:** Make the *hardware generation* a first-class column of the comparison table, which forces a mitigation's portability across chips to become an explicit claim rather than an assumption.
- **Pitch:** A detailed study of cache side-channel attacks comparing microarchitectures and analyzing mitigation trade-offs.

### 6. Protocol-Aware Firmware Rehosting for Effective Fuzzing of Embedded Network Stacks (CCS 2025)
- **Problem:** Rehosting-based fuzzing of embedded firmware fails to reach deep network-stack code because complex multi-layered protocol input formats are hard to satisfy, and current approaches need manual effort or hardware.
- **Assumption:** A firmware's use of network protocols can be deduced automatically, well enough to synthesize valid encapsulating packets around arbitrary fuzzing data.
- **Mechanism:** Pemu automatically detects and handles network protocol usage in firmware and transparently generates valid network packets that encapsulate fuzzing data, letting input flow into deeper firmware layers.
- **Evidence:** Real evaluation showing consistent code-coverage improvement over three existing rehosting tools, plus rediscovery of known vulnerabilities and identified f... (abstract truncated)
- **Boundary:** not stated in abstract
- **Stealable move:** When the input format is layered, infer the outer format from the program and wrap the payload in valid outer layers, so mutation budget is spent on the layer you care about rather than on passing parsers.
- **Pitch:** Protocol-aware rehosting that pushes fuzzing input past protocol parsers for deeper, layer-by-layer firmware analysis.

### 7. Poster: Machine Learning for Vulnerability Detection as Target Oracle in Automated Fuzz Driver Generation (arXiv 2025)
- **Problem:** ML vulnerability detectors are effective but false-positive-heavy, while fuzzing is effective but needs hand-written drivers aimed at manually chosen functions.
- **Assumption:** An ML detector's verdict is reliable enough to pick which function to fuzz, and a confirming crash is a sufficient validation of the predicted vulnerability.
- **Mechanism:** Workflow that (1) uses an ML vulnerability-detection model as a target oracle to identify a likely vulnerable function, (2) auto-generates fuzz drivers, and (3) fuzzes that function to find bugs confirming the inference.
- **Evidence:** Demonstration on an existing vulnerability in libgd, with a plan for large-scale evaluation; no numbers given.
- **Boundary:** Only a single case study is reported; large-scale evaluation is explicitly left as future work.
- **Stealable move:** Use a cheap, noisy predictor as an *ordering oracle* that directs an expensive verifier, so its false positives cost wasted verification time rather than a wrong published conclusion.
- **Pitch:** An automated fuzz-driver generation workflow that uses an ML vulnerability detector as a target oracle, shown on a libgd vulnerability.

### 8. Vulnerability Detection Through an Adversarial Fuzzing Algorithm (arXiv 2023)
- **Problem:** Fuzzing is time-consuming and compute-expensive, putting it out of reach for open-source volunteers and small developers without dedicated security staff.
- **Assumption:** Adversarial perturbation layered on evolutionary algorithms generates test cases that travel farther than plain evolutionary fuzzing.
- **Mechanism:** Builds adversarial methods on top of current evolutionary algorithms to generate test cases for farther and more efficient fuzzing.
- **Evidence:** Experimental comparison reporting that adversarial attacks increase outpace of existing fuzzers significantly and find more crashes; no numbers given.
- **Boundary:** not stated in abstract
- **Stealable move:** Treat the fuzzer's own seed population as an attack surface and perturb it adversarially, so search pressure points at path divergence instead of relying on random mutation.
- **Pitch:** An adversarial extension to evolutionary fuzzers that explores more paths and finds more bugs faster while staying runnable on a personal device.

### 9. Systematic Meets Unintended: Prior Knowledge Adaptive 5G Vulnerability Detection via Multi-Fuzzing (arXiv 2023)
- **Problem:** 5G and NextG softwarization widens the attack surface, but security research studies isolated aspects and lacks a holistic view across attacker knowledge levels.
- **Assumption:** Vulnerabilities can be revealed, detected, and predicted under three graded knowledge assumptions, and one framework can also serve as a digital twin for defense simulation.
- **Mechanism:** Three fuzzing strategies — Listen-and-Learn (black-box, no protocol knowledge), Synchronize-and-Learn (black-box with attacker-accessible user information plus probability-based fuzzing), and Source-and-Learn (white-box fuzzing of significant bits).
- **Evidence:** Real platform, srsRAN 5G: Listen-and-Learn identifies 129 RRC connection vulnerabilities at 0.072 s average detection; Synchronize-and-Learn beats existing models on precision and recall with far fewer cases; Source-and-Learn finds three man-in-the-middle vulnerabilities; solution claimed scalable to other open-source (abstract truncated).
- **Boundary:** not stated in abstract
- **Stealable move:** Ship one tool that runs under *graded knowledge assumptions* (nothing, side information an attacker can obtain, full source), so a single paper reports what each attacker class could actually reach.
- **Pitch:** A systematic multi-fuzzing approach that reveals, detects, and predicts 5G vulnerabilities with and without prior knowledge assumptions.

### 10. TransferFuzz: Fuzzing with Historical Trace for Verifying Propagated Vulnerability Code (arXiv 2024)
- **Problem:** Code reuse spreads vulnerabilities, but detecting reused vulnerable code cannot tell whether the bug is actually triggerable in the new software, producing false positives.
- **Assumption:** Runtime information gathered while fuzzing or executing the original vulnerable binary carries guidance that transfers to a different binary containing the same function.
- **Mechanism:** Extracts historical traces from the basic vulnerable binary and applies Key Bytes Guided Mutation plus a Nested Simulated Annealing algorithm to perform trace-guided fuzzing on the target binary.
- **Evidence:** Evaluation on widely recognized datasets: 2.5 to 26.2 times faster verification than existing methods, and expanded the impacted software scope for 15 vulnerabilities listed in CVE reports, increasin... (abstract truncated)
- **Boundary:** not stated in abstract
- **Stealable move:** When the same code exists in two artifacts, harvest the *solving history* from the one you can already break and replay it as a search prior for the one you cannot — transfer the trace, not just the code match.
- **Pitch:** A trace-guided verification framework that confirms whether vulnerabilities propagated through code reuse are actually triggerable in new software.

### 11. Formal and Fuzzing Amplification: Targeting Vulnerability Detection in 5G and Beyond (arXiv 2023)
- **Problem:** 5G softwarization demands assurance at both protocol-level specification logic and implementation stacks, and formal methods and fuzzing each cover only one of those levels.
- **Assumption:** Attack traces from formal verification usefully seed fuzz case generation, and fuzzing feedback in turn usefully narrows or widens formal verification scope.
- **Mechanism:** Hierarchical framework coupling the two: formal verification of critical protocols guides fuzz case generation, and fuzz feedback broadens formal verification, applied to 5G NSA RRC connection with bit-level fuzzing and command-level mutation-based fuzzing.
- **Evidence:** Established 1 attack model and detected 53 vulnerabilities on the 5G NSA RRC connection process; the detected vulnerabilities are said to further refine the search space for subsequent detection (abstract truncated).
- **Boundary:** not stated in abstract
- **Stealable move:** Close the loop in *both* directions between an abstract-level analyzer and an implementation-level tester, so each side's findings become the other's search-space prior rather than a one-shot pipeline.
- **Pitch:** A framework that hierarchically combines formal and fuzzing coverage to detect 5G vulnerabilities from protocol logic down to implementation stacks.

### 12. Multi-Agent Collaborative Fuzzing with Continuous Reflection for Smart Contracts Vulnerability Detection (arXiv 2025)
- **Problem:** Smart-contract fuzzers miss sophisticated vulnerabilities because they prioritize code coverage over vulnerability discovery and lack semantic understanding of stateful contracts, so they emit transaction sequences that fail at runtime.
- **Assumption:** LLM agents can learn contract semantics from runtime rejection feedback and thereby generate valid, attack-shaped transaction sequences.
- **Mechanism:** SmartFuzz uses LLM-driven agents as the fuzzing engine, with a Continuous Reflection Process that treats sequence generation as self-evolving, a Reactive Collaborative Chain that splits fuzzing into dependency-ordered sub-tasks, and a multi-agent team generating and refining sequences from global and local views.
- **Evidence:** Extensive experiments on real-w... (abstract truncated)
- **Boundary:** not stated in abstract
- **Stealable move:** Decompose a long dependency-ordered input into sub-tasks owned by specialized agents that reflect on runtime rejection, so validity becomes a learned constraint instead of a post-hoc filter.
- **Pitch:** A collaborative reflective LLM-agent fuzzer that self-evolves transaction sequences toward sophisticated smart-contract vulnerabilities.

### 13. AI-Driven Fuzzing for Vulnerability Assessment of 5G Traffic Steering Algorithms (arXiv 2026)
- **Problem:** 5G traffic steering algorithms face adversarial conditions such as interference spikes, handover storms, and localized outages that conventional testing does not systematically probe.
- **Assumption:** A multi-objective genetic search over scenario parameters exposes hidden failure modes better than traditional test campaigns.
- **Mechanism:** AI-driven fuzz testing framework based on Non-Dominated Sorting Genetic Algorithm II (NSGA-II), evaluated with NVIDIA Sionna on five traffic steering algorithms across six scenarios.
- **Evidence:** Simulation with NVIDIA Sionna: detects 34.2% more total vulnerabilities and 5.8% more critical failures than traditional testing, with superior diversity and edge-case discovery.
- **Boundary:** The abstract admits observed variance in critical-failure detection, underscoring the stochastic nature of rare vulnerabilities.
- **Stealable move:** Drive the fuzzer with a Pareto multi-objective search rather than one aggregated score, so edge cases that are bad on different axes are not collapsed into a single ranking.
- **Pitch:** An NSGA-II-based AI fuzzing framework that exposes hidden vulnerabilities in 5G traffic steering toward resilient 6G-ready networks.

### 14. Fixing Security Vulnerabilities with AI in OSS-Fuzz (arXiv 2024)
- **Problem:** OSS-Fuzz has found more than 10,000 vulnerabilities across 1000 or more projects, but many remain unpatched because fixing is manual.
- **Assumption:** An LLM agent can localize and patch a security bug if it is grounded in executing the exploit input rather than in a prose issue description.
- **Mechanism:** Customizes the AutoCodeRover agent for security patching, relying on test execution of the exploit input to extract the code elements relevant to the fix.
- **Evidence:** Experience with OSS-Fuzz vulnerability data: agent autonomy helps versus fixed-control-flow approaches such as Agentless, and patch quality cannot be measured by code similarity to reference code, as with CodeBLEU sco... (abstract truncated)
- **Boundary:** The abstract explicitly states that code-similarity metrics like CodeBLEU are not valid measures of security patch quality, so the standard evaluation signal does not hold.
- **Stealable move:** Ground a repair agent in a reproducing execution rather than in prose, and score the fix behaviorally — does the reproducer stop crashing without breaking tests — instead of by textual similarity to a reference patch.
- **Pitch:** An LLM-agent extension of AutoCodeRover that autonomously patches OSS-Fuzz security vulnerabilities using exploit-triggered code localization.

### 15. WhisperFuzz: White-Box Fuzzing for Detecting and Locating Timing Vulnerabilities in Processors (arXiv 2024)
- **Problem:** Black-box and grey-box fuzzing finds processor timing vulnerabilities but cannot locate or explain them, and gives designers no coverage feedback.
- **Assumption:** Processor timing behavior is grounded in microarchitectural state transitions, so those transitions can serve simultaneously as a localization signal and as coverage.
- **Mechanism:** First white-box fuzzer with static analysis: extracts microarchitectural state transitions from the design at register-transfer level, instruments the design to monitor those transitions as coverage, and measures design under test processing time for minor abnormal variations.
- **Evidence:** Real RTL designs: 12 new timing vulnerabilities across BOOM, Rocket Core, and CVA6, eight of which violate " (abstract truncated).
- **Boundary:** not stated in abstract
- **Stealable move:** Turn the very mechanism you are trying to detect into the fuzzer's coverage metric, so "new coverage" and "newly suspicious behavior" are two readings of one signal.
- **Pitch:** The first white-box fuzzer with static analysis to detect and locate processor timing vulnerabilities and evaluate microarchitectural timing coverage.

### 16. GoSurf: Identifying Software Supply Chain Attack Vectors in Go (arXiv 2024)
- **Problem:** Go's dependency ecosystem lets a single compromised package cascade into critical systems, yet existing supply chain taxonomies overlook language-specific features attackers abuse to hide malicious code.
- **Assumption:** Go features built for benign purposes have identifiable static patterns that separate their legitimate use from their misuse for stealthy propagation.
- **Mechanism:** A taxonomy of 12 Go-specific attack vectors across the package lifecycle, plus GoSurf, a static analysis tool that analyzes the attack surface of Go packages against that taxonomy.
- **Evidence:** Static analysis evaluated on a corpus of widely used, real-world Go packages; no numbers given.
- **Boundary:** The abstract offers the results as "preliminary insights" for prioritizing audit effort, not as a complete detector.
- **Stealable move:** Derive an ecosystem-specific attack taxonomy from the ecosystem's own benign build and resolution semantics, then encode each misuse as a static pattern — a recipe that transfers to any language ecosystem.
- **Pitch:** A Go-specific taxonomy of 12 attack vectors with a static analysis tool that ranks package attack surface for audit.

### 17. SoK: Analysis of Software Supply Chain Security by Establishing Secure Design Properties (arXiv 2024)
- **Problem:** Supply chain security has many approaches and frameworks but no shared account of what properties a secure chain must satisfy, so they cannot be compared.
- **Assumption:** Supply chain security decomposes into four attack stages and three properties — transparency, validity, separation — that jointly characterize a secured chain.
- **Mechanism:** Systematization that identifies four attack stages, proposes the three security properties, maps current approaches and frameworks onto them with case studies, and analyzes strengths and weaknesses relative to known attacks.
- **Evidence:** Systematization of existing approaches plus case studies of supply chains in practice; no numbers given.
- **Boundary:** The abstract highlights remaining gaps in actor- and operation-centered supply chain security techniques.
- **Stealable move:** Name a small set of security *properties* first, then map every existing defense into that grid — the research gaps fall out of the empty cells instead of from reading each paper.
- **Pitch:** A systematization establishing transparency, validity, and separation as the design properties of a secure software supply chain.

### 18. Maven-Hijack: Software Supply Chain Attack Exploiting Packaging Order (arXiv 2024)
- **Problem:** Maven packages dependencies in an order the JVM later uses to resolve classes, so a duplicate class in an earlier dependency can silently override core application behavior.
- **Assumption:** A malicious class with the same fully qualified name as a legitimate one, placed in an earlier-packaged dependency, wins at runtime without modifying the main codebase or library names.
- **Mechanism:** Injects a same-name malicious class into an earlier dependency, demonstrated by compromising the Corona-Warn-App's database connection logic; evaluates sealed JARs, Java Modules, and the Maven Enforcer plugin with duplicate class detection.
- **Evidence:** Real-world case study on the Corona-Warn-App plus evaluation of three mitigations; no numbers given.
- **Boundary:** The abstract concludes that current Java build and dependency processes need improved safeguards, with the Maven Enforcer duplicate class detection the most practical defense rather than a complete one.
- **Stealable move:** Hunt for implicit *precedence order* — any build, link, or load step where two identically named things can both exist and one silently wins — as an attack surface requiring no modification of the victim's own code.
- **Pitch:** A novel supply chain attack exploiting Maven packaging order and JVM class resolution, shown on a widely used open-source contact-tracing app.

### 19. What Gets Measured Gets Managed: Mitigating Supply Chain Attacks with a Link Integrity Management System (CCS 2025)
- **Problem:** The web keeps growing while dependency-monitoring tools and integrity standards lag, and there is no robust, generalizable, performant way to verify the integrity of web resources.
- **Assumption:** Customizable policies declaring expected and unexpected properties of resources can be verified and enforced at browse time with acceptable overhead.
- **Mechanism:** LiMS is a transparent system that declares integrity policies for resources, verifies them, and enforces them for website visitors, with basic policies composable into comprehensive ones.
- **Evidence:** Prototype deployment simulated on a representative sample of 450 domains diverse in ranking and category: hundreds of milliseconds overhead on initial page loads, negligible overhead on reloads regardless of network speed; archived data shows the policy building blocks fit real dependency usage patterns with minimal administrative overhead.
- **Boundary:** not stated in abstract
- **Stealable move:** Make the declarative *policy* the extensible unit — a few primitive composable checks each site opts into — so coverage grows by composition instead of by redesigning the verification system.
- **Pitch:** A transparent link integrity management system that bootstraps supply chain guarantees for web browsing with minimal overhead.

### 20. Reinforcement Learning for Supply Chain Attacks Against Frequency and Voltage Control (ICML 2023)
- **Problem:** Power system modernization lets malware enter operation through the supply chain of generation control devices, bypassing network defenses to strike at the physical layer.
- **Assumption:** A reinforcement learning agent can discover disturbance policies against frequency and voltage regulation that a human attacker would not hand-design.
- **Mechanism:** Uses reinforcement learning to develop intelligent attacks incorporated into supply chain attacks against generation control devices, simulating disturbances that impact frequency and voltage regulation.
- **Evidence:** Simulation of disturbances impacting frequency and voltage regulation; no numbers given.
- **Boundary:** not stated in abstract
- **Stealable move:** Run the learning agent on the *attacker* side in simulation to enumerate worst-case disturbances, then reuse the learned policy as a red-team generator for defense design.
- **Pitch:** RL-generated intelligent attacks delivered through the supply chain against generation control, offering guidance for defending power systems.

### 21. Finding Software Supply Chain Attack Paths with Logical Attack Graphs (arXiv 2025)
- **Problem:** MulVal generates logical attack graphs for networked systems but cannot represent supply chain threat propagation, so modern cases like the XZ compromise or the 3CX double attack are out of reach.
- **Assumption:** Supply chain assets, dependencies, interactions, and compromises can be expressed as predicates and rules in MulVal's existing syntax and composed with network analysis.
- **Mechanism:** Extends MulVal with new predicates and interaction rules modeling supply chain assets, dependencies, interactions, compromises, additional security mechanisms, initial states, and known threats, integrated with existing network threat analysis in both directions.
- **Evidence:** Demonstration of practical application of the extension; motivating cases include the XZ compromise and the 3CX double supply chain attack; no numbers given.
- **Boundary:** not stated in abstract
- **Stealable move:** Extend an existing, trusted analysis engine with new predicates instead of building a new one, so the new threat class inherits the solver and composes with the threats the engine already models.
- **Pitch:** A MulVal extension that integrates supply chain threat propagation with existing network-based logical attack graph analysis.

### 22. Software supply chain: review of attacks, risk assessment strategies and security controls (arXiv 2023)
- **Problem:** Studies focus on prevention and detection of supply chain attacks but offer no broad overview of the attacks themselves nor a comprehensive risk assessment.
- **Assumption:** A systematic literature review can produce a coherent picture of attack trends plus controls that map onto real incidents.
- **Mechanism:** Systematic literature review analyzing common supply chain attacks and their latest trends, identifying risks for open-source and third-party supply chains, and introducing security controls linked to real-life incidents.
- **Evidence:** Systematic literature review of existing studies; no numbers given.
- **Boundary:** not stated in abstract
- **Stealable move:** Anchor every proposed control to a named real incident, so the control set is auditable against reality rather than derived only from a closed taxonomy.
- **Pitch:** A systematic review linking supply chain attacks, risk assessment, and security controls to real incidents.

### 23. Journey to the Center of Software Supply Chain Attacks (arXiv 2023)
- **Problem:** There is no general account of how attackers actually carry out open-source software supply chain attacks.
- **Assumption:** Those attacks can be organized into a general taxonomy from which safeguards follow directly.
- **Mechanism:** Proposes a general taxonomy of how attackers conduct open-source supply chain attacks, a list of safeguards to mitigate them, and the "Risk Explorer for Software Supply Chains" tool with industrial use cases.
- **Evidence:** Taxonomy plus a practitioner tool, illustrated with industrial use cases; no numbers given.
- **Boundary:** not stated in abstract
- **Stealable move:** Ship the taxonomy as an explorable tool rather than a table — the artifact is what practitioners adopt, and its use cases become the evidence of relevance.
- **Pitch:** A general taxonomy of open-source software supply chain attacks with safeguards and a Risk Explorer tool for practitioners.

### 24. Robot Collapse: Supply Chain Backdoor Attacks Against VLM-based Robotic Manipulation (arXiv 2024)
- **Problem:** Inference-time attacks on VLM-driven robotic manipulation are well studied, but backdoors injected through the model supply chain into robotic policies remain largely unexplored.
- **Assumption:** A malicious module can be inserted into a modular robotic policy through backdoor relationships that hijack the LLM-to-VLM pathway.
- **Mechanism:** TrojanRobot injects a backdoor module into modular robotic policies; the vanilla design uses a backdoor-finetuned VLM, and the prime scheme "LVLM-as-a-backdoor" uses in-context instruction learning through backdoored system prompts, with permutation, stagnation, and intentional attack types.
- **Evidence:** Physical-world and simulator experiments on 18 real-world manipulation tasks and 4 VLMs verifying the superiority of TrojanRobot (abstract truncated).
- **Boundary:** not stated in abstract
- **Stealable move:** Aim the injection at the *seam between modules* — the interface where one model's output becomes another's instruction — rather than inside any single model, since the supply chain is exactly that glue.
- **Pitch:** A backdoor injection framework for model supply chain attacks that compromises VLM-based robotic manipulation policies.

### 25. SOK: A Taxonomy of Attack Vectors and Defense Strategies for Agentic Supply Chain Runtime (ICLR 2026)
- **Problem:** LLM agents retrieve data and invoke tools at runtime, moving the attack surface from build-time artifacts to inference-time dependencies, and runtime risk research is fragmented.
- **Assumption:** Agent runtime threats can be systematized into a data supply chain (transient context injection versus persistent memory poisoning) and a tool supply chain (discovery, implementation, invocation).
- **Mechanism:** Unifies existing research into a runtime framework, categorizes threats along those two supply chains, identifies the Viral Agent Loop of self-propagating generative worms needing no code vulnerability, and argues for a Zero-Trust Runtime Architecture treating context as untrusted control flow with tool execution bounded by cryptographic provenance.
- **Evidence:** Systematization of existing research plus a new concept (Viral Agent Loop); no numbers given.
- **Boundary:** The Zero-Trust Runtime Architecture is argued for, not evaluated.
- **Stealable move:** Re-draw the security boundary around *what may act as control* rather than where data lives: treat retrieved context as untrusted control flow and gate tool execution on provenance instead of semantic plausibility.
- **Pitch:** A runtime taxonomy of agentic supply chain attacks that calls for moving to a Zero-Trust Runtime Architecture.
