import { gql } from '@apollo/client';

const GET_IMAGE_POST_QUERY = gql`
    query GetImageQuery($slug: String!) {
        getImage(slug: $slug) {
            title
            image
            width
            height
            slug
            post {
                id
                uploadedBy {
                    username
                    avatar
                    name
                }
                createdAt
                updatedAt
            }
        }
    }
`;

export default GET_IMAGE_POST_QUERY;
