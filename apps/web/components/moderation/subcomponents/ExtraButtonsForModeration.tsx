import {
  ArrowCircleDownIcon,
  ArrowCircleUpIcon,
} from "@heroicons/react/outline";

export default function ExtraButtonsForModeration(props: {
  votingEnded?: boolean;
}) {
  return (
    <>
      {props.votingEnded ? (
        <div className="w-full p-4 font-semibold flex items-center justify-center bg-slate-800 mt-2 rounded-md">
          <span>Voting has ended</span>
        </div>
      ) : (
        <div className="flex p-4 text-gray-300 mt-2">
          <div className="flex flex-col items-center justify-center flex-1">
            <button className={`rounded-full p-2 transition-all duration-150`}>
              <ArrowCircleUpIcon className="h-7 m-1" />{" "}
            </button>
            <span className="text-xs text-center">
              This post should not be removed
            </span>
          </div>
          <div className="flex flex-col items-center justify-center flex-1">
            <button className={`rounded-full p-2 transition-all duration-150`}>
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
