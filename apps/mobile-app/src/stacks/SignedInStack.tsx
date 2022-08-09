import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View } from "react-native";
import { Subheading } from "react-native-paper";
import HomeScreen from "../screens/SignedInStack/HomeScreen";
import ImageScreen from "../screens/SignedInStack/ImageScreen";
import OrsicScreen from "../screens/SignedInStack/OrsicScreen";
import PostContentScreen from "../screens/SignedInStack/PostContentScreen";
const Stack = createNativeStackNavigator();

function SignedInStack() {
  return (
    <>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="PostContent"
          component={PostContentScreen}
          options={{
            animation: "slide_from_left",
          }}
        />
        <Stack.Screen
          name="Orsic"
          component={OrsicScreen}
          options={{
            animation: "slide_from_bottom",
          }}
        />
        <Stack.Screen
          name="Image"
          component={ImageScreen}
          options={{
            animation: "slide_from_bottom",
          }}
        />
      </Stack.Navigator>
    </>
  );
}

export default SignedInStack;
