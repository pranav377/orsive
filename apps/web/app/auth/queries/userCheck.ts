import { gql } from "@apollo/client";

const USER_CHECK_QUERY = gql`
  query {
    me {
      username
      avatar
      name
    }
  }
`;

export const getUnreadNotificationsQuery = gql`
  query {
    me {
      unreadNotifications
    }
  }
`;

export default USER_CHECK_QUERY;
