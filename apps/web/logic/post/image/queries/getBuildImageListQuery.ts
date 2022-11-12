import { gql } from "@apollo/client";

export const GET_BUILD_IMAGE_LIST_QUERY = gql`
  query GetBuildImageList {
    getBuildImageList
  }
`;
