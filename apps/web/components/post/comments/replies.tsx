import { SingleComment } from '.';
import { useReplies } from '../../../hooks/app/comments/useReplies';
import { useOneTimePageSpinner } from '../../../hooks/app/useOneTimePageSpinner';
import OneTimePageSpinner from '../../app/OneTimePageSpinner';
import Spinner from '../../app/Spinner';

export default function Replies(props: {
    parentId: string;
    parentUrl: string;
}) {
    const { allRepliesQuery, loadMoreElement } = useReplies(props.parentId);

    const { spinnerShown } = useOneTimePageSpinner(allRepliesQuery.data);

    return (
        <>
            {allRepliesQuery.data && (
                <>
                    {allRepliesQuery.data.getReplies.data.length !== 0 && (
                        <span className="m-2 text-2xl font-semibold">
                            Replies
                        </span>
                    )}
                    {allRepliesQuery.data.getReplies.data.map((reply: any) => (
                        <SingleComment
                            commentUrl={`${props.parentUrl}/replies/${reply.post.id}`}
                            comment={reply}
                            key={reply.post.id}
                        />
                    ))}
                    {allRepliesQuery.data.getReplies.hasNextPage && (
                        <div
                            className={`m-3 flex items-center justify-center`}
                            ref={loadMoreElement}
                        >
                            <Spinner />
                        </div>
                    )}
                </>
            )}

            <OneTimePageSpinner
                spinnerShown={spinnerShown}
                data={allRepliesQuery.data}
            />
        </>
    );
}
