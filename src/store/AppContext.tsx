import { createContext, ReactNode, startTransition, useContext, useEffect, useMemo, useState } from "react";

import * as Notifications from "expo-notifications";

import type { BuildMissionSeed, DailyChallengeSeed, FrontierBriefSeed, LessonSeed, LessonVariantId, OnboardingQuestionSeed, TrackSeed, WeeklySimulationSeed } from "@/data";
import type { Recommendation, SessionSummary, StreakState, UserProfile, UserSkillState } from "@/types";

import { generateMissionFromFrontier } from "@/lib";
import { createInitialAppState, OnboardingAnswers, trackToDomainMap, applyChallengeAnswer, appendGeneratedMission } from "./appModel";
import { LessonRecallStatus, loadPersistedAppState, savePersistedAppState, TopicRatingLevel, TopicRatings } from "./persistence";

type ChallengeChoiceState = Record<string, string>;
type NotificationPermissionStatus = "idle" | "granted" | "denied";

type AppState = {
  hasCompletedOnboarding: boolean;
  onboardingAnswers: OnboardingAnswers;
  onboardingQuestions: OnboardingQuestionSeed[];
  challengeChoices: ChallengeChoiceState;
  lessonRecall: Record<string, LessonRecallStatus>;
  profile: UserProfile;
  tracks: TrackSeed[];
  lessons: LessonSeed[];
  frontierBriefs: FrontierBriefSeed[];
  buildMissions: BuildMissionSeed[];
  dailyChallenges: DailyChallengeSeed[];
  weeklySimulations: WeeklySimulationSeed[];
  skillStates: UserSkillState[];
  streak: StreakState;
  recommendations: Recommendation[];
  sessionSummary: SessionSummary;
  notificationPermissionStatus: NotificationPermissionStatus;
  reminderTime: string;
  latestGeneratedMission: BuildMissionSeed | undefined;
  answerOnboardingQuestion: (questionId: string, optionId: string) => void;
  completeOnboarding: () => void;
  answerChallenge: (challengeId: string, choice: string) => void;
  rateLessonRecall: (lessonId: string, status: LessonRecallStatus) => void;
  enableDailyReminder: () => Promise<void>;
  generateMissionFromFrontierId: (frontierId: string) => void;
  selectedDailyLesson: LessonSeed;
  weakSkill: UserSkillState | undefined;
  strongestSkill: UserSkillState | undefined;
  completionPercent: number;
  getTrackMastery: (trackId: string) => number;
  topicRatings: TopicRatings;
  hasCompletedSkillIntake: boolean;
  saveTopicRatings: (ratings: TopicRatings) => void;
  getLessonVariantId: (lesson: LessonSeed) => LessonVariantId;
};

const initialState = createInitialAppState();
const AppContext = createContext<AppState | null>(null);

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: false,
    shouldSetBadge: false
  })
});

