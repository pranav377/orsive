import { client } from "../../pages/_app";
import GET_PASSWORD_RESET_OTP_QUERY from "./queries/getPasswordResetOtpQuery";

export default function getPasswordResetOTP(email: string) {
  return client.query({
    query: GET_PASSWORD_RESET_OTP_QUERY,
    variables: {
      email,
    },
    fetchPolicy: "network-only",
  });
}
