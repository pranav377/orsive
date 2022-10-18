import { Dispatch, SetStateAction } from "react";
import Button from "../../base/button";
import { Formik, Form } from "formik";
import InputField from "../fields/inputField";
import toast from "react-hot-toast";
import { PASSWORD_RESET_STEP_1_SCHEMA } from "./schema/passwordResetStep1";
import getPasswordResetOTP from "../../../app/auth/getPasswordResetOTP";

export default function SignUpStep1(props: {
  setPasswordResetFormState: Dispatch<
    SetStateAction<{
      step: number;
      otp: string;
      email: string;
      new_password: string;
    }>
  >;
}) {
  return (
    <>
      <Formik
        initialValues={{ email: "" }}
        validationSchema={PASSWORD_RESET_STEP_1_SCHEMA}
        onSubmit={(values, { setSubmitting }) => {
          getPasswordResetOTP(values.email)
            .then((response) => {
              props.setPasswordResetFormState((prevState) => {
                return {
                  ...prevState,
                  step: 2,
                  email: values.email,
                };
              });
            })
            .catch(() => {
              toast.error("Something went wrong. Try again");
            })
            .finally(() => setSubmitting(false));
        }}
      >
        {({ isSubmitting, handleSubmit, errors }: any) => (
          <Form onSubmit={handleSubmit}>
            <InputField type="email" name="email" label="Email" />
            <Button
              type="submit"
              disabled={isSubmitting || errors.email}
              className="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue ripple-bg-blue-700 disabled:cursor-not-allowed"
            >
              Next
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
}
