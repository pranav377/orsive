import { Dispatch, SetStateAction } from 'react';
import Button from '../../base/button';
import { Formik, Form } from 'formik';
import { SIGN_UP_STEP_2_SCHEMA } from './schema/signUpStep2';
import InputField from '../fields/inputField';
import { client } from '../../../pages/_app';
import { gql } from '@apollo/client';
import SignUp from '../../../logic/auth/signUp';
import OTPButton from './subcomponents/otpButton';
import { useStore } from 'react-redux';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

export default function SignUpStep2(props: {
    signUpFormState: {
        step: number;
        email: string;
        password: string;
        confirm_password: string;
        username: string;
        name: string;
        otp: string;
    };
    setSignUpFormState: Dispatch<
        SetStateAction<{
            step: number;
            email: string;
            password: string;
            confirm_password: string;
            username: string;
            name: string;
            otp: string;
        }>
    >;
}) {
    const store = useStore();
    const router = useRouter();

    return (
        <Formik
            initialValues={{ username: '', name: '', otp: '' }}
            validationSchema={SIGN_UP_STEP_2_SCHEMA}
            onSubmit={(data, { setSubmitting, setErrors }) => {
                client
                    .query({
                        query: gql`
            query {
              checkUsername(username: "${data.username}")
            }
          `,
                    })
                    .then(() => {
                        props.setSignUpFormState((prevState) => {
                            const newState = {
                                ...prevState,
                                name: data.name,
                                username: data.username,
                                otp: data.otp,
                            };

                            toast
                                .promise(SignUp(newState), {
                                    loading: 'Signing Up.....',
                                    error: 'OTP is not valid!😑',
                                    success:
                                        'Signed up and Signed in successfully!🚀🚀',
                                })
                                .then(() => {
                                    router.push('/');
                                })
                                .catch((err) => {
                                    console.error(err);
                                    setErrors({
                                        otp: 'OTP is not valid',
                                    });
                                });

                            return newState;
                        });
                    })
                    .catch(() => {
                        setErrors({
                            username: 'Username is not available',
                        });
                        toast.error('Username is not available!😑');
                    })
                    .finally(() => setSubmitting(false));
            }}
        >
            {({ isSubmitting, handleSubmit, errors }: any) => (
                <Form onSubmit={handleSubmit}>
                    <InputField type="text" name="username" label="Username" />
                    <InputField type="text" name="name" label="Name" />
                    <InputField type="text" name="otp" label="OTP" />
                    <OTPButton email={props.signUpFormState.email} />
                    <Button
                        type="submit"
                        disabled={
                            isSubmitting ||
                            errors.email ||
                            errors.password ||
                            errors.confirm_password
                        }
                        className="focus:shadow-outline-blue ripple-bg-blue-700 mt-4 block w-full rounded-lg border border-transparent bg-blue-600 px-4 py-2 text-center text-sm font-medium leading-5 text-white hover:bg-blue-700 focus:outline-none disabled:cursor-not-allowed"
                    >
                        Sign Up
                    </Button>
                </Form>
            )}
        </Formik>
    );
}
