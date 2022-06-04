import { gql } from "apollo-server-express";

const COMMENTS_SCHEMA = gql`
  union AllPostUnion = Image | Orsic | Comment | Reply

  type Comment {
    id: ID
    content: String
    replies: Int
    post: Post
    url: String
  }

  type Reply {
    id: ID
    content: String
    post: Post
    url: String
  }

  type GetCommentsResponse {
    data: [Comment]!
    hasNextPage: Boolean
    nextPage: Int
  }

  type GetRepliesResponse {
    data: [Reply]!
    hasNextPage: Boolean
    nextPage: Int
  }

  type Query {
    getComments(post_id: ID!, page: Int): GetCommentsResponse!
    getReplies(parent_id: ID!, page: Int): GetRepliesResponse!
    getMyComments(post_id: ID!): [Comment]
    getComment(comment_id: ID!): Comment!
    getReply(comment_id: ID!): Reply!
  }

  input CreateCommentInput {
    content: String!
    post_id: ID!
  }

  input CreateReplyInput {
    content: String!
    parent_id: ID!
  }

  type Mutation {
    createComment(input: CreateCommentInput!): Comment!
    createReply(input: CreateReplyInput!): Reply!
    deleteComment(comment_id: ID!): String!
  }
`;

export default COMMENTS_SCHEMA;
