import { gql } from "@apollo/client";

const UPDATE_IMAGE_POST_MUTATION = gql`
  mutation UpdateImagePost($image: Upload, $title: String, $slug: String!) {
    updateImagePost(input: { image: $image, title: $title, slug: $slug }) {
      slug
    }
  }
`;

export default UPDATE_IMAGE_POST_MUTATION;
