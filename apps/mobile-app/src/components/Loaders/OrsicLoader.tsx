import { View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

export default function OrsicLoader() {
  return (
    <>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
        }}
      >
        <ActivityIndicator size={"large"} />
      </View>
    </>
  );
}
