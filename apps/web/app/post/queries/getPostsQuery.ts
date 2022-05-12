import { gql } from "@apollo/client";

const GET_POSTS_QUERY = gql`
  query getPostsQuery($page: Int) {
    getPosts(page: $page) {
      data {
        __typename
        ... on Image {
          title
          image
          slug
          post {
            uploadedBy {
              name
              username
              avatar
            }
            id
            _count {
              likes
            }
          }
        }
        ... on Orsic {
          title
          content
          truncated
          slug
          post {
            uploadedBy {
              name
              username
              avatar
            }
            id
            _count {
              likes
            }
          }
        }
      }
      hasNextPage
    }
  }
`;

export default GET_POSTS_QUERY;
