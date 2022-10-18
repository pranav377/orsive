import { gql } from "@apollo/client";

export const ADD_CONTACT_MUTATION = gql`
  mutation AddContactMutation($type: ContactType!, $content: String!) {
    addContact(input: { type: $type, content: $content })
  }
`;
