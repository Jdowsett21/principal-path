import AsyncStorage from "@react-native-async-storage/async-storage";

import type { ChallengeScore, Recommendation, SessionSummary, StreakState, UserSkillState } from "@/types";
import type { BuildMissionSeed } from "@/data";
import type { OnboardingAnswers } from "./appModel";

export type NotificationSettings = {
  enabled: boolean;
  time: string;
  permissionStatus: "idle" | "granted" | "denied";
};

export type LessonRecallStatus = "solid" | "review";

export type TopicRatingLevel = "none" | "heard" | "know" | "deep";
export type TopicRatings = Record<string, TopicRatingLevel>;

export type PersistedAppState = {
  hasCompletedOnboarding: boolean;
  onboardingAnswers: OnboardingAnswers;
  challengeChoices: Record<string, string>;
  lessonRecall: Record<string, LessonRecallStatus>;
  skillStates: UserSkillState[];
  recentScores: ChallengeScore[];
  streak: StreakState;
  recommendations: Recommendation[];
  sessionSummary: SessionSummary;
  buildMissions: BuildMissionSeed[];
  notificationSettings: NotificationSettings;
  topicRatings?: TopicRatings;
  hasCompletedSkillIntake?: boolean;
};

const STORAGE_KEY = "career-builder.app-state.v1";

export async function loadPersistedAppState(): Promise<PersistedAppState | null> {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as PersistedAppState;
  } catch {
    return null;
  }
}

export async function savePersistedAppState(state: PersistedAppState): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export async function clearPersistedAppState(): Promise<void> {
  await AsyncStorage.removeItem(STORAGE_KEY);
}
