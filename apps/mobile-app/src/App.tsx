import { registerRootComponent } from "expo";
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
} from "@react-navigation/native";
import SignedOutStack from "./stacks/SignedOutStack";
import {
  Provider as PaperProvider,
  DarkTheme as PaperDarkTheme,
} from "react-native-paper";
import merge from "deepmerge";
import { StatusBar } from "expo-status-bar";

const CombinedDarkTheme = merge(PaperDarkTheme, NavigationDarkTheme);

function App() {
  let isUserLoggedIn = false;
  return (
    <PaperProvider theme={{ ...CombinedDarkTheme, mode: "exact" }}>
      <StatusBar style="inverted" />
      <NavigationContainer theme={CombinedDarkTheme}>
        {!isUserLoggedIn && <SignedOutStack />}
      </NavigationContainer>
    </PaperProvider>
  );
}
export default registerRootComponent(App);
