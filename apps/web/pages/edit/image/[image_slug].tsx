import { Form, Formik } from 'formik';
import { Layout } from '../../../components/app/Layout';
import AccessDenied from '../../../components/forms/content/accessDenied';
import { useEditImage } from '../../../hooks/pages/edit/image/useEditImage';
import Button from '../../../components/base/button';
import toast from 'react-hot-toast';
import { client } from '../../_app';
import GET_POSTS_QUERY from '../../../../../packages/common/queries/post/getPostsQuery';
import GET_PROFILE_POSTS from '../../../logic/profile/queries/getProfilePostsQuery';
import { UPDATE_IMAGE_SCHEMA } from '../../../components/forms/content/post-image/validation_schema/postImageSchema';
import TextField from '../../../components/forms/fields/textInputField';
import ImageField from '../../../components/forms/fields/imageField';
import TopBar from '../../../components/app/TopBar';
import Spinner from '../../../components/app/Spinner';
import Link from 'next/link';

export default function EditImage() {
    const { getImageQuery, user, updateImagePost, router, postSlug } =
        useEditImage();

    return (
        <>
            <Layout title={'Edit | Orsive'}>
                {user.is && getImageQuery.loading && (
                    <>
                        <TopBar loading />
                        <Layout title="Orsive">
                            <div className="flex h-[85vh] items-center justify-center">
                                <Spinner />
                            </div>
                        </Layout>
                    </>
                )}
                <div className="mt-20 flex flex-col items-center">
                    {!user.is && (
                        <div className="flex h-[60vh] md:h-[90vh]">
                            <AccessDenied />
                        </div>
                    )}
                    {getImageQuery.data && (
                        <>
                            <TopBar
                                content={
                                    <span className="pl-5 text-xl font-bold">
                                        Go to{' '}
                                        <Link
                                            href={`/image/${postSlug}`}
                                            passHref
                                            className="text-blue-500 hover:text-blue-700"
                                        >
                                            Post
                                        </Link>
                                    </span>
                                }
                            />
                            <div className="mt-2 mb-20 flex w-full justify-center p-1">
                                <Formik
                                    initialValues={{
                                        title: getImageQuery.data.getImage
                                            .title,
                                    }}
                                    validationSchema={UPDATE_IMAGE_SCHEMA}
                                    onSubmit={(values, { setSubmitting }) => {
                                        toast
                                            .promise(
                                                updateImagePost({
                                                    variables: {
                                                        ...values,
                                                        slug: postSlug,
                                                    },
                                                }),
                                                {
                                                    loading: 'Updating...',
                                                    error: 'Something went wrong. Please try again.',
                                                    success:
                                                        'Updated Successfully!🚀🚀',
                                                }
                                            )
                                            .then((response) => {
                                                let slug =
                                                    response.data
                                                        .updateImagePost.slug;

                                                router
                                                    .push(`/image/${slug}`)
                                                    .then(() => {
                                                        client.refetchQueries({
                                                            include: [
                                                                GET_POSTS_QUERY,
                                                                GET_PROFILE_POSTS,
                                                            ],
                                                            updateCache(cache) {
                                                                cache.evict({
                                                                    fieldName:
                                                                        'getPosts',
                                                                });
                                                                cache.evict({
                                                                    fieldName:
                                                                        'getProfilePosts',
                                                                });
                                                            },
                                                        });
                                                    });
                                            })
                                            .catch((err) => console.error(err))
                                            .finally(() =>
                                                setSubmitting(false)
                                            );
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
                                                previewImage={
                                                    getImageQuery.data.getImage
                                                        .image
                                                }
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
                                                    Update Image
                                                </Button>
                                            </div>
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                        </>
                    )}
                </div>
            </Layout>
        </>
    );
}
