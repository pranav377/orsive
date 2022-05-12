import { gql } from "@apollo/client";

const GET_PROFILE_POSTS = gql`
  query GetProfilePostsQuery($username: String!, $page: Int) {
    getProfilePosts(username: $username, page: $page) {
      data {
        __typename
        ... on Image {
          title
          image
          slug
          post {
            _count {
              likes
            }
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
            _count {
              likes
            }
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
    }
  }
`;

export default GET_PROFILE_POSTS;
