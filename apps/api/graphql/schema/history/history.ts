import { gql } from "apollo-server-express";

const HISTORY_SCHEMA = gql`
  type Mutation {
    addHistory(post_id: ID!): String!
  }
`;

export default HISTORY_SCHEMA;
