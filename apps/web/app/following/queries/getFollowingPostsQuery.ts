import { gql } from "@apollo/client";

const GET_FOLLOWING_POSTS_QUERY = gql`
  query getFollowingPostsQuery($page: Int) {
    getFollowingPosts(page: $page) {
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
      nextPage
    }
  }
`;

export default GET_FOLLOWING_POSTS_QUERY;
