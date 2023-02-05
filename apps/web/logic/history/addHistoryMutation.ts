import { gql } from '@apollo/client';

const ADD_HISTORY_MUTATION = gql`
    mutation AddHistoryMutation($post_id: ID!) {
        addHistory(post_id: $post_id)
    }
`;

export default ADD_HISTORY_MUTATION;
