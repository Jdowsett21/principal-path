import type { ChallengeRubric, ChallengeScore, ChallengeScoreBreakdown, ChallengeSubmission } from "../types";

const clamp = (value: number, min: number, max: number): number => Math.min(max, Math.max(min, value));

export function normalizeScore(score: number, maxScore: number = 100): number {
  if (maxScore <= 0) {
    return 0;
  }
  return clamp(score / maxScore, 0, 1);
}

export function defaultChallengeRubric(submission: ChallengeSubmission): ChallengeRubric {
  switch (submission.type) {
    case "quiz":
      return {
        correctnessWeight: 0.55,
        reasoningWeight: 0.15,
        confidenceWeight: 0.1,
        communicationWeight: 0.05,
        efficiencyWeight: 0.15,
      };
    case "incident":
      return {
        correctnessWeight: 0.3,
        reasoningWeight: 0.25,
        confidenceWeight: 0.15,
        communicationWeight: 0.15,
        efficiencyWeight: 0.15,
      };
    case "system_design":
      return {
        correctnessWeight: 0.2,
        reasoningWeight: 0.35,
        confidenceWeight: 0.1,
        communicationWeight: 0.2,
        efficiencyWeight: 0.15,
      };
    case "tradeoff":
      return {
        correctnessWeight: 0.2,
        reasoningWeight: 0.4,
        confidenceWeight: 0.1,
        communicationWeight: 0.2,
        efficiencyWeight: 0.1,
      };
    case "reflection":
      return {
        correctnessWeight: 0.1,
        reasoningWeight: 0.2,
        confidenceWeight: 0.2,
        communicationWeight: 0.3,
        efficiencyWeight: 0.2,
      };
    default:
      return {
        correctnessWeight: 0.25,
        reasoningWeight: 0.25,
        confidenceWeight: 0.15,
        communicationWeight: 0.15,
        efficiencyWeight: 0.2,
      };
  }
}

export function scoreChallenge(
  submission: ChallengeSubmission,
  breakdown: ChallengeScoreBreakdown,
  rubric: ChallengeRubric = defaultChallengeRubric(submission)
): ChallengeScore {
  const weighted =
    breakdown.correctness * rubric.correctnessWeight +
    breakdown.reasoning * rubric.reasoningWeight +
    breakdown.confidence * rubric.confidenceWeight +
    breakdown.communication * rubric.communicationWeight +
    breakdown.efficiency * rubric.efficiencyWeight;

  const bonus = Math.max(0, breakdown.bonus);
  const penalty = Math.max(0, breakdown.penalty);
  const total = clamp(weighted + bonus - penalty, 0, 100);
  const normalized = normalizeScore(total);
  const masteryDelta = Math.round((normalized - 0.5) * 20);
  const xpAwarded = Math.max(0, Math.round(total));

  return {
    total,
    normalized,
    breakdown,
    masteryDelta,
    xpAwarded,
    tags: deriveScoreTags(submission, breakdown, normalized),
  };
}

export function deriveScoreTags(
  submission: ChallengeSubmission,
  breakdown: ChallengeScoreBreakdown,
  normalized: number
): string[] {
  const tags = new Set<string>();

  if (normalized >= 0.9) tags.add("excellent");
  else if (normalized >= 0.75) tags.add("strong");
  else if (normalized >= 0.5) tags.add("steady");
  else tags.add("needs_attention");

  if (breakdown.reasoning >= 80) tags.add("strong_reasoning");
  if (breakdown.communication >= 80) tags.add("clear_communication");
  if (breakdown.efficiency >= 80) tags.add("fast_resolution");
  if (submission.type === "incident") tags.add("ops_readiness");
  if (submission.type === "system_design") tags.add("architecture_rep");

  return Array.from(tags);
}

