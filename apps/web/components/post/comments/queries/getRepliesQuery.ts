import { gql } from "@apollo/client";

const GET_REPLIES_QUERY = gql`
  query GetReplies($parentId: ID!, $page: Int) {
    getReplies(parent_id: $parentId, page: $page) {
      data {
        content
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
    }
  }
`;

export default GET_REPLIES_QUERY;
