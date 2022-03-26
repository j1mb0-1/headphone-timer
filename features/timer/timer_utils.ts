export const addUnitsToNow = (
  hours: number,
  minutes: number,
  seconds: number
): number | undefined => {
  const nowMs = new Date().getTime();
  const newTimeMs =
    nowMs +
    hours * HOURS_IN_MS +
    minutes * MINUTES_IN_MS +
    seconds * SECONDS_IN_MS;
  if (newTimeMs <= nowMs) {
    return undefined;
  } else {
    return newTimeMs;
  }
};

export const getDifferenceFromNow = (
  milliseconds: number
): number | undefined => {
  let timeLeft: number | undefined = milliseconds - new Date().getTime();
  if (timeLeft < 1) {
    timeLeft = undefined;
  }
  return timeLeft;
};

export const getHourUnitFromDuration = (durationMs: number): number => {
  return Math.floor((durationMs / HOURS_IN_MS) % HOURS_IN_DAY);
};

export const getMinuteUnitFromDuration = (durationMs: number): number => {
  return Math.floor((durationMs / MINUTES_IN_MS) % MINUTES_IN_HOUR);
};

export const getSecondUnitFromDuration = (durationMs: number): number => {
  return Math.floor((durationMs / SECONDS_IN_MS) % SECONDS_IN_MINUTE);
};

const SECONDS_IN_MS = 1000;
const SECONDS_IN_MINUTE = 60;
const MINUTES_IN_MS = SECONDS_IN_MS * 60;
const MINUTES_IN_HOUR = 60;
const HOURS_IN_MS = MINUTES_IN_MS * 60;
const HOURS_IN_DAY = 24;
