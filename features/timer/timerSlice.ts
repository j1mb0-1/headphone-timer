import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";

export type TimerStatus = "waiting" | "set";

export interface TimerState {
  expiresTimeMs: number | undefined;
  status: TimerStatus;
  hours: number;
  minutes: number;
  seconds: number;
}

const initialState: TimerState = {
  expiresTimeMs: undefined,
  status: "waiting",
  hours: 0,
  minutes: 0,
  seconds: 0,
};

export const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    setExpiresTime: (
      state,
      action: PayloadAction<{
        expiresTimeMs: number | undefined;
        status: TimerStatus;
      }>
    ) => {
      const { expiresTimeMs, status } = action.payload;
      state.expiresTimeMs = expiresTimeMs;
      state.status = status;
    },
    setHours: (state, action: PayloadAction<number>) => {
      state.hours = action.payload;
    },
    setMinutes: (state, action: PayloadAction<number>) => {
      state.minutes = action.payload;
    },
    setSeconds: (state, action: PayloadAction<number>) => {
      state.seconds = action.payload;
    },
  },
});

export const { setExpiresTime, setHours, setMinutes, setSeconds } =
  timerSlice.actions;

export const selectStatus = (state: RootState) => state.timer.status;
export const selectExpiresTimeMs = (state: RootState) =>
  state.timer.expiresTimeMs;
export const selectHours = (state: RootState) => state.timer.hours;
export const selectMinutes = (state: RootState) => state.timer.minutes;
export const selectSeconds = (state: RootState) => state.timer.seconds;

export const scheduleTimerAsync =
  (): AppThunk => async (dispatch, getState) => {
    const { status, hours, minutes, seconds } = getState().timer;
    if (status === "waiting") {
      const expiresTime = new Date();
      expiresTime.setHours(expiresTime.getHours() + hours);
      expiresTime.setMinutes(expiresTime.getMinutes() + minutes);
      expiresTime.setSeconds(expiresTime.getSeconds() + seconds);
      const now = new Date();

      const isValid = expiresTime.getTime() >= now.getTime();
      if (isValid) {
        dispatch(
          setExpiresTime({
            expiresTimeMs: expiresTime.getTime(),
            status: "set",
          })
        );
      }
    }
  };

export const cancelTimerAsync = (): AppThunk => async (dispatch, getState) => {
  const { status } = getState().timer;
  if (status === "set") {
    dispatch(setExpiresTime({ expiresTimeMs: undefined, status: "waiting" }));
  }
};

export default timerSlice.reducer;
