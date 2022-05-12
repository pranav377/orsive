import { gql } from "@apollo/client";

const LOGOUT_MUTATION_SCHEMA = gql`
  mutation Logout {
    logout
  }
`;

export default LOGOUT_MUTATION_SCHEMA;
