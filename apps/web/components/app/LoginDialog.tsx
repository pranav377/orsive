import ModalDialog from "./Dialog";
import { usePostContentState } from "../../hooks/app/content/usePostContentState";
import store from "../../app/store/store";
import CONTENT_CASES from "../../app/store/reducers/content/cases";
import Link from "next/link";

function setLoginDialogOpen(_value: boolean) {
  store.dispatch({
    type: CONTENT_CASES.HIDE_LOGIN_DIALOG,
  });
}

export default function LoginDialog() {
  const { loginDialog } = usePostContentState();

  return (
    <>
      <ModalDialog
        open={loginDialog}
        setOpen={setLoginDialogOpen}
        heading="Join Orsive"
        content={
          <>
            <div className="flex flex-col w-full items-center justify-center min-w-[80vw] md:min-w-fit">
              <img src="/cool.webp" className="my-3 w-[50%]" />
              <Link href={`/auth?page=signup`} passHref>
                <a
                  onClick={() => {
                    setLoginDialogOpen(false);
                  }}
                  className="w-full inline-flex justify-center rounded-md shadow-sm px-4 py-2 ripple-bg-blue-600 text-base font-medium sm:text-sm mb-1"
                >
                  Sign Up
                </a>
              </Link>

              <Link href={`/auth`} passHref>
                <a
                  onClick={() => {
                    setLoginDialogOpen(false);
                  }}
                  className="w-full inline-flex justify-center rounded-md shadow-sm px-4 py-2 ripple-bg-gray-600 text-base font-medium sm:text-sm"
                >
                  Login
                </a>
              </Link>
            </div>
          </>
        }
      />
    </>
  );
}
