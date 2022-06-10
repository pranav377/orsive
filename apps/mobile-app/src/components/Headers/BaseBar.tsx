import { Image, StyleSheet, View } from "react-native";
import { Appbar } from "react-native-paper";

export default function BaseBar() {
  return (
    <Appbar.Header style={styles.header}>
      <Image
        source={require("../../../assets/logo.png")}
        style={{ width: 50, height: 50 }}
      />
    </Appbar.Header>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "black",
    justifyContent: "center",
  },
});
