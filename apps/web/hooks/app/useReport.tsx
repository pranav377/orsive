import { gql, useMutation } from '@apollo/client';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { client } from '../../pages/_app';
import { useUser } from '../auth/useUser';
import REPORT_AGAINST_MUTATION from './moderation/mutation/ReportAgainstMutation';
import REPORT_FAVOR_MUTATION from './moderation/mutation/ReportFavorMutation';
import type { RootState } from '../../store';
import { ReportStateActions } from '../../store/slices/reportSlice';

export const useReport = (postId: string) => {
    const reportStore = useSelector((state: RootState) => state.report);
    const dispatch = useDispatch();

    const reportStatus = useMemo(() => {
        return reportStore.filter((voteObj) => voteObj.postId === postId)[0];
    }, [reportStore, postId]);

    const [reportFavorMutation] = useMutation(REPORT_FAVOR_MUTATION, {
        variables: {
            postId: postId,
        },
        onCompleted: () => {
            setVoteStatus(true);
        },
    });
    const [reportAgainstMutation] = useMutation(REPORT_AGAINST_MUTATION, {
        variables: {
            postId: postId,
        },
        onCompleted: () => {
            setVoteStatus(true);
        },
    });

    const setVoteStatus = (voted: boolean) => {
        dispatch(
            ReportStateActions.setReport({
                postId,
                voted,
            })
        );
    };

    const user = useUser();

    useMemo(async () => {
        if (user.isMod && !reportStatus) {
            let response = await client.query({
                query: gql`
                    query ReportStatus($postId: ID!) {
                        voteStatus(post_id: $postId)
                    }
                `,
                variables: {
                    postId,
                },
            });

            setVoteStatus(response.data.voteStatus);
        }
    }, [user, postId, reportStatus]);

    return { reportFavorMutation, reportAgainstMutation, reportStatus };
};
