import { gql } from '@apollo/client';

const GET_OTP_QUERY = gql`
    query GetOtp($email: String!) {
        getOTP(email: $email)
    }
`;

export default GET_OTP_QUERY;
