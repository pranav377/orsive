import { gql } from "@apollo/client";

const GET_PROFILE_POSTS = gql`
  query GetProfilePostsQuery($username: String!, $page: Int) {
    getProfilePosts(username: $username, page: $page) {
      data {
        __typename
        ... on Image {
          title
          image
          width
          height
          slug
          post {
            uploadedBy {
              name
              username
              avatar
            }
            id
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
          }
        }
      }
      hasNextPage
      nextPage
    }
  }
`;

export default GET_PROFILE_POSTS;
