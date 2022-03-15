// https://medium.com/supercharges-mobile-product-guide/reactive-styles-in-react-native-79a41fbdc404

export interface ColorTheme {
  primary: string;
  onPrimary: string;
  surface: string;
  onSurface: string;
  background: string;
  onBackground: string;
}

export interface SpacingTheme {
  base: number;
  double: number;
  radius: number;
}

export interface Theme {
  id: string;
  color: ColorTheme;
  spacing: SpacingTheme;
}
