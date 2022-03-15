import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import { Provider } from "react-redux";
import { store, persistor } from "./app/store";
import { PersistGate } from "redux-persist/integration/react";
import { Timer } from "./features/timer/Timer";
import { ThemeProvider } from "./theme/ThemeContext";
import { makeStyles } from "./theme/makeStyles";
import { Theme } from "./theme/theme";

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider>
          <Container>
            <StatusBar style="auto" />
            <Timer />
          </Container>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;

interface Props {
  children?: React.ReactNode;
}

const Container = (props: Props) => {
  const styles = useStyles();

  return <SafeAreaView style={styles.container}>{props.children}</SafeAreaView>;
};

const useStyles = makeStyles((theme: Theme) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.color.surface,
    },
  });
  return styles;
});
