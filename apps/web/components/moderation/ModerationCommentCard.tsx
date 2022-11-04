import Link from "next/link";
import { memo, useState } from "react";
import { useTimer } from "react-timer-hook";
import ContentParser from "../app/ContentParser";
import LinkifyContent from "../app/LinkifyContent";
import Ripples from "../app/Ripple";
import TextContent from "../app/TextContent";
import ExtraButtonsForModeration from "./subcomponents/ExtraButtonsForModeration";
import ModerationAvatarArea from "./subcomponents/ModerationAvatarArea";

function ModerationCommentCardComponent(props: {
  report: any;
  onClick?: () => void;
}) {
  let comment = props.report.post;
  let commentUrl = comment.url;

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
      <ModerationAvatarArea uploadedBy={comment.post.uploadedBy} />
      <Ripples>
        <div className="w-full">
          <Link href={`${commentUrl}`} passHref>
            <a onClick={props.onClick}>
              <LinkifyContent>
                <TextContent className="p-2">
                  {ContentParser(comment.content)}
                </TextContent>
              </LinkifyContent>
            </a>
          </Link>
          <ExtraButtonsForModeration
            postId={comment.post.id}
            votingEnded={votingEnded}
          />
          {comment.replies && comment.replies > 0 ? (
            <Link href={commentUrl} passHref>
              <a>
                <span className="text-blue-700 font-semibold">
                  View {comment.replies}
                  {comment.replies === 1 ? <> Reply</> : <> Replies</>}
                </span>
              </a>
            </Link>
          ) : null}
        </div>
      </Ripples>
    </div>
  );
}

const ModerationCommentCard = memo(ModerationCommentCardComponent);
export default ModerationCommentCard;
