import { gql } from "@apollo/client";

const SIGN_IN_MUTATION_SCHEMA = gql`
  mutation SignIn($email: String!, $password: String!) {
    signIn(input: { email: $email, password: $password }) {
      username
      avatar
      name
    }
  }
`;

export default SIGN_IN_MUTATION_SCHEMA;
