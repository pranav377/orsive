import { Dimensions, StatusBar, View } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { Bar as ProgressBar } from "react-native-progress";
import { Tailwind } from "@jeact/colors";
import { ArrowRightIcon } from "react-native-heroicons/solid";
import { IconButton, TextInput } from "react-native-paper";
import { StackActions, useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { PostContentActions } from "../../store/slices/PostContent/postContentSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import postImageHandler from "../../logic/PostContent/postImageHandler";
import { useToast } from "react-native-toast-notifications";
import postClickMiddleware from "../../logic/Posts/postClickMiddleware";
import { useUser } from "../../hooks/Auth/useUser";

export default function PostImageHeader() {
  const navigator = useNavigation();
  const [progressBarVisible, setProgressBarVisible] = useState(false);
  const dispatch = useDispatch();
  const image = useSelector((state: RootState) => state.postContent.image);
  const toast = useToast();
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
              width: "80%",
              marginLeft: RFValue(5),
              height: RFValue(45),
            }}
            placeholder="Description (optional)"
            value={image.title || ""}
            onChangeText={(description) => {
              dispatch(PostContentActions.setImage({ title: description }));
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
              setProgressBarVisible(true);
              postImageHandler()
                .then((result) => {
                  toast.show("Posted Image", {
                    type: "success",
                  });
                  let slug = result.data.addImagePost.slug;

                  postClickMiddleware(slug, user);
                  navigator.dispatch(
                    StackActions.replace("Image", {
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
