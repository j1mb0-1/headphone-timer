// https://medium.com/supercharges-mobile-product-guide/reactive-styles-in-react-native-79a41fbdc404
import React from "react";
import { Theme } from "./theme";
import { useTheme } from "./ThemeContext";

type Generator<T extends Record<string, unknown>> = (theme: Theme) => T;

const makeStyles =
  <T extends Record<string, unknown>>(fn: Generator<T>) =>
  () => {
    const { theme } = useTheme();
    return React.useMemo(() => fn(theme), [theme]);
  };

export { makeStyles };
