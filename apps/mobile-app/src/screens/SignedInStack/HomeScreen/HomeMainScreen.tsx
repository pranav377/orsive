import { FlatList, View, Image } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";
import { RFValue } from "react-native-responsive-fontsize";
import { SLATE_900 } from "../../../components/Palette";
import { useHome } from "../../../hooks/Home/useHome";
import { Dimensions } from "react-native";
import AvatarArea from "../../../components/Post/AvatarArea";
import OrsicPostCard from "../../../components/Post/OrsicPostCard";

export default function HomeMainScreen() {
  const { query } = useHome();

  return (
    <View style={{ flex: 1 }}>
      {query.data && (
        <FlatList
          data={query.data.getPosts.data}
          renderItem={(props) => (
            <>
              <OrsicPostCard post />
            </>
          )}
          keyExtractor={(item) => item.post.id}
        />
      )}
      {query.loading && (
        <View style={{ flex: !query.data ? 1 : 0.2, justifyContent: "center" }}>
          <ActivityIndicator size="large" />
        </View>
      )}
    </View>
  );
}
