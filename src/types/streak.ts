import type { ISODateString } from "./domain";

export interface StreakState {
  current: number;
  longest: number;
  lastActiveDate?: ISODateString;
  activeDates: ISODateString[];
}

export interface StreakUpdate {
  state: StreakState;
  continued: boolean;
  broke: boolean;
}

