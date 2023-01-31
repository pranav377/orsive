import { gql } from '@apollo/client';

const ADD_IMAGE_POST_MUTATION = gql`
    mutation AddImagePost($image: Upload!, $title: String) {
        addImagePost(input: { image: $image, title: $title }) {
            slug
            post {
                id
            }
        }
    }
`;

export default ADD_IMAGE_POST_MUTATION;
