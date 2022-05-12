import { gql } from "@apollo/client";

const GET_COMMENT_QUERY = gql`
  query GetCommentQuery($commentId: ID!) {
    getComment(comment_id: $commentId) {
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
  }
`;

export default GET_COMMENT_QUERY;
