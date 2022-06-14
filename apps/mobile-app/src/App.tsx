import { registerRootComponent } from "expo";
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
} from "@react-navigation/native";
import SignedOutStack from "./stacks/SignedOutStack";
import {
  Provider as PaperProvider,
  DarkTheme as PaperDarkTheme,
  configureFonts,
  Text,
} from "react-native-paper";
import merge from "deepmerge";
import { StatusBar } from "expo-status-bar";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./store";
import { ToastProvider } from "react-native-toast-notifications";
import { RFValue } from "react-native-responsive-fontsize";
import AppMiddleware from "./components/AppMiddleware";

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

export const client = new ApolloClient({
  uri: __DEV__ ? "localhost:4000/graphql" : "api.orsive.com/graphql",
  cache: new InMemoryCache(),
});

function App() {
  let isUserLoggedIn = false;
  return (
    <ReduxProvider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ApolloProvider client={client}>
          <ToastProvider
            style={{
              backgroundColor: "white",
              borderRadius: RFValue(15),
            }}
          >
            <PaperProvider theme={{ ...CombinedDarkTheme, mode: "exact" }}>
              <AppMiddleware />
              <StatusBar style="light" />
              <NavigationContainer theme={CombinedDarkTheme}>
                {!isUserLoggedIn ? (
                  <SignedOutStack />
                ) : (
                  <Text>You are logged in</Text>
                )}
              </NavigationContainer>
            </PaperProvider>
          </ToastProvider>
        </ApolloProvider>
      </GestureHandlerRootView>
    </ReduxProvider>
  );
}
export default registerRootComponent(App);
