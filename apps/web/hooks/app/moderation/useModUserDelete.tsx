import { useMutation } from '@apollo/client';
import DELETE_POST_MUTATION_FOR_MOD from '../../../logic/post/deletePostMutationForMod';
import GET_POSTS_QUERY from '../../../../../packages/common/queries/post/getPostsQuery';
import GET_PROFILE_POSTS from '../../../logic/profile/queries/getProfilePostsQuery';
import DELETE_USER_MUTATION_FOR_MOD from '../../../logic/profile/deleteUserMutationForMod';
import GET_PROFILE_QUERY from '../../../logic/profile/queries/getProfileQuery';

export const useModUserDelete = (username: string) => {
    const [deleteUserByMod] = useMutation(DELETE_USER_MUTATION_FOR_MOD, {
        variables: {
            username: username,
        },
        refetchQueries: [GET_POSTS_QUERY, GET_PROFILE_POSTS, GET_PROFILE_QUERY],
    });

    return { deleteUserByMod };
};
