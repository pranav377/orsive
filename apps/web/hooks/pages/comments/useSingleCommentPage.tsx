import { useMutation, useQuery } from '@apollo/client';
import { NextRouter } from 'next/router';
import DELETE_COMMENT_MUTATION from '../../../components/post/comments/mutation/deleteCommentMutation';
import GET_COMMENT_QUERY from '../../../components/post/comments/queries/getCommentQuery';
import GET_MY_COMMENTS_QUERY from '../../../components/post/comments/queries/getMyCommentsQuery';
import { useLike } from '../../app/like/useLike';
import { useClearApolloCacheOnExit } from '../../app/useClearApolloCacheOnExit';
import { useHideBars } from '../../app/useHideBars';

export const useSingleCommentPage = (backLink: string, router: NextRouter) => {
    useHideBars();
    let commentId = router.query['comment_slug'];

    const getCommentQuery = useQuery(GET_COMMENT_QUERY, {
        variables: {
            commentId: commentId,
        },
    });

    const likeFeatures = useLike(getCommentQuery?.data?.getComment);

    const [deleteCommentMutation] = useMutation(DELETE_COMMENT_MUTATION, {
        variables: {
            commentId: commentId,
        },
        refetchQueries: [GET_MY_COMMENTS_QUERY],
        onCompleted: () => {
            router.push(backLink);
        },
    });

    useClearApolloCacheOnExit('getComment');

    return { getCommentQuery, likeFeatures, deleteCommentMutation };
};
