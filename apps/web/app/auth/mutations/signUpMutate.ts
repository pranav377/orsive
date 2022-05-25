import { gql } from "@apollo/client";

const SIGN_UP_MUTATION_SCHEMA = gql`
  mutation SignUpMutation(
    $username: String!
    $email: String!
    $password: String!
    $name: String!
    $otp: String!
  ) {
    signUp(
      input: {
        username: $username
        email: $email
        password: $password
        name: $name
        otp: $otp
      }
    ) {
      username
      avatar
      name
      setupComplete
    }
  }
`;

export default SIGN_UP_MUTATION_SCHEMA;
