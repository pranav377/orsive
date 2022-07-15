import { FlatList, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { useHome } from "../../../hooks/Home/useHome";
import OrsicPostCard from "../../../components/Post/OrsicPostCard";
import PostContentPortal from "../../../components/HomeScreen/PostContentPortal";

export default function HomeMainScreen() {
  const { query } = useHome();

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
  );
}
