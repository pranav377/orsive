import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import classNames from "../../utils/classnames";
import signOut from "../../../app/auth/signOut";
import toast from "react-hot-toast";
import LogoSVG from "../../svgs/logo.svg";
import { useHomeUrl } from "../../../hooks/app/useHomeUrl";
import Button from "../../base/button";
import { useAppState } from "../../../hooks/app/useAppState";
import { useUser } from "../../../hooks/auth/useUser";
import { useRouter } from "next/router";

export default function Navbar() {
  const user = useUser();
  const appState = useAppState();
  const withoutNavbarPaths = [
    "/",
    "/auth",
    "/image/[image_slug]",
    "/orsic/[orsic_slug]",
    "/image/[image_slug]/comments/[comment_slug]",
    "/orsic/[orsic_slug]/comments/[comment_slug]",
    "/image/[image_slug]/comments/[comment_slug]/replies/[reply_slug]",
    "/orsic/[orsic_slug]/comments/[comment_slug]/replies/[reply_slug]",
    "/edit/image/[image_slug]",
    "/edit/orsic/[orsic_slug]",
    "/[profile_slug]",
  ];
  const router = useRouter();

  const homeUrl = useHomeUrl();

  if (!withoutNavbarPaths.includes(router.pathname) && appState.showBars) {
    return (
      <>
        <div className="bg-slate-900 p-5 w-full grid grid-cols-6 gap-0">
          <Link href={homeUrl} passHref>
            <a className="w-fit">
              <div className="flex items-center">
                <LogoSVG className="h-10" />
                {router.pathname === "/" && (
                  <span className="font-semibold text-lg">Orsive</span>
                )}
              </div>
            </a>
          </Link>
          <div className="flex flex-row col-start-2 col-end-7 items-center justify-end">
            {user.is ? (
              <ProfileDropdown avatar={user.avatar} username={user.username} />
            ) : (
              <Link href="/auth" passHref>
                <a>
                  <Button className="bg-blue-600 hover:bg-blue-700 ripple-bg-blue-600">
                    Login
                  </Button>
                </a>
              </Link>
            )}
          </div>
        </div>
      </>
    );
  } else {
    return null;
  }
}

function ProfileDropdown(props: { avatar: string; username: string }) {
  return (
    <Menu as="div" className="ml-3 relative">
      <div>
        <Menu.Button className="bg-gray-800 flex text-sm rounded-full">
          <span className="sr-only">Open user menu</span>
          <img
            className="h-8 w-8 rounded-full"
            src={props.avatar}
            alt="user avatar"
          />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-slate-700 z-50">
          <Menu.Item>
            {({ active }) => (
              <Link href={`/${props.username}`} passHref>
                <a
                  className={classNames(
                    active ? "bg-slate-500" : "",
                    "block px-4 py-2 text-sm bg-slate-700 transition-all duration-300"
                  )}
                >
                  Your Profile
                </a>
              </Link>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button
                className={classNames(
                  active ? "bg-slate-500" : "",
                  "block px-4 py-2 text-sm w-full text-left bg-slate-700 transition-all duration-300"
                )}
                onClick={async () => {
                  await signOut();
                  toast.success("Successfully Signed out!");
                }}
              >
                Sign out
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
