import { gql } from '@apollo/client';

const UPDATE_ORSIC_POST_MUTATION = gql`
    mutation UpdateOrsicPost(
        $content: String!
        $slug: String!
        $title: String
    ) {
        updateOrsicPost(
            input: { title: $title, content: $content, slug: $slug }
        ) {
            slug
        }
    }
`;

export default UPDATE_ORSIC_POST_MUTATION;
