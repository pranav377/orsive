import {
  ArrowCircleDownIcon,
  ArrowCircleUpIcon,
} from "@heroicons/react/outline";
import toast from "react-hot-toast";
import { useReport } from "../../../hooks/app/useReport";

export default function ExtraButtonsForModeration(props: {
  votingEnded?: boolean;
  postId: string;
}) {
  const { reportFavorMutation, reportAgainstMutation, reportStatus } =
    useReport(props.postId);

  if (!reportStatus || !reportStatus.voted) {
    return (
      <>
        {props.votingEnded ? (
          <div className="w-full p-4 font-semibold flex items-center justify-center bg-slate-800 mt-2 rounded-md">
            <span>Voting has ended</span>
          </div>
        ) : (
          <div className="flex p-4 text-gray-300 mt-2">
            <div className="flex flex-col items-center justify-center flex-1">
              <button
                onClick={() => {
                  toast.promise(reportFavorMutation(), {
                    error: "Something went wrong. Try again",
                    loading: "Voting...",
                    success: "Voted successfully!",
                  });
                }}
                className={`rounded-full p-2 transition-all duration-150`}
              >
                <ArrowCircleUpIcon className="h-7 m-1" />{" "}
              </button>
              <span className="text-xs text-center">
                This post should not be removed
              </span>
            </div>
            <div className="flex flex-col items-center justify-center flex-1">
              <button
                onClick={() => {
                  toast.promise(reportAgainstMutation(), {
                    error: "Something went wrong. Try again",
                    loading: "Voting...",
                    success: "Voted successfully!",
                  });
                }}
                className={`rounded-full p-2 transition-all duration-150`}
              >
                <ArrowCircleDownIcon className="h-7 m-1" />{" "}
              </button>
              <span className="text-xs text-center">
                This post should be removed
              </span>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <>
      <div className="w-full p-4 font-semibold flex items-center justify-center bg-slate-800 mt-2 rounded-md">
        <span>You have voted</span>
      </div>
    </>
  );
}
