import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import { memo, useState } from 'react';
import { useTimer } from 'react-timer-hook';
import { generatePlaceholder } from '../app/ContentParser';
import LinkifyContent from '../app/LinkifyContent';
import Ripples from '../app/Ripple';
import TextContent from '../app/TextContent';
import ExtraButtonsForModeration from './subcomponents/ExtraButtonsForModeration';
import ModerationAvatarArea from './subcomponents/ModerationAvatarArea';

function ModerationImagePostCardComponent(props: {
    report: any;
    onClick?: () => void;
}) {
    let post = props.report.post;
    let postUrl = `/image/${post.slug}`;

    const [votingEnded, setVotingEnded] = useState(false);

    const { seconds, minutes, hours, days } = useTimer({
        expiryTimestamp: new Date(props.report.votingEnds),
        onExpire: () => setVotingEnded(true),
    });

    return (
        <Ripples>
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
                <div className="w-full">
                    <Link
                        href={postUrl}
                        passHref
                        scroll={false}
                        onClick={props.onClick}
                    >
                        <LinkifyContent>
                            <TextContent className="text-break p-2">
                                {post.title}
                            </TextContent>
                        </LinkifyContent>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                        >
                            <Image
                                placeholder="blur"
                                blurDataURL={generatePlaceholder(
                                    post.width.toString(),
                                    post.height.toString()
                                )}
                                alt="Reported Image"
                                src={post.image}
                                width={post.width}
                                height={post.height}
                            />
                        </div>
                    </Link>
                    <ExtraButtonsForModeration
                        postId={post.post.id}
                        votingEnded={votingEnded}
                    />
                </div>
            </div>
        </Ripples>
    );
}

const ModerationImagePostCard = memo(ModerationImagePostCardComponent);
export default ModerationImagePostCard;
