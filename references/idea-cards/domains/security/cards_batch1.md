### 1. Automatic and Universal Prompt Injection Attacks against Large Language Models (arXiv 2024)
- **Problem:** Prompt-injection research lacks a unified goal for what an attack is trying to achieve and depends on hand-crafted prompts, so robustness assessments are neither comprehensive nor comparable.
- **Assumption:** A small set of optimized injected examples generalizes to unseen test inputs and survives defensive measures — i.e. gradients are available through the LLM-integrated application at attack time.
- **Mechanism:** A unified framework that formalizes attack objectives, plus an automated gradient-based method that generates highly effective, universal prompt-injection data.
- **Evidence:** Benchmark-style evaluation against baselines and defenses; five training samples (0.3% relative to the test data) reach superior performance vs baselines.
- **Boundary:** not stated in abstract
- **Stealable move:** When scoring a defense, drive the attack with an automatic gradient-based optimizer instead of a fixed hand-written attack suite; hand-crafted suites systematically overestimate robustness.
- **Pitch:** Prompt injection looks less threatening than it is because attacks were ad hoc — a handful of optimized samples exposes the gap.

### 2. Detecting Prompt Injection Attacks Against Application Using Classifiers (arXiv 2025)
- **Problem:** Prompt injection compromises the security and stability of LLM-integrated web applications and critical systems.
- **Assumption:** Malicious prompts are separable from benign ones by features learnable from a curated corpus drawn from real attack submissions.
- **Mechanism:** Curate and augment a dataset from the HackAPrompt Playground Submissions corpus, then train LSTM, feed-forward neural network, Random Forest, and Naive Bayes classifiers to flag malicious prompts.
- **Evidence:** Dataset/benchmark evaluation on the curated corpus and its augmentation; no quantitative results given in abstract.
- **Boundary:** not stated in abstract
- **Stealable move:** Start from a crowd-sourced pool of real adversarial inputs and augment it, rather than collecting fresh data — a cheap classifier filter then ships without touching the model weights.
- **Pitch:** A curated, augmented injection corpus plus standard classifiers is enough to detect and mitigate attacks on LLM web applications.

### 3. SecAlign: Defending Against Prompt Injection with Preference Optimization (CCS 2024)
- **Problem:** LLMs read external data — documents, web retrieval, API results — and adversarial prompts planted there can override the system's intended instruction.
- **Assumption:** A model trained to prefer the secure completion over the insecure one for the same contaminated input will keep preferring it against attacks far more sophisticated than those seen in training.
- **Mechanism:** Construct a preference dataset of prompt-injected inputs with secure outputs (answering the legitimate instruction) and insecure outputs (answering the injection), then run preference optimization on it.
- **Evidence:** Empirical evaluation across various prompt injections; success rates reduced to <10% even against attacks much more sophisticated than training ones, with utility similar to the pre-defense model.
- **Boundary:** not stated in abstract
- **Stealable move:** Move the defense from the input filter into the weights by turning it into a preference-learning problem: pair safe and unsafe completions for the same contaminated input so the model learns to prefer the safe one.
- **Pitch:** Preference optimization over paired secure/insecure outputs pushes injection success below 10% at essentially no utility cost.

### 4. StruQ: Defending Against Prompt Injection with Structured Queries (USENIX Security 2024)
- **Problem:** Prompt injection works because LLMs follow instructions wherever they appear and cannot separate the prompt from user data.
- **Assumption:** The instruction/data separation can be made a learned property of the model, not merely a formatting convention enforced by the front-end.
- **Mechanism:** Structured queries — a secure front-end that formats prompt and data into two separate channels, plus a fine-tuned LLM trained by augmenting instruction-tuning datasets with instructions planted in the data portion that the model learns to ignore.
- **Evidence:** Empirical evaluation showing significantly improved resistance to prompt injection with little or no impact on utility; no numbers given in abstract.
- **Boundary:** not stated in abstract
- **Stealable move:** Don't rely on the input channel to enforce a boundary — synthesize the confusion case into the training data (the pattern that must be ignored) so the boundary is enforced inside the model.
- **Pitch:** Give the prompt and the data two channels, and train the model to obey only the prompt channel.