export function AppProvider({ children }: { children: ReactNode }) {
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [onboardingAnswers, setOnboardingAnswers] = useState<OnboardingAnswers>({});
  const [challengeChoices, setChallengeChoices] = useState<ChallengeChoiceState>({});
  const [lessonRecall, setLessonRecall] = useState<Record<string, LessonRecallStatus>>({});
  const [skillStates, setSkillStates] = useState(initialState.skillStates);
  const [recentScores, setRecentScores] = useState(initialState.recentScores);
  const [streak, setStreak] = useState(initialState.streak);
  const [recommendations, setRecommendations] = useState(initialState.recommendations);
  const [sessionSummary, setSessionSummary] = useState(initialState.sessionSummary);
  const [buildMissions, setBuildMissions] = useState(initialState.buildMissions);
  const [notificationPermissionStatus, setNotificationPermissionStatus] = useState<NotificationPermissionStatus>("idle");
  const [reminderTime, setReminderTime] = useState(initialState.profile.preferences.dailyReminderTime ?? "07:30");
  const [topicRatings, setTopicRatings] = useState<TopicRatings>({});
  const [hasCompletedSkillIntake, setHasCompletedSkillIntake] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let active = true;

    loadPersistedAppState().then((persisted) => {
      if (!active || !persisted) {
        setHydrated(true);
        return;
      }

      setHasCompletedOnboarding(persisted.hasCompletedOnboarding);
      setOnboardingAnswers(persisted.onboardingAnswers);
      setChallengeChoices(persisted.challengeChoices);
      setLessonRecall(persisted.lessonRecall ?? {});
      setSkillStates(persisted.skillStates);
      setRecentScores(persisted.recentScores);
      setStreak(persisted.streak);
      setRecommendations(persisted.recommendations);
      setSessionSummary(persisted.sessionSummary);
      setBuildMissions(persisted.buildMissions);
      setNotificationPermissionStatus(persisted.notificationSettings.permissionStatus);
      setReminderTime(persisted.notificationSettings.time);
      setTopicRatings(persisted.topicRatings ?? {});
      setHasCompletedSkillIntake(persisted.hasCompletedSkillIntake ?? false);
      setHydrated(true);
    });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!hydrated) return;

    void savePersistedAppState({
      hasCompletedOnboarding,
      onboardingAnswers,
      challengeChoices,
      lessonRecall,
      skillStates,
      recentScores,
      streak,
      recommendations,
      sessionSummary,
      buildMissions,
      notificationSettings: {
        enabled: notificationPermissionStatus === "granted",
        time: reminderTime,
        permissionStatus: notificationPermissionStatus
      },
      topicRatings,
      hasCompletedSkillIntake
    });
  }, [
    hydrated,
    hasCompletedOnboarding,
    onboardingAnswers,
    challengeChoices,
    lessonRecall,
    skillStates,
    recentScores,
    streak,
    recommendations,
    sessionSummary,
    buildMissions,
    notificationPermissionStatus,
    reminderTime,
    topicRatings,
    hasCompletedSkillIntake
  ]);

  const weakSkill = useMemo(
    () => [...skillStates].sort((a, b) => b.weaknessScore - a.weaknessScore)[0],
    [skillStates]
  );
  const strongestSkill = useMemo(
    () => [...skillStates].sort((a, b) => b.mastery - a.mastery)[0],
    [skillStates]
  );

  const selectedDailyLesson =
    initialState.lessons.find((lesson) => trackToDomainMap[lesson.trackId] === weakSkill?.domain) ?? initialState.lessons[0]!;

  const completionPercent = Math.round(
    (Object.keys(onboardingAnswers).length / initialState.onboardingQuestions.length) * 100
  );

  const value: AppState = {
    hasCompletedOnboarding,
    onboardingAnswers,
    onboardingQuestions: initialState.onboardingQuestions,
    challengeChoices,
    lessonRecall,
    profile: initialState.profile,
    tracks: initialState.tracks,
    lessons: initialState.lessons,
    frontierBriefs: initialState.frontierBriefs,
    buildMissions,
    dailyChallenges: initialState.dailyChallenges,
    weeklySimulations: initialState.weeklySimulations,
    skillStates,
    streak,
    recommendations,
    sessionSummary,
    notificationPermissionStatus,
    reminderTime,
    latestGeneratedMission: buildMissions.find((item) => item.origin === "generated"),
    selectedDailyLesson,
    weakSkill,
    strongestSkill,
    completionPercent,
    answerOnboardingQuestion: (questionId, optionId) => {
      startTransition(() => {
        setOnboardingAnswers((current) => ({ ...current, [questionId]: optionId }));
      });
    },
    completeOnboarding: () => {
      startTransition(() => {
        setHasCompletedOnboarding(true);
      });
    },
    answerChallenge: (challengeId, choice) => {
      startTransition(() => {
        setChallengeChoices((current) => ({ ...current, [challengeId]: choice }));
        const updated = applyChallengeAnswer({
          challengeId,
          choice,
          skillStates,
          recentScores,
          streak
        });
        setSkillStates(updated.skillStates);
        setRecentScores(updated.recentScores);
        setStreak(updated.streak);
        setRecommendations(updated.recommendations);
        setSessionSummary(updated.sessionSummary);
      });
    },
    rateLessonRecall: (lessonId, status) => {
      startTransition(() => {
        setLessonRecall((current) => ({ ...current, [lessonId]: status }));
      });
    },
    enableDailyReminder: async () => {
      const result = await Notifications.requestPermissionsAsync();
      if (result.status !== "granted") {
        setNotificationPermissionStatus("denied");
        return;
      }

      const [hour, minute] = reminderTime.split(":").map((part) => Number(part));
      await Notifications.cancelAllScheduledNotificationsAsync();
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Walk mode is ready",
          body: "Open Principal Path and do today's rep."
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.DAILY,
          hour,
          minute
        }
      });
      setNotificationPermissionStatus("granted");
    },
    generateMissionFromFrontierId: (frontierId) => {
      const frontier = initialState.frontierBriefs.find((item) => item.id === frontierId);
      if (!frontier) return;

      setBuildMissions((current) => appendGeneratedMission(current, generateMissionFromFrontier(frontier, current)));
    },
    getTrackMastery: (trackId) => {
      const domain = trackToDomainMap[trackId];
      const skill = skillStates.find((item) => item.domain === domain);
      return skill?.mastery ?? 0;
    },
    topicRatings,
    hasCompletedSkillIntake,
    saveTopicRatings: (ratings) => {
      startTransition(() => {
        setTopicRatings(ratings);
        setHasCompletedSkillIntake(true);
      });
    },
    getLessonVariantId: (lesson) => {
      if (!lesson.variants || lesson.variants.length === 0) return "consolidation";
      const rating: TopicRatingLevel | undefined = lesson.topicKey ? topicRatings[lesson.topicKey] : undefined;
      if (rating === "none" || rating === "heard") return "foundation";
      if (rating === "deep") return "advanced";
      return "consolidation";
    }
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext must be used inside AppProvider");
  }

  return context;
}
