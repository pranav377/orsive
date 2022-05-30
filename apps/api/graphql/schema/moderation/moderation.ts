import { gql } from "apollo-server-express";

const MODERATION_SCHEMA = gql`
  enum ReportReason {
    sus_spam
    sensitive_content
    harmful
    political_content
  }

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
    nextPage: Int
  }

  type Query {
    getReports(page: Int): GetReportsResponse!
  }

  type Mutation {
    # Report
    addReport(post_id: ID!, reason: ReportReason!): String!
    deleteReport(post_id: ID!): String!

    # Report Voting for mods
    reportFavor(post_id: ID!): String!
    reportAgainst(post_id: ID!): String!
  }
`;

export default MODERATION_SCHEMA;
