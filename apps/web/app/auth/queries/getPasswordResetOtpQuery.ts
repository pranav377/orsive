import { gql } from "@apollo/client";

const GET_PASSWORD_RESET_OTP_QUERY = gql`
  query GetPasswordResetOtp($email: String!) {
    getPasswordResetOTP(email: $email)
  }
`;

export default GET_PASSWORD_RESET_OTP_QUERY;
