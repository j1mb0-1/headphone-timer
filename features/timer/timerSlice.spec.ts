import { Dispatch } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import timerReducer, {
  TimerState,
  hoursPicked,
  minutesPicked,
  secondsPicked,
  scheduleTimerAsync,
  cancelTimerAsync,
} from "./timerSlice";
import { addUnitsToNow } from "./timer_utils";
jest.mock("./timer_utils", () => {
  return {
    addUnitsToNow: jest.fn(),
  };
});

describe("timer slice", () => {
  const initialTimerState: TimerState = {
    expiresTimeMs: undefined,
    timerStatus: "waiting",
    hours: 1,
    minutes: 15,
    seconds: 30,
    scheduleStatus: "idle",
    cancelStatus: "idle",
  };

  // TODO: Create an initialRootState shared by other tests for slices
  const initialRootState: RootState = {
    timer: { ...initialTimerState },
    _persist: {
      version: 0,
      rehydrated: false,
    },
  };

  describe("timer reducer", () => {
    it("should handle initial state", () => {
      const expected: TimerState = {
        expiresTimeMs: undefined,
        timerStatus: "waiting",
        hours: 0,
        minutes: 0,
        seconds: 0,
        scheduleStatus: "idle",
        cancelStatus: "idle",
      };

      const actual: TimerState = timerReducer(undefined, {
        type: "unknown",
      });

      expect(actual).toEqual(expected);
    });

    it("should handle hoursPicked", () => {
      const seed: TimerState = {
        ...initialTimerState,
      };
      const expected: TimerState = {
        ...seed,
        hours: 5,
      };

      const actual = timerReducer(seed, hoursPicked({ hours: 5 }));

      expect(actual).toEqual(expected);
    });

    it("should handle minutesPicked", () => {
      const seed: TimerState = {
        ...initialTimerState,
      };
      const expected: TimerState = {
        ...seed,
        minutes: 45,
      };

      const actual = timerReducer(seed, minutesPicked({ minutes: 45 }));

      expect(actual).toEqual(expected);
    });

    it("should handle secondsPicked", () => {
      const seed: TimerState = {
        ...initialTimerState,
      };
      const expected: TimerState = {
        ...seed,
        seconds: 5,
      };

      const actual = timerReducer(seed, secondsPicked({ seconds: 5 }));

      expect(actual).toEqual(expected);
    });

    it("should handle scheduleTimerAsync.fulfilled", () => {
      const seed: TimerState = {
        ...initialTimerState,
        scheduleStatus: "loading",
      };
      const expiresTimeMs = new Date().getTime();
      const expected: TimerState = {
        ...seed,
        expiresTimeMs: expiresTimeMs,
        timerStatus: "set",
        scheduleStatus: "idle",
      };

      const actual = timerReducer(
        seed,
        scheduleTimerAsync.fulfilled(expiresTimeMs, expect.any(String))
      );

      expect(actual).toEqual(expected);
    });

    it("should handle scheduleTimerAsync.pending", () => {
      const seed: TimerState = {
        ...initialTimerState,
      };
      const expected: TimerState = {
        ...seed,
        scheduleStatus: "loading",
      };

      const actual = timerReducer(
        seed,
        scheduleTimerAsync.pending(expect.any(String))
      );

      expect(actual).toEqual(expected);
    });

    it("should handle scheduleTimerAsync.rejected", () => {
      const seed: TimerState = {
        ...initialTimerState,
        scheduleStatus: "loading",
      };
      const error = new Error();
      const expected: TimerState = {
        ...seed,
        scheduleStatus: "failed",
      };

      const actual = timerReducer(
        seed,
        scheduleTimerAsync.rejected(error, expect.any(String))
      );

      expect(actual).toEqual(expected);
    });

    it("should handle cancelTimerAsync.fulfilled", () => {
      const seed: TimerState = {
        ...initialTimerState,
        cancelStatus: "loading",
      };
      const expected: TimerState = {
        ...seed,
        expiresTimeMs: undefined,
        timerStatus: "waiting",
        cancelStatus: "idle",
      };

      const actual = timerReducer(
        seed,
        cancelTimerAsync.fulfilled(undefined, expect.any(String))
      );

      expect(actual).toEqual(expected);
    });

    it("should handle cancelTimerAsync.pending", () => {
      const seed: TimerState = {
        ...initialTimerState,
      };
      const expected: TimerState = {
        ...seed,
        cancelStatus: "loading",
      };

      const actual = timerReducer(
        seed,
        cancelTimerAsync.pending(expect.any(String))
      );

      expect(actual).toEqual(expected);
    });

    it("should handle cancelTimerAsync.rejected", () => {
      const seed: TimerState = {
        ...initialTimerState,
        cancelStatus: "loading",
      };
      const error = new Error();
      const expected: TimerState = {
        ...seed,
        cancelStatus: "failed",
      };

      const actual = timerReducer(
        seed,
        cancelTimerAsync.rejected(error, expect.any(String))
      );

      expect(actual).toEqual(expected);
    });
  });

  describe("timer thunks", () => {
    describe("scheduleTimerAsync thunk", () => {
      let dispatch: Dispatch;
      const mockAddUnitsToNow = addUnitsToNow as jest.MockedFunction<
        (hours: number, minutes: number, seconds: number) => number | undefined
      >;

      beforeEach(() => {
        dispatch = jest.fn();
        mockAddUnitsToNow.mockReset();
      });

      it("should schedule expires timer", async () => {
        const hours = 5;
        const minutes = 10;
        const seconds = 15;
        const seed: RootState = {
          ...initialRootState,
          timer: { ...initialTimerState, hours, minutes, seconds },
        };
        const getState = () => seed;
        const expiresTimeMs = new Date().getTime();
        mockAddUnitsToNow.mockReturnValue(expiresTimeMs);

        const action = scheduleTimerAsync();
        await action(dispatch, getState, undefined);

        expect(dispatch).toHaveBeenNthCalledWith(
          1,
          scheduleTimerAsync.pending(expect.any(String))
        );
        expect(mockAddUnitsToNow).toHaveBeenCalledWith(hours, minutes, seconds);
        expect(dispatch).toHaveBeenNthCalledWith(
          2,
          scheduleTimerAsync.fulfilled(expiresTimeMs, expect.any(String))
        );
      });

      it("should not schedule expires timer when already set", async () => {
        const hours = 5;
        const minutes = 10;
        const seconds = 15;
        const seed: RootState = {
          ...initialRootState,
          timer: {
            ...initialTimerState,
            timerStatus: "set",
            hours,
            minutes,
            seconds,
          },
        };
        const getState = () => seed;
        const expiresTimeMs = new Date().getTime();
        mockAddUnitsToNow.mockReturnValue(expiresTimeMs);

        const action = scheduleTimerAsync();
        await action(dispatch, getState, undefined);

        expect(dispatch).toHaveBeenNthCalledWith(
          1,
          scheduleTimerAsync.pending(expect.any(String))
        );
        expect(mockAddUnitsToNow).not.toHaveBeenCalled();
        expect(dispatch).toHaveBeenNthCalledWith(
          2,
          // TODO: Find better way to match scheduleTimerAsync.rejected
          expect.objectContaining({ type: "timer/scheduleTimer/rejected" })
        );
      });

      it("should not schedule expires timer when if none available", async () => {
        const hours = 5;
        const minutes = 10;
        const seconds = 15;
        const seed: RootState = {
          ...initialRootState,
          timer: {
            ...initialTimerState,
            timerStatus: "set",
            hours,
            minutes,
            seconds,
          },
        };
        const getState = () => seed;
        mockAddUnitsToNow.mockReturnValue(undefined);

        const action = scheduleTimerAsync();
        await action(dispatch, getState, undefined);

        expect(dispatch).toHaveBeenNthCalledWith(
          1,
          scheduleTimerAsync.pending(expect.any(String))
        );
        expect(mockAddUnitsToNow).not.toHaveBeenCalled();
        expect(dispatch).toHaveBeenNthCalledWith(
          2,
          // TODO: Find better way to match scheduleTimerAsync.rejected
          expect.objectContaining({ type: "timer/scheduleTimer/rejected" })
        );
      });
    });

    describe("cancelTimerAsync thunk", () => {
      let dispatch: Dispatch;

      beforeEach(() => {
        dispatch = jest.fn();
      });

      it("should cancel timer", async () => {
        const hours = 5;
        const minutes = 10;
        const seconds = 15;
        const seed: RootState = {
          ...initialRootState,
          timer: {
            ...initialTimerState,
            timerStatus: "set",
            hours,
            minutes,
            seconds,
          },
        };
        const getState = () => seed;

        const action = cancelTimerAsync();
        await action(dispatch, getState, undefined);

        expect(dispatch).toHaveBeenNthCalledWith(
          1,
          cancelTimerAsync.pending(expect.any(String))
        );
        expect(dispatch).toHaveBeenNthCalledWith(
          2,
          cancelTimerAsync.fulfilled(undefined, expect.any(String))
        );
      });

      it("should not cancel timer if not set", async () => {
        const hours = 5;
        const minutes = 10;
        const seconds = 15;
        const seed: RootState = {
          ...initialRootState,
          timer: {
            ...initialTimerState,
            timerStatus: "waiting",
            hours,
            minutes,
            seconds,
          },
        };
        const getState = () => seed;

        const action = cancelTimerAsync();
        await action(dispatch, getState, undefined);

        expect(dispatch).toHaveBeenNthCalledWith(
          1,
          cancelTimerAsync.pending(expect.any(String))
        );
        expect(dispatch).toHaveBeenNthCalledWith(
          2,
          // TODO: Find better way to match cancelTimer.rejected
          expect.objectContaining({ type: "timer/cancelTimer/rejected" })
        );
      });
    });
  });
});
