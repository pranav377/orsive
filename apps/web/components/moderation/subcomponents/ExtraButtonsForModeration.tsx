import {
    ArrowCircleDownIcon,
    ArrowCircleUpIcon,
} from '@heroicons/react/outline';
import toast from 'react-hot-toast';
import { useReport } from '../../../hooks/app/useReport';

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
                    <div className="mt-2 flex w-full items-center justify-center rounded-md bg-slate-800 p-4 font-semibold">
                        <span>Voting has ended</span>
                    </div>
                ) : (
                    <div className="mt-2 flex p-4 text-gray-300">
                        <div className="flex flex-1 flex-col items-center justify-center">
                            <button
                                onClick={() => {
                                    toast.promise(reportFavorMutation(), {
                                        error: 'Something went wrong. Try again',
                                        loading: 'Voting...',
                                        success: 'Voted successfully!',
                                    });
                                }}
                                className={`rounded-full p-2 transition-all duration-150`}
                            >
                                <ArrowCircleUpIcon className="m-1 h-7" />{' '}
                            </button>
                            <span className="text-center text-xs">
                                This post should not be removed
                            </span>
                        </div>
                        <div className="flex flex-1 flex-col items-center justify-center">
                            <button
                                onClick={() => {
                                    toast.promise(reportAgainstMutation(), {
                                        error: 'Something went wrong. Try again',
                                        loading: 'Voting...',
                                        success: 'Voted successfully!',
                                    });
                                }}
                                className={`rounded-full p-2 transition-all duration-150`}
                            >
                                <ArrowCircleDownIcon className="m-1 h-7" />{' '}
                            </button>
                            <span className="text-center text-xs">
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
            <div className="mt-2 flex w-full items-center justify-center rounded-md bg-slate-800 p-4 font-semibold">
                <span>You have voted</span>
            </div>
        </>
    );
}
