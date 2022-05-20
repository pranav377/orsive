import {
  ChatIcon,
  ThumbDownIcon,
  ThumbUpIcon,
  ShareIcon,
} from "@heroicons/react/outline";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { showLoginDialog } from "../../../app/auth/showLoginDialog";
import APP_CASES from "../../../app/store/reducers/app/cases";
import { nFormatter } from "../../app/nFormatter";
import ShareModal from "../../app/ShareModalDialog";

export default function ExtraButtons(props: {
  likes?: number;
  likeStatus: "like" | "dislike" | "nope" | undefined;
  like: () => Promise<void>;
  dislike: () => Promise<void>;
  postUrl?: string;
  url: string;
}) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [shareOpen, setShareOpen] = useState(false);

  return (
    <>
      <ShareModal
        url={props.url}
        shareOpen={shareOpen}
        setShareOpen={setShareOpen}
      />
      <div className="flex p-4 text-gray-300">
        <div className="flex items-center justify-center flex-1">
          <button
            onClick={() => {
              props.like();
            }}
            className={`rounded-full p-1 transition-all duration-150 ${
              props.likeStatus === "like" ? "bg-blue-700" : ""
            }`}
          >
            <ThumbUpIcon className="h-7 m-1" />{" "}
          </button>
          <span className="ml-1">
            {props.likes ? nFormatter(props.likes, 2) : <></>}
          </span>
        </div>
        <div className="flex items-center justify-center flex-1">
          <button
            onClick={props.dislike}
            className={`rounded-full p-1 transition-all duration-150 ${
              props.likeStatus === "dislike" ? "bg-blue-700" : ""
            }`}
          >
            <ThumbDownIcon className="h-7 m-1" />{" "}
          </button>
        </div>
        <div className="flex items-center justify-center flex-1">
          <button
            onClick={() => setShareOpen(true)}
            className="rounded-full p-2"
          >
            <ShareIcon className="h-7 m-1" />{" "}
          </button>
        </div>
        {props.postUrl && (
          <div
            className="flex items-center justify-center flex-1"
            onClick={() => {
              router.push(`${props.postUrl}`).finally(() => {
                dispatch({ type: APP_CASES.SHOW_REPLY });
              });
            }}
          >
            <button className="rounded-full p-2">
              <ChatIcon className="h-7 m-1" />{" "}
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export function ExtraButtonsDesign() {
  return (
    <div className="flex p-4 text-gray-300">
      <div className="flex items-center justify-center flex-1">
        <button
          className="rounded-full p-2"
          onClick={() => {
            showLoginDialog();
          }}
        >
          <ChatIcon className="h-7 m-1" />{" "}
        </button>
      </div>
      <div className="flex items-center justify-center flex-1">
        <button
          className={`rounded-full p-2 transition-all duration-150`}
          onClick={() => {
            showLoginDialog();
          }}
        >
          <ThumbUpIcon className="h-7 m-1" />{" "}
        </button>
      </div>
      <div className="flex items-center justify-center flex-1">
        <button
          className={`rounded-full p-2 transition-all duration-150`}
          onClick={() => {
            showLoginDialog();
          }}
        >
          <ThumbDownIcon className="h-7 m-1" />{" "}
        </button>
      </div>
    </div>
  );
}
