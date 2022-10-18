import { View } from "react-native";
import { Title } from "react-native-paper";
import { RFValue } from "react-native-responsive-fontsize";
import Separator from "../../Separator";

export default function CommentsHome() {
  return (
    <View style={{ padding: RFValue(5) }}>
      <Title style={{ alignSelf: "center" }}>Comments</Title>
      <Separator color="black" />
    </View>
  );
}
