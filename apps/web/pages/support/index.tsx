import { Layout } from "../../components/app/Layout";
import BugSVG from "../../components/svgs/bug.svg";
import { LightBulbIcon, BriefcaseIcon } from "@heroicons/react/solid";
import { useState } from "react";
import ModalDialog from "../../components/app/Dialog";
import { Form, Formik } from "formik";
import InputField from "../../components/forms/fields/inputField";
import TextField from "../../components/forms/fields/textInputField";
import Button from "../../components/base/button";
import { SUPPORT_SCHEMA } from "../../components/forms/support/schema/supportSchema";
import { useMutation } from "@apollo/client";
import { ADD_CONTACT_MUTATION } from "../../components/forms/support/mutations/addContactMutation";
import toast from "react-hot-toast";
import { useUser } from "../../hooks/auth/useUser";
import AccessDenied from "../../components/forms/content/accessDenied";

export default function Support() {
  const [selectedSupport, setSelectedSupport] = useState<
    "bug_report" | "feature_request" | "business_inquiry" | undefined
  >();
  const [open, setOpen] = useState(false);

  const showModal = () => setOpen(true);

  const [addContactMutation] = useMutation(ADD_CONTACT_MUTATION);

  const user = useUser();

  return (
    <Layout title="Support | Orsive">
      <span className="w-full flex justify-center my-5 text-2xl">
        What can we do for you?
      </span>
      <div className="w-full flex justify-center flex-wrap gap-2">
        <button
          onClick={() => {
            setSelectedSupport("bug_report");
            showModal();
          }}
          className="w-[12rem] flex flex-col items-center justify-center font-semibold bg-slate-900 p-9 rounded-md relative transition-all duration-150 ease-in top-0 hover:-top-1"
        >
          <BugSVG className="fill-gray-300" />
          Bug Report
        </button>
        <button
          onClick={() => {
            setSelectedSupport("feature_request");
            showModal();
          }}
          className="w-[12rem] flex flex-col items-center justify-center font-semibold bg-slate-900 p-9 rounded-md relative transition-all duration-150 ease-in top-0 hover:-top-1"
        >
          <LightBulbIcon className="fill-gray-300 w-12 h-12" />
          Feature Request
        </button>
        <button
          onClick={() => {
            setSelectedSupport("business_inquiry");
            showModal();
          }}
          className="w-[12rem] flex flex-col items-center justify-center font-semibold bg-slate-900 p-9 rounded-md relative transition-all duration-150 ease-in top-0 hover:-top-1"
        >
          <BriefcaseIcon className="fill-gray-300 w-12 h-12" />
          Business Inquiry
        </button>
      </div>

      <ModalDialog
        open={open}
        setOpen={setOpen}
        content={
          <>
            {user.is ? (
              <Formik
                initialValues={{ type: selectedSupport, content: "" }}
                validationSchema={SUPPORT_SCHEMA}
                onSubmit={(values, { setSubmitting }) => {
                  toast
                    .promise(
                      addContactMutation({
                        variables: values,
                      }),
                      {
                        loading: "Submitting...",
                        error: "Something went wrong. Try again",
                        success: "Submitted successfully!",
                      }
                    )
                    .then(() => {
                      setSelectedSupport(undefined);
                      setOpen(false);
                    })
                    .catch(() => {})
                    .finally(() => setSubmitting(false));
                }}
              >
                {({ isSubmitting, handleSubmit, errors }: any) => (
                  <Form
                    onSubmit={handleSubmit}
                    className="min-w-[80vw] md:min-w-fit"
                  >
                    <span className="font-semibold">
                      {selectedSupport === "bug_report" && "Bug Report"}
                      {selectedSupport === "business_inquiry" &&
                        "Business Inquiry"}
                      {selectedSupport === "feature_request" &&
                        "Feature Request"}
                    </span>
                    <InputField type="hidden" name="type" label="" />
                    <TextField name="content" label="Content" />
                    <Button
                      type="submit"
                      disabled={isSubmitting || errors.email || errors.password}
                      className="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue ripple-bg-blue-700 disabled:cursor-not-allowed"
                    >
                      Submit
                    </Button>
                  </Form>
                )}
              </Formik>
            ) : (
              <AccessDenied />
            )}
          </>
        }
      />
    </Layout>
  );
}
