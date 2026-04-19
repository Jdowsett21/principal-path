import type { Phase } from "./curriculum.types";

export const phases: Phase[] = [
  {
    id: "ai-engineering",
    order: 1,
    title: "AI-Accelerated Engineering",
    description:
      "Use AI to move faster without losing correctness, review discipline, or ownership.",
    color: "#7C3AED",
    accent: "#C4B5FD",
    unitCount: 4,
  },
  {
    id: "data-at-scale",
    order: 2,
    title: "Data Systems at Scale",
    description:
      "Data modeling, query behavior, replication, and consistency choices once your data stops fitting the happy path.",
    color: "#4C1D95",
    accent: "#A78BFA",
    unitCount: 0,
  },
  {
    id: "aws-services",
    order: 3,
    title: "AWS Services Deep Dive",
    description:
      "Service selection, failure modes, and operational tradeoffs across the AWS stack.",
    color: "#0F3D4C",
    accent: "#38BDF8",
    unitCount: 0,
  },
  {
    id: "building-blocks",
    order: 4,
    title: "Building Blocks at Scale",
    description:
      "The core primitives you already use, plus the failure modes that appear under real load.",
    color: "#134E4A",
    accent: "#2DD4BF",
    unitCount: 0,
  },
  {
    id: "ai-systems",
    order: 5,
    title: "AI Systems in Production",
    description:
      "Retrieval, inference, evaluation, guardrails, and the operational patterns that keep AI systems reliable.",
    color: "#9D174D",
    accent: "#F9A8D4",
    unitCount: 0,
  },
  {
    id: "reliability",
    order: 6,
    title: "Reliability & Distributed Systems",
    description:
      "How systems fail, how to contain the blast radius, and how to recover without guessing.",
    color: "#7C2D12",
    accent: "#FB923C",
    unitCount: 0,
  },
  {
    id: "architecture",
    order: 7,
    title: "Architecture & Principal Judgment",
    description:
      "The judgment layer: boundaries, tradeoffs, documentation, influence, and decision quality.",
    color: "#3F2A1D",
    accent: "#F59E0B",
    unitCount: 0,
  },
];
