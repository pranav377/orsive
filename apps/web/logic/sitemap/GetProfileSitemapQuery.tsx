import { gql } from "@apollo/client";

const GET_PROFILE_SITEMAP_QUERY = gql`
  query GetProfileSitemapQuery($page: Int!) {
    getProfileSitemap(page: $page)
  }
`;

export default GET_PROFILE_SITEMAP_QUERY;
