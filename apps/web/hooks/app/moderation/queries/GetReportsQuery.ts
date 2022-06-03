import { gql } from "@apollo/client";

const GET_REPORTS_QUERY = gql`
  query GetReportsQuery($page: Int) {
    getReports(page: $page) {
      data {
        id
        votingEnds
        voted
        post {
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
      }
      hasNextPage
      nextPage
    }
  }
`;

export default GET_REPORTS_QUERY;
