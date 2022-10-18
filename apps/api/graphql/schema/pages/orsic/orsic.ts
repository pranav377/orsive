import { gql } from "apollo-server-express";

const ORSIC_SCHEMA = gql`
  type Orsic {
    title: String
    content: String
    slug: String
    post: Post
    truncated: Boolean
    image: String
  }

  input OrsicPostInput {
    title: String
    content: String!
  }

  input OrsicPostUpdateInput {
    title: String
    content: String!
    slug: String!
  }

  type Query {
    getOrsic(slug: String!): Orsic!
  }

  type Mutation {
    addOrsicPost(input: OrsicPostInput!): CUDResponse!
    updateOrsicPost(input: OrsicPostUpdateInput!): CUDResponse!
    deleteOrsicPost(slug: String!): String!
  }
`;

export default ORSIC_SCHEMA;