### 5. WebInject: Prompt Injection Attack to Web Agents (arXiv 2025)
- **Problem:** MLLM-based web agents generate actions from webpage screenshots, so anything that alters rendered pixels can steer the agent's behavior.
- **Assumption:** A perturbation on raw pixel values survives the rendering-to-screenshot mapping and remains effective after that mapping, which can be approximated well enough by a learned network.
- **Mechanism:** Formulate the perturbation as an optimization problem; train a neural network to approximate the non-differentiable raw-pixel-to-screenshot mapping, then solve the reformulated problem with projected gradient descent.
- **Evidence:** Benchmark evaluation on multiple datasets; described as highly effective and significantly outperforming baselines, no numbers in abstract.
- **Boundary:** not stated in abstract
- **Stealable move:** When the step between your controllable input and the model's observation is non-differentiable, learn a differentiable surrogate for that one step and backpropagate through the surrogate.
- **Pitch:** Perturb the raw webpage pixels and the resulting screenshot makes the web agent perform the attacker's action.

### 6. UniGuardian: A Unified Defense for Detecting Prompt Injection, Backdoor Attacks and Adversarial Attacks in Large Language Models (arXiv 2025)
- **Problem:** Injection, backdoor, and adversarial attacks are studied in separate silos, and no defense can tell whether a hidden trigger is steering the model when the attack type is unknown.
- **Assumption:** Successful trigger activation leaves a common signature — a measurable shift in the model's output distribution when the prompt is structurally perturbed — shared across all three attack families.
- **Mechanism:** A training-free detector built on that shared mechanism, plus a single-forward strategy that runs detection and text generation together in one batched forward pass at each decoding step.
- **Evidence:** Experiments confirming accurate and efficient identification of trigger-activated prompts; no quantitative numbers given in abstract.
- **Boundary:** not stated in abstract
- **Stealable move:** Detect by perturbation response rather than by classifying the input: apply small structural perturbations and read how far the output distribution moves, a signal that stays valid when attack families differ.
- **Pitch:** One training-free question — does a perturbation move the output distribution? — catches injection, backdoor, and adversarial triggers alike.

### 7. Beyond Instruction Override: Benchmarking Indirect Prompt Injection with Task-Tampering Attacks (arXiv 2026)
- **Problem:** Existing indirect prompt-injection benchmarks only test planted instructions that replace the task, leaving attacks that tamper with the outcome of the task already in progress untested and undetected.
- **Assumption:** Attack-ness can be defined by authority — planted content is an attack when it tries to influence a decision its source is not authorized to determine — rather than by instruction-like wording.
- **Mechanism:** A benchmark of 90 validated cases across three tool-use environments, each with the user request naming the authoritative source, and each case carrying attacks on up to six decision parts: objective, decision rules, available actions, expected consequences, observation reading, and state beliefs.
- **Evidence:** Measurement over five LLMs: undefended, attacks on decision rules, available actions, and state beat objective attacks; a detection-and-removal defense cuts objective attacks to 2.4% but leaves observation and state at 9.5% and 12.1%; a tool-policy defense still allows 15.4% vs 17.0% undefended, because these attacks generally re (abstract truncated).
- **Boundary:** The abstract itself admits detection-and-removal leaves observation- and state-targeting attacks at 9.5% and 12.1% (gap persists under detection-optimized rewrites) and tool-policy defense still allows 15.4%.
- **Stealable move:** Define the threat by authorization over a decision instead of by syntax, then enumerate the agent's decision components and attack each separately — the weakest component, not the obvious objective, should set the benchmark.
- **Pitch:** Most indirect injection does not redirect the task; it tampers with a decision inside it, and current defenses miss exactly those.

