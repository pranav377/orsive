import { gql } from "@apollo/client";

const NUM_POST_SITEMAPS_QUERY = gql`
  query NumPostSitemapsQuery {
    numPostSitemaps
  }
`;

export default NUM_POST_SITEMAPS_QUERY;
