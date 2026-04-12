import type { ChallengeScore } from "./challenge";
import type { EntityId, ISODateString, SkillDomain } from "./domain";
import type { Recommendation } from "./recommendation";

export interface SessionEvent {
  id: EntityId;
  type: "lesson" | "quiz" | "challenge" | "reflection";
  startedAt: ISODateString;
  completedAt?: ISODateString;
}

export interface SessionSummary {
  sessionId: EntityId;
  userId: EntityId;
  startedAt: ISODateString;
  completedAt: ISODateString;
  durationSeconds: number;
  domainsTouched: SkillDomain[];
  challengesCompleted: number;
  averageScore: number;
  bestScore: number;
  weakestDomains: SkillDomain[];
  strongestDomains: SkillDomain[];
  xpEarned: number;
  scoreBreakdown: ChallengeScore[];
  recommendations: Recommendation[];
}