### 8. Backdoor-Powered Prompt Injection Attacks Nullify Defense Methods (arXiv 2025)
- **Problem:** Instruction-hierarchy and other fine-tuning defenses assume a clean training stage, but an attacker who poisons fine-tuning data can plant a trigger that turns the defense off.
- **Assumption:** The attacker can poison supervised fine-tuning samples, and the planted backdoor survives the very fine-tuning used for the defense.
- **Mechanism:** Poison SFT samples to insert a backdoor; once the trigger is activated, the backdoored model executes the injected instruction wrapped in the trigger; build a benchmark for systematic evaluation.
- **Evidence:** Benchmark-based evaluation; reported as more harmful than previous prompt-injection attacks and able to nullify existing defenses including instruction hierarchy, no numbers in abstract.
- **Boundary:** not stated in abstract
- **Stealable move:** Evaluate a defense against an adversary positioned upstream of the defense's own training pipeline — treat the defense's training data as part of the attack surface, not a trusted input.
- **Pitch:** A backdoor in the fine-tuning data makes prompt-injection defenses, even instruction hierarchy, stop working.

### 9. LongPIBench: A Long-Context Benchmark for Prompt Injection (arXiv 2026)
- **Problem:** Existing prompt-injection benchmarks use short contexts, so defenses are evaluated in a regime unlike real deployment and their effectiveness is substantially overestimated.
- **Assumption:** Attack success and defense behavior change with context length, and four real applications (peer review, resume screening, code review, email summary) represent the long-context deployments that matter.
- **Mechanism:** A long-context benchmark with four realistic scenarios, each having both a synthetic and a real-world dataset, with contexts ranging from thousands to tens of thousands of tokens.
- **Evidence:** Benchmark plus measurement; even simple heuristic attacks achieve high success rates and frequently bypass state-of-the-art defenses; no numbers given in abstract.
- **Boundary:** not stated in abstract
- **Stealable move:** Report defense effectiveness as a function of input length on deployment-realistic distributions, since results obtained at short lengths act as an upper bound on the defense's real quality.
- **Pitch:** In long contexts, plain heuristic injections get through state-of-the-art defenses.

### 10. Maatphor: Automated Variant Analysis for Prompt Injection Attacks (arXiv 2023)
- **Problem:** Defenders patch guardrails against the one injection technique they found, but variants of that injection evade the patch, much as malware variants evade antivirus.
- **Assumption:** Variants can be generated automatically, and whether a variant succeeded can be decided from the model's output alone — a black-box oracle, no access to internals.
- **Mechanism:** A tool that automatically generates variants of a given prompt and automatically judges whether each variant was effective from the output, also producing datasets for jailbreak and injection work.
- **Evidence:** Evaluation on three different types of prompt-injection tasks; starting from an ineffective (0%) seed prompt, it consistently generates variants that are at least 60% effective within the first 40 iterations.
- **Boundary:** not stated in abstract
- **Stealable move:** Convert a single known failure into an automated variant generator with a black-box success oracle, so a defense is scored against a search process instead of one fixed artifact.
- **Pitch:** Test defenses against automatically generated variants, not only against the injection someone happened to find.

### 11. Latent Jailbreak: A Benchmark for Evaluating Text Safety and Output Robustness of Large Language Models (arXiv 2023)
- **Problem:** Benchmarks measure jailbreak safety alone, while excessive sensitivity to certain topics can degrade a model's ability to follow instructions, and that robustness cost goes unmeasured.
- **Assumption:** Embedding malicious instructions inside a legitimate task (e.g. translation) is a realistic jailbreak channel, and safety and instruction robustness trade off on the same prompts.
- **Mechanism:** A latent jailbreak prompt dataset where the model is told to complete a regular task on text that itself contains malicious instructions, plus a hierarchical annotation framework, analyzed over instruction position, word replacements, and instruction replacements.
- **Evidence:** Benchmark plus systematic analysis across LLMs; findings that models prioritize certain instruction verbs and show varying jailbreak rates by verb; no quantitative rates in abstract (abstract truncated).
- **Boundary:** not stated in abstract
- **Stealable move:** Score safety and task-following on the same prompt set and report both axes, so over-tuned refusal shows up as a visible robustness cost instead of a hidden safety gain.
- **Pitch:** Safety and robustness must be benchmarked together, because pushing one moves the other.

