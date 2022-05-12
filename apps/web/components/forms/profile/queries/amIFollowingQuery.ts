import { gql } from "@apollo/client";

const AM_I_FOLLOWING_QUERY = gql`
  query AmIFollowingQuery($username: String!) {
    amIFollowing(username: $username)
  }
`;

export default AM_I_FOLLOWING_QUERY;
