import { Tailwind } from "@jeact/colors";
import { Image, View } from "react-native";
import { Text, Menu } from "react-native-paper";
import { RFValue } from "react-native-responsive-fontsize";
import { UploadedBy } from "../types";
import { DotsVerticalIcon } from "react-native-heroicons/solid";
import { useState } from "react";
import urlParser from "../../logic/urlParser";

export default function AvatarArea(props: { uploadedBy: UploadedBy }) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginBottom: RFValue(10),
      }}
    >
      <Image
        source={{ uri: urlParser(props.uploadedBy.avatar) }}
        style={{
          width: RFValue(50),
          height: RFValue(50),
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
              fill="white"
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
