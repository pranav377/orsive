import { ChatIcon, ThumbUpIcon, ShareIcon } from '@heroicons/react/outline';
import { HeartIcon, ThumbDownIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { showLoginDialog } from '../../../logic/auth/showLoginDialog';
import { AppStateActions } from '../../../store/slices/appSlice';
import { nFormatter } from '../../app/nFormatter';
import ShareModal from '../../app/ShareModalDialog';

export default function ExtraButtons(props: {
    likeStatus?: {
        postId: string;
        type: 'like' | 'dislike' | 'nope' | undefined;
        likes: number;
    };
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
                <div className="flex flex-1 items-center justify-center">
                    <button
                        onClick={() => {
                            props.like();
                        }}
                        className={`rounded-full `}
                    >
                        <HeartIcon
                            className={`m-1 h-5 transition-all duration-150 ${
                                props.likeStatus?.type === 'like'
                                    ? 'text-red-700 '
                                    : ''
                            }`}
                        />
                    </button>
                    <span className="ml-1">
                        {props.likeStatus && props.likeStatus.likes !== 0
                            ? nFormatter(props.likeStatus.likes, 2)
                            : 0}
                    </span>
                </div>
                <div className="flex flex-1 items-center justify-center">
                    <button
                        onClick={props.dislike}
                        className={`rounded-full p-1 transition-all duration-150`}
                    >
                        <ThumbDownIcon
                            className={`m-1 h-5 ${
                                props.likeStatus?.type === 'dislike'
                                    ? 'text-blue-700'
                                    : ''
                            }`}
                        />{' '}
                    </button>
                </div>
                <div className="flex flex-1 items-center justify-center">
                    <button
                        onClick={() => setShareOpen(true)}
                        className="rounded-full p-2"
                    >
                        <ShareIcon className="m-1 h-5" />{' '}
                    </button>
                </div>
                {props.postUrl && (
                    <div
                        className="flex flex-1 items-center justify-center"
                        onClick={() => {
                            router.push(`${props.postUrl}`).finally(() => {
                                dispatch(AppStateActions.setShowReply(true));
                            });
                        }}
                    >
                        <button className="rounded-full p-2">
                            <ChatIcon className="m-1 h-5" />{' '}
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
            <div className="flex flex-1 items-center justify-center">
                <button
                    className="rounded-full p-2"
                    onClick={() => {
                        showLoginDialog();
                    }}
                >
                    <ChatIcon className="m-1 h-5" />{' '}
                </button>
            </div>
            <div className="flex flex-1 items-center justify-center">
                <button
                    className={`rounded-full p-2 transition-all duration-150`}
                    onClick={() => {
                        showLoginDialog();
                    }}
                >
                    <ThumbUpIcon className="m-1 h-5" />{' '}
                </button>
            </div>
            <div className="flex flex-1 items-center justify-center">
                <button
                    className={`rounded-full p-2 transition-all duration-150`}
                    onClick={() => {
                        showLoginDialog();
                    }}
                >
                    <ThumbDownIcon className="m-1 h-5" />{' '}
                </button>
            </div>
        </div>
    );
}
