import type { BuildMissionSeed, FrontierBriefSeed } from "@/data";

const templates = {
  "AI Engineering": {
    title: "Build a small AI workflow with guardrails",
    category: "AI Engineering",
    durationMinutes: 35,
    outcome: "A focused prototype that uses a model plus explicit checks to produce useful output.",
    reward: "You get a visible artifact and practice turning hype into a controlled system."
  },
  Reliability: {
    title: "Add evals and failure handling",
    category: "Production",
    durationMinutes: 25,
    outcome: "A workflow that fails loudly, logs clearly, and can be measured.",
    reward: "You practice making AI behavior observable and debuggable."
  },
  Systems: {
    title: "Integrate a model with a tool boundary",
    category: "Systems",
    durationMinutes: 30,
    outcome: "A tool-using workflow with explicit permissions and a narrow action surface.",
    reward: "You practice the line between capability and control."
  },
  Architecture: {
    title: "Choose the simplest knowledge strategy",
    category: "Architecture",
    durationMinutes: 28,
    outcome: "A small prototype that compares retrieval, prompt design, and model customization.",
    reward: "You learn how to choose the right abstraction instead of the flashiest one."
  }
} as const;

export function generateMissionFromFrontier(
  frontier: FrontierBriefSeed,
  existingMissions: BuildMissionSeed[]
): BuildMissionSeed {
  const template = templates[frontier.category as keyof typeof templates] ?? templates.Architecture;
  const sequence = existingMissions.length + 1;
  const slug = frontier.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  return {
    id: `generated-${slug || frontier.id}-${sequence}`,
    title: `${template.title}: ${frontier.title}`,
    category: template.category,
    durationMinutes: template.durationMinutes,
    outcome: template.outcome,
    reward: template.reward,
    origin: "generated",
    sourceFrontierId: frontier.id,
    steps: [
      {
        title: "Scope",
        detail: `Limit the mission to ${frontier.title.toLowerCase()} with one clear success condition.`
      },
      {
        title: "Build",
        detail: `Use the frontier theme, then add one check that keeps the output reliable.`
      },
      {
        title: "Verify",
        detail: "Run at least one failure case and one success case before calling it done."
      }
    ],
    successSignals: [
      "The result is small and demoable.",
      "The feedback loop is obvious.",
      "The trade-offs are explainable in one minute."
    ]
  };
}
