import { gql } from "apollo-server-express";

const SUPPORT_SCHEMA = gql`
  enum ContactType {
    bug_report
    feature_request
    business_inquiry
  }

  input AddContactInput {
    type: ContactType!
    content: String!
  }

  type Mutation {
    addContact(input: AddContactInput!): String!
  }
`;

export default SUPPORT_SCHEMA;
