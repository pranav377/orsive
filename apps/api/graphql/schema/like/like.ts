import { gql } from "apollo-server-express";

const LIKE_SCHEMA = gql`
  enum LikeResource {
    question
    answer
    image
    orsic
  }

  enum LikeType {
    like
    dislike
  }

  input AddLikeInput {
    id: ID!
    like_type: LikeType!
  }

  type Mutation {
    addLike(input: AddLikeInput!): String!
  }

  type Query {
    likeStatus(post_id: ID!): String!
    getLikes(post_id: ID!): Int!
  }
`;

export default LIKE_SCHEMA;
