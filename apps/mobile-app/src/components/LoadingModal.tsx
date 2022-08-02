import { Subheading } from "react-native-paper";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Modal, View } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { SLATE_900 } from "./Palette";
import LottieView from "lottie-react-native";

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
            flex: 0.25,
            backgroundColor: SLATE_900,
            padding: RFValue(5),
            borderRadius: RFValue(15),
            alignItems: "center",
            justifyContent: "flex-end",
            width: "70%",
          }}
        >
          <LottieView
            source={require("./Animations/loading-animation.json")}
            autoPlay
            loop
          />
          <Subheading style={{ marginBottom: RFValue(10) }}>
            {loadingScreenState.loadingText}
          </Subheading>
        </View>
      </View>
    </Modal>
  );
}
