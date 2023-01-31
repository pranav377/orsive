import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import SignIn from '../../../logic/auth/signIn';
import Button from '../../base/button';
import InputField from '../fields/inputField';
import { LOGIN_SCHEMA } from '../../../../../packages/common/forms';

export default function LoginForm() {
    const router = useRouter();

    return (
        <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={LOGIN_SCHEMA}
            onSubmit={(values, { setSubmitting }) => {
                toast
                    .promise(SignIn(values), {
                        loading: 'Signing In....',
                        success: <p>Signed in Successfully🚀🚀</p>,
                        error: (
                            <p>
                                <span className="font-bold">Email</span> or{' '}
                                <span className="font-bold">Password</span> is
                                wrong!😑
                            </p>
                        ),
                    })
                    .then(() => {
                        router.push('/feed');
                    })
                    .catch((error) => {
                        console.log(error);
                    })
                    .finally(() => setSubmitting(false));
            }}
        >
            {({ isSubmitting, handleSubmit, errors }: any) => (
                <Form onSubmit={handleSubmit}>
                    <InputField type="email" name="email" label="Email" />
                    <InputField
                        type="password"
                        name="password"
                        label="Password"
                    />
                    <Button
                        type="submit"
                        disabled={
                            isSubmitting || errors.email || errors.password
                        }
                        className="focus:shadow-outline-blue ripple-bg-blue-700 mt-4 block w-full rounded-lg border border-transparent bg-blue-600 px-4 py-2 text-center text-sm font-medium leading-5 text-white hover:bg-blue-700 focus:outline-none disabled:cursor-not-allowed"
                    >
                        Let's Go🚀
                    </Button>
                </Form>
            )}
        </Formik>
    );
}
