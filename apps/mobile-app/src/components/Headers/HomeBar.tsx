import { Image, View } from "react-native";
import { DrawerLayoutAndroid } from "react-native";
import { Appbar, Avatar, Text, TouchableRipple } from "react-native-paper";
import { RFValue } from "react-native-responsive-fontsize";
import { useUser } from "../../hooks/Auth/useUser";
import urlParser from "../../logic/urlParser";
import { SLATE_900 } from "../Palette";
import RemoteImage from "../RemoteImage";

export default function HomeBar(props: {
  drawer: React.RefObject<DrawerLayoutAndroid>;
}) {
  const user = useUser();
  let avatar = urlParser(user.avatar);
  return (
    <Appbar.Header
      style={{
        backgroundColor: SLATE_900,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: RFValue(5),
          width: "100%",
          alignItems: "center",
        }}
      >
        <Image
          source={require("../../../assets/logo.png")}
          style={{
            width: RFValue(29),
            height: RFValue(29),
          }}
        />
        <TouchableRipple
          onPress={() => {
            props.drawer.current?.openDrawer();
          }}
          style={{
            marginLeft: "auto",
            borderRadius: RFValue(50),
          }}
          borderless
        >
          <RemoteImage height={RFValue(36)} width={RFValue(36)} uri={avatar} />
        </TouchableRipple>
      </View>
    </Appbar.Header>
  );
}
