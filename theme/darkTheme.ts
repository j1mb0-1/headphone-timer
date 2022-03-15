import { ColorTheme, SpacingTheme, Theme } from "./theme";

const defaultDarkColorTheme: ColorTheme = {
  primary: "#03a9f4",
  onPrimary: "#000000",
  surface: "#000000",
  onSurface: "#ffffff",
  background: "#3f3f3f",
  onBackground: "#ffffff",
};

const defaultDarkSpacingTheme: SpacingTheme = {
  base: 8,
  double: 16,
  radius: 8,
};

export const defaultDarkTheme: Theme = {
  id: "default-dark",
  color: defaultDarkColorTheme,
  spacing: defaultDarkSpacingTheme,
};
