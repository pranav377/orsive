import { client } from "../../pages/_app";
import GET_OTP_QUERY from "./queries/getOtpQuery";

export default function getOTP(email: string) {
  return client.query({
    query: GET_OTP_QUERY,
    variables: {
      email,
    },
  });
}
