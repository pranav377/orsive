import { Dispatch, SetStateAction } from "react";
import Button from "../../base/button";
import { Formik, Form } from "formik";
import { SIGN_UP_STEP_1_SCHEMA } from "./schema/signUpStep1";
import InputField from "../fields/inputField";
import { client } from "../../../pages/_app";
import { gql } from "@apollo/client";
import getOTP from "../../../app/auth/getOTP";
import toast from "react-hot-toast";

export default function SignUpStep1(props: {
  setSignUpFormState: Dispatch<
    SetStateAction<{
      step: number;
      email: string;
      password: string;
      confirm_password: string;
      username: string;
      name: string;
      otp: string;
    }>
  >;
}) {
  return (
    <>
      <Formik
        initialValues={{ email: "", password: "", confirm_password: "" }}
        validationSchema={SIGN_UP_STEP_1_SCHEMA}
        onSubmit={(values, { setSubmitting, setFieldError }) => {
          client
            .query({
              query: gql`
              query {
                checkEmail(email: "${values.email}")
              }
            `,
            })
            .then(async () => {
              await getOTP(values.email);
              props.setSignUpFormState((prevState) => {
                return {
                  ...prevState,
                  step: 2,
                  email: values.email,
                  password: values.password,
                };
              });
            })
            .catch(() => {
              setFieldError("email", "An user with that email already exists!");
              toast.error("An user with that email already exists!😅");
            })
            .finally(() => setSubmitting(false));
        }}
      >
        {({ isSubmitting, handleSubmit, errors }: any) => (
          <Form onSubmit={handleSubmit}>
            <InputField type="email" name="email" label="Email" />
            <InputField type="password" name="password" label="Password" />
            <InputField
              type="password"
              name="confirm_password"
              label="Confirm Password"
            />
            <Button
              type="submit"
              disabled={
                isSubmitting ||
                errors.email ||
                errors.password ||
                errors.confirm_password
              }
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
