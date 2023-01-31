import { useQuery } from '@apollo/client';
import GET_FOLLOWING_POSTS_QUERY from '../../../logic/following/queries/getFollowingPostsQuery';
import { useScrollRestoring } from '../../app/useScrollRestoringBeta';
import { useUser } from '../../auth/useUser';

export const useFollowingPage = () => {
    const query = useQuery(GET_FOLLOWING_POSTS_QUERY, {
        variables: {
            page: 1,
        },
        notifyOnNetworkStatusChange: true,
    });
    const user = useUser();

    const fetchMore = () => {
        let pageInfo = query.data.getFollowingPosts;
        if (pageInfo.hasNextPage) {
            query.fetchMore({
                variables: { page: pageInfo.nextPage },
            });
        }
    };

    const { objIdx, setObj } = useScrollRestoring('following');

    return { query, user, fetchMore, objIdx, setObj };
};
