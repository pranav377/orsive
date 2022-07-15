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

function PostContentPortal() {
  const [fabState, setFabState] = useState({ open: false });
  const { navigate } = useNavigation();

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
                navigate("PostContent", { screen: "Orsic" });
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
              onPress: () => console.log("Pressed notifications"),
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
