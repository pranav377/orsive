import { gql } from "@apollo/client";

const GET_MY_NOTIFICATIONS_QUERY = gql`
  query getMyNotifications($page: Int) {
    getMyNotifications(page: $page) {
      data {
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
        }
        url
      }

      hasNextPage
    }
  }
`;

export default GET_MY_NOTIFICATIONS_QUERY;
