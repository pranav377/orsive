import { gql } from "apollo-server-express";

const SITEMAP_SCHEMA = gql`
  type Query {
    numPostSitemaps: Int!
    getPostSitemap(page: Int!): [String]!
    numProfileSitemaps: Int!
    getProfileSitemap(page: Int!): [String]!
  }
`;

export default SITEMAP_SCHEMA;
