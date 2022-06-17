import { Image, View } from "react-native";
import { DrawerLayoutAndroid } from "react-native";
import { Appbar, Avatar, TouchableRipple } from "react-native-paper";
import { RFValue } from "react-native-responsive-fontsize";
import { SLATE_900 } from "../Palette";

export default function HomeBar(props: {
  drawer: React.RefObject<DrawerLayoutAndroid>;
}) {
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
          <Avatar.Image
            size={RFValue(36)}
            source={{
              uri: "https://avatars0.githubusercontent.com/u/17571969?v=3&s=400",
            }}
          />
        </TouchableRipple>
      </View>
    </Appbar.Header>
  );
}
