import { gql } from '@apollo/client';

const DELETE_POST_MUTATION_FOR_MOD = gql`
    mutation DeletePostMutationForMod($post_id: ID!) {
        deletePost(post_id: $post_id)
    }
`;

export default DELETE_POST_MUTATION_FOR_MOD;
