import { Image, View } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import AvatarArea from "./AvatarArea";

export default function OrsicPostCard(props: { post: any }) {
  return (
    <View
      style={{
        padding: RFValue(5),
        marginVertical: RFValue(10),
      }}
    >
      <AvatarArea
        uploadedBy={{
          avatar: `https://picsum.photos/1920/1080`,
          bio: "hello",
          name: "Pranava Mohan",
          username: "pranav377",
        }}
      />
      <Image
        source={{
          uri: "https://picsum.photos/1920/1080",
        }}
        style={{
          aspectRatio: 1920 / 1080,
          resizeMode: "contain",
          borderRadius: RFValue(10),
        }}
      ></Image>
    </View>
  );
}
