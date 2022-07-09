import { Dimensions, Image, View } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import AvatarArea from "./AvatarArea";
import RenderHtml from "react-native-render-html";

export default function OrsicPostCard(props: { post: any }) {
  const post = props.post;

  return (
    <View
      style={{
        padding: RFValue(5),
        marginVertical: RFValue(10),
      }}
    >
      <AvatarArea uploadedBy={post.post.uploadedBy} />
      <View
        style={{
          padding: RFValue(5),
          paddingTop: 0,
        }}
      >
        <RenderHtml
          contentWidth={Dimensions.get("window").width}
          source={{
            html: `<div style="color: white;">
          ${post.content}
          </div>`,
          }}
        />
      </View>
      {/* <Image
        source={{
          uri: "https://picsum.photos/1920/1080",
        }}
        style={{
          aspectRatio: 1920 / 1080,
          resizeMode: "contain",
          borderRadius: RFValue(10),
        }}
      ></Image> */}
    </View>
  );
}
