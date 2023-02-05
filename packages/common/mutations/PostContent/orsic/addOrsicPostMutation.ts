import { gql } from '@apollo/client';

const ADD_ORSIC_POST_MUTATION = gql`
    mutation AddOrsicPost($content: String!, $title: String) {
        addOrsicPost(input: { title: $title, content: $content }) {
            slug
            post {
                id
            }
        }
    }
`;

export default ADD_ORSIC_POST_MUTATION;
