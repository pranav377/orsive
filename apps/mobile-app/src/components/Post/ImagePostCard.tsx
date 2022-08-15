import { RFValue } from "react-native-responsive-fontsize";
import AvatarArea from "./AvatarArea";
import { TouchableRipple } from "react-native-paper";
import { Tailwind } from "@jeact/colors";
import { useNavigation } from "@react-navigation/native";
import Separator from "../Separator";
import postClickMiddleware from "../../logic/Posts/postClickMiddleware";
import RemoteImage from "../RemoteImage";
import { Dimensions } from "react-native";

export default function ImagePostCard(props: { post: any }) {
  const post = props.post;
  const image = post.image;
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
          postClickMiddleware(post.slug, post.post.uploadedBy);
          navigation.navigate("Image", {
            slug: post.slug,
          });
        }}
      >
        <>
          <AvatarArea uploadedBy={post.post.uploadedBy} />
          <RemoteImage
            uri={image}
            style={{
              aspectRatio: post.width / post.height,
              resizeMode: "contain",
              borderRadius: RFValue(10),
              maxHeight: Dimensions.get("window").height / 2,
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: RFValue(5),
            }}
          ></RemoteImage>
        </>
      </TouchableRipple>
      <Separator />
    </>
  );
}
