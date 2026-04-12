import type { EntityId, ISODateString, SkillDomain, SkillLevel } from "./domain";

export interface UserPreferences {
  sessionTargetMinutes: number;
  dailyReminderTime?: string;
  audioFirst: boolean;
  weakAreaBias: number;
}

export interface UserProfile {
  id: EntityId;
  displayName: string;
  timezone: string;
  createdAt: ISODateString;
  updatedAt: ISODateString;
  preferences: UserPreferences;
  focusDomains: SkillDomain[];
}

export interface UserSkillState {
  skillId: EntityId;
  domain: SkillDomain;
  level: SkillLevel;
  mastery: number;
  xp: number;
  lastPracticedAt?: ISODateString;
  weaknessScore: number;
}

