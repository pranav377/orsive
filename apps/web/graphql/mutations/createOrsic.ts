import { graphql } from '@/gql';

const CREATE_ORSIC = graphql(`
    mutation CreateOrsic($content: String!) {
        createOrsic(content: $content) {
            post {
                id
                slug
            }
        }
    }
`);

export default CREATE_ORSIC;
