import { Subheading } from "react-native-paper";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Modal, View, ActivityIndicator } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

export default function LoadingModal() {
  const loadingScreenState = useSelector(
    (state: RootState) => state.loadingScreen
  );

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={loadingScreenState.showLoadingScreen}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.7)",
        }}
      >
        <View
          style={{
            flex: 0.3,
            backgroundColor: "#0f172a",
            padding: RFValue(5),
            borderRadius: RFValue(15),
            alignItems: "center",
            justifyContent: "center",
            width: "70%",
          }}
        >
          <ActivityIndicator size="large" />
          <Subheading>{loadingScreenState.loadingText}</Subheading>
        </View>
      </View>
    </Modal>
  );
}
