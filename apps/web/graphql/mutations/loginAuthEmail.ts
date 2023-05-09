import { graphql } from '@/gql';

const LOGIN_AUTH_EMAIL = graphql(`
    mutation LoginAuthEmail($email: String!, $otp: String!) {
        loginAuthEmail(email: $email, otp: $otp) {
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

export default LOGIN_AUTH_EMAIL;
