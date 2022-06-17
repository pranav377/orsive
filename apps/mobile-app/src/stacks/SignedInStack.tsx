import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/SignedInStack/HomeScreen";
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
      </Stack.Navigator>
    </>
  );
}

export default SignedInStack;
