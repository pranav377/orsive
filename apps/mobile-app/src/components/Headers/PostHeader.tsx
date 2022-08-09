import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";
import { ChevronDownIcon } from "react-native-heroicons/solid";
import { Appbar, Title } from "react-native-paper";
import { RFValue } from "react-native-responsive-fontsize";
import { SLATE_900 } from "../Palette";
import Separator from "../Separator";

export default function PostHeader(props: { displayName: string }) {
  const navigator = useNavigation();

  return (
    <Appbar.Header
      style={{
        backgroundColor: SLATE_900,
      }}
    >
      <View
        style={{
          padding: RFValue(5),
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <ChevronDownIcon
          onPress={() => {
            navigator.goBack();
          }}
          fill="white"
          size={RFValue(25)}
        />
        <Title style={{ color: "white", marginLeft: RFValue(10) }}>
          {props.displayName}
        </Title>
      </View>
      <Separator />
    </Appbar.Header>
  );
}
