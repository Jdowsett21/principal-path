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
  }
];
