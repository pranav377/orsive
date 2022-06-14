import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { useMemo } from "react";
import { View } from "react-native";
import { Button, Subheading } from "react-native-paper";
import { Formik } from "formik";
import { LOGIN_SCHEMA } from "../../../../../packages/common/forms";
import { RFValue } from "react-native-responsive-fontsize";
import { BottomSheetTextFormInput } from "../FormComponents/TextFormInput";
import LoginSVG from "./svgs/login.svg";
import { useDispatch } from "react-redux";
import { AppStateActions } from "../../store/slices/appSlice";

export default function EmailLoginModal(props: {
  modalRef: React.RefObject<BottomSheetModalMethods>;
}) {
  const snapPoints = useMemo(() => ["100%"], []);
  const dispatch = useDispatch();

  return (
    <BottomSheetModal
      ref={props.modalRef}
      snapPoints={snapPoints}
      backgroundStyle={{
        backgroundColor: "#0f172a",
      }}
      handleIndicatorStyle={{
        backgroundColor: "white",
      }}
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
              AppStateActions.showLoadingScreen({
                message: "Logging in...",
              })
            );
            setTimeout(() => {
              dispatch(AppStateActions.closeLoadingScreen());
            }, 10000);
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
                Submit
              </Button>
            </View>
          )}
        </Formik>
      </View>
    </BottomSheetModal>
  );
}
