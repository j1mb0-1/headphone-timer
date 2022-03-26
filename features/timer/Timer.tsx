import React from "react";
import { View, StyleSheet } from "react-native";
import { useAppSelector } from "../../app/hooks";
import { selectTimerStatus, TimerStatus } from "./timerSlice";
import { TimerPicker } from "./TimerPicker";
import { TimerCountdown } from "./TimerCountdown";
import { makeStyles } from "../../theme/makeStyles";
import { Theme } from "../../theme/theme";
import { TimerButton } from "./TimerButton";

const useStyles = makeStyles((theme: Theme) => {
  const { spacing } = theme;
  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.color.surface,
    },
    timerContainer: {},
    buttonContainer: {
      marginTop: spacing.double * 2,
    },
  });
  return styles;
});

export function Timer() {
  const styles = useStyles();

  const timerStatus: TimerStatus = useAppSelector(selectTimerStatus);

  return (
    <View style={styles.container}>
      <View style={styles.timerContainer}>
        {timerStatus === "waiting" ? <TimerPicker /> : <TimerCountdown />}
      </View>
      <View style={styles.buttonContainer}>
        <TimerButton />
      </View>
    </View>
  );
}
