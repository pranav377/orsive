import { gql } from '@apollo/client';

const ADD_LIKE_MUTATION = gql`
    mutation AddLikeMutation($postId: ID!, $likeType: LikeType!) {
        addLike(input: { id: $postId, like_type: $likeType })
    }
`;

export default ADD_LIKE_MUTATION;
