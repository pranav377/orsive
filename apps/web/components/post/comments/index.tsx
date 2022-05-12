import { UploadedBy } from "../../app/types";
import Link from "next/link";
import LinkifyContent from "../../app/LinkifyContent";
import ExtraButtons from "../extra/ExtraButtons";
import { useLike } from "../../../hooks/app/like/useLike";
import React from "react";
import { useComments } from "../../../hooks/app/comments/useComments";
import { useMutation } from "@apollo/client";
import DELETE_COMMENT_MUTATION from "./mutation/deleteCommentMutation";
import GET_MY_COMMENTS_QUERY from "./queries/getMyCommentsQuery";
import GET_REPLIES_QUERY from "./queries/getRepliesQuery";
import AvatarArea from "../extra/AvatarArea";
import OneTimePageSpinner from "../../app/OneTimePageSpinner";
import { useOneTimePageSpinner } from "../../../hooks/app/useOneTimePageSpinner";
import ContentParser from "../../app/ContentParser";

export default function Comments(props: { postId: string; postUrl: string }) {
  const { allCommentsQuery, myCommentsQuery, loadMoreElement } = useComments(
    props.postId
  );

  const { spinnerShown } = useOneTimePageSpinner(allCommentsQuery.data);

  return (
    <>
      {allCommentsQuery.data && (
        <>
          {myCommentsQuery.data && (
            <>
              {(allCommentsQuery.data.getComments.data.length !== 0 ||
                myCommentsQuery.data.getMyComments.length !== 0) && (
                <span className="font-semibold text-2xl m-2">Discussion</span>
              )}
            </>
          )}
          {myCommentsQuery.data &&
            myCommentsQuery.data.getMyComments.map((comment: any) => (
              <SingleComment
                commentUrl={`${props.postUrl}/comments/${comment.post.id}`}
                comment={comment}
                key={comment.post.id}
                parent
              />
            ))}
          {allCommentsQuery.data.getComments.data.map((comment: any) => (
            <SingleComment
              commentUrl={`${props.postUrl}/comments/${comment.post.id}`}
              comment={comment}
              key={comment.post.id}
              parent
            />
          ))}
          {allCommentsQuery.data.getComments.hasNextPage && (
            <span className="text-center" ref={loadMoreElement}>
              There's more coming up🚀
            </span>
          )}
        </>
      )}

      <OneTimePageSpinner
        data={allCommentsQuery.data}
        spinnerShown={spinnerShown}
      />
    </>
  );
}

export function SingleComment(props: {
  comment: {
    content: string;
    replies?: number;
    post: {
      id: string;
      uploadedBy: UploadedBy;
      createdAt: string;
      _count: {
        likes: number;
      };
    };
  };
  commentUrl: string;
  parent?: boolean;
}) {
  let comment = props.comment;
  const likeFeatures = useLike(props.comment);

  const [deleteCommentMutation] = useMutation(DELETE_COMMENT_MUTATION, {
    variables: {
      commentId: props.comment.post.id,
    },
    refetchQueries: props.parent
      ? [GET_MY_COMMENTS_QUERY]
      : [GET_REPLIES_QUERY],
  });

  return (
    <div className="bg-slate-900 rounded-md p-5 flex flex-col w-[90vw] md:max-w-3xl my-2">
      <AvatarArea
        uploadedBy={comment.post.uploadedBy}
        delete={deleteCommentMutation}
      />
      <div className="w-full">
        <Link href={`${props.commentUrl}`} passHref>
          <a>
            <LinkifyContent>
              <div className="text-content p-2">
                {ContentParser(props.comment.content)}
              </div>
            </LinkifyContent>
          </a>
        </Link>
        <ExtraButtons {...likeFeatures} />
        {props.comment.replies && props.comment.replies > 0 ? (
          <Link href={props.commentUrl} passHref>
            <a>
              <span className="text-blue-700 font-semibold">
                View {props.comment.replies}
                {props.comment.replies === 1 ? <> Reply</> : <> Replies</>}
              </span>
            </a>
          </Link>
        ) : null}
      </div>
    </div>
  );
}
