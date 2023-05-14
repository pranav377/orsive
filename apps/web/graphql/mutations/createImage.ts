import { graphql } from '@/gql';

const CREATE_IMAGE = graphql(`
    mutation CreateImage($image: Upload!, $description: String) {
        createImage(image: $image, description: $description) {
            height
            image
            post {
                id
                insertedAt
                slug
                updatedAt
                user {
                    avatar
                    id
                    name
                    username
                }
            }
            description
            width
        }
    }
`);

export default CREATE_IMAGE;