export type TrackId =
  | 'architecture'
  | 'data'
  | 'reliability'
  | 'distributed-systems'
  | 'leadership'
  | 'cloud-platform';

export type ChallengeType = 'quiz' | 'tradeoff' | 'incident' | 'system_design';

export interface TrackModule {
  id: string;
  title: string;
  outcomes: string[];
}

export interface TrackSeed {
  id: TrackId;
  title: string;
  priority: 1 | 2 | 3;
  summary: string;
  color: string;
  accent: string;
  modules: TrackModule[];
}

export type LessonVariantId = 'foundation' | 'consolidation' | 'advanced';

export interface LessonVariant {
  id: LessonVariantId;
  label: string;
  description: string;
  spokenIntro: string;
  spokenBody: string;
  spokenWrap: string;
  keyPoints: string[];
}

export interface LessonSeed {
  id: string;
  trackId: TrackId;
  title: string;
  durationMinutes: number;
  level: 'builder' | 'owner' | 'senior' | 'principal';
  format: 'audio-first' | 'mixed';
  hook: string;
  objective: string;
  summary: string;
  spokenIntro: string;
  spokenWrap: string;
  diagramCue: string;
  keyPoints: string[];
  walkPractice: string;
  reflectionPrompt: string;
  topicKey?: string;
  variants?: LessonVariant[];
  steps: {
    type: 'listen' | 'explain' | 'diagram' | 'practice' | 'reflect';
    title: string;
    detail: string;
  }[];
}

export interface DailyChallengeSeed {
  id: string;
  trackId: TrackId;
  type: ChallengeType;
  title: string;
  durationMinutes: number;
  scenario: string;
  prompt: string;
  choices?: string[];
  correctChoiceIndex?: number;
  idealSignals: string[];
  whyItMatters: string;
}

export interface WeeklySimulationSeed {
  id: string;
  week: number;
  title: string;
  primaryTrackId: TrackId;
  scenario: string;
  constraints: string[];
  tasks: string[];
  scoringRubric: {
    dimension: string;
    whatGreatLooksLike: string;
  }[];
}

export interface OnboardingQuestionOption {
  id: string;
  label: string;
  helpText: string;
}

export interface OnboardingQuestionSeed {
  id: string;
  title: string;
  prompt: string;
  purpose: string;
  options: OnboardingQuestionOption[];
}

// ── New curriculum model: Phases → Units → Stages ──────────────────

export type PhaseId =
  | 'ai-engineering'
  | 'data-at-scale'
  | 'aws-services'
  | 'building-blocks'
  | 'ai-systems'
  | 'reliability'
  | 'architecture';

export interface Phase {
  id: PhaseId;
  order: number;
  title: string;
  description: string;
  color: string;
  accent: string;
  unitCount: number;
}

export type UnitStageType = 'walk' | 'deep-dive' | 'case-study' | 'mastery-check';

export interface AudioStage {
  type: 'walk' | 'deep-dive';
  title: string;
  durationMinutes: number;
  spokenIntro: string;
  spokenBody: string;
  spokenWrap: string;
  keyPoints: string[];
  diagramCue?: string;
}

export interface DecisionChoice {
  label: string;
  consequence: string;
  nextNodeId: string | null;
  quality: 'good' | 'okay' | 'poor';
}

export interface DecisionNode {
  id: string;
  situation: string;
  choices: DecisionChoice[];
}

export interface CaseStudyStage {
  type: 'case-study';
  title: string;
  durationMinutes: number;
  format: 'decision-tree' | 'short-answer';
  scenario: string;
  // decision-tree fields
  nodes?: DecisionNode[];
  startNodeId?: string;
  debrief?: string;
  // short-answer fields
  question?: string;
  rubric?: string[];
  exemplarAnswer?: string;
}

export interface MasteryQuestion {
  id: string;
  question: string;
  choices: string[];
  correctIndex: number;
  explanation: string;
}

export interface MasteryCheckStage {
  type: 'mastery-check';
  title: string;
  durationMinutes: number;
  questions: MasteryQuestion[];
}

export type UnitStage = AudioStage | CaseStudyStage | MasteryCheckStage;

export interface Unit {
  id: string;
  phaseId: PhaseId;
  order: number;
  title: string;
  objective: string;
  durationMinutes: number;
  stages: UnitStage[];
}

// ── Legacy types (kept for backward compat during migration) ───────

export type FrontierStatus = "adopt" | "experiment" | "watch" | "avoid";

export interface FrontierBriefSeed {
  id: string;
  title: string;
  category: string;
  summary: string;
  whyItMatters: string;
  status: FrontierStatus;
  effortMinutes: number;
  keyQuestions: string[];
}

export interface BuildMissionStep {
  title: string;
  detail: string;
}

export interface BuildMissionSeed {
  id: string;
  title: string;
  category: string;
  durationMinutes: number;
  outcome: string;
  reward: string;
  steps: BuildMissionStep[];
  successSignals: string[];
  origin?: "seed" | "generated";
  sourceFrontierId?: string;
}
