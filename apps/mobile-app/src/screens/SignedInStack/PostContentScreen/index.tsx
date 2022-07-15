import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar, View } from "react-native";
import { XIcon } from "react-native-heroicons/solid";
import { RFValue } from "react-native-responsive-fontsize";
import PostImage from "./PostImage";
import PostOrsic from "./PostOrsic";

const Stack = createNativeStackNavigator();

function PostContentScreen() {
  const navigator = useNavigation();
  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="Orsic"
          component={PostOrsic}
          options={{
            headerShown: true,
            header: () => {
              return (
                <View
                  style={{
                    marginTop: StatusBar.currentHeight,
                    padding: RFValue(5),
                  }}
                >
                  <XIcon
                    onPress={() => {
                      navigator.goBack();
                    }}
                    width={RFValue(25)}
                    height={RFValue(25)}
                    color="white"
                  />
                </View>
              );
            },
          }}
        />
        <Stack.Screen name="Image" component={PostImage} />
      </Stack.Navigator>
    </>
  );
}

export default PostContentScreen;
