import moment from "moment";
import { useState } from "react";
import { useTimer } from "react-timer-hook";
import LinkifyContent from "../app/LinkifyContent";
import Ripples from "../app/Ripple";
import TextContent from "../app/TextContent";
import ExtraButtonsForModeration from "./subcomponents/ExtraButtonsForModeration";
import ModerationAvatarArea from "./subcomponents/ModerationAvatarArea";

export default function ModerationImagePostCard(props: { report: any }) {
  const [votingEnded, setVotingEnded] = useState(false);

  const { seconds, minutes, hours, days } = useTimer({
    expiryTimestamp: new Date(props.report.votingEnds),
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
        <ModerationAvatarArea
          uploadedBy={{
            bio: "",
            name: "Bruh Bruh",
            username: "bruh99",
            avatar: `
              http://placeimg.com/640/480/transport 
              `,
          }}
        />
        <div className="w-full">
          <LinkifyContent>
            <TextContent className="text-break p-2">Test Post</TextContent>
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