### 12. Gradient Cuff: Detecting Jailbreak Attacks on Large Language Models by Exploring Refusal Loss Landscapes (NeurIPS 2024)
- **Problem:** RLHF-aligned LLMs are still broken by adversarial jailbreaks, and a detector is needed that separates jailbreak queries from benign ones.
- **Assumption:** Jailbreaks sit in a distinguishable region of the model's refusal-loss landscape — both the loss value and its smoothness differ from benign queries.
- **Mechanism:** Define Refusal Loss, then a two-step detection strategy that uses its functional value and its smoothness under perturbation, with an adjustable threshold.
- **Evidence:** Empirical evaluation on two aligned LLMs (LLaMA-2-7B-Chat, Vicuna-7B-V1.5) and six jailbreak types (GCG, AutoDAN, PAIR, TAP, Base64, LRL); improved rejection, benign performance maintained by adjusting the detection threshold.
- **Boundary:** not stated in abstract
- **Stealable move:** Use the geometry of the model's own loss landscape — value plus smoothness under perturbation — as the detection feature; it is inherited from alignment, so it generalizes across attack families that share nothing textually.
- **Pitch:** Jailbreaks leave a fingerprint in the refusal-loss landscape, and a two-step check on value and smoothness finds it.

### 13. Jailbreak Distillation: Renewable Safety Benchmarking (arXiv 2025)
- **Problem:** Safety benchmarks saturate and become contaminated, and fixed prompt sets cannot keep up with model generations.
- **Assumption:** A small set of development models combined with existing attack algorithms yields a candidate pool from which a selected subset predicts safety on models that were never used in construction.
- **Mechanism:** JBDistill — build a candidate prompt pool from development models and jailbreak algorithms, then run prompt-selection algorithms to pick the effective subset as the benchmark; rerun the pipeline to refresh it.
- **Evidence:** Benchmark construction plus evaluation; generalizes to 13 held-out evaluation models (proprietary, specialized, newer-generation) and outperforms existing safety benchmarks in effectiveness while keeping high separability and diversity.
- **Boundary:** not stated in abstract
- **Stealable move:** Ship the benchmark as a generator plus a selection procedure rather than a frozen list, so saturation and contamination are handled by re-running construction instead of by hand-authoring new items.
- **Pitch:** Distill live jailbreak attacks into a small prompt set that stays effective on models it never saw and is cheap to renew.

### 14. JailbreakBench: An Open Robustness Benchmark for Jailbreaking Large Language Models (NeurIPS 2024)
- **Problem:** Jailbreak evaluation has no standard practice, computes costs and success rates incomparably, and is often irreproducible due to withheld prompts, closed code, or evolving proprietary APIs.
- **Assumption:** Fixing the whole measurement stack — threat model, system prompts, chat templates, scoring functions — together with open artifacts makes attack and defense results comparable and reproducible.
- **Mechanism:** An open-sourced benchmark combining an evolving repository of adversarial prompts (jailbreak artifacts), a 100-behavior dataset, a standardized evaluation framework, and a public leaderboard.
- **Evidence:** Benchmark artifact: 100 behaviors, original and sourced from prior work (Zou et al., 2023; Mazeika et al., 2023, 2024), aligned with OpenAI's usage policies; leaderboard tracks attacks and defenses across LLMs.
- **Boundary:** not stated in abstract
- **Stealable move:** Publish the harness as part of the result — pin threat model, system prompt, chat template, and scorer alongside the data, because in adversarial evaluations the measurement stack moves the number.
- **Pitch:** A shared open harness with fixed prompts, templates, and scoring is what makes jailbreak numbers comparable.

