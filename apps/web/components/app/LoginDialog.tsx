import ModalDialog from "./Dialog";
import { usePostContentState } from "../../hooks/app/content/usePostContentState";
import Link from "next/link";
import { store } from "../../store";
import { ContentStateActions } from "../../store/slices/contentSlice";

function setLoginDialogOpen(_value: boolean) {
  store.dispatch(ContentStateActions.setShowLoginDialog(false));
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
              <img
                src="/cool.webp"
                alt="Animation showing cool gesture"
                className="my-3 w-[50%]"
              />
              <Link
                href={`/auth?page=signup`}
                passHref
                onClick={() => {
                  setLoginDialogOpen(false);
                }}
                className="w-full inline-flex justify-center rounded-md shadow-sm px-4 py-2 ripple-bg-blue-600 text-base font-medium sm:text-sm mb-1"
              >
                Sign Up
              </Link>

              <Link
                href={`/auth`}
                passHref
                onClick={() => {
                  setLoginDialogOpen(false);
                }}
                className="w-full inline-flex justify-center rounded-md shadow-sm px-4 py-2 ripple-bg-gray-600 text-base font-medium sm:text-sm"
              >
                Login
              </Link>
            </div>
          </>
        }
      />
    </>
  );
}
