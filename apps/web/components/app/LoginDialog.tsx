import ModalDialog from './Dialog';
import { usePostContentState } from '../../hooks/app/content/usePostContentState';
import Link from 'next/link';
import { store } from '../../store';
import { ContentStateActions } from '../../store/slices/contentSlice';

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
                        <div className="flex w-full min-w-[80vw] flex-col items-center justify-center md:min-w-fit">
                            <img
                                src="/cool.webp"
                                alt="Animation showing cool gesture"
                                className="my-3 w-[50%]"
                            />
                            <Link
                                href={`/auth?page=signup`}
                                onClick={() => {
                                    setLoginDialogOpen(false);
                                }}
                                className="ripple-bg-blue-600 mb-1 inline-flex w-full justify-center rounded-md px-4 py-2 text-base font-medium shadow-sm sm:text-sm"
                            >
                                Sign Up
                            </Link>

                            <Link
                                href={`/auth`}
                                onClick={() => {
                                    setLoginDialogOpen(false);
                                }}
                                className="ripple-bg-gray-600 inline-flex w-full justify-center rounded-md px-4 py-2 text-base font-medium shadow-sm sm:text-sm"
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
