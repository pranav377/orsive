import { gql } from "apollo-server-express";

const NOTIFICATIONS_SCHEMA = gql`
  type BaseNotification {
    seen: Boolean
    createdAt: Date
  }

  type NotificationForPost {
    id: ID!
    url: String
    post: Post
    notification: BaseNotification
  }

  type GetMyNotificationsResponse {
    data: [NotificationForPost]!
    hasNextPage: Boolean
  }

  type Query {
    getMyNotifications(page: Int): GetMyNotificationsResponse!
  }

  type Mutation {
    makeNotificationsRead: String!
  }
`;

export default NOTIFICATIONS_SCHEMA;
