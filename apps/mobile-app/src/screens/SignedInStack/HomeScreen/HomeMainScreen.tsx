import { FlatList, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { useHome } from "../../../hooks/Home/useHome";
import OrsicPostCard from "../../../components/Post/OrsicPostCard";
import PostContentPortal from "../../../components/HomeScreen/PostContentPortal";
import ImagePostCard from "../../../components/Post/ImagePostCard";
import { memo } from "react";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

function HomeMainScreenComponent() {
  const { query } = useHome();

  return (
    <BottomSheetModalProvider>
      <View style={{ flex: 1 }}>
        {query.data && (
          <>
            <FlatList
              data={query.data.getPosts.data}
              renderItem={(props) => {
                let post = props.item;
                if (post.__typename === "Orsic") {
                  return (
                    <>
                      <OrsicPostCard post={post} />
                    </>
                  );
                } else if (post.__typename === "Image") {
                  return (
                    <>
                      <ImagePostCard post={post} />
                    </>
                  );
                } else return null;
              }}
              keyExtractor={(item) => item.post.id}
            />
          </>
        )}

        <PostContentPortal />

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
    </BottomSheetModalProvider>
  );
}

const HomeMainScreen = memo(HomeMainScreenComponent);
export default HomeMainScreen;
