import { useMutation } from "@apollo/client";
import CONTENT_CASES from "../../../../app/store/reducers/content/cases";
import store from "../../../../app/store/store";
import { usePostContentState } from "../../../../hooks/app/content/usePostContentState";
import Modal from "../../../app/Modal";
import ADD_IMAGE_POST_MUTATION from "./mutation_schema/addImagePostMutation";
import { Formik, Form } from "formik";
import { POST_IMAGE_SCHEMA } from "./validation_schema/postImageSchema";
import Button from "../../../base/button";
import ImageField from "../../fields/imageField";
import TextField from "../../fields/textInputField";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import AccessDenied from "../accessDenied";
import { useUser } from "../../../../hooks/auth/useUser";

function closePostImageModal() {
  store.dispatch({ type: CONTENT_CASES.HIDE_POST_IMAGE });
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
      <div className="w-full flex justify-center">
        <Formik
          initialValues={{
            title: "",
            image: null,
          }}
          validationSchema={POST_IMAGE_SCHEMA}
          onSubmit={(values, { setSubmitting }) => {
            toast
              .promise(addImagePost({ variables: values }), {
                loading: "Uploading...",
                error: "Something went wrong. Please try again.",
                success: "Posted Successfully!🚀🚀",
              })
              .then((response) => {
                let slug = response.data.addImagePost.slug;

                closePostImageModal();
                router.push(`/image/${slug}`);
              })
              .catch((err) => console.error(err))
              .finally(() => setSubmitting(false));
          }}
        >
          {({ isSubmitting, handleSubmit, errors, setFieldValue }: any) => (
            <Form onSubmit={handleSubmit} className="w-full lg:w-3/4">
              <ImageField
                errors={errors}
                label="Upload Image"
                name="image"
                setFieldValue={setFieldValue}
              />
              <TextField name="title" label="Description (optional)" />
              <div className="flex w-full justify-center">
                <Button
                  type="submit"
                  disabled={isSubmitting || errors.title || errors.image}
                  className="block w-full mb-2 px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue ripple-bg-blue-700 disabled:cursor-not-allowed max-w-xl"
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
