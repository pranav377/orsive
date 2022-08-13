import { Tailwind } from "@jeact/colors";
import { Image, StyleProp, View, ViewStyle } from "react-native";
import { Text, Menu } from "react-native-paper";
import { RFValue } from "react-native-responsive-fontsize";
import { UploadedBy } from "../types";
import { DotsVerticalIcon } from "react-native-heroicons/solid";
import { memo, useState } from "react";
import RemoteImage from "../RemoteImage";

function AvatarAreaComponent(props: {
  uploadedBy: UploadedBy;
  style?: StyleProp<ViewStyle>;
}) {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <View
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
        },
        props.style,
      ]}
    >
      <RemoteImage
        width={RFValue(50)}
        height={RFValue(50)}
        uri={props.uploadedBy.avatar}
        style={{
          borderRadius: RFValue(25),
        }}
      />
      <View style={{ marginLeft: RFValue(5) }}>
        <Text style={{ fontSize: RFValue(15) }}>{props.uploadedBy.name}</Text>
        <Text style={{ color: Tailwind.gray[700] }}>
          ${props.uploadedBy.username}
        </Text>
      </View>

      <View style={{ marginLeft: "auto", marginRight: RFValue(5) }}>
        <Menu
          visible={showMenu}
          onDismiss={function () {
            setShowMenu(false);
          }}
          anchor={
            <DotsVerticalIcon
              onPress={() => {
                setShowMenu(true);
              }}
              color="white"
            />
          }
        >
          <Menu.Item onPress={() => {}} title="Item 1" />
          <Menu.Item onPress={() => {}} title="Item 2" />
          <Menu.Item onPress={() => {}} title="Item 3" />
        </Menu>
      </View>
    </View>
  );
}

const AvatarArea = memo(AvatarAreaComponent);
export default AvatarArea;