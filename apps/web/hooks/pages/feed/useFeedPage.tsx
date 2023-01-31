import { useQuery } from '@apollo/client';
import GET_POSTS_QUERY from '../../../../../packages/common/queries/post/getPostsQuery';
import { useScrollRestoring } from '../../app/useScrollRestoringBeta';

export const useFeedPage = () => {
    const query = useQuery(GET_POSTS_QUERY, {
        variables: {
            page: 1,
        },
        notifyOnNetworkStatusChange: true,
    });

    const fetchMore = () => {
        let pageInfo = query.data.getPosts;
        if (pageInfo.hasNextPage) {
            query.fetchMore({
                variables: { page: pageInfo.nextPage },
            });
        }
    };

    const { objIdx, setObj } = useScrollRestoring('feed');

    return { query, fetchMore, objIdx, setObj };
};