### 15. LLMs Can Defend Themselves Against Jailbreaking in a Practical Manner: A Vision Paper (arXiv 2024)
- **Problem:** Jailbreak attacks (GCG, DAN templates, multilingual) keep improving while defenses, which must also stay fast on benign traffic, lag behind.
- **Assumption:** Whatever the jailbreak strategy, the harmful prompt itself must eventually appear in the text sent to the model, and current LLMs are already able to recognize such policy-violating prompts.
- **Mechanism:** SELFDEFEND — a shadow stack that concurrently checks for a harmful prompt in the user input and triggers a checkpoint in the normal stack when a "No" token or harmful prompt is emitted, also producing an explainable response.
- **Evidence:** Vision paper; manual analysis in GPT-3.5/4 across various jailbreak scenarios, with three future directions listed; no quantitative numbers.
- **Boundary:** The abstract admits the support is manual analysis in GPT-3.5/4 and that three future directions remain to strengthen the design.
- **Stealable move:** Identify the invariant every member of an attack family must satisfy and check only that one thing, in a parallel shadow execution — avoids enumerating attacks and costs almost nothing on benign traffic.
- **Pitch:** Every jailbreak must eventually state the harmful request, so a concurrent shadow check catches it with negligible delay.

### 16. TombRaider: Entering the Vault of History to Jailbreak Large Language Models (arXiv 2025)
- **Problem:** Chatbot safety filters must be bypassed by new channels, and red teaming needs jailbreak techniques that are not obvious rewrites of known templates.
- **Assumption:** A model's stored historical knowledge can be retrieved and framed so that harmful content arrives as historical narrative rather than as a request, evading filters.
- **Mechanism:** Two cooperating agents — an inspector agent that extracts relevant historical information and an attacker agent that generates adversarial prompts from it.
- **Evidence:** Empirical evaluation on six popular models; nearly 100% ASR on bare models and over 55.4% ASR against defense mechanisms.
- **Boundary:** not stated in abstract
- **Stealable move:** Split an attack into a scouting role that retrieves innocuous pieces and a composing role that assembles them, so the harmful payload is never written in one place where a filter can see it.
- **Pitch:** Historical narrative pulled from the model's own knowledge is a jailbreak channel that current safeguards do not cover.

### 17. EnJa: Ensemble Jailbreak on Large Language Models (arXiv 2024)
- **Problem:** Aligned LLMs still emit policy-violating content; prompt-level jailbreaks (story/logic) and token-level gradient attacks each hit a ceiling on their own.
- **Assumption:** The two families are complementary enough that composing them preserves each one's strength rather than averaging it away.
- **Mechanism:** Ensemble Jailbreak — hide the harmful instruction with a prompt-level jailbreak, boost attack success with a gradient-based token-level attack, and connect the two with a template-based connector.
- **Evidence:** Empirical evaluation on several aligned models; state-of-the-art attack success rate with fewer queries and much stronger than any individual jailbreak; no numbers in abstract.
- **Boundary:** not stated in abstract
- **Stealable move:** Compose attack primitives that operate at different granularities and glue them with a fixed template — usually beats scaling any single primitive, and costs fewer queries.
- **Pitch:** Stack a prompt-level disguise under a token-level optimizer and the hybrid beats either attack alone with fewer queries.

### 18. Jailbreaking Attack against Multimodal Large Language Model (arXiv 2024)
- **Problem:** MLLMs can be driven to generate objectionable responses to harmful queries; a jailbreak must work across unseen prompts and images and ideally transfer to other models.
- **Assumption:** A single image-space jailbreaking prompt found by maximum likelihood has a data-universal property and transfers across model architectures in a black-box manner.
- **Mechanism:** A maximum-likelihood-based algorithm that finds an image Jailbreaking Prompt (imgJP), plus a construction-based method that reuses the approach to build LLM jailbreaks via a discovered connection between MLLM and LLM jailbreaks.
- **Evidence:** Empirical transfer evaluation on MiniGPT-v2, LLaVA, InstructBLIP, and mPLUG-Owl2 in black-box manner; for LLM jailbreaks it is more efficient than current state-of-the-art methods; no numbers in abstract.
- **Boundary:** not stated in abstract
- **Stealable move:** Pay the search cost once to find a universal artifact in one modality, then carry it into another modality through a construction rule instead of re-optimizing from scratch.
- **Pitch:** One image jailbreaking prompt, optimized by maximum likelihood, transfers to unseen inputs, unseen images, and black-box models.

