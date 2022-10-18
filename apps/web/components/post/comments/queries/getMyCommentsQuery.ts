import { gql } from "@apollo/client";

const GET_MY_COMMENTS_QUERY = gql`
  query GetMyCommentsQuery($postId: ID!) {
    getMyComments(post_id: $postId) {
      content
      replies
      post {
        id
        uploadedBy {
          username
          name
          avatar
        }
        createdAt
      }
    }
  }
`;

export default GET_MY_COMMENTS_QUERY;
