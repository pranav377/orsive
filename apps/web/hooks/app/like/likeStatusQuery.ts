import { gql } from "@apollo/client";

const LIKE_STATUS_QUERY = gql`
  query LikeStatusQuery($postId: ID!) {
    likeStatus(post_id: $postId)
    getLikes(post_id: $postId)
  }
`;

export default LIKE_STATUS_QUERY;
