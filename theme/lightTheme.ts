import { defaultSpacingTheme } from "./spacingTheme";
import { ColorTheme, Theme } from "./theme";

const lightColorTheme: ColorTheme = {
  primary: "#03a9f4",
  onPrimary: "#ffffff",
  surface: "#ffffff",
  onSurface: "#000000",
  background: "#dedede",
  onBackground: "#000000",
};

export const defaultLightTheme: Theme = {
  color: lightColorTheme,
  spacing: defaultSpacingTheme,
};
