import { StyleSheet, View } from "react-native";
import {
  ChatIcon,
  ThumbDownIcon,
  ThumbUpIcon,
  ShareIcon,
} from "react-native-heroicons/outline";
import {
  ThumbUpIcon as ThumbUpSolidIcon,
  ThumbDownIcon as ThumbDownSolidIcon,
} from "react-native-heroicons/solid";
import { RFValue } from "react-native-responsive-fontsize";
import { Tailwind } from "@jeact/colors";
import AnimatedButton from "./AnimatedButton";
import { useNavigation } from "@react-navigation/native";
import { useRef } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import CommentsModal from "./CommentsModal";

export default function ExtraButtons() {
  const ButtonSize = RFValue(25);
  const commentsModal = useRef<BottomSheetModal>(null);

  return (
    <>
      <View style={ExtraButtonsStyles.container}>
        <View style={ExtraButtonsStyles.button}>
          <AnimatedButton
            beforeButton={<ThumbUpIcon size={ButtonSize} color="white" />}
            afterButton={
              <ThumbUpSolidIcon size={ButtonSize} color={Tailwind.blue[700]} />
            }
          />
        </View>
        <View style={ExtraButtonsStyles.button}>
          <AnimatedButton
            beforeButton={<ThumbDownIcon size={ButtonSize} color="white" />}
            afterButton={
              <ThumbDownSolidIcon size={ButtonSize} color={Tailwind.red[700]} />
            }
          />
        </View>
        <View style={ExtraButtonsStyles.button}>
          <ChatIcon
            onPress={() => {
              commentsModal.current?.present();
            }}
            size={ButtonSize}
            color="white"
          />
        </View>
        <View style={ExtraButtonsStyles.button}>
          <ShareIcon size={ButtonSize} color="white" />
        </View>
      </View>
      <CommentsModal modalRef={commentsModal} />
    </>
  );
}

const ExtraButtonsStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flex: 1,
    marginTop: RFValue(10),
  },
  button: {
    flex: 0.25,
    alignItems: "center",
  },
});
