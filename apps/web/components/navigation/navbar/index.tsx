import { useState } from "react";
import Link from "next/link";
import signOut from "../../../app/auth/signOut";
import toast from "react-hot-toast";
import LogoSVG from "../../svgs/logo.svg";
import { useHomeUrl } from "../../../hooks/app/useHomeUrl";
import Button from "../../base/button";
import { useAppState } from "../../../hooks/app/useAppState";
import { useUser } from "../../../hooks/auth/useUser";
import { useRouter } from "next/router";
import Drawer from "react-modern-drawer";

import "react-modern-drawer/dist/index.css";

export const withoutNavbarPaths = [
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

export default function Navbar() {
  const user = useUser();
  const appState = useAppState();
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
              <ProfileDropdown />
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

function ProfileDropdown() {
  const user = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <>
      <button
        className="bg-gray-800 flex text-sm rounded-full"
        onClick={toggleDrawer}
      >
        <span className="sr-only">Open user menu</span>
        <img
          className="h-8 w-8 rounded-full"
          src={user.avatar}
          alt="user avatar"
        />
      </button>
      {isOpen && (
        <style jsx global>{`
          html,
          body {
            margin: 0;
            overflow: hidden;
          }
        `}</style>
      )}
      <Drawer
        overlayOpacity={0.2}
        open={isOpen}
        onClose={toggleDrawer}
        direction="right"
        className="!bg-slate-900"
      >
        <div className="p-4">
          <Link href={`/${user.username}`} passHref>
            <a>
              <div className="flex-col">
                <img
                  src={user.avatar}
                  className="flex rounded-full h-20 w-20 object-cover object-center"
                />
                <div className="flex flex-col justify-center ml-2">
                  <span className="font-semibold text-xl">{user.name}</span>
                  <p className="font-normal text-gray-300">${user.username}</p>
                </div>
              </div>
            </a>
          </Link>

          <div className="flex flex-col w-full mt-3 gap-2">
            <Link href={`/${user.username}`} passHref>
              <a
                className={
                  "font-medium p-2 rounded-md text-sm w-full text-left ripple-bg-slate-800"
                }
              >
                View Profile
              </a>
            </Link>
            <Button
              className={"text-sm w-full text-left ripple-bg-red-600"}
              onClick={() => {
                toast.promise(signOut(), {
                  loading: "Signing out...",
                  success: "Successfully Signed out!",
                  error: "Something went wrong. Try again",
                });
              }}
            >
              Sign out
            </Button>
          </div>
        </div>
      </Drawer>
    </>
  );
}
