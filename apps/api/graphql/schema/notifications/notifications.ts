import { gql } from "apollo-server-express";

const NOTIFICATIONS_SCHEMA = gql`
  union Notification = NotificationForPost | NotificationForComment

  type BaseNotification {
    seen: Boolean
    createdAt: Date
    notificationType: NotificationType
  }

  enum NotificationType {
    forPost
    forComment
    forReply
  }

  type NotificationForPost {
    id: ID!
    url: String
    post: Post
    notification: BaseNotification
  }

  type NotificationForComment {
    id: ID!
    url: String
    comment: Comment
    notification: BaseNotification
  }

  type GetMyNotificationsResponse {
    data: [Notification]!
    hasNextPage: Boolean
    nextPage: Int
  }

  type Query {
    getMyNotifications(page: Int): GetMyNotificationsResponse!
  }

  type Mutation {
    makeNotificationsRead: String!
  }
`;

export default NOTIFICATIONS_SCHEMA;
