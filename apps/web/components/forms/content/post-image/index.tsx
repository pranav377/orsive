import { useMutation } from '@apollo/client';
import { usePostContentState } from '../../../../hooks/app/content/usePostContentState';
import Modal from '../../../app/Modal';
import ADD_IMAGE_POST_MUTATION from '../../../../../../packages/common/mutations/PostContent/image/addImagePostMutation';
import { Formik, Form } from 'formik';
import { POST_IMAGE_SCHEMA } from './validation_schema/postImageSchema';
import Button from '../../../base/button';
import ImageField from '../../fields/imageField';
import TextField from '../../fields/textInputField';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import AccessDenied from '../accessDenied';
import { useUser } from '../../../../hooks/auth/useUser';
import { client } from '../../../../pages/_app';
import GET_POSTS_QUERY from '../../../../../../packages/common/queries/post/getPostsQuery';
import GET_PROFILE_POSTS from '../../../../logic/profile/queries/getProfilePostsQuery';
import { store } from '../../../../store';
import { ContentStateActions } from '../../../../store/slices/contentSlice';

function closePostImageModal() {
    store.dispatch(ContentStateActions.setShowPostImage(false));
}

export default function PostImage() {
    const postContentState = usePostContentState();
    const user = useUser();

    return (
        <>
            <Modal
                closeModal={closePostImageModal}
                show={postContentState.postImage}
                content={
                    <>
                        {user.is ? (
                            <PostImageForm />
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

function PostImageForm() {
    const [addImagePost] = useMutation(ADD_IMAGE_POST_MUTATION);
    const router = useRouter();

    return (
        <>
            <div className="flex w-full justify-center">
                <Formik
                    initialValues={{
                        title: '',
                        image: null,
                    }}
                    validationSchema={POST_IMAGE_SCHEMA}
                    onSubmit={(values, { setSubmitting }) => {
                        toast
                            .promise(addImagePost({ variables: values }), {
                                loading: 'Uploading...',
                                error: 'Something went wrong. Please try again.',
                                success: 'Posted Successfully!🚀🚀',
                            })
                            .then((response) => {
                                let slug = response.data.addImagePost.slug;

                                closePostImageModal();
                                router.push(`/image/${slug}`).then(() => {
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
                        setFieldValue,
                    }: any) => (
                        <Form
                            onSubmit={handleSubmit}
                            className="w-full lg:w-3/4"
                        >
                            <ImageField
                                errors={errors}
                                label="Upload Image"
                                name="image"
                                setFieldValue={setFieldValue}
                            />
                            <TextField
                                name="title"
                                label="Description (optional)"
                            />
                            <div className="flex w-full justify-center">
                                <Button
                                    type="submit"
                                    disabled={
                                        isSubmitting ||
                                        errors.title ||
                                        errors.image
                                    }
                                    className="focus:shadow-outline-blue ripple-bg-blue-700 mb-2 mt-4 block w-full max-w-xl rounded-lg border border-transparent bg-blue-600 px-4 py-2 text-center text-sm font-medium leading-5 text-white hover:bg-blue-700 focus:outline-none disabled:cursor-not-allowed"
                                >
                                    Post Image
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </>
    );
}
