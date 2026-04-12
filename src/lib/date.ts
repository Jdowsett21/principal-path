import type { ISODateString } from "../types";

export function toDate(value: ISODateString | Date): Date {
  return value instanceof Date ? new Date(value.getTime()) : new Date(value);
}

export function toIsoDate(value: ISODateString | Date): ISODateString {
  return toDate(value).toISOString();
}

export function toDateOnly(value: ISODateString | Date): ISODateString {
  return toIsoDate(value).slice(0, 10);
}

export function startOfDay(value: ISODateString | Date): ISODateString {
  const date = toDate(value);
  date.setHours(0, 0, 0, 0);
  return date.toISOString();
}

export function dayDifference(a: ISODateString | Date, b: ISODateString | Date): number {
  const first = toDateOnly(a);
  const second = toDateOnly(b);
  const millis = toDate(first).getTime() - toDate(second).getTime();
  return Math.round(millis / 86_400_000);
}

