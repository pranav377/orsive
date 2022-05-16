import { gql } from "@apollo/client";

const GET_COMMENTS_QUERY = gql`
  query GetCommentsQuery($postId: ID!, $page: Int) {
    getComments(post_id: $postId, page: $page) {
      data {
        id
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
          _count {
            likes
          }
        }
      }

      hasNextPage
      nextPage
    }
  }
`;

export default GET_COMMENTS_QUERY;
