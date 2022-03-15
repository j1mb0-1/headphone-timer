import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  cancelTimerAsync,
  scheduleTimerAsync,
  selectStatus,
  TimerStatus,
} from "./timerSlice";
import i18n from "../../i18n/i18n";
import StyledButton from "../../components/StyledButton";

export const TimerButton = () => {
  const dispatch = useAppDispatch();

  const status: TimerStatus = useAppSelector(selectStatus);

  let text: string;
  let onPress: () => void;
  if (status === "waiting") {
    text = i18n.t("timerStart");
    onPress = () => {
      dispatch(scheduleTimerAsync());
    };
  } else {
    text = i18n.t("timerCancel");
    onPress = () => {
      dispatch(cancelTimerAsync());
    };
  }

  return <StyledButton text={text} onPress={onPress} />;
};
