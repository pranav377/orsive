import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { memo, useRef } from "react";
import { RichEditor } from "react-native-pell-rich-editor";
import PostImageHeader from "../../../components/Headers/PostImageHeader";
import PostOrsicHeader from "../../../components/Headers/PostOrsicHeader";
import PostImage from "./PostImage";
import PostOrsicComponent from "./PostOrsic";

const Stack = createNativeStackNavigator();

function PostContentScreenComponent() {
  const editor = useRef<RichEditor>(null);
  const PostOrsic = memo(() => <PostOrsicComponent editor={editor} />);

  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="PostOrsic"
          component={PostOrsic}
          options={{
            headerShown: true,
            header: () => <PostOrsicHeader editor={editor} />,
          }}
        />
        <Stack.Screen
          name="PostImage"
          component={PostImage}
          options={{
            headerShown: true,
            header: () => <PostImageHeader />,
          }}
        />
      </Stack.Navigator>
    </>
  );
}

const PostContentScreen = memo(PostContentScreenComponent);

export default PostContentScreen;
