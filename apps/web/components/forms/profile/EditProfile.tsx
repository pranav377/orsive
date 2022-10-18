import { useMutation } from "@apollo/client";
import { Form, Formik } from "formik";
import { NextRouter, useRouter } from "next/router";
import toast from "react-hot-toast";
import CONTENT_CASES from "../../../app/store/reducers/content/cases";
import store from "../../../app/store/store";
import { usePostContentState } from "../../../hooks/app/content/usePostContentState";
import { useUser } from "../../../hooks/auth/useUser";
import { ProfileType } from "../../../pages/[profile_slug]";
import Modal from "../../app/Modal";
import Button from "../../base/button";
import ImageField from "../fields/imageField";
import InputField from "../fields/inputField";
import EDIT_PROFILE_MUTATION from "./mutations/editProfileMutation";

function closeEditProfileModal() {
  store.dispatch({ type: CONTENT_CASES.HIDE_EDIT_PROFILE });
}

export default function EditProfile(props: {
  profile: ProfileType;
  refreshData: (router: NextRouter, username: string) => void;
}) {
  const postContentState = usePostContentState();

  return (
    <Modal
      show={postContentState.editProfile}
      closeModal={closeEditProfileModal}
      content={
        <>
          <EditProfileForm {...props} />
        </>
      }
    />
  );
}

function EditProfileForm(props: {
  profile: ProfileType;
  refreshData: (router: NextRouter, username: string) => void;
}) {
  const user = useUser();
  const [editProfileMutation] = useMutation(EDIT_PROFILE_MUTATION);
  const router = useRouter();
  return (
    <>
      <div className="w-full flex justify-center">
        <Formik
          initialValues={{
            username: props.profile.username,
            avatar: null,
            banner: null,
            name: props.profile.name,
            bio: props.profile.bio,
          }}
          onSubmit={(values, { setSubmitting }) => {
            toast
              .promise(editProfileMutation({ variables: values }), {
                loading: "Editing...",
                error: "Something went wrong. Please try again.",
                success: "Profile Edited.",
              })
              .then(() => {
                props.refreshData(router, values.username);
              })
              .catch((err) => console.error(err))
              .finally(() => setSubmitting(false));
          }}
        >
          {({ isSubmitting, handleSubmit, errors, setFieldValue }: any) => (
            <Form onSubmit={handleSubmit} className="w-full lg:w-3/4">
              <InputField type="text" name="username" label="Username" />
              <ImageField
                imageClassname="max-w-xs"
                previewImage={user.avatar}
                errors={errors}
                label="Change Avatar"
                name="avatar"
                setFieldValue={setFieldValue}
              />
              <InputField type="text" name="name" label="Name" />
              <InputField type="text" name="bio" label="Bio" />
              <ImageField
                {...(props.profile.banner && {
                  previewImage: props.profile.banner,
                })}
                errors={errors}
                label={props.profile.banner ? "Change Banner" : "Add Banner"}
                name="banner"
                setFieldValue={setFieldValue}
              />
              <div className="flex w-full justify-center">
                <Button
                  type="submit"
                  disabled={
                    isSubmitting ||
                    errors.username ||
                    errors.avatar ||
                    errors.banner ||
                    errors.name ||
                    errors.bio
                  }
                  className="block w-full mb-2 px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue ripple-bg-blue-700 disabled:cursor-not-allowed max-w-xl"
                >
                  Update Profile
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}
