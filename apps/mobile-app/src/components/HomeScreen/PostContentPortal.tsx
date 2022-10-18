import { Tailwind } from "@jeact/colors";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  NewspaperIcon,
  PhotographIcon,
  PlusIcon,
  XIcon,
} from "react-native-heroicons/solid";
import { FAB, Portal, Provider } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { useDispatch } from "react-redux";
import { PostContentActions } from "../../store/slices/PostContent/postContentSlice";

function PostContentPortal() {
  const [fabState, setFabState] = useState({ open: false });
  const { navigate } = useNavigation();
  const dispatch = useDispatch();

  return (
    <Provider>
      <Portal>
        <FAB.Group
          visible
          fabStyle={{
            backgroundColor: Tailwind.blue[700],
          }}
          open={fabState.open}
          icon={({ size, color }) => {
            if (fabState.open) {
              return (
                <XIcon
                  color={color}
                  style={{
                    width: size,
                    height: size,
                  }}
                />
              );
            } else {
              return (
                <PlusIcon color={color} style={{ width: size, height: size }} />
              );
            }
          }}
          actions={[
            {
              icon: ({ size }) => (
                <NewspaperIcon
                  color={Tailwind.blue[700]}
                  width={size}
                  height={size}
                />
              ),
              label: "Orsic",
              onPress: () => {
                navigate("PostContent", { screen: "PostOrsic" });
              },
            },
            {
              icon: ({ size }) => (
                <PhotographIcon
                  color={Tailwind.blue[700]}
                  width={size}
                  height={size}
                />
              ),
              label: "Image",
              onPress: async () => {
                let imageData = await ImagePicker.launchImageLibraryAsync({
                  mediaTypes: ImagePicker.MediaTypeOptions.Images,
                });

                if (!imageData.cancelled) {
                  let uri = imageData.uri;
                  let imageName = uri.substring(uri.lastIndexOf("/") + 1);
                  dispatch(
                    PostContentActions.setImage({
                      image: {
                        uri: uri,
                        name: imageName,
                      },
                      width: imageData.width,
                      height: imageData.height,
                    })
                  );

                  navigate("PostContent", {
                    screen: "PostImage",
                  });
                }
              },
            },
          ]}
          onStateChange={({ open }) => {
            setFabState({ open: open });
          }}
        />
      </Portal>
    </Provider>
  );
}

export default React.memo(PostContentPortal);
