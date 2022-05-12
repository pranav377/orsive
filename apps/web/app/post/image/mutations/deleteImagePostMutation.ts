import { gql } from "@apollo/client";

const DELETE_IMAGE_POST_MUTATION = gql`
  mutation DeleteImagePost($slug: String!) {
    deleteImagePost(slug: $slug)
  }
`;

export default DELETE_IMAGE_POST_MUTATION;
