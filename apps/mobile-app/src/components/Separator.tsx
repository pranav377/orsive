import { StyleSheet, View } from "react-native";
import { SLATE_900 } from "./Palette";

export default function Separator() {
  return (
    <View
      style={{
        borderBottomColor: SLATE_900,
        borderBottomWidth: StyleSheet.hairlineWidth,
      }}
    />
  );
}
