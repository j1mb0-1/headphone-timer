import {
  addUnitsToNow,
  getDifferenceFromNow,
  getHourUnitFromDuration,
  getMinuteUnitFromDuration,
  getSecondUnitFromDuration,
} from "./timer_utils";

describe("timer_utils", () => {
  const now: Date = new Date(1648303787591);

  describe("addUnitsToNow", () => {
    beforeAll(() => {
      jest.useFakeTimers("modern");
      jest.setSystemTime(now);
    });

    afterAll(() => {
      jest.useRealTimers();
    });

    it("should return date with units added in ms", () => {
      const hours = 5;
      const minutes = 15;
      const seconds = 30;

      const actual = addUnitsToNow(hours, minutes, seconds);

      expect(actual).toEqual(1648322717591);
    });

    it("should handle past date", () => {
      const hours = 0;
      const minutes = 0;
      const seconds = 0;

      const actual = addUnitsToNow(hours, minutes, seconds);

      expect(actual).toBeUndefined();
    });
  });

  describe("getDifferenceFromNow", () => {
    beforeAll(() => {
      jest.useFakeTimers("modern");
      jest.setSystemTime(now);
    });

    afterAll(() => {
      jest.useRealTimers();
    });

    it("should return difference from now", () => {
      const expected = 1000;
      const milliseconds = now.getTime() + expected;

      const actual = getDifferenceFromNow(milliseconds);

      expect(actual).toEqual(expected);
    });

    it("should not return difference if past now", () => {
      const expected = 1000;
      const milliseconds = now.getTime() - expected;

      const actual = getDifferenceFromNow(milliseconds);

      expect(actual).toBeUndefined();
    });
  });

  describe("getHourUnitFromDuration", () => {
    it("should return hour from duration with hours left", () => {
      const durationMs = 12392828;
      const expected = 3;

      const actual = getHourUnitFromDuration(durationMs);

      expect(actual).toEqual(expected);
    });

    it("should return hours from duration with days left", () => {
      const durationMs = 112392828;
      const expected = 7;

      const actual = getHourUnitFromDuration(durationMs);

      expect(actual).toEqual(expected);
    });

    it("should return hours from duration with minutes left", () => {
      const durationMs = 2392828;
      const expected = 0;

      const actual = getHourUnitFromDuration(durationMs);

      expect(actual).toEqual(expected);
    });
  });

  describe("getMinuteUnitFromDuration", () => {
    it("should return minute from duration with minute left", () => {
      const durationMs = 2392828;
      const expected = 39;

      const actual = getMinuteUnitFromDuration(durationMs);

      expect(actual).toEqual(expected);
    });

    it("should return minute from duration with hours left", () => {
      const durationMs = 12312322;
      const expected = 25;

      const actual = getMinuteUnitFromDuration(durationMs);

      expect(actual).toEqual(expected);
    });

    it("should return hours from duration with minutes left", () => {
      const durationMs = 12312;
      const expected = 0;

      const actual = getMinuteUnitFromDuration(durationMs);

      expect(actual).toEqual(expected);
    });
  });

  describe("getSecondUnitFromDuration", () => {
    it("should return second from duration with seconds left", () => {
      const durationMs = 12121;
      const expected = 12;

      const actual = getSecondUnitFromDuration(durationMs);

      expect(actual).toEqual(expected);
    });

    it("should return second from duration with minutes left", () => {
      const durationMs = 1231212;
      const expected = 31;

      const actual = getSecondUnitFromDuration(durationMs);

      expect(actual).toEqual(expected);
    });

    it("should return second from duration with milliseconds left", () => {
      const durationMs = 900;
      const expected = 0;

      const actual = getSecondUnitFromDuration(durationMs);

      expect(actual).toEqual(expected);
    });
  });
});
