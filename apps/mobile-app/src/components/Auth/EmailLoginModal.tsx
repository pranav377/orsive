import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { useMemo } from "react";
import { View } from "react-native";
import { Button, Subheading, TextInput } from "react-native-paper";
import { Formik } from "formik";
import { LOGIN_SCHEMA } from "../../../../../packages/validation-schemas";
import { RFValue } from "react-native-responsive-fontsize";
import TextFormInput from "../FormComponents/TextFormInput";

export default function EmailLoginModal(props: {
  modalRef: React.RefObject<BottomSheetModalMethods>;
}) {
  const snapPoints = useMemo(() => ["85%"], []);

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
          flex: 1,
          alignItems: "center",
        }}
      >
        <Subheading>Login with Email</Subheading>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={() => {}}
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
              <TextFormInput
                errors={errors}
                values={values}
                label="Email"
                name="email"
                handleBlur={handleBlur}
                handleChange={handleChange}
              />
              <TextFormInput
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
