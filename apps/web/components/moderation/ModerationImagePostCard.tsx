import {
  ArrowCircleDownIcon,
  ArrowCircleUpIcon,
} from "@heroicons/react/outline";
import { XIcon } from "@heroicons/react/solid";
import moment from "moment";
import { useState } from "react";
import { useTimer } from "react-timer-hook";
import LinkifyContent from "../app/LinkifyContent";
import Ripples from "../app/Ripple";
import AvatarArea from "../post/extra/AvatarArea";

export default function ModerationImagePostCard() {
  const [votingEnded, setVotingEnded] = useState(false);

  const { seconds, minutes, hours, days } = useTimer({
    expiryTimestamp: moment(new Date()).add(10, "seconds").toDate(),
    onExpire: () => setVotingEnded(true),
  });

  return (
    <Ripples>
      <div className="bg-slate-900 rounded-md p-5 flex flex-col w-[90vw] md:max-w-3xl my-2">
        <span className="font-semibold">
          {votingEnded ? (
            <>Waiting for results</>
          ) : (
            <>
              Voting ends in {days}d : {hours}h : {minutes}m : {seconds}s
            </>
          )}
        </span>
        <AvatarArea
          uploadedBy={{
            bio: "",
            name: "Bruh Bruh",
            username: "bruh99",
            avatar: `
              http://placeimg.com/640/480/transport 
              `,
          }}
          delete={() => new Promise(() => {})}
        />
        <div className="w-full">
          <LinkifyContent>
            <div className="text-break p-2 text-content">Test Post</div>
          </LinkifyContent>
          <img
            style={{
              display: "block",
              margin: "0 auto",
            }}
            src={`
                http://placeimg.com/640/480/transport 
                `}
          />
          <ExtraButtonsForModeration votingEnded={votingEnded} />
        </div>
      </div>
    </Ripples>
  );
}

function ExtraButtonsForModeration(props: { votingEnded?: boolean }) {
  return (
    <>
      {props.votingEnded ? (
        <div className="w-full p-4 font-semibold flex items-center justify-center bg-slate-700 mt-2 rounded-md">
          <XIcon className="text-red-600 w-8 h-8" />
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
