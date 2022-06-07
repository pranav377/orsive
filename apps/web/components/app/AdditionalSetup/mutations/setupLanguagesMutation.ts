import { gql } from "@apollo/client";

const SETUP_LANGUAGES_MUTATION = gql`
  mutation SetupLanguageMutation($langs: [String!]) {
    setupLanguages(langs: $langs)
  }
`;

export default SETUP_LANGUAGES_MUTATION;
