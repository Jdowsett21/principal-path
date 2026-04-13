export type ISODateString = string;
export type EntityId = string;

export type SkillDomain =
  | "computer_science"
  | "backend_systems"
  | "data_and_databases"
  | "distributed_systems"
  | "scalability_and_performance"
  | "reliability_and_operations"
  | "architecture_and_design"
  | "security_and_risk"
  | "product_and_business_judgment"
  | "leadership_and_communication"
  | "cloud_architecture_and_aws";

export type SkillLevel = 1 | 2 | 3 | 4 | 5;

export type ChallengeType =
  | "quiz"
  | "tradeoff"
  | "incident"
  | "system_design"
  | "reflection";

export type RecommendationType =
  | "skill_review"
  | "weak_area"
  | "streak_recovery"
  | "mastery_push"
  | "session_followup";

export type Difficulty = "intro" | "intermediate" | "advanced" | "expert";
