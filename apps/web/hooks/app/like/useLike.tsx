import { useMutation } from '@apollo/client';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showLoginDialog } from '../../../logic/auth/showLoginDialog';
import { client } from '../../../pages/_app';
import { RootState } from '../../../store';
import { LikeStateActions } from '../../../store/slices/likeSlice';
import { useUser } from '../../auth/useUser';
import ADD_LIKE_MUTATION from './addLikeMutation';
import LIKE_STATUS_QUERY from './likeStatusQuery';

export const useLike = (post: any) => {
    const likeStore = useSelector((state: RootState) => state.like);
    const dispatch = useDispatch();

    const likeStatus = useMemo(() => {
        return likeStore.filter(
            (likeObj) => likeObj.postId === post?.post?.id
        )[0];
    }, [likeStore, post]);

    const setLikeStatus = (
        type: 'like' | 'dislike' | 'nope',
        likes: number
    ) => {
        dispatch(
            LikeStateActions.setLike({
                postId: post?.post?.id,
                type,
                likes,
            })
        );
    };

    const [addLikeMutation] = useMutation(ADD_LIKE_MUTATION);

    const user = useUser();

    useMemo(async () => {
        if (user.is && post && !likeStatus) {
            let response = await client.query({
                query: LIKE_STATUS_QUERY,
                variables: {
                    postId: post?.post?.id,
                },
            });

            let likeType = response.data.likeStatus;
            let numOfLikes = response.data.getLikes;

            setLikeStatus(likeType, numOfLikes);
        }
    }, [post, user, likeStatus]);

    const like = async () => {
        if (user.is) {
            if (likeStatus.type === 'nope' || likeStatus.type === 'dislike') {
                setLikeStatus('like', likeStatus.likes + 1);
            } else {
                setLikeStatus('nope', likeStatus.likes - 1);
            }

            await addLikeMutation({
                variables: {
                    postId: post?.post?.id,
                    likeType: 'like',
                },
            });
        } else {
            showLoginDialog();
        }
    };

    const dislike = async () => {
        if (user.is) {
            if (likeStatus.type === 'nope' || likeStatus.type === 'like') {
                if (likeStatus.type === 'like') {
                    setLikeStatus('dislike', likeStatus.likes - 1);
                } else {
                    setLikeStatus('dislike', likeStatus.likes);
                }
            } else {
                setLikeStatus('nope', likeStatus.likes);
            }

            await addLikeMutation({
                variables: {
                    postId: post?.post?.id,
                    likeType: 'dislike',
                },
            });
        } else {
            showLoginDialog();
        }
    };

    return { likeStatus, like, dislike };
};
