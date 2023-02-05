import SpaceShip from '../components/svgs/space-ship.svg';
import GoogleSVG from '../components/svgs/google-color-logo.svg';
import DiscordSVG from '../components/svgs/discord-color-logo.svg';
import AuthSVG from '../components/svgs/auth.svg';
import LoginSVG from '../components/svgs/login.svg';
import SignUpForm from '../components/forms/signup-form';
import LoginForm from '../components/forms/login-form';
import { useAuthPage } from '../hooks/auth/useAuthPage';
import { ArrowLeftIcon, XIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { DISCORD_AUTH_URL, GOOGLE_AUTH_URL } from '../config';
import { Layout } from '../components/app/Layout';
import PasswordResetForm from '../components/forms/password-reset-form';

export default function Auth() {
    const { currPage, setCurrPage } = useAuthPage();

    return (
        <div className="mt-12 -mb-24">
            {currPage === 'signup' && <SignUpPage setCurrPage={setCurrPage} />}
            {currPage === 'login' && <LoginPage setCurrPage={setCurrPage} />}
            {currPage === 'password_reset' && (
                <PasswordResetPage setCurrPage={setCurrPage} />
            )}
        </div>
    );
}

function ExtraAuthButtons() {
    const router = useRouter();
    return (
        <>
            <div className="flex justify-center gap-2">
                <button
                    onClick={() => router.push(GOOGLE_AUTH_URL)}
                    className="ripple-bg-gray-200 inline-flex w-[30%] cursor-pointer justify-center rounded-md px-4 py-2 text-sm font-medium shadow-sm disabled:cursor-wait disabled:opacity-50"
                >
                    <span className="sr-only">Sign up with Google</span>
                    <GoogleSVG className="h-5 w-4" />
                </button>
                <button
                    onClick={() => router.push(DISCORD_AUTH_URL)}
                    className="ripple-bg-gray-200 inline-flex w-[30%] cursor-pointer justify-center rounded-md px-4 py-2 text-sm font-medium shadow-sm disabled:cursor-wait disabled:opacity-50"
                >
                    <span className="sr-only">Sign up with Discord</span>
                    <DiscordSVG className="h-5 w-5" />
                </button>
            </div>

            <span className="mt-2 flex w-full items-center justify-center font-medium">
                Or
            </span>
        </>
    );
}

function PasswordResetPage(props: { setCurrPage: any }) {
    return (
        <>
            <Layout title={'Reset your Password | Orsive'}>
                <div className="flex min-h-[80vh] items-center">
                    <div className="mx-auto h-full max-w-4xl flex-1 rounded-lg ">
                        <div className="flex flex-col lg:flex-row">
                            <div className="mt-9 flex h-32 min-h-[30vh]  justify-center lg:mt-0 lg:h-auto lg:w-1/2">
                                <AuthSVG />
                            </div>
                            <div className="flex items-center justify-center p-6 sm:p-12 lg:w-1/2">
                                <div className="w-full">
                                    <h3 className="mb-4 text-center text-2xl font-bold ">
                                        Reset your password
                                    </h3>

                                    <PasswordResetForm
                                        setCurrPage={props.setCurrPage}
                                    />

                                    <div className="mt-4 text-center">
                                        <p className="text-sm">
                                            Already a Smarty Capty?{' '}
                                            <button
                                                onClick={() =>
                                                    props.setCurrPage('login')
                                                }
                                                className="text-blue-600 hover:underline"
                                            >
                                                Sign In.
                                            </button>
                                        </p>
                                        <Link
                                            href="/"
                                            passHref
                                            className="m-2 flex items-center justify-center text-sm font-semibold text-blue-600"
                                        >
                                            <ArrowLeftIcon className="mr-1 h-4 w-4" />{' '}
                                            Back to Orsive
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
}

function SignUpPage(props: { setCurrPage: any }) {
    return (
        <>
            <Layout title={'Become a captain | Orsive'}>
                <div className="flex min-h-[80vh] items-center">
                    <div className="mx-auto h-full max-w-4xl flex-1 rounded-lg ">
                        <div className="flex flex-col lg:flex-row">
                            <div className="mt-9 flex h-32 min-h-[30vh]  justify-center lg:mt-0 lg:h-auto lg:w-1/2">
                                <AuthSVG />
                            </div>
                            <div className="flex items-center justify-center p-6 sm:p-12 lg:w-1/2">
                                <div className="w-full">
                                    <h3 className="mb-4 text-center text-2xl font-bold ">
                                        Create an account!
                                    </h3>
                                    <ExtraAuthButtons />

                                    <SignUpForm />

                                    <div className="mt-4 text-center">
                                        <p className="text-sm">
                                            Already a Smarty Capty?{' '}
                                            <button
                                                onClick={() =>
                                                    props.setCurrPage('login')
                                                }
                                                className="text-blue-600 hover:underline"
                                            >
                                                Sign In.
                                            </button>
                                        </p>
                                        <Link
                                            href="/"
                                            passHref
                                            className="m-2 flex items-center justify-center text-sm font-semibold text-blue-600"
                                        >
                                            <ArrowLeftIcon className="mr-1 h-4 w-4" />{' '}
                                            Back to Orsive
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
}

function LoginPage(props: { setCurrPage: any }) {
    return (
        <>
            <Layout title={'Login | Orsive'}>
                <div className="flex min-h-[80vh] items-center">
                    <div className="mx-auto h-full max-w-4xl flex-1 rounded-lg ">
                        <div className="flex flex-col lg:flex-row">
                            <div className="mt-0 flex h-28 min-h-[30vh]  justify-center lg:h-auto lg:w-1/2">
                                <LoginSVG />
                            </div>
                            <div className="flex items-center justify-center p-6 sm:p-12 lg:w-1/2">
                                <div className="w-full">
                                    <div className="hidden justify-center lg:flex">
                                        <SpaceShip className="h-20 w-20" />
                                    </div>
                                    <h3 className="mb-2 text-center text-lg font-semibold">
                                        Welcome Aboard Captain!
                                    </h3>
                                    <h3 className="mb-4 text-center text-lg font-bold md:text-2xl ">
                                        Sign In to continue
                                    </h3>

                                    <ExtraAuthButtons />

                                    <LoginForm />
                                    <button
                                        onClick={() =>
                                            props.setCurrPage('password_reset')
                                        }
                                        className="mt-1 text-sm text-blue-600 hover:underline"
                                    >
                                        Forgot Password?
                                    </button>

                                    <div className="mt-2 text-center">
                                        <p className="text-sm">
                                            Wanna be a Smarty Capty?{' '}
                                            <button
                                                onClick={() =>
                                                    props.setCurrPage('signup')
                                                }
                                                className="text-blue-600 hover:underline"
                                            >
                                                Sign Up.
                                            </button>
                                            <Link
                                                href="/"
                                                passHref
                                                className="m-2 flex items-center justify-center text-sm font-semibold text-blue-600"
                                            >
                                                <ArrowLeftIcon className="mr-1 h-4 w-4" />{' '}
                                                Back to Orsive
                                            </Link>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
}
