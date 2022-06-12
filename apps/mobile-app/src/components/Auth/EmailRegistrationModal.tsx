import { StyleSheet, View } from "react-native";
import Modal from "react-native-modal";
import { Text } from "react-native-paper";
import { RFValue } from "react-native-responsive-fontsize";

export default function EmailRegistrationModal(props: {
  isVisible: boolean;
  closeModal: () => void;
}) {
  return (
    <Modal
      isVisible={props.isVisible}
      swipeDirection={["down"]}
      onSwipeComplete={() => props.closeModal()}
      onBackdropPress={() => props.closeModal()}
      propagateSwipe
      style={styles.modal}
    >
      <View style={styles.scrollableModal}>
        <View style={{ alignItems: "center", padding: RFValue(10) }}>
          <View
            style={{
              backgroundColor: "gray",
              width: RFValue(40),
              height: RFValue(5),
              borderRadius: RFValue(20),
            }}
          />
        </View>
        <Text>Hello!</Text>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  scrollableModal: {
    flex: 0.8,
    backgroundColor: "#0f172a",
    borderTopLeftRadius: RFValue(20),
    borderTopRightRadius: RFValue(20),
    paddingLeft: RFValue(5),
    paddingRight: RFValue(5),
  },
});
