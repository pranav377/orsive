import { FlatList, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { FAB, Portal, Provider } from "react-native-paper";
import { useHome } from "../../../hooks/Home/useHome";
import OrsicPostCard from "../../../components/Post/OrsicPostCard";
import { PlusIcon, XIcon, NewspaperIcon } from "react-native-heroicons/solid";
import { PhotographIcon } from "react-native-heroicons/outline";
import { Tailwind } from "@jeact/colors";

export default function HomeMainScreen() {
  const { query, fabState, setFabState, navigate } = useHome();

  return (
    <View style={{ flex: 1 }}>
      {query.data && (
        <>
          <FlatList
            data={query.data.getPosts.data}
            renderItem={(props) => {
              return (
                <>
                  <OrsicPostCard post={props.item} />
                </>
              );
            }}
            keyExtractor={(item) => item.post.id}
          />
        </>
      )}

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
                    fill={color}
                    style={{
                      width: size,
                      height: size,
                    }}
                  />
                );
              } else {
                return (
                  <PlusIcon
                    fill={color}
                    style={{ width: size, height: size }}
                  />
                );
              }
            }}
            actions={[
              {
                icon: ({ size }) => (
                  <NewspaperIcon
                    fill={Tailwind.blue[700]}
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
                    fill={Tailwind.blue[700]}
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

      {query.loading && (
        <View
          style={{
            height: "100%",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator size="large" />
        </View>
      )}
    </View>
  );
}
