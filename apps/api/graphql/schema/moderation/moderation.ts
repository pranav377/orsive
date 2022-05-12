import { gql } from "apollo-server-express";

const MODERATION_SCHEMA = gql`
  type Report {
    id: ID
    _count: ReportVoteCount
    post: PostUnion
    votingEnds: Date
  }

  type ReportVoteCount {
    favors: Int
    against: Int
  }

  type GetReportsResponse {
    data: [Report!]
    hasNextPage: Boolean
  }

  type Query {
    getReports(page: Int): GetReportsResponse!
  }

  type Mutation {
    addReport(post_id: ID!): String!
    deleteReport(post_id: ID!): String!
  }
`;

export default MODERATION_SCHEMA;
