import { gql } from '@apollo/client';

const DELETE_COMMENT_MUTATION = gql`
    mutation ($commentId: ID!) {
        deleteComment(comment_id: $commentId)
    }
`;

export default DELETE_COMMENT_MUTATION;
