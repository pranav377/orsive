import { gql } from "apollo-server-express";

const FEATURE_SCHEMA = gql`
  type Feature {
    name: String!
    status: FeatureStatus!
  }

  enum FeatureStatus {
    enabled
    disabled
    comingsoon
  }

  type Query {
    features: [Feature]!
  }
`;

export default FEATURE_SCHEMA;
