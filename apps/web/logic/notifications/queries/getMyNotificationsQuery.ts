import { gql } from "@apollo/client";

const GET_MY_NOTIFICATIONS_QUERY = gql`
  query getMyNotifications($page: Int) {
    getMyNotifications(page: $page) {
      data {
        ... on NotificationForPost {
          id
          post {
            uploadedBy {
              avatar
              username
              name
            }
          }
          notification {
            seen
            createdAt
            notificationType
          }
          url
        }
        ... on NotificationForComment {
          id
          comment {
            post {
              uploadedBy {
                avatar
                username
                name
              }
            }
          }
          notification {
            seen
            createdAt
            notificationType
          }
          url
        }
        ... on NotificationForReputation {
          id
          amount
          notification {
            seen
            createdAt
            notificationType
          }
        }
      }

      hasNextPage
      nextPage
    }
  }
`;

export default GET_MY_NOTIFICATIONS_QUERY;
