import { useMutation } from '@apollo/client';
import DELETE_POST_MUTATION_FOR_MOD from '../../../logic/post/deletePostMutationForMod';
import GET_POSTS_QUERY from '../../../../../packages/common/queries/post/getPostsQuery';
import GET_PROFILE_POSTS from '../../../logic/profile/queries/getProfilePostsQuery';

export const useModPostDelete = (post_id: string) => {
    const [deletePostByMod] = useMutation(DELETE_POST_MUTATION_FOR_MOD, {
        variables: {
            post_id: post_id,
        },
        refetchQueries: [GET_POSTS_QUERY, GET_PROFILE_POSTS],
    });

    return { deletePostByMod };
};
