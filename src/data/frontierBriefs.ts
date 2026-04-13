import type { FrontierBriefSeed } from "./curriculum.types";

export const frontierBriefs: FrontierBriefSeed[] = [
  {
    id: "frontier-001",
    title: "Agentic coding workflows",
    category: "AI Engineering",
    summary: "Use tools and agents to plan, implement, and verify work instead of treating the model as a text box.",
    whyItMatters: "The advantage is not raw output generation. It is shrinking the loop from idea to validated change.",
    status: "experiment",
    effortMinutes: 12,
    keyQuestions: [
      "Where should the agent stop and a human review begin?",
      "How do you verify output quality reliably?",
      "What tasks are safe to automate versus risky to automate?"
    ]
  },
  {
    id: "frontier-002",
    title: "Evaluation-first AI systems",
    category: "Reliability",
    summary: "Treat AI features like production systems with measurable quality, regression tests, and feedback loops.",
    whyItMatters: "If you cannot evaluate it, you cannot improve it, and you cannot trust it in production.",
    status: "adopt",
    effortMinutes: 10,
    keyQuestions: [
      "What is the success metric for this AI feature?",
      "How do you catch regressions before users do?",
      "What does a good offline eval look like here?"
    ]
  },
  {
    id: "frontier-003",
    title: "MCP and tool integration",
    category: "Systems",
    summary: "Connect models to real tools and data sources with explicit boundaries and permissions.",
    whyItMatters: "Tool access turns LLMs from chat interfaces into systems that can take action.",
    status: "watch",
    effortMinutes: 8,
    keyQuestions: [
      "What tools should the model be allowed to call?",
      "How do you prevent unsafe actions?",
      "What should stay read-only?"
    ]
  },
  {
    id: "frontier-004",
    title: "RAG versus fine-tuning",
    category: "Architecture",
    summary: "Choose the simplest way to add knowledge or behavior before reaching for heavier model customization.",
    whyItMatters: "Many teams overfit to fine-tuning when retrieval and prompt design are enough.",
    status: "experiment",
    effortMinutes: 9,
    keyQuestions: [
      "Is the problem knowledge, behavior, or formatting?",
      "Can retrieval solve this with lower risk?",
      "What data do you actually have?"
    ]
  },
  {
    id: "frontier-005",
    title: "Lakehouse and modern data stack trade-offs",
    category: "Data Platform",
    summary: "Choose the lightest analytical stack that supports ingestion, transformation, governance, and useful questions.",
    whyItMatters: "A lot of teams overbuild their data platform before they even know what decisions the business needs to make from it.",
    status: "watch",
    effortMinutes: 10,
    keyQuestions: [
      "What analytical questions actually matter first?",
      "How fresh does the data truly need to be?",
      "What part of the stack creates the most operational drag?"
    ]
  },
  {
    id: "frontier-006",
    title: "Managed ML platforms versus custom inference stacks",
    category: "ML Systems",
    summary: "Balance speed, control, latency, and evaluation needs when deciding how much ML infrastructure to own.",
    whyItMatters: "Teams often either overbuild ML infrastructure too early or underinvest in the serving and evaluation loop that production systems actually need.",
    status: "experiment",
    effortMinutes: 11,
    keyQuestions: [
      "Which parts of the ML workflow are repetitive enough to justify platform investment?",
      "What latency and observability guarantees do users need?",
      "Where would managed services start to create real friction?"
    ]
  }
];
