import { gql } from "@apollo/client";

const GET_ORSIC_POST_QUERY = gql`
  query GetOrsicQuery($slug: String!) {
    getOrsic(slug: $slug) {
      title
      content
      slug
      image
      post {
        id
        uploadedBy {
          username
          avatar
          name
        }
        createdAt
      }
    }
  }
`;

export default GET_ORSIC_POST_QUERY;
