import type { ChallengeScore, Recommendation, RecommendationType, UserSkillState } from "../types";

const clamp = (value: number, min: number, max: number): number => Math.min(max, Math.max(min, value));

export interface RecommendationContext {
  skills: UserSkillState[];
  recentScores: ChallengeScore[];
  streakCurrent: number;
}

function buildRecommendation(
  type: RecommendationType,
  title: string,
  reason: string,
  priority: number,
  skillIds: string[],
  domains: Recommendation["domains"],
  estimatedMinutes: number,
  actionLabel: string
): Recommendation {
  return {
    id: `${type}:${skillIds.join("-") || "general"}:${priority}`,
    type,
    title,
    reason,
    priority: clamp(priority, 1, 100),
    skillIds,
    domains,
    estimatedMinutes,
    actionLabel,
  };
}

export function rankSkillsForReview(skills: UserSkillState[]): UserSkillState[] {
  return [...skills].sort((a, b) => {
    if (b.weaknessScore !== a.weaknessScore) return b.weaknessScore - a.weaknessScore;
    if (a.mastery !== b.mastery) return a.mastery - b.mastery;
    return b.xp - a.xp;
  });
}

export function generateRecommendations(context: RecommendationContext): Recommendation[] {
  const rankedSkills = rankSkillsForReview(context.skills);
  const weakest = rankedSkills.slice(0, 3);
  const averageRecent =
    context.recentScores.length === 0
      ? 0.5
      : context.recentScores.reduce((sum, item) => sum + item.normalized, 0) / context.recentScores.length;

  const recommendations: Recommendation[] = weakest.map((skill, index) =>
    buildRecommendation(
      "skill_review",
      `Review ${skill.domain.replaceAll("_", " ")}`,
      `This skill is lagging with mastery ${skill.mastery.toFixed(1)} and weakness score ${skill.weaknessScore.toFixed(1)}.`,
      90 - index * 10,
      [skill.skillId],
      [skill.domain],
      12 + index * 3,
      "Practice now"
    )
  );

  if (averageRecent < 0.6) {
    recommendations.unshift(
      buildRecommendation(
        "weak_area",
        "Reinforce recent weak spots",
        "Recent challenge scores suggest the next session should emphasize fundamentals and retrieval practice.",
        95,
        weakest.map((skill) => skill.skillId),
        weakest.map((skill) => skill.domain),
        15,
        "Start review"
      )
    );
  }

  if (context.streakCurrent > 0 && context.streakCurrent < 3) {
    recommendations.push(
      buildRecommendation(
        "streak_recovery",
        "Protect the streak",
        "A short session will keep momentum alive and reduce the chance of falling off.",
        70,
        [],
        [],
        5,
        "Do a quick session"
      )
    );
  }

  return recommendations
    .sort((a, b) => b.priority - a.priority)
    .slice(0, 5)
    .map((recommendation, index) => ({
      ...recommendation,
      id: `${recommendation.id}:${index}`,
    }));
}
