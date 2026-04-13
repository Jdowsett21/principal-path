import { onboardingQuestions } from "@/content";
import { buildMissions, dailyChallenges, frontierBriefs, lessons, tracks, weeklySimulations } from "@/data";
import { buildSessionSummary, generateRecommendations, scoreChallenge, updateStreak } from "@/lib";
import type { ChallengeScore, ChallengeSubmission, SessionSummary, SkillDomain, StreakState, UserProfile, UserSkillState } from "@/types";
import type { BuildMissionSeed } from "@/data";

export type OnboardingAnswers = Record<string, string>;

export const trackToDomainMap: Record<string, SkillDomain> = {
  architecture: "architecture_and_design",
  data: "data_and_databases",
  reliability: "reliability_and_operations",
  "distributed-systems": "distributed_systems",
  leadership: "leadership_and_communication",
  "cloud-platform": "cloud_architecture_and_aws"
};

const challengeDifficultyMap: Record<string, ChallengeSubmission["difficulty"]> = {
  quiz: "intro",
  tradeoff: "intermediate",
  incident: "advanced",
  system_design: "expert"
};

function createDemoProfile(): UserProfile {
  return {
    id: "user-james",
    displayName: "James",
    timezone: "America/Toronto",
    createdAt: "2026-04-01T09:00:00.000Z",
    updatedAt: "2026-04-12T12:00:00.000Z",
    preferences: {
      sessionTargetMinutes: 45,
      dailyReminderTime: "07:30",
      audioFirst: true,
      weakAreaBias: 0.7
    },
    focusDomains: [
      "architecture_and_design",
      "data_and_databases",
      "reliability_and_operations",
      "cloud_architecture_and_aws"
    ]
  };
}

function createDemoSkills(): UserSkillState[] {
  return [
    {
      skillId: "skill-architecture",
      domain: "architecture_and_design",
      level: 3,
      mastery: 68,
      xp: 420,
      lastPracticedAt: "2026-04-12T10:30:00.000Z",
      weaknessScore: 28
    },
    {
      skillId: "skill-data",
      domain: "data_and_databases",
      level: 2,
      mastery: 51,
      xp: 280,
      lastPracticedAt: "2026-04-10T10:30:00.000Z",
      weaknessScore: 67
    },
    {
      skillId: "skill-reliability",
      domain: "reliability_and_operations",
      level: 2,
      mastery: 56,
      xp: 310,
      lastPracticedAt: "2026-04-11T10:30:00.000Z",
      weaknessScore: 61
    },
    {
      skillId: "skill-distributed",
      domain: "distributed_systems",
      level: 2,
      mastery: 47,
      xp: 230,
      lastPracticedAt: "2026-04-08T10:30:00.000Z",
      weaknessScore: 72
    },
    {
      skillId: "skill-leadership",
      domain: "leadership_and_communication",
      level: 3,
      mastery: 64,
      xp: 390,
      lastPracticedAt: "2026-04-09T10:30:00.000Z",
      weaknessScore: 34
    },
    {
      skillId: "skill-cloud",
      domain: "cloud_architecture_and_aws",
      level: 3,
      mastery: 58,
      xp: 360,
      lastPracticedAt: "2026-04-06T10:30:00.000Z",
      weaknessScore: 42
    }
  ];
}

function createSeedScores(): ChallengeScore[] {
  const seedBreakdowns = [
    {
      challengeId: "daily-001",
      type: "tradeoff" as const,
      trackId: "architecture",
      breakdown: { correctness: 72, reasoning: 81, confidence: 68, communication: 76, efficiency: 70, bonus: 4, penalty: 0 }
    },
    {
      challengeId: "daily-003",
      type: "incident" as const,
      trackId: "reliability",
      breakdown: { correctness: 66, reasoning: 74, confidence: 62, communication: 72, efficiency: 80, bonus: 0, penalty: 0 }
    },
    {
      challengeId: "daily-006",
      type: "tradeoff" as const,
      trackId: "data",
      breakdown: { correctness: 58, reasoning: 70, confidence: 60, communication: 67, efficiency: 65, bonus: 0, penalty: 4 }
    }
  ];

  return seedBreakdowns.map((item) =>
    scoreChallenge(
      {
        challengeId: item.challengeId,
        type: item.type,
        difficulty: challengeDifficultyMap[item.type],
        domains: [trackToDomainMap[item.trackId]],
        skillIds: [`skill-${item.trackId}`],
        submittedAt: "2026-04-12T10:45:00.000Z",
        timeSpentSeconds: 360
      },
      item.breakdown
    )
  );
}

