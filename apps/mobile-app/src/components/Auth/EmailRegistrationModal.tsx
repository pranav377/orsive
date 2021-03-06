import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { useMemo } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { SLATE_900 } from "../Palette";

export default function EmailRegistrationModal(props: {
  modalRef: React.RefObject<BottomSheetModalMethods>;
}) {
  const snapPoints = useMemo(() => ["85%"], []);

  return (
    <BottomSheetModal
      ref={props.modalRef}
      snapPoints={snapPoints}
      backgroundStyle={{
        backgroundColor: SLATE_900,
      }}
      handleIndicatorStyle={{
        backgroundColor: "white",
      }}
    >
      <View
        style={{
          flex: 1,
          alignItems: "center",
        }}
      >
        <Text>Awesome 🎉</Text>
      </View>
    </BottomSheetModal>
  );
}
