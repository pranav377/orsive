import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/SignedInStack/HomeScreen";
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
      </Stack.Navigator>
    </>
  );
}

export default SignedInStack;
