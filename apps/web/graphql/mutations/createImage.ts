import { graphql } from '@/gql';

const CREATE_IMAGE = graphql(`
    mutation CreateImage($image: Upload!, $description: String) {
        createImage(image: $image, description: $description) {
            post {
                id
                slug
            }
        }
    }
`);

export default CREATE_IMAGE;
