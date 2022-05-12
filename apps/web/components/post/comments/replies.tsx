import { SingleComment } from ".";
import { useReplies } from "../../../hooks/app/comments/useReplies";
import { useOneTimePageSpinner } from "../../../hooks/app/useOneTimePageSpinner";
import OneTimePageSpinner from "../../app/OneTimePageSpinner";
import Spinner from "../../app/Spinner";

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
            <span className="font-semibold text-2xl m-2">Replies</span>
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
              className={`flex items-center justify-center m-3`}
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
