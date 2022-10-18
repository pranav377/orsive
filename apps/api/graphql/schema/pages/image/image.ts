import { gql } from "apollo-server-express";

const IMAGE_SCHEMA = gql`
  type Image {
    image: String
    width: Int
    height: Int
    title: String
    slug: String
    post: Post
  }

  input ImagePostInput {
    image: Upload!
    title: String
  }

  input ImagePostUpdateInput {
    image: Upload
    title: String
    slug: String!
  }

  type Query {
    getImage(slug: String!): Image!
  }

  type Mutation {
    addImagePost(input: ImagePostInput!): CUDResponse!
    updateImagePost(input: ImagePostUpdateInput!): CUDResponse!
    deleteImagePost(slug: String!): String!
  }
`;

export default IMAGE_SCHEMA;
