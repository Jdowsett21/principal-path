import type { StreakState, StreakUpdate } from "../types";
import { dayDifference, toDateOnly } from "./date";

const clamp = (value: number, min: number, max: number): number => Math.min(max, Math.max(min, value));

export function createEmptyStreakState(): StreakState {
  return {
    current: 0,
    longest: 0,
    activeDates: [],
  };
}

export function updateStreak(state: StreakState, activeAt: string): StreakUpdate {
  const date = toDateOnly(activeAt);
  const alreadyRecorded = state.activeDates.includes(date);
  if (alreadyRecorded) {
    return {
      state,
      continued: false,
      broke: false,
    };
  }

  const nextDates = [...state.activeDates, date].sort();
  const previousDate = state.lastActiveDate;
  const gap = previousDate ? dayDifference(date, previousDate) : 0;
  const continued = previousDate ? gap === 1 : state.current === 0;
  const broke = previousDate ? gap > 1 : false;
  const current = continued ? state.current + 1 : 1;
  const longest = Math.max(state.longest, current);

  return {
    state: {
      current: clamp(current, 0, Number.MAX_SAFE_INTEGER),
      longest,
      lastActiveDate: date,
      activeDates: nextDates,
    },
    continued,
    broke,
  };
}

export function streakMaintenanceScore(state: StreakState): number {
  if (state.current >= 30) return 1;
  if (state.current >= 14) return 0.8;
  if (state.current >= 7) return 0.6;
  if (state.current >= 3) return 0.4;
  return 0.2;
}

