import { StyleSheet } from "react-native";
import { Appbar } from "react-native-paper";

export default function BaseBar() {
  return (
    <Appbar.Header style={styles.header}>
      <></>
    </Appbar.Header>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "black",
    justifyContent: "center",
  },
});
