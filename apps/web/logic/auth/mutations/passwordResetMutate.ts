import { gql } from '@apollo/client';

const PASSWORD_RESET_MUTATION_SCHEMA = gql`
    mutation PasswordResetMutation(
        $otp: String!
        $email: String!
        $new_password: String!
    ) {
        passwordReset(
            input: { otp: $otp, email: $email, new_password: $new_password }
        )
    }
`;

export default PASSWORD_RESET_MUTATION_SCHEMA;
