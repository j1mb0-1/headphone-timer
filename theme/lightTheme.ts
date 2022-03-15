import { ColorTheme, SpacingTheme, Theme } from "./theme";

const defaultLightColorTheme: ColorTheme = {
  primary: "#03a9f4",
  onPrimary: "#ffffff",
  surface: "#ffffff",
  onSurface: "#000000",
  background: "#dedede",
  onBackground: "#000000",
};

const defaultLightSpacingTheme: SpacingTheme = {
  base: 8,
  double: 16,
  radius: 8,
};

export const defaultLightTheme: Theme = {
  id: "default-light",
  color: defaultLightColorTheme,
  spacing: defaultLightSpacingTheme,
};
