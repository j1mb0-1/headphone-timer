import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { selectExpiresTimeMs } from "./timerSlice";
import { View, Text, StyleSheet } from "react-native";
import { Theme } from "../../theme/theme";
import { makeStyles } from "../../theme/makeStyles";

const useStyles = makeStyles((theme: Theme) => {
  const { spacing } = theme;
  const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      justifyContent: "center",
      height: 200,
      backgroundColor: theme.color.surface,
      width: "100%",
    },
    countDownText: {
      fontSize: 90,
      color: theme.color.onSurface,
      fontVariant: ["tabular-nums"],
      paddingLeft: spacing.double,
      paddingRight: spacing.double,
    },
  });
  return styles;
});

export const TimerCountdown = () => {
  const styles = useStyles();

  const expiresTimeMs: number | undefined = useAppSelector(selectExpiresTimeMs);

  const [timeLeftMs, setTimeLeftMs] = useState(getTimeLeft(expiresTimeMs));
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeftMs(getTimeLeft(expiresTimeMs));
    }, 1000);
    return () => clearTimeout(timer);
  });

  let timeLeftDisplay: string | undefined;

  if (timeLeftMs) {
    const hoursLeft = Math.floor((timeLeftMs / (1000 * 60 * 60)) % 24);
    const minutesLeft = Math.floor((timeLeftMs / (1000 * 60)) % 24);
    const secondsLeft = Math.floor((timeLeftMs / 1000) % 60);

    timeLeftDisplay = `${hoursLeft}:${
      minutesLeft < 10 ? `0${minutesLeft}` : minutesLeft
    }:${secondsLeft < 10 ? `0${secondsLeft}` : secondsLeft}`;
  } else {
    timeLeftDisplay = "0:00:00";
  }

  return (
    <View style={styles.container}>
      <Text adjustsFontSizeToFit numberOfLines={1} style={styles.countDownText}>
        {timeLeftDisplay}
      </Text>
    </View>
  );
};

const getTimeLeft = (expiresTimeMs: number | undefined): number | undefined => {
  let timeLeft = expiresTimeMs
    ? expiresTimeMs - new Date().getTime()
    : undefined;
  if (timeLeft && timeLeft < 1) {
    timeLeft = undefined;
  }
  return timeLeft;
};
