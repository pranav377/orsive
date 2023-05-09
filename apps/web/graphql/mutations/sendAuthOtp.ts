import { graphql } from '@/gql';

const SEND_AUTH_OTP = graphql(`
    mutation SendAuthOtp($email: String!) {
        sendAuthOtp(email: $email) {
            type
        }
    }
`);

export default SEND_AUTH_OTP;
