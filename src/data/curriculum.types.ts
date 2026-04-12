export type TrackId =
  | 'architecture'
  | 'data'
  | 'reliability'
  | 'distributed-systems'
  | 'leadership';

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

export interface LessonSeed {
  id: string;
  trackId: TrackId;
  title: string;
  durationMinutes: number;
  level: 'builder' | 'owner' | 'senior' | 'principal';
  format: 'audio-first' | 'mixed';
  hook: string;
  objective: string;
  keyPoints: string[];
  walkPractice: string;
  reflectionPrompt: string;
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
