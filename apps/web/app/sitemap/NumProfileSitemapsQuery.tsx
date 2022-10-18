import { gql } from "@apollo/client";

const NUM_PROFILE_SITEMAPS_QUERY = gql`
  query NumProfileSitemapsQuery {
    numProfileSitemaps
  }
`;

export default NUM_PROFILE_SITEMAPS_QUERY;
