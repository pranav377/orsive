import { Dispatch, SetStateAction } from "react";
import Button from "../../base/button";
import { Formik, Form } from "formik";
import InputField from "../fields/inputField";
import OTPButton from "./subcomponents/otpButton";
import toast from "react-hot-toast";
import { PASSWORD_RESET_STEP_2_SCHEMA } from "./schema/passwordResetStep2";
import PasswordReset from "../../../app/auth/passwordReset";

export default function PasswordResetStep2(props: {
  passwordResetFormState: {
    step: number;
    otp: string;
    email: string;
    new_password: string;
  };
  setPasswordResetFormState: Dispatch<
    SetStateAction<{
      step: number;
      otp: string;
      email: string;
      new_password: string;
    }>
  >;
  setCurrPage: any;
}) {
  return (
    <Formik
      initialValues={{ otp: "", new_password: "" }}
      validationSchema={PASSWORD_RESET_STEP_2_SCHEMA}
      onSubmit={(data, { setSubmitting, setErrors }) => {
        props.setPasswordResetFormState((prevState) => {
          const newState = {
            ...prevState,
            new_password: data.new_password,
            otp: data.otp,
          };

          toast
            .promise(PasswordReset(newState), {
              loading: "Signing Up.....",
              error: "OTP is not valid!😑",
              success:
                "Password reset successful. Please Sign in with your new password",
            })
            .then(() => {
              props.setCurrPage("login");
            })
            .catch((err) => {
              console.error(err);
              setErrors({
                otp: "OTP is not valid",
              });
            });

          setSubmitting(false);

          return newState;
        });
      }}
    >
      {({ isSubmitting, handleSubmit, errors }: any) => (
        <Form onSubmit={handleSubmit}>
          <InputField type="text" name="otp" label="OTP" />
          <OTPButton email={props.passwordResetFormState.email} />
          <InputField
            type="password"
            name="new_password"
            label="New Password"
          />

          <Button
            type="submit"
            disabled={isSubmitting || errors.otp || errors.new_password}
            className="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue ripple-bg-blue-700 disabled:cursor-not-allowed"
          >
            Reset Password
          </Button>
        </Form>
      )}
    </Formik>
  );
}
