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

const client = new ApolloClient({
  uri: __DEV__ ? "localhost:4000/graphql" : "api.orsive.com/graphql",
  cache: new InMemoryCache(),
});

function App() {
  let isUserLoggedIn = false;
  return (
    <ApolloProvider client={client}>
      <PaperProvider theme={{ ...CombinedDarkTheme, mode: "exact" }}>
        <StatusBar style="inverted" />
        <NavigationContainer theme={CombinedDarkTheme}>
          {!isUserLoggedIn ? (
            <SignedOutStack />
          ) : (
            <Text>You are logged in</Text>
          )}
        </NavigationContainer>
      </PaperProvider>
    </ApolloProvider>
  );
}
export default registerRootComponent(App);
