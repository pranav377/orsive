import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthScreen from "../screens/SignedOutStack/AuthScreen";

const Stack = createNativeStackNavigator();

function SignedOutStack() {
  return (
    <>
      <Stack.Navigator
        screenOptions={{
          header: () => <></>,
        }}
        initialRouteName="Auth"
      >
        <Stack.Screen name="Auth" component={AuthScreen} />
      </Stack.Navigator>
    </>
  );
}

export default SignedOutStack;
