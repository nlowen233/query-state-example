import { QueryStringState } from "./types";

export function getRandomTimeInterval(): number {
  return Math.floor(Math.random() * 3000);
}

export function getQueryState<
  ReturnType extends Record<string, any> = QueryStringState
>(data: string): ReturnType | undefined {
  try {
    return JSON.parse(atob(decodeURIComponent(data)));
  } catch (_e) {
    return undefined;
  }
}

export function capitalize(str?: string): string {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

import dayjs from "dayjs";

export function getAllAprilDates(): string[] {
  const start = dayjs("2025-04-01");
  const end = dayjs("2025-04-30");

  const dates: string[] = [];
  let current = start;

  while (current.isBefore(end) || current.isSame(end)) {
    dates.push(current.format("YYYY-MM-DD"));
    current = current.add(1, "day");
  }

  return dates;
}
