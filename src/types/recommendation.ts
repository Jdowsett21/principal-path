import type {
  EntityId,
  RecommendationType,
  SkillDomain,
} from "./domain";

export interface Recommendation {
  id: EntityId;
  type: RecommendationType;
  title: string;
  reason: string;
  priority: number;
  skillIds: EntityId[];
  domains: SkillDomain[];
  estimatedMinutes: number;
  actionLabel: string;
}