### 19. Foot In The Door: Understanding Large Language Model Jailbreaking via Cognitive Psychology (arXiv 2024)
- **Problem:** Jailbreak work reports success rates but leaves the LLM's internal decision-making on receipt of a jailbreak prompt unexplained.
- **Assumption:** Cognitive consistency theory transfers to LLMs — once a model has committed to a stance in small steps, it will resolve inconsistency by continuing rather than refusing.
- **Mechanism:** An automatic black-box Foot-in-the-Door (FITD) method that progressively induces the model to answer a harmful question through multi-step incremental prompts; instantiated as a prototype system.
- **Evidence:** Prototype evaluation on 8 advanced LLMs, yielding an average success rate of 83.9%.
- **Boundary:** not stated in abstract
- **Stealable move:** Replace the single decisive adversarial input with a ladder of individually harmless commitments, so refusing the next step becomes inconsistent with what the model already said.
- **Pitch:** Jailbreaking is a cognitive-consistency problem: escalate in small steps and the model talks itself into compliance.

### 20. Jailbreaking Large Language Models with Morality Attacks (arXiv 2026)
- **Problem:** Pluralism alignment is being pursued, but how robust LLMs and guardrail models are when producing moral content over pluralistic values is still unexplored.
- **Assumption:** Morality questions that are ambiguous or conflictual expose internal values, and jailbreak-style prompting can manipulate that judgment reliably enough to be measured.
- **Mechanism:** A morality dataset of 10.3K instances in two categories, Value Ambiguity and Value Conflict, plus four formalized adversarial attacks that manipulate the model's judgment on those questions, evaluated on both LLMs and guardrail models.
- **Evidence:** Dataset plus evaluation; 10.3K instances; results show a critical vulnerability of both LLMs and guardrail models to these subtle moral-aware attacks, no rates given.
- **Boundary:** not stated in abstract
- **Stealable move:** Repurpose attack machinery as a measurement instrument — use adversarial prompting to probe what a model internally prefers, not to break it, so a values question becomes an empirical one.
- **Pitch:** Subtle moral-aware jailbreaks expose how fragile the pluralistic judgments of both LLMs and guardrails are.

### 21. Off-Path TCP Hijacking in Wi-Fi Networks: A Packet-Size Side Channel Attack (arXiv 2024)
- **Problem:** An off-path attacker in a Wi-Fi network cannot see the victim's connection state, which is what TCP hijacking requires, even though WEP and WPA2/WPA3 protect the payloads.
- **Assumption:** Encrypted frame sizes are stable and distinguishable per response type, so frame size alone reveals enough state to infer sequence numbers and inject.
- **Mechanism:** Exploit the observable frame-size side channel — TCP receivers' ACK and RST responses differ in size and the encrypted frames carrying them have consistent, distinguishable sizes — to detect and hijack connections, shown through SSH DoS and web traffic manipulation.
- **Evidence:** Real-world deployment plus measurement: SSH session terminated in 19 seconds, malicious data injected into web traffic within 28 seconds; 30 popular routers from 9 vendors, none protective; 80 real Wi-Fi networks tested, hijack succeeded in 75 (93.75%); responsible disclosure to the Wi-Fi Alliance with mitigation strategies proposed (abstract truncated).
- **Boundary:** not stated in abstract
- **Stealable move:** When content is encrypted, go after length — message size often still classifies message type well enough to reconstruct protocol state without decrypting anything.
- **Pitch:** Encrypted Wi-Fi frame sizes leak enough TCP state for an off-path attacker to hijack connections in 93.75% of tested real networks.

