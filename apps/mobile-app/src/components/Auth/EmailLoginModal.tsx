import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { useMemo } from "react";
import { View } from "react-native";
import { Button, Subheading } from "react-native-paper";
import { Formik } from "formik";
import { LOGIN_SCHEMA } from "../../../../../packages/common/forms";
import { RFValue } from "react-native-responsive-fontsize";
import LoginSVG from "./svgs/login.svg";
import { useDispatch } from "react-redux";
import { LoadingScreenActions } from "../../store/slices/app/loadingScreenSlice";
import { BottomSheetTextFormInput } from "../FormComponents/TextFormInput";
import SignIn from "../../logic/Auth/SignIn";
import { useToast } from "react-native-toast-notifications";
import { SLATE_900 } from "../Palette";

export default function EmailLoginModal(props: {
  modalRef: React.RefObject<BottomSheetModalMethods>;
}) {
  const snapPoints = useMemo(() => ["100%"], []);
  const dispatch = useDispatch();
  const toast = useToast();

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
      android_keyboardInputMode="adjustResize"
    >
      <View
        style={{
          alignItems: "center",
          flex: 1,
        }}
      >
        <Subheading style={{ margin: RFValue(5) }}>Login with Email</Subheading>
        <LoginSVG style={{ width: "50%", height: "50%" }} />
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={(values, { setSubmitting }) => {
            dispatch(
              LoadingScreenActions.showLoadingScreen({
                message: "Logging in...",
              })
            );

            SignIn(values)
              .then(() => {
                toast.show("Signed in Successfully", {
                  type: "success",
                });
              })
              .catch(() => {
                toast.show("Something went wrong. Try again", {
                  type: "danger",
                });
              })
              .finally(() => {
                dispatch(LoadingScreenActions.closeLoadingScreen());
              });

            setSubmitting(false);
          }}
          validationSchema={LOGIN_SCHEMA}
        >
          {({
            isSubmitting,
            handleSubmit,
            errors,
            handleChange,
            handleBlur,
            values,
          }) => (
            <View style={{ padding: RFValue(7), width: "100%" }}>
              <BottomSheetTextFormInput
                errors={errors}
                values={values}
                label="Email"
                name="email"
                handleBlur={handleBlur}
                handleChange={handleChange}
                textInputProps={{
                  keyboardType: "email-address",
                }}
              />
              <BottomSheetTextFormInput
                errors={errors}
                values={values}
                label="Password"
                name="password"
                handleBlur={handleBlur}
                handleChange={handleChange}
                textInputProps={{
                  secureTextEntry: true,
                  style: { marginTop: RFValue(4) },
                }}
              />
              <Button
                disabled={!!errors.email || !!errors.password || isSubmitting}
                mode="contained"
                onPress={handleSubmit}
                style={{ marginTop: RFValue(10), borderRadius: RFValue(15) }}
              >
                Login
              </Button>
            </View>
          )}
        </Formik>
      </View>
    </BottomSheetModal>
  );
}
