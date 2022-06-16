import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import { Logout } from "../../logic/Auth/Logout";

export default function HomeScreen() {
  return (
    <View style={{ flex: 1 }}>
      <Text>hello from home screen</Text>
      <Button
        mode="contained"
        onPress={() => {
          Logout();
        }}
      >
        Logout
      </Button>
    </View>
  );
}
