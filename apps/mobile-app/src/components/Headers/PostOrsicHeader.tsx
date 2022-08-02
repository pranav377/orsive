import { Tailwind } from "@jeact/colors";
import { useNavigation } from "@react-navigation/native";
import {
  Dimensions,
  Keyboard,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { ArrowRightIcon, XIcon } from "react-native-heroicons/solid";
import { IconButton, TextInput } from "react-native-paper";
import { RFValue } from "react-native-responsive-fontsize";
import { useToast } from "react-native-toast-notifications";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import postOrsicHandler from "../../logic/PostContent/postOrsicHandler";
import { RootState } from "../../store";
import { PostContentActions } from "../../store/slices/PostContent/postContentSlice";
import { Bar as ProgressBar } from "react-native-progress";
import { useState } from "react";

export default function PostOrsicHeader() {
  const navigator = useNavigation();
  const dispatch = useDispatch();
  const orsic = useSelector((state: RootState) => state.postContent.orsic);
  const toast = useToast();
  const [progressBarVisible, setProgressBarVisible] = useState(false);

  return (
    <>
      <View
        style={{
          marginTop: StatusBar.currentHeight,
          padding: RFValue(5),
        }}
      >
        {progressBarVisible ? (
          <ProgressBar
            indeterminate
            width={Dimensions.get("window").width}
            borderWidth={0}
            borderRadius={0}
            unfilledColor={Tailwind.blue[400]}
            color={Tailwind.blue[700]}
          />
        ) : (
          <View style={{ height: 6 }} />
        )}
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <XIcon
            onPress={() => {
              navigator.goBack();
            }}
            width={RFValue(25)}
            height={RFValue(25)}
            color="white"
          />

          <TextInput
            mode="flat"
            style={{
              width: "80%",
              marginLeft: RFValue(5),
              height: RFValue(45),
            }}
            placeholder="Title (optional)"
            value={orsic.title || ""}
            onChangeText={(title) => {
              dispatch(PostContentActions.setOrsic({ title }));
            }}
          />

          <IconButton
            icon={({ size, color }) => (
              <View
                style={{
                  backgroundColor: Tailwind.blue[600],
                  padding: RFValue(10),
                  borderRadius: RFValue(99),
                }}
              >
                <ArrowRightIcon size={size} color={color} />
              </View>
            )}
            size={RFValue(20)}
            style={{ marginLeft: "auto" }}
            onPress={() => {
              Keyboard.dismiss();
              setProgressBarVisible(true);
              postOrsicHandler()
                .then(() => {
                  toast.show("Posted Orsic", {
                    type: "success",
                  });
                })
                .catch((err) => {
                  toast.show("Something went wrong. Try again", {
                    type: "danger",
                  });
                })
                .finally(() => {
                  setProgressBarVisible(false);
                });
            }}
          />
        </View>
      </View>
    </>
  );
}
