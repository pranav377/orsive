import { useEffect, useState } from 'react';
import Spinner from '../../app/Spinner';
import { useMutation } from '@apollo/client';
import CREATE_COMMENT_MUTATION from './mutation/createCommentMutation';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import { Formik, Form } from 'formik';
import Button from '../../base/button';
import CREATE_REPLY_MUTATION from './mutation/createReplyMutation';
import GET_REPLIES_QUERY from './queries/getRepliesQuery';
import Modal from '../../app/Modal';
import dynamic from 'next/dynamic';
import { useUser } from '../../../hooks/auth/useUser';
import AccessDenied from '../../forms/content/accessDenied';
import { useAppState } from '../../../hooks/app/useAppState';
import { useDispatch } from 'react-redux';
import { RichEditorSkeleton } from '../../app/RichEditor';
import GET_MY_COMMENTS_QUERY from './queries/getMyCommentsQuery';
import { AppStateActions } from '../../../store/slices/appSlice';

const RichEditor = dynamic(() => import('../../app/RichEditor'), {
    ssr: false,
});

interface ReplyBoxProps {
    loading?: boolean;
    pId?: string; // parentId or postId
    postUrl?: string;
    type: 'comment' | 'reply';
}

interface ReplyBoxFormProps extends ReplyBoxProps {
    closeReplyModal: any;
}

export default function ReplyBox(props: ReplyBoxProps) {
    const dispatch = useDispatch();

    const appState = useAppState();

    const [showReply, setShowReply] = useState(false);

    useEffect(() => {
        if (appState.showReply && !props.loading) {
            setShowReply(true);
        } else {
            setShowReply(false);
        }
    }, [appState.showReply, props.loading]);

    function closeReplyModal() {
        dispatch(AppStateActions.setShowReply(false));
    }

    function showReplyModal() {
        dispatch(AppStateActions.setShowReply(true));
    }
    const user = useUser();

    return (
        <>
            <Modal
                closeModal={closeReplyModal}
                show={showReply}
                content={
                    <>
                        <div className="flex w-full justify-center">
                            {user.is ? (
                                <ReplyBoxForm
                                    loading={props.loading}
                                    pId={props.pId}
                                    postUrl={props.postUrl}
                                    type={props.type}
                                    closeReplyModal={closeReplyModal}
                                />
                            ) : (
                                <div className="h-[70vh]">
                                    <AccessDenied />
                                </div>
                            )}
                        </div>
                    </>
                }
            />

            <div className="fixed bottom-0 flex h-20 w-full items-center bg-slate-900 p-4 md:p-5">
                {props.loading ? (
                    <div className="flex w-full items-center justify-center">
                        <Spinner />
                    </div>
                ) : (
                    <div className="mt-2 flex w-full justify-center">
                        <Button
                            onClick={(event) => {
                                event.preventDefault();
                                showReplyModal();
                            }}
                            type="submit"
                            className="ripple-bg-blue-600 m-2 w-full max-w-lg rounded-md bg-blue-600 p-2 hover:bg-blue-700"
                        >
                            Reply
                        </Button>
                    </div>
                )}
            </div>
        </>
    );
}

function ReplyBoxForm(props: ReplyBoxFormProps) {
    const [createCommentMutation] = useMutation(CREATE_COMMENT_MUTATION, {
        refetchQueries: [GET_MY_COMMENTS_QUERY],
    });
    const [createReplyMutation] = useMutation(CREATE_REPLY_MUTATION, {
        refetchQueries: [GET_REPLIES_QUERY],
    });

    const [content, setContent] = useState('');

    const router = useRouter();

    return (
        <Formik
            initialValues={{}}
            onSubmit={(_values, { setSubmitting }) => {
                toast
                    .promise(
                        (async () => {
                            if (props.type === 'comment') {
                                return createCommentMutation({
                                    variables: {
                                        content: content,
                                        postId: props.pId,
                                    },
                                });
                            } else {
                                return createReplyMutation({
                                    variables: {
                                        content: content,
                                        parentId: props.pId,
                                    },
                                });
                            }
                        })(),
                        {
                            loading: 'Posting...',
                            error: 'Something went wrong. Please try again.',
                            success: 'Posted Successfully!🚀🚀',
                        }
                    )
                    .then((response) => {
                        if (props.type === 'comment') {
                            let slug = response.data.createComment.post.id;

                            router.push(`${props.postUrl}/comments/${slug}`);
                        }
                        props.closeReplyModal();
                        setContent('');
                    })
                    .catch((err) => console.error(err))
                    .finally(() => setSubmitting(false));
            }}
        >
            {({ isSubmitting, handleSubmit }: any) => (
                <Form
                    onSubmit={handleSubmit}
                    className="mt-2 flex w-full flex-col lg:w-3/4"
                >
                    <p className="mb-1 text-center text-lg font-semibold md:text-left">
                        What do you think?
                    </p>
                    {RichEditor ? (
                        <RichEditor
                            onChange={(data) => setContent(data)}
                            value={content}
                        />
                    ) : (
                        <RichEditorSkeleton />
                    )}
                    <div className="flex w-full justify-center">
                        <Button
                            disabled={isSubmitting}
                            type="submit"
                            className="ripple-bg-blue-600 m-2 w-full max-w-lg rounded-md bg-blue-600 p-2 hover:bg-blue-700"
                        >
                            Reply
                        </Button>
                    </div>
                </Form>
            )}
        </Formik>
    );
}
