import { Image, KeyboardAvoidingView, View } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

export default function PostImage() {
  const image = useSelector((state: RootState) => state.postContent.image);

  return (
    <View
      style={{
        padding: RFValue(10),
      }}
    >
      <Image
        source={{
          uri: image.image.uri,
        }}
        style={{
          aspectRatio: image.width / image.height,
          resizeMode: "contain",
          borderRadius: RFValue(10),
          maxHeight: "100%",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      ></Image>
    </View>
  );
}
