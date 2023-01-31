import { Layout } from '../../components/app/Layout';
import BugSVG from '../../components/svgs/bug.svg';
import { LightBulbIcon, BriefcaseIcon } from '@heroicons/react/solid';
import { useState } from 'react';
import ModalDialog from '../../components/app/Dialog';
import { Form, Formik } from 'formik';
import InputField from '../../components/forms/fields/inputField';
import TextField from '../../components/forms/fields/textInputField';
import Button from '../../components/base/button';
import { SUPPORT_SCHEMA } from '../../components/forms/support/schema/supportSchema';
import { useMutation } from '@apollo/client';
import { ADD_CONTACT_MUTATION } from '../../components/forms/support/mutations/addContactMutation';
import toast from 'react-hot-toast';
import { useUser } from '../../hooks/auth/useUser';
import AccessDenied from '../../components/forms/content/accessDenied';
import { DotsCircleHorizontalIcon } from '@heroicons/react/outline';

export default function Support() {
    const [selectedSupport, setSelectedSupport] = useState<
        | 'bug_report'
        | 'feature_request'
        | 'business_inquiry'
        | 'others'
        | undefined
    >();
    const [open, setOpen] = useState(false);

    const showModal = () => setOpen(true);

    const [addContactMutation] = useMutation(ADD_CONTACT_MUTATION);

    const user = useUser();

    return (
        <Layout title="Support | Orsive">
            <span className="my-5 flex w-full justify-center text-2xl">
                What can we do for you?
            </span>
            <div className="flex w-full flex-wrap justify-center gap-2">
                <button
                    onClick={() => {
                        setSelectedSupport('bug_report');
                        showModal();
                    }}
                    className="relative top-0 flex w-[12rem] flex-col items-center justify-center rounded-md bg-slate-900 p-9 font-semibold transition-all duration-150 ease-in hover:-top-1"
                >
                    <BugSVG className="fill-gray-300" />
                    Bug Report
                </button>
                <button
                    onClick={() => {
                        setSelectedSupport('feature_request');
                        showModal();
                    }}
                    className="relative top-0 flex w-[12rem] flex-col items-center justify-center rounded-md bg-slate-900 p-9 font-semibold transition-all duration-150 ease-in hover:-top-1"
                >
                    <LightBulbIcon className="h-12 w-12 fill-gray-300" />
                    Feature Request
                </button>
                <button
                    onClick={() => {
                        setSelectedSupport('business_inquiry');
                        showModal();
                    }}
                    className="relative top-0 flex w-[12rem] flex-col items-center justify-center rounded-md bg-slate-900 p-9 font-semibold transition-all duration-150 ease-in hover:-top-1"
                >
                    <BriefcaseIcon className="h-12 w-12 fill-gray-300" />
                    Business Inquiry
                </button>
                <button
                    onClick={() => {
                        setSelectedSupport('others');
                        showModal();
                    }}
                    className="relative top-0 flex w-[12rem] flex-col items-center justify-center rounded-md bg-slate-900 p-9 font-semibold transition-all duration-150 ease-in hover:-top-1"
                >
                    <DotsCircleHorizontalIcon className="h-12 w-12" />
                    Others
                </button>
            </div>

            <ModalDialog
                open={open}
                setOpen={setOpen}
                content={
                    <>
                        {user.is ? (
                            <Formik
                                initialValues={{
                                    type: selectedSupport,
                                    content: '',
                                }}
                                validationSchema={SUPPORT_SCHEMA}
                                onSubmit={(values, { setSubmitting }) => {
                                    toast
                                        .promise(
                                            addContactMutation({
                                                variables: values,
                                            }),
                                            {
                                                loading: 'Submitting...',
                                                error: 'Something went wrong. Try again',
                                                success:
                                                    'Submitted successfully!',
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
                                {({
                                    isSubmitting,
                                    handleSubmit,
                                    errors,
                                }: any) => (
                                    <Form
                                        onSubmit={handleSubmit}
                                        className="min-w-[80vw] md:min-w-fit"
                                    >
                                        <span className="font-semibold">
                                            {selectedSupport === 'bug_report' &&
                                                'Bug Report'}
                                            {selectedSupport ===
                                                'business_inquiry' &&
                                                'Business Inquiry'}
                                            {selectedSupport ===
                                                'feature_request' &&
                                                'Feature Request'}
                                            {selectedSupport === 'others' &&
                                                'Others'}
                                        </span>
                                        <InputField
                                            type="hidden"
                                            name="type"
                                            label=""
                                        />
                                        <TextField
                                            name="content"
                                            label="Content"
                                        />
                                        <Button
                                            type="submit"
                                            disabled={
                                                isSubmitting ||
                                                errors.email ||
                                                errors.password
                                            }
                                            className="focus:shadow-outline-blue ripple-bg-blue-700 mt-4 block w-full rounded-lg border border-transparent bg-blue-600 px-4 py-2 text-center text-sm font-medium leading-5 text-white hover:bg-blue-700 focus:outline-none disabled:cursor-not-allowed"
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
