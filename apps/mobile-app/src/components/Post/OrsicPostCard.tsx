import { Dimensions, View } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import AvatarArea from "./AvatarArea";
import RenderHtml from "react-native-render-html";
import { TouchableRipple } from "react-native-paper";
import { Tailwind } from "@jeact/colors";
import { useNavigation } from "@react-navigation/native";
import Separator from "../Separator";
import postClickMiddleware from "../../logic/Posts/postClickMiddleware";
import ExtraButtons from "../ExtraButtons";

export default function OrsicPostCard(props: { post: any }) {
  const post = props.post;
  const navigation = useNavigation();

  return (
    <>
      <TouchableRipple
        style={{
          padding: RFValue(5),
          marginVertical: RFValue(10),
        }}
        rippleColor={Tailwind.gray[900]}
        onPress={() => {
          postClickMiddleware(post.slug, post.post.uploadedBy, post.post.id);
          navigation.navigate("Orsic", {
            slug: post.slug,
          });
        }}
      >
        <>
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
          <ExtraButtons />
        </>
      </TouchableRipple>
      <Separator />
    </>
  );
}
