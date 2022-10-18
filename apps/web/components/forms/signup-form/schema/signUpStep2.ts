import * as yup from "yup";

export const SIGN_UP_STEP_2_SCHEMA = yup.object({
  username: yup.string().required("Username is required"),
  name: yup.string().required("Name is required").max(50, "Name is too long"),
  otp: yup
    .string()
    .matches(/[0-9]/, "OTP is not valid")
    .required("OTP is required")
    .min(4, "OTP is not valid")
    .max(4, "OTP is not valid"),
});
