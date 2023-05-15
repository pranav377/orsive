import { graphql } from '@/gql';

const GET_IMAGE = graphql(`
    query ImageQuery($slug: String!) {
        getImage(slug: $slug) {
            description
            width

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
        }
    }
`);

export default GET_IMAGE;
