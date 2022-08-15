import { Tailwind } from "@jeact/colors";
import { StackActions, useNavigation } from "@react-navigation/native";
import { Dimensions, StatusBar, View } from "react-native";
import { ArrowRightIcon, ChevronDownIcon } from "react-native-heroicons/solid";
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
import { useUser } from "../../hooks/Auth/useUser";
import postClickMiddleware from "../../logic/Posts/postClickMiddleware";
import { RichEditor } from "react-native-pell-rich-editor";

export default function PostOrsicHeader(props: {
  editor: React.RefObject<RichEditor>;
}) {
  const navigator = useNavigation();
  const dispatch = useDispatch();
  const orsic = useSelector((state: RootState) => state.postContent.orsic);
  const toast = useToast();
  const [progressBarVisible, setProgressBarVisible] = useState(false);
  const user = useUser();

  return (
    <>
      <View
        style={{
          marginTop: StatusBar.currentHeight,
          padding: RFValue(5),
        }}
      >
        <View
          style={{
            width: "20%",
            height: RFValue(5),
            backgroundColor: "white",
            marginRight: "auto",
            marginLeft: "auto",
            borderRadius: RFValue(10),
            marginBottom: RFValue(5),
          }}
        />
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
          <TextInput
            mode="flat"
            style={{
              width: "85%",
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
              props.editor.current?.dismissKeyboard();
              setProgressBarVisible(true);
              postOrsicHandler()
                .then((result) => {
                  props.editor.current?.setContentHTML("");
                  toast.show("Posted Orsic", {
                    type: "success",
                  });
                  let slug = result.data.addOrsicPost.slug;

                  postClickMiddleware(slug, user);
                  navigator.dispatch(
                    StackActions.replace("Orsic", {
                      slug,
                    })
                  );
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
