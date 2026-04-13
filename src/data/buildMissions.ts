import type { BuildMissionSeed } from "./curriculum.types";

export const buildMissions: BuildMissionSeed[] = [
  {
    id: "mission-001",
    title: "Build an AI code review assistant",
    category: "Portfolio",
    durationMinutes: 45,
    outcome: "A small assistant that reviews diffs and flags risk, missing tests, and ambiguous logic.",
    reward: "You end with something you can demo and talk about in interviews.",
    steps: [
      { title: "Scope the task", detail: "Limit it to one repo and one review template." },
      { title: "Define checks", detail: "Add correctness, tests, and maintenance-risk checks." },
      { title: "Implement the loop", detail: "Run on a diff, show output, and let the user mark false positives." }
    ],
    successSignals: [
      "It catches at least one real issue.",
      "The output is concise and actionable.",
      "You can explain the trade-offs."
    ]
  },
  {
    id: "mission-002",
    title: "Add retrieval to a notes app",
    category: "AI Product",
    durationMinutes: 30,
    outcome: "A searchable notes experience that can answer questions from your own content.",
    reward: "You practice embeddings, chunking, retrieval, and evaluation in one small loop.",
    steps: [
      { title: "Index the notes", detail: "Create chunks and store embeddings." },
      { title: "Query the data", detail: "Return top results with citations." },
      { title: "Evaluate quality", detail: "Test whether answers are grounded in the source notes." }
    ],
    successSignals: [
      "Answers cite actual source material.",
      "You can see when retrieval fails.",
      "The UX stays fast and focused."
    ]
  },
  {
    id: "mission-003",
    title: "Add observability to an AI workflow",
    category: "Production",
    durationMinutes: 25,
    outcome: "A traceable flow with logs, metrics, and a simple failure dashboard.",
    reward: "This turns AI usage from magic into a system you can debug.",
    steps: [
      { title: "Define events", detail: "Log prompts, outputs, tool calls, and errors." },
      { title: "Track quality", detail: "Add latency, success rate, and retry counters." },
      { title: "Show failures", detail: "Create a simple dashboard of bad runs." }
    ],
    successSignals: [
      "You can explain why a request failed.",
      "The workflow is measurable.",
      "The next iteration is obvious."
    ]
  },
  {
    id: "mission-004",
    title: "Refactor a staging AWS stack",
    category: "Cloud Architecture",
    durationMinutes: 50,
    outcome: "A clearer AWS layout with a smaller blast radius and a more legible deployment path.",
    reward: "You practice the exact infrastructure judgment that senior and principal engineers are expected to own.",
    steps: [
      { title: "Trace the request path", detail: "Document CDN, ALB, ECS, and Aurora in one flow." },
      { title: "Reduce exposure", detail: "Identify one component that should move behind a boundary." },
      { title: "Lock down config", detail: "Map a secret or runtime value to a narrower access path." }
    ],
    successSignals: [
      "You can explain the staging topology in plain language.",
      "You know what is public, private, and secret.",
      "You have one concrete hardening change in mind."
    ]
  },
  {
    id: "mission-005",
    title: "Design the egress strategy for a private ECS service",
    category: "Cloud Architecture",
    durationMinutes: 40,
    outcome: "A clear note describing whether the service needs a NAT gateway, a simpler outbound path, or no outbound access at all.",
    reward: "You practice one of the most common cloud architecture judgment calls: paying for convenience only when it earns its keep.",
    steps: [
      { title: "List outbound needs", detail: "Identify what the service must reach on the internet and why." },
      { title: "Compare options", detail: "Write the cost, risk, and complexity of NAT versus alternatives." },
      { title: "Make the call", detail: "Choose the smallest egress shape that still supports the workload." }
    ],
    successSignals: [
      "You can justify the choice without hand-waving.",
      "You can explain the cost impact in plain terms.",
      "You know what would change the decision later."
    ]
  },
  {
    id: "mission-006",
    title: "Design an event-driven data pipeline",
    category: "Data Platform",
    durationMinutes: 45,
    outcome: "A concrete design for moving product events into storage, transformation, and analytics without hurting the production path.",
    reward: "You get practice with a principal-level system design problem that shows up constantly in modern backend and platform work.",
    steps: [
      { title: "Choose the pipeline shape", detail: "Decide between batch, queue-based, and streaming for the use case." },
      { title: "Protect the source systems", detail: "Separate the app transaction path from analytics ingestion." },
      { title: "Define correctness", detail: "Describe retries, deduplication, and warehouse freshness expectations." }
    ],
    successSignals: [
      "You can explain why the chosen shape fits the freshness requirement.",
      "You have a clear ingestion and storage path.",
      "You know where correctness could break."
    ]
  },
  {
    id: "mission-007",
    title: "Design an ML inference platform for a small team",
    category: "ML Systems",
    durationMinutes: 50,
    outcome: "A practical architecture for model serving, evaluation, and monitoring that does not overbuild the platform too early.",
    reward: "You practice the exact blend of ML, backend, and platform judgment that becomes more valuable as coding gets automated.",
    steps: [
      { title: "Pick managed versus custom", detail: "Choose which layers the team should own and which should stay managed." },
      { title: "Define the serving path", detail: "Map request flow, latency targets, fallback behavior, and observability." },
      { title: "Close the loop", detail: "Add evaluation, feedback, and drift monitoring to the design." }
    ],
    successSignals: [
      "The architecture matches team maturity.",
      "Inference behavior is observable and measurable.",
      "You can explain when the platform should evolve."
    ]
  }
];
