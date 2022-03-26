import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { addUnitsToNow } from "./timer_utils";

export type TimerStatus = "waiting" | "set";

export type ThunkStatus = "idle" | "loading" | "failed";

export interface TimerState {
  expiresTimeMs: number | undefined;
  timerStatus: TimerStatus;
  hours: number;
  minutes: number;
  seconds: number;
  scheduleStatus: ThunkStatus;
  cancelStatus: ThunkStatus;
}

const initialState: TimerState = {
  expiresTimeMs: undefined,
  timerStatus: "waiting",
  hours: 0,
  minutes: 0,
  seconds: 0,
  scheduleStatus: "idle",
  cancelStatus: "idle",
};

export const scheduleTimerAsync = createAsyncThunk<
  number,
  void,
  { state: RootState }
>("timer/scheduleTimer", async (_, { getState }) => {
  const { timerStatus, hours, minutes, seconds } = getState().timer;
  if (timerStatus === "waiting") {
    const expiresTimeMs: number | undefined = addUnitsToNow(
      hours,
      minutes,
      seconds
    );
    if (expiresTimeMs) {
      // TODO: Schedule native platform local notification
      return expiresTimeMs;
    } else {
      throw new Error("invalid expires time");
    }
  } else {
    throw new Error("invalid timer status");
  }
});

export const cancelTimerAsync = createAsyncThunk<
  void,
  void,
  { state: RootState }
>("timer/cancelTimer", async (_, { getState }) => {
  const { timerStatus } = getState().timer;
  if (timerStatus === "set") {
    // TODO: Cancel native platform local notification
  } else {
    throw new Error("invalid timer status");
  }
});

export const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    hoursPicked: (state, action: PayloadAction<{ hours: number }>) => {
      const { hours } = action.payload;
      state.hours = hours;
    },
    minutesPicked: (state, action: PayloadAction<{ minutes: number }>) => {
      const { minutes } = action.payload;
      state.minutes = minutes;
    },
    secondsPicked: (state, action: PayloadAction<{ seconds: number }>) => {
      const { seconds } = action.payload;
      state.seconds = seconds;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(scheduleTimerAsync.pending, (state) => {
        state.scheduleStatus = "loading";
      })
      .addCase(scheduleTimerAsync.rejected, (state) => {
        state.scheduleStatus = "failed";
      })
      .addCase(scheduleTimerAsync.fulfilled, (state, action) => {
        state.expiresTimeMs = action.payload;
        state.timerStatus = "set";
        state.scheduleStatus = "idle";
      })
      .addCase(cancelTimerAsync.pending, (state) => {
        state.cancelStatus = "loading";
      })
      .addCase(cancelTimerAsync.rejected, (state) => {
        state.cancelStatus = "failed";
      })
      .addCase(cancelTimerAsync.fulfilled, (state) => {
        state.expiresTimeMs = undefined;
        state.timerStatus = "waiting";
        state.cancelStatus = "idle";
      });
  },
});

export const { hoursPicked, minutesPicked, secondsPicked } = timerSlice.actions;

export const selectTimerStatus = (state: RootState) => state.timer.timerStatus;
export const selectExpiresTimeMs = (state: RootState) =>
  state.timer.expiresTimeMs;
export const selectHours = (state: RootState) => state.timer.hours;
export const selectMinutes = (state: RootState) => state.timer.minutes;
export const selectSeconds = (state: RootState) => state.timer.seconds;

export default timerSlice.reducer;
