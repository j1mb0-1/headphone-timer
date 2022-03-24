import { defaultSpacingTheme } from "./spacingTheme";
import { ColorTheme, Theme } from "./theme";

const darkColorTheme: ColorTheme = {
  primary: "#03a9f4",
  onPrimary: "#000000",
  surface: "#000000",
  onSurface: "#ffffff",
  background: "#3f3f3f",
  onBackground: "#ffffff",
};

export const defaultDarkTheme: Theme = {
  color: darkColorTheme,
  spacing: defaultSpacingTheme,
};
