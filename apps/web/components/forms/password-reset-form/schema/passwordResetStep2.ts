import * as yup from "yup";

export const PASSWORD_RESET_STEP_2_SCHEMA = yup.object({
  new_password: yup.string().required("Password is required"),

  otp: yup
    .string()
    .matches(/[0-9]/, "OTP is not valid")
    .required("OTP is required")
    .min(9, "OTP is not valid")
    .max(9, "OTP is not valid"),
});
