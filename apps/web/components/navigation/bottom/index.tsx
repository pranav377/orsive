import Link from "next/link";
import { useRouter } from "next/router";
import classNames from "../../utils/classnames";
import { useDispatch } from "react-redux";
import CONTENT_CASES from "../../../app/store/reducers/content/cases";
import PostOrsic from "../../forms/content/post-orsic";
import PostImage from "../../forms/content/post-image";
import Modal from "../../app/Modal";
import {
  NewspaperIcon,
  PhotographIcon,
  QuestionMarkCircleIcon,
  SearchIcon,
  UserIcon,
  HomeIcon,
  BellIcon,
  PlusIcon,
} from "@heroicons/react/solid";
import PostCards from "../../app/PostCard/PostCards";
import PostCard from "../../app/PostCard";
import { usePostContentState } from "../../../hooks/app/content/usePostContentState";
import { useHomeUrl } from "../../../hooks/app/useHomeUrl";
import { useAppState } from "../../../hooks/app/useAppState";
import { useUser } from "../../../hooks/auth/useUser";
import { showLoginDialog } from "../../../app/auth/showLoginDialog";
import { useRef } from "react";
import { withoutNavbarPaths } from "../navbar";

export default function BottomNavigation() {
  const router = useRouter();
  const appState = useAppState();
  const user = useUser();
  const homeUrl = useHomeUrl();

  if (!withoutNavbarPaths.includes(router.pathname) && appState.showBars) {
    return (
      <>
        <div className="fixed left-0 right-0 bottom-2  p-5 px-6 m-2   flex items-center justify-between   bg-gray-900 shadow-3xl text-gray-400 rounded-2xl">
          <Link
            href={{
              pathname: homeUrl,
            }}
            passHref
          >
            <a
              className={classNames(
                router.pathname === homeUrl && "text-blue-400",
                "flex flex-col items-center transition ease-in duration-200 hover:text-blue-400"
              )}
            >
              <HomeIcon className="h-6 w-6" />
            </a>
          </Link>
          <Link href={"/search"} passHref>
            <a
              className={classNames(
                router.pathname === "/search" && "text-blue-400",
                "flex flex-col items-center transition ease-in duration-200 hover:text-blue-400"
              )}
            >
              <SearchIcon className="h-6 w-6" />
            </a>
          </Link>

          <AddPostDropup />
          <Link href={"/notifications"} passHref>
            <span className="relative inline-flex">
              <a
                className={classNames(
                  router.pathname === "/notifications" && "text-blue-400",
                  "flex flex-col items-center transition ease-in duration-200 hover:text-blue-400"
                )}
              >
                <BellIcon className="h-6 w-6" />
              </a>
              {user.unreadNotifications && (
                <span className="flex absolute h-2 w-2 top-0 right-0 -mt-1 -mr-1">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
                </span>
              )}
            </span>
          </Link>
          {user.is ? (
            <Link href={`/${user.username}`} passHref>
              <a
                className={classNames(
                  router.pathname === `/${user.username}` &&
                    user.username !== "" &&
                    "text-blue-400",
                  "flex flex-col items-center transition ease-in duration-200 hover:text-blue-400"
                )}
              >
                <UserIcon className="h-6 w-6" />
              </a>
            </Link>
          ) : (
            <button
              onClick={() => {
                showLoginDialog();
              }}
              className="flex flex-col items-center transition ease-in duration-200 hover:text-blue-400"
            >
              <UserIcon className="h-6 w-6" />
            </button>
          )}
        </div>
      </>
    );
  } else {
    return null;
  }
}

function AddPostDropup() {
  const dispatch = useDispatch();

  const postContentState = usePostContentState();
  const addPostButton = useRef<HTMLButtonElement>(null);

  return (
    <>
      <PostOrsic />
      <PostImage />
      <Modal
        closeModal={() => dispatch({ type: CONTENT_CASES.HIDE_POST_CONTENT })}
        show={postContentState.postContent}
        content={
          <>
            <PostCards>
              <PostCard
                onClick={() => {
                  dispatch({ type: CONTENT_CASES.HIDE_POST_CONTENT });
                  dispatch({ type: CONTENT_CASES.SHOW_POST_ORSIC });
                }}
                icon={
                  <NewspaperIcon className="w-12 h-12 rounded-full text-blue-700" />
                }
                heading="Orsic"
                description="Anything that's going on in your head, A status update, or a
                full blown article. It's up to you."
              />
              <PostCard
                onClick={() => {
                  dispatch({ type: CONTENT_CASES.HIDE_POST_CONTENT });
                  dispatch({ type: CONTENT_CASES.SHOW_POST_IMAGE });
                }}
                icon={
                  <PhotographIcon className="w-12 h-12 rounded-full text-green-700" />
                }
                heading="Image"
                description="A photo or a picture of something you want to share."
              />
              <PostCard
                comingSoon
                onClick={() => {}}
                icon={
                  <QuestionMarkCircleIcon className="w-12 h-12 rounded-full text-yellow-700" />
                }
                heading="Question"
                description="Ask a question. Can be doubts, random questions, etc."
              />
            </PostCards>
          </>
        }
      />
      <div className="flex flex-col items-center">
        <button
          onClick={() => {
            dispatch({ type: CONTENT_CASES.SHOW_POST_CONTENT });
          }}
          ref={addPostButton}
          className="absolute bottom-5 outline-none shadow-none text-center flex items-center justify-center rounded-full border-4 text-3xl border-gray-50 bg-blue-500 w-20 h-20 p-2 text-white"
        >
          <PlusIcon />
        </button>
      </div>
    </>
  );
}
