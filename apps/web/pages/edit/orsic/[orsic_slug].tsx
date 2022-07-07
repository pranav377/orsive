import { Form, Formik } from "formik";
import { Layout } from "../../../components/app/Layout";
import OneTimePageSpinner from "../../../components/app/OneTimePageSpinner";
import AccessDenied from "../../../components/forms/content/accessDenied";
import { POST_ORSIC_SCHEMA } from "../../../components/forms/content/post-orsic/validation_schema/postOrsicSchema";
import { useEditOrsic } from "../../../hooks/pages/edit/orsic/useEditOrsic";
import dynamic from "next/dynamic";
import {
  RichEditorContentParser,
  RichEditorSkeleton,
} from "../../../components/app/RichEditor";
import InputField from "../../../components/forms/fields/inputField";
import Button from "../../../components/base/button";
import toast from "react-hot-toast";
import { client } from "../../_app";
import GET_POSTS_QUERY from "../../../../../packages/common/queries/post/getPostsQuery";
import GET_PROFILE_POSTS from "../../../app/profile/queries/getProfilePostsQuery";
import TopBar from "../../../components/app/TopBar";
import Spinner from "../../../components/app/Spinner";
import Link from "next/link";

const RichEditor = dynamic(() => import("../../../components/app/RichEditor"), {
  ssr: false,
});

export default function EditOrsic() {
  const { getOrsicQuery, user, updateOrsicPost, router, postSlug } =
    useEditOrsic();

  return (
    <>
      <Layout title={"Edit | Orsive"}>
        {user.is && getOrsicQuery.loading && (
          <>
            <TopBar loading />
            <Layout title="Orsive">
              <div className="flex items-center justify-center h-[85vh]">
                <Spinner />
              </div>
            </Layout>
          </>
        )}
        <div className="mt-20 flex items-center flex-col">
          {!user.is && (
            <div className="h-[60vh] md:h-[90vh] flex">
              <AccessDenied />
            </div>
          )}
          {getOrsicQuery.data && (
            <>
              <TopBar
                content={
                  <span className="pl-5 font-bold text-xl">
                    Go to{" "}
                    <Link href={`/orsic/${postSlug}`} passHref>
                      <a className="text-blue-500 hover:text-blue-700">Post</a>
                    </Link>
                  </span>
                }
              />
              <div className="w-full flex justify-center mt-2 mb-20 p-1">
                <Formik
                  initialValues={{
                    title: getOrsicQuery.data.getOrsic.title,
                    content: getOrsicQuery.data.getOrsic.content,
                  }}
                  validationSchema={POST_ORSIC_SCHEMA}
                  onSubmit={(values, { setSubmitting }) => {
                    toast
                      .promise(
                        updateOrsicPost({
                          variables: { ...values, slug: postSlug },
                        }),
                        {
                          loading: "Updating...",
                          error: "Something went wrong. Please try again.",
                          success: "Updated Successfully!🚀🚀",
                        }
                      )
                      .then((response) => {
                        let slug = response.data.updateOrsicPost.slug;

                        router.push(`/orsic/${slug}`).then(() => {
                          client.refetchQueries({
                            include: [GET_POSTS_QUERY, GET_PROFILE_POSTS],
                            updateCache(cache) {
                              cache.evict({ fieldName: "getPosts" });
                              cache.evict({ fieldName: "getProfilePosts" });
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
                    <Form onSubmit={handleSubmit} className="w-full lg:w-3/4">
                      <p className="mb-1 font-semibold text-lg text-center md:text-left">
                        Update Orsic
                      </p>
                      {RichEditor ? (
                        <RichEditor
                          initialValue={RichEditorContentParser(
                            getOrsicQuery.data.getOrsic.content
                          )}
                          darkBg
                          value={values.content}
                          onChange={(data) => setFieldValue("content", data)}
                        />
                      ) : (
                        <RichEditorSkeleton dark />
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
                            isSubmitting || errors.title || errors.content
                          }
                          className="block w-full mb-2 px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue ripple-bg-blue-700 disabled:cursor-not-allowed max-w-xl"
                        >
                          Update Orsic
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
