import { gql } from "apollo-server-express";

const SUPPORT_SCHEMA = gql`
  type Mutation {
    addContact(input: AddContactInput!): String!
  }

  type AddContactInput {
    type: ContactType!
    content: String!
  }

  enum ContactType {
    bug_report
    feature_request
    business_inquiry
  }
`;

export default SUPPORT_SCHEMA;
