import { Formik, Form } from 'formik';
import Button from '../../../base/button';
import { POST_ORSIC_SCHEMA } from './validation_schema/postOrsicSchema';
import { useMutation } from '@apollo/client';
import ADD_ORSIC_POST_MUTATION from '../../../../../../packages/common/mutations/PostContent/orsic/addOrsicPostMutation';
import Modal from '../../../app/Modal';
import InputField from '../../fields/inputField';
import { usePostContentState } from '../../../../hooks/app/content/usePostContentState';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import AccessDenied from '../accessDenied';
import { useUser } from '../../../../hooks/auth/useUser';
import dynamic from 'next/dynamic';
import { RichEditorSkeleton } from '../../../app/RichEditor';
import { client } from '../../../../pages/_app';
import GET_POSTS_QUERY from '../../../../../../packages/common/queries/post/getPostsQuery';
import GET_PROFILE_POSTS from '../../../../logic/profile/queries/getProfilePostsQuery';
import { store } from '../../../../store';
import { ContentStateActions } from '../../../../store/slices/contentSlice';

const RichEditor = dynamic(() => import('../../../app/RichEditor'), {
    ssr: false,
});

function closePostOrsicModal() {
    store.dispatch(ContentStateActions.setShowPostOrsic(false));
}

export default function PostOrsic() {
    const postContentState = usePostContentState();
    const user = useUser();

    return (
        <>
            <Modal
                closeModal={closePostOrsicModal}
                show={postContentState.postOrsic}
                content={
                    <>
                        {user.is ? (
                            <PostOrsicForm />
                        ) : (
                            <div className="h-[70vh]">
                                <AccessDenied />
                            </div>
                        )}
                    </>
                }
            />
        </>
    );
}

function PostOrsicForm() {
    const [addOrsicPost] = useMutation(ADD_ORSIC_POST_MUTATION);

    const router = useRouter();

    return (
        <>
            <div className="flex w-full justify-center">
                <Formik
                    initialValues={{
                        title: '',
                        content: '',
                    }}
                    validationSchema={POST_ORSIC_SCHEMA}
                    onSubmit={(values, { setSubmitting }) => {
                        toast
                            .promise(addOrsicPost({ variables: values }), {
                                loading: 'Uploading...',
                                error: 'Something went wrong. Please try again.',
                                success: 'Posted Successfully!🚀🚀',
                            })
                            .then((response) => {
                                let slug = response.data.addOrsicPost.slug;

                                closePostOrsicModal();
                                router.push(`/orsic/${slug}`).then(() => {
                                    client.refetchQueries({
                                        include: [
                                            GET_POSTS_QUERY,
                                            GET_PROFILE_POSTS,
                                        ],
                                        updateCache(cache) {
                                            cache.evict({
                                                fieldName: 'getPosts',
                                            });
                                            cache.evict({
                                                fieldName: 'getProfilePosts',
                                            });
                                        },
                                    });
                                });
                            })
                            .catch((err) => console.error(err))
                            .finally(() => setSubmitting(false));
                    }}
                >
                    {({
                        isSubmitting,
                        handleSubmit,
                        errors,
                        values,
                        setFieldValue,
                    }: any) => (
                        <Form
                            onSubmit={handleSubmit}
                            className="w-full lg:w-3/4"
                        >
                            <p className="mb-1 text-center text-lg font-semibold md:text-left">
                                What's on your mind?
                            </p>
                            {RichEditor ? (
                                <RichEditor
                                    value={values.content}
                                    onChange={(data) =>
                                        setFieldValue('content', data)
                                    }
                                />
                            ) : (
                                <RichEditorSkeleton />
                            )}
                            <InputField
                                type="text"
                                name="title"
                                label="Title (optional)"
                            />
                            <div className="flex w-full justify-center">
                                <Button
                                    type="submit"
                                    disabled={
                                        isSubmitting ||
                                        errors.title ||
                                        errors.content
                                    }
                                    className="focus:shadow-outline-blue ripple-bg-blue-700 mb-2 mt-4 block w-full max-w-xl rounded-lg border border-transparent bg-blue-600 px-4 py-2 text-center text-sm font-medium leading-5 text-white hover:bg-blue-700 focus:outline-none disabled:cursor-not-allowed"
                                >
                                    Post Orsic
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </>
    );
}