### 22. A Practical Deep Learning-Based Acoustic Side Channel Attack on Keyboards (S&P 2023)
- **Problem:** Acoustic keyboard side channels were known but not practical; ubiquitous microphones and better classifiers change the threat level.
- **Assumption:** Keystroke acoustics captured by an off-the-shelf smartphone microphone or a video-conferencing call are separable by a deep learning classifier without any language model.
- **Mechanism:** Train a state-of-the-art deep learning model to classify laptop keystrokes recorded by a nearby smartphone microphone and separately through the video-conferencing software Zoom.
- **Evidence:** Real measurement: 95% accuracy when trained on keystrokes recorded by a nearby phone, the highest accuracy seen without a language model; 93% through Zoom, a new best for that medium.
- **Boundary:** not stated in abstract
- **Stealable move:** Re-run a known lab side channel with consumer hardware and a modern classifier; demonstrating off-the-shelf practicality is itself the contribution, and it changes the threat model's assumptions.
- **Pitch:** A smartphone microphone and a deep classifier recover laptop keystrokes at 95% accuracy, no special equipment needed.

### 23. Beyond the Bridge: Contention-Based Covert and Side Channel Attacks on Multi-GPU Interconnect (arXiv 2024)
- **Problem:** High-speed interconnects such as NVLink are shared by all tenants of a multi-GPU system, but their congestion has not been treated as a leakage channel.
- **Assumption:** An adversary with no special permissions can observe interconnect congestion at a resolution fine enough to distinguish a victim's activities from noise.
- **Mechanism:** Monitor NVLink congestion without special permissions, using that signal to build a covert channel across two GPUs and a side channel that fingerprints victim applications.
- **Evidence:** Real-system measurement: covert channel across two GPUs at 45.5 kbps bandwidth with a low error rate; side channel that fingerprints applications through the shared interconnect.
- **Boundary:** not stated in abstract
- **Stealable move:** Treat any shared high-bandwidth fabric — not just caches — as a timing channel; an unprivileged tenant's contention measurement is enough for both a covert channel and an application fingerprint.
- **Pitch:** NVLink congestion, visible without privileges, yields a 45.5 kbps covert channel and lets an attacker fingerprint applications.

### 24. PREFENDER: A Prefetching Defender against Cache Side Channel Attacks as A Pretender (arXiv 2023)
- **Problem:** Cache side-channel attacks (general and transient-execution based) have countermeasures, but those mostly trade performance for security or cover a restricted scope.
- **Assumption:** An attacker must itself touch the cache to manipulate state and observe changes, so the attacker's access pattern is predictable and can be pre-empted.
- **Mechanism:** A secure prefetcher that learns and predicts attack-related accesses and prefetches those cache lines, serving security and performance with one mechanism.
- **Evidence:** Simulation/benchmark evaluation: effective against several cache side-channel attacks while maintaining or even improving performance on SPEC CPU 2006 and 2017.
- **Boundary:** not stated in abstract
- **Stealable move:** Instead of blocking the adversary's observation, make it worthless by pre-supplying the state it wants to measure — then the defense and the performance optimization are the same mechanism.
- **Pitch:** A prefetcher that predicts attacker accesses defends against cache side channels and improves performance at the same time.

### 25. Timing the Transient Execution: A New Side-Channel Attack on Intel CPUs (arXiv 2023)
- **Problem:** Transient-execution attacks need a covert channel to leak data, and the usual ones depend on the cache, which is increasingly mitigated and detectable.
- **Assumption:** An EFLAGS change made during transient execution side-effects a later Jcc instruction, and the resulting timing difference is large enough to encode bits without manually resetting EFLAGS.
- **Mechanism:** Encode secret data into register changes that make context execution slightly slower, then measure the timing of transient execution and Jcc instructions to decode the data; combined with Meltdown as its side channel.
- **Evidence:** Real hardware: implemented on Intel Core i7-6700, i7-7700, and i9-10980XE; on the first two, combined with Meltdown, it achieves a 100% success leaking rate.
- **Boundary:** not stated in abstract
- **Stealable move:** When the obvious channel (cache) gets hardened, look for microarchitectural state that is not explicitly reset between contexts — anything that persists as a side effect remains a channel.
- **Pitch:** EFLAGS changes during transient execution leak through Jcc timing, giving a side channel that needs no cache.
