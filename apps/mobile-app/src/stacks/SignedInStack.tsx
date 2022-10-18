import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import HomeScreen from "../screens/SignedInStack/HomeScreen";
import ImageScreen from "../screens/SignedInStack/ImageScreen";
import OrsicScreen from "../screens/SignedInStack/OrsicScreen";
import PostContentScreen from "../screens/SignedInStack/PostContentScreen";
const Stack = createStackNavigator();

const ContentScreenOptions = {
  ...TransitionPresets.SlideFromRightIOS,
  gestureEnabled: true,
};

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
            ...TransitionPresets.ModalSlideFromBottomIOS,
            gestureEnabled: true,
          }}
        />
        <Stack.Screen
          name="Orsic"
          component={OrsicScreen}
          options={ContentScreenOptions}
        />
        <Stack.Screen
          name="Image"
          component={ImageScreen}
          options={ContentScreenOptions}
        />
      </Stack.Navigator>
    </>
  );
}

export default SignedInStack;
