import type {
  ChallengeScore,
  Recommendation,
  SessionSummary,
  SkillDomain,
  UserSkillState,
} from "../types";
import { generateRecommendations } from "./recommendations";

export interface SessionSummaryInput {
  sessionId: string;
  userId: string;
  startedAt: string;
  completedAt: string;
  challengeScores: ChallengeScore[];
  skills: UserSkillState[];
  streakCurrent: number;
  recommendations?: Recommendation[];
}

function average(values: number[]): number {
  if (values.length === 0) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function topDomains(skills: UserSkillState[], pick: "best" | "worst"): SkillDomain[] {
  const sorted = [...skills].sort((a, b) =>
    pick === "best"
      ? b.mastery - a.mastery || b.xp - a.xp
      : a.mastery - b.mastery || b.weaknessScore - a.weaknessScore
  );

  return Array.from(new Set(sorted.map((skill) => skill.domain))).slice(0, 3);
}

export function buildSessionSummary(input: SessionSummaryInput): SessionSummary {
  const domainsTouched = Array.from(new Set(input.skills.map((skill) => skill.domain)));
  const scores = input.challengeScores.map((score) => score.total);
  const recommendations =
    input.recommendations ?? generateRecommendations({
      skills: input.skills,
      recentScores: input.challengeScores,
      streakCurrent: input.streakCurrent,
    });

  return {
    sessionId: input.sessionId,
    userId: input.userId,
    startedAt: input.startedAt,
    completedAt: input.completedAt,
    durationSeconds: Math.max(
      0,
      Math.round((new Date(input.completedAt).getTime() - new Date(input.startedAt).getTime()) / 1000)
    ),
    domainsTouched,
    challengesCompleted: input.challengeScores.length,
    averageScore: average(scores),
    bestScore: scores.length === 0 ? 0 : Math.max(...scores),
    weakestDomains: topDomains(input.skills, "worst"),
    strongestDomains: topDomains(input.skills, "best"),
    xpEarned: input.challengeScores.reduce((sum, score) => sum + score.xpAwarded, 0),
    scoreBreakdown: input.challengeScores,
    recommendations,
  };
}
