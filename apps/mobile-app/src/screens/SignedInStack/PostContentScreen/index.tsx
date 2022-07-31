import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { memo } from "react";
import PostOrsicHeader from "../../../components/Headers/PostOrsicHeader";
import PostImage from "./PostImage";
import PostOrsic from "./PostOrsic";

const Stack = createNativeStackNavigator();

function PostContentScreenComponent() {
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
            header: PostOrsicHeader,
          }}
        />
        <Stack.Screen name="Image" component={PostImage} />
      </Stack.Navigator>
    </>
  );
}

const PostContentScreen = memo(PostContentScreenComponent);

export default PostContentScreen;
