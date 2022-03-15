import React from "react";
import SwipePicker from "react-native-swipe-picker";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  selectHours,
  selectMinutes,
  selectSeconds,
  setHours,
  setMinutes,
  setSeconds,
} from "./timerSlice";
import { View, Text, StyleSheet } from "react-native";
import i18n from "../../i18n/i18n";
import { Theme } from "../../theme/theme";
import { makeStyles } from "../../theme/makeStyles";
import { useTheme } from "../../theme/ThemeContext";

const useStyles = makeStyles((theme: Theme) => {
  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      height: 200,
      backgroundColor: theme.color.surface,
    },
    unitText: {
      marginLeft: 10,
      marginRight: 10,
      fontSize: 16,
      color: theme.color.onBackground,
    },
  });
  return styles;
});

export const TimerPicker = () => {
  const dispatch = useAppDispatch();
  const styles = useStyles();
  const { theme } = useTheme();
  const { color } = theme;

  const hours: number = useAppSelector(selectHours);
  const minutes: number = useAppSelector(selectMinutes);
  const seconds: number = useAppSelector(selectSeconds);

  return (
    <View style={styles.container}>
      <SwipePicker
        initialSelectedIndex={hours}
        fontColor={color.onSurface}
        backgroundColor={color.surface}
        height={200}
        items={hoursSwipePickerItems}
        onChange={({ item }: { index: number; item: SwipePickerItem }) => {
          dispatch(setHours(item.value));
        }}
      />
      <Text style={styles.unitText}>{i18n.t("timerHours")}</Text>
      <SwipePicker
        initialSelectedIndex={minutes}
        fontColor={color.onSurface}
        backgroundColor={color.surface}
        height={200}
        items={minutesSwipePickerItems}
        onChange={({ item }: { index: number; item: SwipePickerItem }) => {
          dispatch(setMinutes(item.value));
        }}
      />
      <Text style={styles.unitText}>{i18n.t("timerMinutes")}</Text>
      <SwipePicker
        initialSelectedIndex={seconds}
        fontColor={color.onSurface}
        backgroundColor={color.surface}
        height={200}
        items={secondsSwipePickerItems}
        onChange={({ item }: { index: number; item: SwipePickerItem }) => {
          dispatch(setSeconds(item.value));
        }}
      />
      <Text style={styles.unitText}>{i18n.t("timerSeconds")}</Text>
    </View>
  );
};

type SwipePickerItem = {
  value: number;
  label: string;
};

const hoursSwipePickerItems: SwipePickerItem[] = [];
for (let i = 0; i < 24; i++) {
  hoursSwipePickerItems.push({
    value: i,
    label: `${i}`,
  });
}

const minutesSwipePickerItems: SwipePickerItem[] = [];
const secondsSwipePickerItems: SwipePickerItem[] = [];
for (let i = 0; i < 60; i++) {
  minutesSwipePickerItems.push({
    value: i,
    label: `${i}`,
  });
  secondsSwipePickerItems.push({
    value: i,
    label: `${i}`,
  });
}
