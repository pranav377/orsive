import { graphql } from '@/gql';

const SIGNUP_AUTH_EMAIL = graphql(`
    mutation SignupAuthEmail(
        $email: String!
        $username: String!
        $name: String!
        $otp: String!
    ) {
        signupAuthEmail(
            email: $email
            username: $username
            name: $name
            otp: $otp
        ) {
            token
            user {
                avatar
                id
                name
                username
                setupComplete
            }
        }
    }
`);

export default SIGNUP_AUTH_EMAIL;
