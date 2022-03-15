import React from "react";
import { Text, StyleSheet, Pressable } from "react-native";
import { makeStyles } from "../theme/makeStyles";
import { Theme } from "../theme/theme";

type StyledButtonProps = {
  text: string;
  onPress: () => void;
};

const StyledButton = (props: StyledButtonProps) => {
  const { text, onPress } = props;
  const styles = useStyles();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        {
          ...styles.buttonStyle,
          ...(pressed ? styles.buttonStylePressed : undefined),
        },
      ]}
    >
      {() => (
        <Text
          style={{
            ...styles.textStyle,
          }}
        >
          {text}
        </Text>
      )}
    </Pressable>
  );
};

export default StyledButton;

const useStyles = makeStyles((theme: Theme) => {
  const { color, spacing } = theme;
  const styles = StyleSheet.create({
    buttonStyle: {
      alignSelf: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderColor: color.onSurface,
      borderRadius: spacing.radius,
      paddingLeft: spacing.double,
      paddingRight: spacing.double,
      paddingTop: spacing.double,
      paddingBottom: spacing.double,
    },
    buttonStylePressed: {
      borderColor: color.onSurface,
      opacity: 0.5,
    },
    textStyle: {
      color: color.onSurface,
      fontSize: 20,
      alignSelf: "center",
    },
  });
  return styles;
});
