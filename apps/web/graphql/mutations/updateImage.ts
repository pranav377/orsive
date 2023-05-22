import { graphql } from '@/gql';

const UPDATE_IMAGE = graphql(`
    mutation UpdateImage($slug: String!, $description: String, $image: Upload) {
        updateImage(slug: $slug, description: $description, image: $image) {
            post {
                id
            }
        }
    }
`);

export default UPDATE_IMAGE;
