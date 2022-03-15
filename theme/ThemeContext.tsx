// https://medium.com/supercharges-mobile-product-guide/reactive-styles-in-react-native-79a41fbdc404

import React from "react";
import { useColorScheme } from "react-native";
import { defaultDarkTheme } from "./darkTheme";
import { defaultLightTheme } from "./lightTheme";
import { Theme } from "./theme";
interface ProvidedValue {
  theme: Theme;
}

const Context = React.createContext<ProvidedValue>({
  theme: defaultLightTheme,
});

interface Props {
  children?: React.ReactNode;
}

export const ThemeProvider = React.memo<Props>((props: Props) => {
  const colorScheme = useColorScheme();
  const [theme, setTheme] = React.useState<Theme>(
    colorScheme === "dark" ? defaultDarkTheme : defaultLightTheme
  );

  React.useEffect(() => {
    if (colorScheme === "dark") {
      setTheme(defaultDarkTheme);
    } else {
      setTheme(defaultLightTheme);
    }
  }, [colorScheme]);

  const MemoizedValue = React.useMemo(() => {
    const value: ProvidedValue = {
      theme,
    };
    return value;
  }, [theme]);

  return (
    <Context.Provider value={MemoizedValue}>{props.children}</Context.Provider>
  );
});

export const useTheme = () => React.useContext(Context);
