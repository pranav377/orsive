import { gql } from 'apollo-server-express';

const MODERATION_SCHEMA = gql`
    enum ReportReason {
        sus_spam
        sensitive_content
        harmful
    }

    type Report {
        id: ID
        post: AllPostUnion
        votingEnds: Date
    }

    type GetReportsResponse {
        data: [Report!]
        hasNextPage: Boolean
        nextPage: Int
    }

    type Query {
        getReports(page: Int): GetReportsResponse!
        voteStatus(post_id: ID!): Boolean!
    }

    type Mutation {
        # Report
        addReport(post_id: ID!, reason: ReportReason!): String!
        deleteReport(post_id: ID!): String!

        # for moderators
        deletePost(post_id: ID!): String!
        deleteUser(user_id: ID!): String!
    }
`;

export default MODERATION_SCHEMA;
