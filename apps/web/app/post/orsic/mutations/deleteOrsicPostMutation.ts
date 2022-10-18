import { gql } from "@apollo/client";

const DELETE_ORSIC_POST_MUTATION = gql`
  mutation DeleteOrsicPost($slug: String!) {
    deleteOrsicPost(slug: $slug)
  }
`;

export default DELETE_ORSIC_POST_MUTATION;
