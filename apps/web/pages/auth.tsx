import SpaceShip from "../components/svgs/space-ship.svg";
import GoogleSVG from "../components/svgs/google-color-logo.svg";
import DiscordSVG from "../components/svgs/discord-color-logo.svg";
import AuthSVG from "../components/svgs/auth.svg";
import LoginSVG from "../components/svgs/login.svg";
import SignUpForm from "../components/forms/signup-form";
import LoginForm from "../components/forms/login-form";
import { useAuthPage } from "../hooks/auth/useAuthPage";
import { ArrowLeftIcon, XIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { useRouter } from "next/router";
import { DISCORD_AUTH_URL, GOOGLE_AUTH_URL } from "../config";
import { Layout } from "../components/app/Layout";
import PasswordResetForm from "../components/forms/password-reset-form";

export default function Auth() {
  const { currPage, setCurrPage } = useAuthPage();

  return (
    <div className="mt-12 -mb-24">
      {currPage === "signup" && <SignUpPage setCurrPage={setCurrPage} />}
      {currPage === "login" && <LoginPage setCurrPage={setCurrPage} />}
      {currPage === "password_reset" && (
        <PasswordResetPage setCurrPage={setCurrPage} />
      )}
    </div>
  );
}

function ExtraAuthButtons() {
  const router = useRouter();
  return (
    <>
      <div className="grid grid-cols-2 gap-2 mt-1">
        <div>
          <button
            onClick={() => router.push(GOOGLE_AUTH_URL)}
            className=" inline-flex justify-center w-full px-4 py-2 text-sm font-medium ripple-bg-gray-200 rounded-md shadow-sm cursor-pointer disabled:opacity-50 disabled:cursor-wait"
          >
            <span className="sr-only">Sign up with Google</span>
            <GoogleSVG className="w-5 h-6" />
          </button>
        </div>
        <div>
          <button
            onClick={() => router.push(DISCORD_AUTH_URL)}
            className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium ripple-bg-gray-200 rounded-md shadow-sm cursor-pointer disabled:opacity-50 disabled:cursor-wait"
          >
            <span className="sr-only">Sign up with GitHub</span>
            <DiscordSVG className="w-6 h-6" />
          </button>
        </div>
      </div>

      <span className="flex items-center justify-center w-full mt-2 font-medium">
        Or
      </span>
    </>
  );
}

function PasswordResetPage(props: { setCurrPage: any }) {
  return (
    <>
      <Layout title={"Reset your Password | Orsive"}>
        <div className="flex items-center min-h-[80vh]">
          <div className="flex-1 h-full max-w-4xl mx-auto rounded-lg ">
            <div className="flex flex-col lg:flex-row">
              <div className="h-32 lg:h-auto lg:w-1/2 flex  min-h-[30vh] justify-center mt-9 lg:mt-0">
                <AuthSVG />
              </div>
              <div className="flex items-center justify-center p-6 sm:p-12 lg:w-1/2">
                <div className="w-full">
                  <h3 className="mb-4 text-2xl font-bold text-center ">
                    Reset your password
                  </h3>

                  <PasswordResetForm setCurrPage={props.setCurrPage} />

                  <div className="mt-4 text-center">
                    <p className="text-sm">
                      Already a Smarty Capty?{" "}
                      <button
                        onClick={() => props.setCurrPage("login")}
                        className="text-blue-600 hover:underline"
                      >
                        Sign In.
                      </button>
                    </p>
                    <Link
                      href="/"
                      passHref
                      className="text-sm flex items-center justify-center m-2 font-semibold text-blue-600"
                    >
                      <ArrowLeftIcon className="w-4 h-4 mr-1" /> Back to Orsive
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
      <Layout title={"Become a captain | Orsive"}>
        <div className="flex items-center min-h-[80vh]">
          <div className="flex-1 h-full max-w-4xl mx-auto rounded-lg ">
            <div className="flex flex-col lg:flex-row">
              <div className="h-32 lg:h-auto lg:w-1/2 flex  min-h-[30vh] justify-center mt-9 lg:mt-0">
                <AuthSVG />
              </div>
              <div className="flex items-center justify-center p-6 sm:p-12 lg:w-1/2">
                <div className="w-full">
                  <h3 className="mb-4 text-2xl font-bold text-center ">
                    Create an account!
                  </h3>
                  <ExtraAuthButtons />

                  <SignUpForm />

                  <div className="mt-4 text-center">
                    <p className="text-sm">
                      Already a Smarty Capty?{" "}
                      <button
                        onClick={() => props.setCurrPage("login")}
                        className="text-blue-600 hover:underline"
                      >
                        Sign In.
                      </button>
                    </p>
                    <Link
                      href="/"
                      passHref
                      className="text-sm flex items-center justify-center m-2 font-semibold text-blue-600"
                    >
                      <ArrowLeftIcon className="w-4 h-4 mr-1" /> Back to Orsive
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
      <Layout title={"Login | Orsive"}>
        <div className="flex items-center min-h-[80vh]">
          <div className="flex-1 h-full max-w-4xl mx-auto rounded-lg ">
            <div className="flex flex-col lg:flex-row">
              <div className="h-32 lg:h-auto lg:w-1/2 flex  min-h-[30vh] justify-center mt-0">
                <LoginSVG />
              </div>
              <div className="flex items-center justify-center p-6 sm:p-12 lg:w-1/2">
                <div className="w-full">
                  <div className="justify-center hidden lg:flex">
                    <SpaceShip className="w-20 h-20" />
                  </div>
                  <h3 className="text-lg font-semibold text-center mb-2">
                    Welcome Aboard Captain!
                  </h3>
                  <h3 className="mb-4 text-2xl font-bold text-center ">
                    Sign In to continue
                  </h3>

                  <ExtraAuthButtons />

                  <LoginForm />
                  <button
                    onClick={() => props.setCurrPage("password_reset")}
                    className="text-blue-600 hover:underline text-sm mt-1"
                  >
                    Forgot Password?
                  </button>

                  <div className="mt-2 text-center">
                    <p className="text-sm">
                      Wanna be a Smarty Capty?{" "}
                      <button
                        onClick={() => props.setCurrPage("signup")}
                        className="text-blue-600 hover:underline"
                      >
                        Sign Up.
                      </button>
                      <Link
                        href="/"
                        passHref
                        className="text-sm flex items-center justify-center m-2 font-semibold text-blue-600"
                      >
                        <ArrowLeftIcon className="w-4 h-4 mr-1" /> Back to
                        Orsive
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

function DisabledAuthPage() {
  return (
    <>
      <Layout title="Authentication disabled | Orsive">
        <div className="flex items-center min-h-[80vh]">
          <div className="flex-1 h-full max-w-4xl mx-auto rounded-lg ">
            <div className="flex flex-col lg:flex-row">
              <div className="h-32 lg:h-auto lg:w-1/2 flex  min-h-[30vh] justify-center mt-0">
                <LoginSVG />
              </div>
              <div className="flex flex-col items-center justify-center p-6 sm:p-12 lg:w-1/2">
                <div className="h-32 lg:h-auto lg:w-1/2 flex  min-h-[20vh] justify-center mt-0">
                  <XIcon className="text-red-600" />
                </div>
                <h3 className="mb-4 text-2xl font-bold text-center ">
                  Authentication is temporarily disabled.
                </h3>
                <div className="w-full">
                  <div className="mt-4 text-center">
                    <Link
                      href="/"
                      passHref
                      className="text-sm flex items-center justify-center m-2 font-semibold text-blue-600"
                    >
                      <ArrowLeftIcon className="w-4 h-4 mr-1" /> Back to Orsive
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
