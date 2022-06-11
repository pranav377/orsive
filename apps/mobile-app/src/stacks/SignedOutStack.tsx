import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BaseBar from "../components/Headers/NullBar";
import AuthScreen from "../screens/AuthScreen";

const Stack = createNativeStackNavigator();

function SignedOutStack() {
  return (
    <>
      <Stack.Navigator
        screenOptions={{
          header: () => <BaseBar />,
        }}
        initialRouteName="Auth"
      >
        <Stack.Screen name="Auth" component={AuthScreen} />
      </Stack.Navigator>
    </>
  );
}

export default SignedOutStack;
