import { useState } from "react";
import { useTimer } from "react-timer-hook";
import ContentParser from "../app/ContentParser";
import LinkifyContent from "../app/LinkifyContent";
import Ripples from "../app/Ripple";
import TextContent from "../app/TextContent";
import ExtraButtonsForModeration from "./subcomponents/ExtraButtonsForModeration";
import ModerationAvatarArea from "./subcomponents/ModerationAvatarArea";
import Link from "next/link";

export default function ModerationOrsicPostCard(props: { report: any }) {
  let post = props.report.post;
  let postUrl = `/orsic/${post.slug}`;

  const [votingEnded, setVotingEnded] = useState(false);

  const { seconds, minutes, hours, days } = useTimer({
    expiryTimestamp: new Date(props.report.votingEnds),
    onExpire: () => setVotingEnded(true),
  });

  return (
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
      <Ripples>
        <div className="w-full">
          <Link href={postUrl} passHref scroll={false}>
            <a>
              <div>
                {post.title && (
                  <span className="font-semibold text-2xl text-gray-100 text-break">
                    {post.title}
                  </span>
                )}
                <LinkifyContent>
                  <TextContent>{ContentParser(post.content)}</TextContent>
                </LinkifyContent>
                {post.truncated && (
                  <div className="w-full p-1 bg-slate-700 hover:bg-slate-800 transition-all duration-300 font-semibold text-center rounded-b-xl">
                    Read More
                  </div>
                )}
              </div>
            </a>
          </Link>
          <ExtraButtonsForModeration votingEnded={votingEnded} />
        </div>
      </Ripples>
    </div>
  );
}
