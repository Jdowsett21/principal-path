import type {
  ChallengeType,
  Difficulty,
  EntityId,
  ISODateString,
  SkillDomain,
} from "./domain";

export interface ChallengeSubmission {
  challengeId: EntityId;
  type: ChallengeType;
  skillIds: EntityId[];
  domains: SkillDomain[];
  difficulty: Difficulty;
  submittedAt: ISODateString;
  timeSpentSeconds: number;
  answer?: string;
}

export interface ChallengeRubric {
  correctnessWeight: number;
  reasoningWeight: number;
  confidenceWeight: number;
  communicationWeight: number;
  efficiencyWeight: number;
}

export interface ChallengeScoreBreakdown {
  correctness: number;
  reasoning: number;
  confidence: number;
  communication: number;
  efficiency: number;
  bonus: number;
  penalty: number;
}

export interface ChallengeScore {
  total: number;
  normalized: number;
  breakdown: ChallengeScoreBreakdown;
  masteryDelta: number;
  xpAwarded: number;
  tags: string[];
}

