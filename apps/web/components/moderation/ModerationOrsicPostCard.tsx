import { memo, useState } from 'react';
import { useTimer } from 'react-timer-hook';
import ContentParser from '../app/ContentParser';
import LinkifyContent from '../app/LinkifyContent';
import Ripples from '../app/Ripple';
import TextContent from '../app/TextContent';
import ExtraButtonsForModeration from './subcomponents/ExtraButtonsForModeration';
import ModerationAvatarArea from './subcomponents/ModerationAvatarArea';
import Link from 'next/link';

function ModerationOrsicPostCardComponent(props: {
    report: any;
    onClick?: () => void;
}) {
    let post = props.report.post;
    let postUrl = `/orsic/${post.slug}`;

    const [votingEnded, setVotingEnded] = useState(false);

    const { seconds, minutes, hours, days } = useTimer({
        expiryTimestamp: new Date(props.report.votingEnds),
        onExpire: () => setVotingEnded(true),
    });

    return (
        <div className="my-2 flex w-[90vw] flex-col rounded-md bg-slate-900 p-5 md:max-w-3xl">
            <span className="font-semibold">
                {votingEnded ? (
                    <>Waiting for results</>
                ) : (
                    <>
                        Voting ends in {days}d : {hours}h : {minutes}m :{' '}
                        {seconds}s
                    </>
                )}
            </span>
            <ModerationAvatarArea uploadedBy={post.post.uploadedBy} />
            <Ripples>
                <div className="w-full">
                    <Link
                        href={postUrl}
                        passHref
                        scroll={false}
                        onClick={props.onClick}
                    >
                        <div>
                            {post.title && (
                                <span className="text-break text-2xl font-semibold text-gray-100">
                                    {post.title}
                                </span>
                            )}
                            <LinkifyContent>
                                <TextContent>
                                    {ContentParser(post.content)}
                                </TextContent>
                            </LinkifyContent>
                            {post.truncated && (
                                <div className="w-full rounded-b-xl bg-slate-700 p-1 text-center font-semibold transition-all duration-300 hover:bg-slate-800">
                                    Read More
                                </div>
                            )}
                        </div>
                    </Link>
                    <ExtraButtonsForModeration
                        postId={post.post.id}
                        votingEnded={votingEnded}
                    />
                </div>
            </Ripples>
        </div>
    );
}

const ModerationOrsicPost = memo(ModerationOrsicPostCardComponent);
export default ModerationOrsicPost;
