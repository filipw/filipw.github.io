# Presentation Plan: Hybrid AI — Orchestrating Collaboration Between On-Device and Cloud Models

---

## Meta Information

- **Title:** Hybrid AI — Orchestrating Collaboration Between On-Device and Cloud Models
- **Duration:** 45 minutes (including 3–4 live demos)
- **Target Audience:** Azure developers and architects
- **Goal:** Bridge recent academic research on hybrid SLM-LLM systems into practical, implementable architectural patterns using the Microsoft Agent Framework
- **Code Language:** .NET (C#) — repo also contains Python versions
- **GitHub Repo:** https://github.com/filipw/hybrid-agent-framework-samples
- **Format:** PowerPoint (previously done in reveal.js — same flow and vibe applies)

---

## Overall Narrative Arc

The session answers a single dramatic question posed in the abstract: *"No matter what you choose, you lose — right?"* The entire deck is a progressive answer to this question. We start by establishing the painful tradeoff (powerful but expensive vs. cheap but dumb), then one by one introduce research-backed **hybrid collaboration patterns** that dissolve it. Each pattern is grounded in a peer-reviewed paper and demonstrated with running .NET code using the Microsoft Agent Framework.

**Narrative stages:**
1. Establish the tension (cloud = expensive, SLM = limited)
2. Introduce the SLM landscape (they're better than you think)
3. Reveal the paradigm shift: Hybrid AI
4. Five architectural patterns, each escalating in sophistication
5. Decision framework: when to use which
6. Call to action

---

## Section Breakdown and Slide Plan

---

### SLIDE 1 — Title Slide
- **Title:** Hybrid AI
- **Subtitle:** Orchestrating Collaboration Between On-Device and Cloud Models
- **Speaker:** Filip W. / strathweb.com / @filipw.strathweb.com
- **Visual direction:** Full-bleed background (dramatic, dark — e.g. abstract technological imagery)
- **Notes:** Same structure as previous decks (title + speaker links overlay)

---

### SLIDE 2 — Speaker / About
- Filip W., software architect from Zürich
- Microsoft MVP
- Strathweb.com — blog, .NET, AI, quantum computing
- Social links
- **Notes:** Keep brief, 30 seconds max

---

### SECTION A: THE PROBLEM

#### SLIDE 3 — The Painful Tradeoff (hook slide)
- **Content:** Two columns
  - Left: ☁️ Cloud LLMs
    - GPT-4o, Claude Sonnet, etc.
    - Powerful reasoning, broad capability
    - **$2–$15 per million tokens (output)**
    - Latency: 1–10 seconds
    - Privacy risk: data leaves your network
  - Right: 📱 On-Device SLMs
    - Phi-4-mini, Gemma-2, Llama-3.2, Qwen2.5
    - Fast and free to run
    - **Limited reasoning, hallucination risk**
    - Latency: milliseconds
    - Privacy: 100% local
- **Bottom line:** "No matter what you choose, you lose — right?"
- **Visual:** Cost/capability comparison matrix or "vs" battle card

#### SLIDE 4 — Why This Matters (cost at scale)
- **Content:** The real cost calculation
  - Example: 1 million queries/day to GPT-4o = ~$10,000–$15,000/day
  - But: Up to 60–80% of those queries are trivial (formatting, extraction, summarization)
  - Sending trivial queries to frontier models is economically irrational
- **Quote/stat:** "For some queries, even a cheap model can generate an acceptable response. More complex queries require an expensive model."
- **Visual:** Cost breakdown chart — simple vs. complex query distribution

#### SLIDE 5 — The Alternative We Don't Want
- **Content:** "Just use SLMs everywhere"
  - Cheaper? Yes.
  - But: SLMs fail silently. They hallucinate confidently.
  - Error compounds in multi-step tasks
  - Reference: MAKER paper — "a 1% per-step error rate causes failure after 100 steps"
- **Visual:** Error accumulation graph (from MAKER paper concept)
- **Notes:** This sets up the need for a smarter hybrid approach

---

### SECTION B: THE SLM LANDSCAPE

#### SLIDE 6 — Section Header: "The State of On-Device AI"
- **Content:** Section divider — just title with dramatic background
- **Notes:** Transition to quickly establish that SLMs are more capable than expected

#### SLIDE 7 — SLMs Are Better Than You Think
- **Content:** Key insight from *Small Language Models for Agentic Systems* survey (Sharma & Mehta, 2025, arXiv:2510.03847)
  - The conventional wisdom "bigger = better" has been decisively challenged
  - SLMs (1–12B parameters) are increasingly **superior** for agentic workloads:
    - Retrieval-Augmented Generation (RAG)
    - Function calling / tool use
    - Structured decoding (JSON, grammar-constrained)
    - Programmatic interaction
  - The bottleneck in agentic systems is **orchestration and I/O**, not raw intelligence
- **Visual:** A simple diagram showing SLM strengths in the agentic loop
- **Footnote:** ¹ Sharma & Mehta, "Small Language Models for Agentic Systems", arXiv:2510.03847 (2025)

#### SLIDE 8 — Representative On-Device SLMs (model table)
- **Content:** Quick reference table of key SLMs for agents
  | Model | Size | Agent Strengths |
  |-------|------|-----------------|
  | Microsoft Phi-4-mini | 3.8B | Math/coding, function calling, fast inference |
  | Qwen2.5 | 0.5B–72B | Tool use, structured output |
  | Google Gemma-2 | 2B–27B | Coding, reasoning, multilingual |
  | Meta Llama-3.2 | 1B–90B | On-device, quantized, multimodal |
  | Mistral | 3B–8B | Function calling, edge deployment |
  | DeepSeek-R1-Distill | 1.5B–70B | Reasoning via distillation |
- **Source:** arXiv:2510.03847
- **Notes:** This is reference material for the audience — don't dwell, show it quickly

#### SLIDE 9 — What Makes an SLM "Good" for Agents?
- **Content:** The four critical capabilities (from the survey)
  - **Function calling / tool use** — interacting with external systems
  - **Structured generation** — reliable JSON/schema-constrained output
  - **Code and data manipulation** — programmatic interaction
  - **Controllability** — temperature, stop conditions, tool schema adherence
- **Key takeaway:** "Guided decoding and validator-first tool use allow SLMs to match or surpass LLMs at 10×–100× lower token cost"
- **Visual:** Capability radar chart or four-quadrant diagram

---

### SECTION C: INTRODUCING HYBRID AI

#### SLIDE 10 — Section Header: "Hybrid AI"
- **Content:** Section divider
- **Tagline:** "What if we stopped choosing, and started orchestrating?"
- **Visual:** Two icons (cloud + chip) connected by arrows

#### SLIDE 11 — The Paradigm Shift
- **Content:**
  - Old mindset: "Which model should I use?"
  - New mindset: "How do I route, cascade, and collaborate between models?"
  - Hybrid AI = intelligently dividing work between on-device SLMs and cloud LLMs
  - Goal: Match model capability to task complexity
  - Optimize simultaneously for: **Latency + Cost + Privacy + Reliability**
- **Visual:** A spectrum from "simple/local" to "complex/cloud" tasks

#### SLIDE 12 — The Patterns We'll Cover (agenda)
- **Content:** Five architectural patterns, each grounded in a paper:
  1. **SLM-Default, LLM-Fallback** — reactive cascade with confidence gate
  2. **RouteLLM / Predictive Router** — proactive query classifier trained on preference data
  3. **Minions / MinionsS** — parallel decomposition
  4. **Chain of Agents** — sequential long-context processing
  5. **MAKER** — massively decomposed agentic processes with error correction
- **Visual:** Pattern cards or roadmap visual
- **Notes:** This is the agenda for the rest of the talk

#### SLIDE 13 — The Microsoft Agent Framework
- **Content:** Brief framing of the technology used throughout all demos
  - Open source framework for building, orchestrating and deploying AI agents
  - Supports .NET (C#) and Python
  - Graph-based workflow model (Pregel-style execution)
  - Key abstractions: Agents, Executors, Edges (conditional), Workflows
  - Works with Azure AI Foundry, GitHub Models, OpenAI, local models
- **Visual:** Simple agent workflow diagram (start → agent → conditional edge → agent)
- **Link:** github.com/microsoft/agent-framework

---

### SECTION D: PATTERN 1 — SLM-Default, LLM-Fallback

#### SLIDE 14 — Section Header: "Pattern 1: SLM-Default, LLM-Fallback"
- **Content:** Section divider
- **Subtitle/Tagline:** "Route cheap, escalate smart"
- **Paper badge:** Sharma & Mehta, arXiv:2510.03847

#### SLIDE 15 — The Cascade Concept
- **Content:**
  - All queries go to the **local SLM first** (Tier 1)
  - A **verifier gate** checks the quality of the output
  - If quality is sufficient → return immediately (fast, free, private)
  - If quality is insufficient → **escalate to cloud LLM** (Tier 2)
  - The key question: how do we know when the SLM is wrong?
- **Visual:** Diagram: `Query → SLM → Verifier → [✓ done | ✗ Cloud LLM → Response]`

#### SLIDE 16 — The Confidence Gate
- **Content:**
  - One approach: **self-reported confidence scoring**
  - Instruct the SLM to output: `CONFIDENCE: X` (1–10) with its answer
  - Modern SLMs (Phi-4-mini, etc.) are surprisingly well-calibrated
  - Gate threshold: score < 8 → escalate
  - Other gate options: semantic similarity check, output validation against schema, tool call success
- **Visual:** Sample SLM output showing CONFIDENCE: 9 vs CONFIDENCE: 2
- **Code snippet:**
  ```csharp
  // Confidence check middleware
  if (confidenceScore < threshold)
      RouteToCloudAgent(query);
  ```

#### SLIDE 17 — Architecture: SLM-Default Flow
- **Content:** Architecture diagram showing:
  - User → Local Agent (Phi-4-mini via Ollama/MLX)
  - Local Agent → Confidence Verifier
  - Verifier: High confidence → ✓ Return response
  - Verifier: Low confidence → Cloud Agent (Azure AI Foundry)
  - Cloud Agent → Return response
- **Components:** Microsoft Agent Framework WorkflowBuilder with conditional edges
- **Visual:** Clean architecture flow diagram

#### SLIDE 18 — Demo: Pattern 1
- **Content:** "DEMO TIME" slide
- **What to show in the demo:**
  - Navigate to: `samples/01-slm-fallback/` (or equivalent folder)
  - Show: The `Program.cs` or main entry point
  - Highlight: `WorkflowBuilder`, `add_edge` with `condition=should_fallback_to_cloud`
  - Run with: pre-selected queries (easy fact, ambiguous, hallucination trap, logic puzzle)
  - Show output: confidence scores, routing decisions
  - Highlight cost contrast: "4 out of 5 queries handled locally = zero cloud cost"
- **Notes:** Keep demo to ~3 minutes, pre-load model to avoid wait time

#### SLIDE 19 — Pattern 1: Key Takeaways
- **Content:**
  - ✅ Best pattern to start with — simple to implement
  - ✅ Works immediately with any SLM and any cloud LLM
  - ✅ Significant cost reduction on query-heavy workloads
  - ⚠️ Self-reported confidence is not perfect — consider output validation
  - ⚠️ Threshold must be tuned per use-case
  - 📖 From: Sharma & Mehta, "Small Language Models for Agentic Systems", arXiv:2510.03847

---

### SECTION E: PATTERN 2 — RouteLLM (Predictive Router)

#### SLIDE 20 — Section Header: "Pattern 2: Predictive Router"
- **Content:** Section divider
- **Subtitle:** "Decide before you generate"
- **Paper badge:** Ong et al., RouteLLM, arXiv:2406.18665, ICLR 2025

#### SLIDE 21 — Reactive vs. Proactive: Two Fundamentally Different Approaches
- **Content:** This is the key conceptual split of the session — two philosophies of hybrid routing:

  | | SLM-Default, LLM-Fallback (Pattern 1) | Predictive Router / RouteLLM (Pattern 2) |
  |---|---|---|
  | **When is the routing decision made?** | **After** SLM generates a response | **Before** any generation happens |
  | **What triggers escalation?** | Output quality (confidence score, validation) | Input complexity (query classifier) |
  | **Latency on escalation** | ❌ Paid twice: SLM generation + LLM generation | ✅ Paid once: router inference + LLM generation |
  | **Latency on success** | ✅ Only SLM generation | ✅ Only SLM/weak generation |
  | **Training required?** | No — works zero-shot | Yes — router trained on preference data |

- **Key insight:** Pattern 1 is *reactive* (generate, then evaluate). Pattern 2 is *proactive* (predict, then route). Both are complementary — not competing.
- **Visual:** Two-lane road diagram: Left lane = "generate first, evaluate later". Right lane = "evaluate first, generate once."

#### SLIDE 22 — RouteLLM: Learning the Routing Decision
- **Content:** From *RouteLLM: Learning to Route LLMs with Preference Data* (UC Berkeley + Anyscale, ICLR 2025)
  - Core insight: we can train a **lightweight router** to predict, given a query, whether the weak model (SLM) will give an acceptable answer
  - Training signal: **human preference data** from Chatbot Arena — hundreds of thousands of head-to-head model comparisons
  - Data augmentation: enrich with golden-labelled benchmarks (MMLU) and LLM-judge labels
  - Result: over **2× cost reduction** with no meaningful quality loss
  - The router itself is extremely cheap to run: **$3–$40 per million requests** (vs. $2,000–$15,000 per million LLM generation requests)
- **Visual:** Cost-performance curve showing the router's operating point on the quality/cost trade-off
- **Footnote:** ¹ Ong et al., "RouteLLM: Learning to Route LLMs with Preference Data", arXiv:2406.18665, ICLR 2025

#### SLIDE 23 — Four Router Architectures (from RouteLLM)
- **Content:** The paper evaluates four router designs, ranging from lightweight to powerful:
  1. **Similarity-Weighted Ranking** — retrieves similar queries from training data, uses their outcomes to vote → fast, CPU-only, but expensive per-request
  2. **Matrix Factorization** — learns a latent scoring function over (model, query) pairs via bilinear factorization → best cost/accuracy balance
  3. **BERT Classifier** — fine-tuned text classifier using [CLS] token → strong but heavier
  4. **Causal LLM Classifier** — Llama-3-8B instruction-following → most powerful but highest overhead
- **Winner:** Matrix Factorization achieves best results — requires **50% fewer GPT-4 calls** to hit 80% performance target (CPT80%)
- **Visual:** Results table or bar chart comparing the four routers on APGR metric
- **Key message for architects:** You don't need a big model to make a smart routing decision

#### SLIDE 24 — RouteLLM in Practice: What You Need
- **Content:** Practical implementation guide
  - **You need:** a preference dataset (or use the open-source RouteLLM checkpoints)
  - **Open source:** RouteLLM is fully open-sourced — pre-trained routers available
  - **Strong generalization:** routers trained on GPT-4 vs. Mixtral also work for Claude vs. Llama without retraining
  - **Integration:** sits as a thin layer in front of your existing LLM call — minimal code change
  - **Combine with Pattern 1:** Use the router as a first pass; keep the confidence fallback as a safety net for edge cases the router misclassifies
- **Visual:** Architecture diagram: `Query → [RouteLLM Router] → SLM (simple) or LLM (complex) → Response`
- **Notes:** No demo for this pattern — demo complexity is high (requires training data). Conceptual slides + code snippet showing how to wire a router with Agent Framework.

---

### SECTION F: PATTERN 3 — Minions (Parallel Decomposition)

#### SLIDE 24 — Section Header: "Pattern 3: Minions"
- **Content:** Section divider
- **Subtitle:** "Divide the document. Conquer locally. Synthesize in the cloud."
- **Paper badge:** Narayan et al., arXiv:2502.15964

#### SLIDE 25 — The Long-Context Problem
- **Content:**
  - Real-world tasks often involve **large documents** (10-K filings, medical records, code repos)
  - Processing o1's full context = costs > $15 per query for a million-token document
  - Two key limitations of small models on long context:
    1. SLMs **struggle to follow multi-step instructions** over long inputs
    2. SLMs **get confused by long contexts** (13% performance drop at >65K tokens)
  - The naive approach: let local model read everything and chat back/forth with cloud → 30.4× cost reduction, but loses 13% accuracy
- **Visual:** Cost vs. performance chart (based on Minions paper)
- **Footnote:** ¹ Narayan et al., "Minions: Cost-efficient Collaboration Between On-device and Cloud Language Models", arXiv:2502.15964 (2025)

#### SLIDE 26 — MinionsS: Decompose → Execute → Aggregate
- **Content:** The MinionsS protocol (the improved version)
  - **Decompose:** Remote cloud LLM writes code that splits the task into single-step subtasks (chunks)
  - **Execute:** Local SLMs run all subtasks **in parallel** — each on a small chunk of text
  - **Aggregate:** Cloud LLM collects results, filters noise, produces final answer (or loops back)
  - Key insight: *The remote model never reads the full document* — it only generates jobs
- **Visual:** MinionsS flow diagram:
  ```
  Cloud LLM → generates jobs (code/instructions for each chunk)
                           ↓
      [Local SLM] [Local SLM] [Local SLM] → parallel execution
                           ↓
  Cloud LLM → aggregates results → final answer
  ```
- **Result:** 5.7× cost reduction, 97.9% performance preservation vs. cloud-only

#### SLIDE 27 — Why This Works
- **Content:**
  - By decomposing into bite-sized, single-step instructions, SLMs never face the long-context problem
  - Parallelism amplifies throughput — SLMs can run multiple instances simultaneously
  - The cloud LLM handles what it does best: **reasoning and synthesis**
  - The SLM handles what it does best: **simple extraction/classification on short text**
- **Visual:** Before/after: cost per task chart showing 5.7× improvement
- **Quote:** "MinionsS with an 8B local LM can recover 97.9% of remote-only performance at 18.0% of the cloud cost"

#### SLIDE 28 — Demo: Pattern 3
- **Content:** "DEMO TIME" slide
- **What to show in the demo:**
  - Navigate to: `samples/03-minions/` (or equivalent folder)
  - Show: The decomposition step — how cloud LLM generates the jobs list
  - Show: The parallel local execution step
  - Show: The aggregation/synthesis step
  - Highlight: The `WorkflowBuilder` with the Decompose → Execute → Aggregate cycle
  - Optionally: show a sample document (e.g., a financial document) and query
- **Notes:** This demo is architecturally the most interesting — spend ~4 minutes

---

### SECTION G: PATTERN 4 — Chain of Agents

#### SLIDE 29 — Section Header: "Pattern 4: Chain of Agents"
- **Content:** Section divider
- **Subtitle:** "Sequential reasoning across document segments"
- **Paper badge:** Zhang et al., arXiv:2406.02818

#### SLIDE 30 — The Chain Concept
- **Content:** From *Chain of Agents: Large Language Models Collaborating on Long-Context Tasks*
  - Approach: **Multiple worker agents** process sequential chunks of a long document
  - Each worker receives: its chunk + the running summary from the previous worker
  - A **manager agent** synthesizes the final output from the last worker's accumulated context
  - This is an "interleaved read-process" approach — not input reduction
- **Visual:** Chain flow:
  ```
  Chunk 1 → [Worker 1] → summary_1
                            ↓
  Chunk 2 → [Worker 2] (receives summary_1) → summary_2
                            ↓
  Chunk 3 → [Worker 3] (receives summary_2) → final_evidence
                            ↓
                    [Manager Agent] → Final Answer
  ```
- **Footnote:** ¹ Zhang et al., "Chain of Agents: LLMs Collaborating on Long-Context Tasks", arXiv:2406.02818 (2024)

#### SLIDE 31 — CoA vs Other Approaches
- **Content:** Why CoA over RAG or full-context?
  - **RAG problem:** Retrieval has no guarantee of finding the relevant information
  - **Full-context problem:** "Lost in the middle" — models struggle to focus with very long inputs
  - **CoA advantage:** Processes the *entire* input with focused, short contexts per agent
  - Result: Up to **10% improvement** over RAG and Full-Context baselines on QA, summarization, code completion
- **Visual:** Comparison table (RAG / Full-Context / CoA) across Rec./Foc./Inter. dimensions (adapted from paper)

#### SLIDE 32 — Hybrid Twist: SLM Workers, LLM Manager
- **Content:** The hybrid application of CoA
  - In the original paper, all agents are the same model
  - **Hybrid opportunity:** Use **SLM workers** for chunk processing (cheap, fast, good at short texts)
  - Use **LLM manager** for final synthesis (needs full reasoning)
  - Workers are essentially doing extraction/summarization → SLM's sweet spot
  - Manager is doing synthesis and reasoning → LLM's sweet spot
- **Visual:** Same chain diagram but with SLM → SLM → SLM → LLM labels

#### SLIDE 33 — Demo: Pattern 4
- **Content:** "DEMO TIME" slide
- **What to show in the demo:**
  - Navigate to: `samples/04-chain-of-agents/` (or equivalent folder)
  - Show: How the document is chunked
  - Show: Worker agent setup — receives previous context, processes chunk
  - Show: Manager agent receiving final accumulated evidence
  - Optionally: run on a sample long document (e.g., a long Wikipedia article) with a factual question
- **Notes:** ~3 minutes, focus on how Agent Framework wires the chain

---

### SECTION H: PATTERN 5 — MAKER (Massively Decomposed Agentic Processes)

#### SLIDE 34 — Section Header: "Pattern 5: MAKER"
- **Content:** Section divider
- **Subtitle:** "A million steps. Zero errors."
- **Paper badge:** Meyerson et al., arXiv:2511.09030

#### SLIDE 35 — The Million-Step Problem
- **Content:** From *Solving a Million-Step LLM Task with Zero Errors*
  - LLMs have achieved breakthroughs in reasoning and tool use...
  - ...but **chaining 1000+ steps** leads to inevitable failure
  - Why? **Persistent error rate:** even 1% per-step error rate = failure after 100 steps
  - Real-world tasks (supply chains, hospital systems, complex pipelines) need thousands of reliable steps
  - This paper asks: Can we solve tasks with over **one million steps** with zero errors?
- **Visual:** Error probability chart: (1-0.01)^N — shows probability of success dropping to near zero
- **Footnote:** ¹ Meyerson et al., "Solving a Million-Step LLM Task with Zero Errors", arXiv:2511.09030 (2025)

#### SLIDE 36 — MAKER: Extreme Decomposition + Error Correction
- **Content:** MAKER = **M**aximal **A**gentic decomposition, first-to-ahead-by-**K** **E**rror correction, **R**ed-flagging
  - **Decompose:** Break tasks into the **smallest possible atomic subtasks** (micro-roles)
  - Each agent is assigned a single, minimal subtask → no generalist reasoning needed
  - **Error Correction:** Multiple agents independently solve the same subtask → **voting** picks the winner
  - **Red-flagging:** Agents that consistently produce outlier results are flagged
  - Result: Solved Towers of Hanoi with 1,000,000+ steps and zero errors
- **Visual:** Decomposition pyramid — task → subtasks → micro-tasks, with voting step

#### SLIDE 37 — The Multi-Agent Advantage
- **Content:**
  - This is a fundamentally different scaling approach: **horizontal scaling via decomposition** (not bigger models)
  - "State-of-the-art reasoning models are not required; relatively small non-reasoning models suffice"
  - Insight: LLMs are most reliable on **narrow, well-defined micro-tasks** — that's SLMs' sweet spot
  - The hybrid version: SLMs for micro-tasks, LLM for orchestration and voting arbitration
- **Visual:** Chart from paper — shows MAKER (low base LLM cost) vs. high-intelligence models on consecutive error-free steps axis
- **Key quote:** "Instead of relying on continual improvement of current LLMs, massively decomposed agentic processes may provide a way to efficiently solve problems at the level of organizations and societies."

#### SLIDE 38 — Demo: Pattern 5
- **Content:** "DEMO TIME" slide
- **What to show in the demo:**
  - Navigate to: `samples/05-maker/` (or equivalent folder)
  - Show: Task decomposition into atomic subtasks
  - Show: Multiple agent voting mechanism
  - Show: The workflow wiring (potentially a loop with voting step)
  - Keep it focused — this is the most complex pattern, the code can be dense
- **Notes:** ~3 minutes, focus on the voting/error-correction concept

---

### SECTION I: PATTERNS IN CONTEXT

#### SLIDE 39 — Section Header: "Putting It Together"
- **Content:** Section divider
- **Notes:** Quick transition to synthesis section

#### SLIDE 40 — Pattern Comparison Matrix
- **Content:** Quick-reference decision table

  | Pattern | Best For | SLM Role | LLM Role | Cost Savings |
  |---------|----------|----------|----------|--------------|
  | SLM-Default / Fallback (Reactive) | Mixed workloads, easy entry point | Primary answerer | Safety net | 60–80% |
  | RouteLLM / Predictive Router (Proactive) | High-volume, latency-sensitive workloads | Handles simple queries | Handles complex queries | >2× (ICLR 2025) |
  | Minions / MinionsS | Long document reasoning | Parallel executors | Decomposer + aggregator | 5–6× |
  | Chain of Agents | Sequential document processing | Chunk workers | Final synthesizer | Variable |
  | MAKER | High-reliability long tasks | Micro-task executors | Orchestrator + arbitrator | Scales horizontally |

- **Visual:** Table with color-coded complexity levels

#### SLIDE 41 — Which Pattern Should I Start With?
- **Content:** Decision guide for architects
  - **Start here:** SLM-Default, LLM-Fallback — drop-in improvement for any existing LLM workflow, zero training required
  - **Upgrade to:** RouteLLM Predictive Router — add it when you have enough query history to train on, eliminates the latency cost of failed SLM generations
  - **For documents:** MinionsS (parallel) or Chain of Agents (sequential) depending on task type
  - **For reliability at scale:** MAKER decomposition principles
- **Visual:** Simple decision flowchart

#### SLIDE 42 — Security and Robustness Considerations
- **Content:** Brief but important note for production architects
  - Routers can be **fooled by adversarial inputs** — always include output validation as a backstop
  - Confidence self-reporting can drift — periodically re-calibrate your threshold against production data
  - Always validate SLM outputs structurally (schema, format) not just semantically
  - The local/cloud boundary is also a **data governance boundary** — know what data stays on-device and what leaves
  - Pattern 1 + Pattern 2 in combination give you both pre-inference and post-inference safety nets

---

### SECTION J: WRAP-UP

#### SLIDE 43 — Section Header: "Summary"
- **Content:** Section divider

#### SLIDE 44 — Key Takeaways
- **Content:** Five things to remember
  1. **SLMs are real.** Phi-4-mini, Qwen2.5, Llama-3.2 can handle 60–80% of typical production queries
  2. **Hybrid AI is not a compromise.** It's a deliberate architectural choice that beats pure cloud on cost, latency, and privacy
  3. **Start with the cascade.** SLM-default, LLM-fallback is the lowest-friction entry point
  4. **Decomposition is a superpower.** Break complex tasks into SLM-sized pieces and parallelize
  5. **Error correction scales.** You don't need smarter models — you need better orchestration
- **Visual:** Five memorable icons, one per takeaway

#### SLIDE 45 — The Microsoft Agent Framework as Your Orchestrator
- **Content:**
  - All five patterns in this session are implemented with the Agent Framework
  - Key strengths for hybrid workflows:
    - Conditional edges between agents
    - Support for local models (via Ollama, MLX, llama.cpp, ONNX)
    - Support for cloud agents (Azure AI Foundry, GitHub Models, OpenAI)
    - Streaming, observability, graph-based orchestration
  - "Think of it as the infrastructure that makes hybrid patterns composable"

#### SLIDE 46 — Resources
- **Content:**
  - 💻 Code: github.com/filipw/hybrid-agent-framework-samples
  - 🔧 Framework: github.com/microsoft/agent-framework
  - 📄 Papers:
    - Sharma & Mehta, "Small Language Models for Agentic Systems" — arXiv:2510.03847
    - Ong et al., "RouteLLM: Learning to Route LLMs with Preference Data" — arXiv:2406.18665
    - Narayan et al., "Minions: Cost-efficient Collaboration..." — arXiv:2502.15964
    - Zhang et al., "Chain of Agents" — arXiv:2406.02818
    - Meyerson et al., "Solving a Million-Step LLM Task with Zero Errors" — arXiv:2511.09030
  - 📝 Blog: strathweb.com/categories/agent-framework

#### SLIDE 47 — Q&A / Thank You
- **Content:** Standard closing slide
- Speaker contact info
- Repo QR code (optional)

---

## Demo Guidance Summary

The session has **4 live code demos** (one can be cut if time is tight — Pattern 2/LLM Routing has no dedicated demo and is more conceptual).

### Demo 1 — SLM-Default, LLM-Fallback (Pattern 1) ~3 min
**Folder:** `samples/01-slm-fallback/` (or `dotnet/01-...`)
**What to show:**
- The two agents: `LocalSLMAgent` and `CloudLLMAgent`
- The `WorkflowBuilder.AddEdge` with confidence condition
- The `ConfidenceVerifier` logic (parsing CONFIDENCE: X from output)
- Run 5 pre-selected queries:
  - "What is the capital of France?" → SLM answers (CONFIDENCE: 9)
  - Convert list to JSON → SLM answers
  - "Where is Springfield?" → SLM uncertain → escalates to cloud
  - Quantum healing protein question → SLM correctly refuses → escalates
  - River crossing logic puzzle → SLM attempts → either escalates or not
- **Key message:** Show the cost contrast in the terminal (e.g., "4/5 queries local = $0.00")

### Demo 2 — Minions / MinionsS (Pattern 3) ~4 min
**Folder:** `samples/03-minions/` (or `dotnet/03-...`)
**What to show:**
- Pre-loaded document (e.g., sample 10-K or medical text, ~20 pages)
- Query: something that requires reading the full document
- Show the decomposition: how cloud LLM generates the job list
- Show parallel execution: multiple SLM agents running on chunks
- Show aggregation: cloud LLM synthesizes the filtered results
- **Key message:** Show that the cloud model never reads the source document directly

### Demo 3 — Chain of Agents (Pattern 4) ~3 min
**Folder:** `samples/04-chain-of-agents/` (or `dotnet/04-...`)
**What to show:**
- The chunking of a long document
- Worker agents: each receives `{current_chunk} + {context_from_previous_worker}`
- Manager agent: receives accumulated evidence, produces final answer
- **Key message:** The chain "reads" the entire document with focused windows

### Demo 4 — MAKER (Pattern 5) ~3 min
**Folder:** `samples/05-maker/` (or `dotnet/05-...`)
**What to show:**
- Task decomposition — atomic subtask list generation
- Multiple agents solving the same subtask independently
- Voting step — selecting the winner
- Red-flagging mechanism (if simple enough to show)
- **Key message:** Error-correction through redundancy, not through model intelligence

---

## Slides That Need Custom Diagrams

The visual agent (implementer) will need to create the following diagrams. These should follow the presentation's visual style:

1. **Slide 3:** Cloud vs. SLM comparison card (two-column layout)
2. **Slide 5:** Error accumulation curve (simple line chart)
3. **Slide 7:** SLM strengths in the agentic loop (circular process)
4. **Slide 11:** Task complexity spectrum (horizontal scale, simple↔complex)
5. **Slide 15:** SLM-Default, LLM-Fallback flow (flowchart)
6. **Slide 16:** Sample confidence outputs (two code boxes, high and low)
7. **Slide 21:** Reactive vs. Proactive routing — two-lane road or split decision diagram
8. **Slide 22:** RouteLLM cost-performance curve (quality vs. % calls to strong model)
9. **Slide 23:** Router architecture comparison bar chart (APGR metric, four routers)
10. **Slide 24:** RouteLLM integration diagram (query → router → SLM or LLM)
11. **Slide 26:** MinionsS three-phase diagram (decompose/execute/aggregate)
12. **Slide 30:** Chain of Agents sequential flow
13. **Slide 35:** Error probability curve (P = (1-err)^N)
14. **Slide 36:** MAKER decomposition + voting pyramid
15. **Slide 40:** Pattern comparison table

---

## Timing Estimate (45 minutes total)

| Section | Slides | Time |
|---------|--------|------|
| Introduction / Hook | 1–5 | 4 min |
| SLM Landscape | 6–9 | 4 min |
| Hybrid AI framing | 10–13 | 4 min |
| Pattern 1: SLM-Default/Fallback (Reactive) | 14–19 | 7 min (incl. 3 min demo) |
| Pattern 2: RouteLLM / Predictive Router (Proactive) | 20–24 | 5 min (no live demo) |
| Pattern 3: Minions | 25–29 | 7 min (incl. 4 min demo) |
| Pattern 4: Chain of Agents | 30–34 | 5 min (incl. 3 min demo) |
| Pattern 5: MAKER | 35–39 | 5 min (incl. 3 min demo) |
| Synthesis + Wrap-up | 40–48 | 4 min |
| **Total** | **~48 slides** | **~45 min** |

---

## Style and Vibe Notes (for visual implementation)

Based on the index.html and index-2.html samples:

- **Background images:** Full-bleed dramatic photography (tech/abstract/nature) for section headers; dark overlay with semi-transparent panels for content slides
- **Text style:** Clean sans-serif, white on dark, highlighted keywords in accent color
- **Code snippets:** Monospace font, dark code blocks (monokai-style)
- **Diagrams:** Clean, excalidraw-style hand-drawn look OR clean vector icons — simple and readable
- **Section headers:** Big font, minimal text, full-bleed atmospheric image (just the section title)
- **Footnotes:** Small text at bottom for paper citations
- **Columns:** Two-column layouts frequently used for comparisons
- **Fragment/animation equivalent in PPT:** Use build animations (appear on click) for bullet points that are revealed progressively
- **Tone:** Technical but engaging; Filip's style is direct, uses humor, avoids corporate fluff
- **Emojis:** Used sparingly for visual bullets (✅ ⚠️ 📖 💻 🤖)

---

## Papers-to-Patterns Mapping Reference

| Paper | arXiv ID | Pattern | Key Metric |
|-------|----------|---------|------------|
| Small Language Models for Agentic Systems | 2510.03847 | SLM-Default, LLM-Fallback | SLMs match LLMs at 10×–100× lower cost |
| Minions: Cost-efficient Collaboration | 2502.15964 | MinionsS parallel decomposition | 5.7× cost reduction, 97.9% performance |
| Chain of Agents | 2406.02818 | Sequential chain with manager | Up to 10% improvement over RAG |
| RouteLLM: Learning to Route LLMs with Preference Data | 2406.18665 | Predictive Router (Proactive) | >2× cost savings, ICLR 2025 |
| Solving a Million-Step LLM Task | 2511.09030 | MAKER decomposition + voting | 1M steps, zero errors |