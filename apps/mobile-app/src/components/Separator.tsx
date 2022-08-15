import { StyleSheet, View } from "react-native";
import { SLATE_900 } from "./Palette";

export default function Separator(props: { color?: string }) {
  return (
    <View
      style={{
        borderBottomColor: props.color || SLATE_900,
        borderBottomWidth: StyleSheet.hairlineWidth,
      }}
    />
  );
}