export function createInitialAppState() {
  const profile = createDemoProfile();
  const skillStates = createDemoSkills();
  const recentScores = createSeedScores();
  const streak: StreakState = updateStreak(
    updateStreak(
      updateStreak(
        {
          current: 0,
          longest: 0,
          activeDates: []
        },
        "2026-04-10T11:00:00.000Z"
      ).state,
      "2026-04-11T11:00:00.000Z"
    ).state,
    "2026-04-12T11:00:00.000Z"
  ).state;

  const recommendations = generateRecommendations({
    skills: skillStates,
    recentScores,
    streakCurrent: streak.current
  });

  const sessionSummary: SessionSummary = buildSessionSummary({
    sessionId: "session-demo-001",
    userId: profile.id,
    startedAt: "2026-04-12T10:00:00.000Z",
    completedAt: "2026-04-12T10:47:00.000Z",
    challengeScores: recentScores,
    skills: skillStates,
    streakCurrent: streak.current,
    recommendations
  });

  return {
    profile,
    skillStates,
    recentScores,
    streak,
    sessionSummary,
    recommendations,
    onboardingQuestions,
    tracks,
    lessons,
    frontierBriefs,
    buildMissions,
    dailyChallenges,
    weeklySimulations
  };
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function findChallenge(challengeId: string) {
  return dailyChallenges.find((challenge) => challenge.id === challengeId);
}

function findSkillForTrack(skillStates: UserSkillState[], trackId: string) {
  const domain = trackToDomainMap[trackId];
  return skillStates.find((skill) => skill.domain === domain);
}

function updateSkillStates(skillStates: UserSkillState[], trackId: string, masteryDelta: number, xpAwarded: number): UserSkillState[] {
  const target = findSkillForTrack(skillStates, trackId);
  if (!target) return skillStates;

  return skillStates.map((skill) =>
    skill.skillId === target.skillId
      ? {
          ...skill,
          mastery: clamp(skill.mastery + masteryDelta, 0, 100),
          xp: skill.xp + xpAwarded,
          weaknessScore: clamp(100 - (skill.mastery + masteryDelta), 0, 100),
          lastPracticedAt: new Date().toISOString()
        }
      : skill
  );
}

export function applyChallengeAnswer(input: {
  challengeId: string;
  choice: string;
  skillStates: UserSkillState[];
  recentScores: ChallengeScore[];
  streak: StreakState;
}) {
  const challenge = findChallenge(input.challengeId);
  const choiceIndex = challenge?.choices?.indexOf(input.choice) ?? -1;
  const isCorrect = challenge?.correctChoiceIndex != null && choiceIndex === challenge.correctChoiceIndex;
  const submission: ChallengeSubmission = {
    challengeId: input.challengeId,
    type: challenge?.type ?? "tradeoff",
    skillIds: challenge ? [challenge.trackId] : [],
    domains: challenge ? [trackToDomainMap[challenge.trackId]] : [],
    difficulty: challenge?.type === "incident" ? "advanced" : challenge?.type === "system_design" ? "expert" : "intermediate",
    submittedAt: new Date().toISOString(),
    timeSpentSeconds: 240,
    answer: input.choice
  };

  const score = scoreChallenge(submission, {
    correctness: isCorrect ? 90 : 40,
    reasoning: isCorrect ? 78 : 60,
    confidence: choiceIndex >= 0 ? 64 : 50,
    communication: 72,
    efficiency: 70,
    bonus: isCorrect ? 5 : 0,
    penalty: isCorrect ? 0 : 4
  });

  const nextSkillStates = challenge ? updateSkillStates(input.skillStates, challenge.trackId, score.masteryDelta, score.xpAwarded) : input.skillStates;
  const nextRecentScores = [...input.recentScores, score].slice(-10);
  const nextStreak = updateStreak(input.streak, submission.submittedAt).state;
  const recommendations = generateRecommendations({
    skills: nextSkillStates,
    recentScores: nextRecentScores,
    streakCurrent: nextStreak.current
  });
  const sessionSummary = buildSessionSummary({
    sessionId: "session-live",
    userId: "user-james",
    startedAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    completedAt: submission.submittedAt,
    challengeScores: nextRecentScores,
    skills: nextSkillStates,
    streakCurrent: nextStreak.current,
    recommendations
  });

  return {
    skillStates: nextSkillStates,
    recentScores: nextRecentScores,
    streak: nextStreak,
    recommendations,
    sessionSummary,
    score
  };
}

export function appendGeneratedMission(existing: BuildMissionSeed[], mission: BuildMissionSeed): BuildMissionSeed[] {
  return [mission, ...existing.filter((item) => item.id !== mission.id)];
}
