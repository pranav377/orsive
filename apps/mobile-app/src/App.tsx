import { StatusBar } from "expo-status-bar";
import { Text, SafeAreaView } from "react-native";
import { registerRootComponent } from "expo";

function App() {
  return (
    <SafeAreaView>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar />
    </SafeAreaView>
  );
}
export default registerRootComponent(App);
