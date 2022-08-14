import { registerRootComponent } from "expo";
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
} from "@react-navigation/native";
import {
  Provider as PaperProvider,
  DarkTheme as PaperDarkTheme,
  configureFonts,
  Text,
} from "react-native-paper";
import merge from "deepmerge";
import { StatusBar } from "expo-status-bar";
import { ApolloProvider } from "@apollo/client";
import { Provider as ReduxProvider } from "react-redux";
import { persistor, store } from "./store";
import { ToastProvider } from "react-native-toast-notifications";
import AppMiddleware from "./components/AppMiddleware";
import { PersistGate } from "redux-persist/integration/react";
import { client } from "./logic/client";
import GlobalStackIndex from "./stacks";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-gesture-handler";
import * as Linking from "expo-linking";

const prefix = Linking.createURL("/");

const CombinedDarkTheme = {
  ...merge(PaperDarkTheme, NavigationDarkTheme),
  fonts: configureFonts({
    android: {
      regular: {
        fontFamily: "sans-serif",
        fontWeight: "normal",
      },
      medium: {
        fontFamily: "sans-serif-medium",
        fontWeight: "normal",
      },
      light: {
        fontFamily: "sans-serif-light",
        fontWeight: "normal",
      },
      thin: {
        fontFamily: "sans-serif-thin",
        fontWeight: "normal",
      },
    },
  }),
};

function App() {
  return (
    <ReduxProvider store={store}>
      <PersistGate persistor={persistor}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <ApolloProvider client={client}>
            <ToastProvider>
              <PaperProvider theme={{ ...CombinedDarkTheme, mode: "exact" }}>
                <AppMiddleware />
                <StatusBar style="light" />
                <NavigationContainer
                  linking={{
                    prefixes: [prefix, "https://www.orsive.com/"],
                  }}
                  theme={CombinedDarkTheme}
                >
                  <GlobalStackIndex />
                </NavigationContainer>
              </PaperProvider>
            </ToastProvider>
          </ApolloProvider>
        </GestureHandlerRootView>
      </PersistGate>
    </ReduxProvider>
  );
}
export default registerRootComponent(App);
