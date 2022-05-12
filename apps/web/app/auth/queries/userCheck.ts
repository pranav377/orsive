import { gql } from "@apollo/client";

const USER_CHECK_QUERY = gql`
  query {
    me {
      username
      avatar
      unreadNotifications
    }
  }
`;

export default USER_CHECK_QUERY;
