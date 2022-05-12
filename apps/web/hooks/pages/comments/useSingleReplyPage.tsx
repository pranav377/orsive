import { useMutation, useQuery } from "@apollo/client";
import { NextRouter } from "next/router";
import DELETE_COMMENT_MUTATION from "../../../components/post/comments/mutation/deleteCommentMutation";
import GET_REPLIES_QUERY from "../../../components/post/comments/queries/getRepliesQuery";
import GET_REPLY_QUERY from "../../../components/post/comments/queries/getReplyQuery";
import { useLike } from "../../app/like/useLike";
import { useHideBars } from "../../app/useHideBars";

export const useSingleReplyPage = (backLink: string, router: NextRouter) => {
  useHideBars();
  let commentId = router.query["reply_slug"];

  const getReplyQuery = useQuery(GET_REPLY_QUERY, {
    variables: {
      commentId: commentId,
    },
  });

  const likeFeatures = useLike(getReplyQuery?.data?.getReply);

  const [deleteCommentMutation] = useMutation(DELETE_COMMENT_MUTATION, {
    variables: {
      commentId: commentId,
    },
    refetchQueries: [GET_REPLIES_QUERY],
    onCompleted: () => {
      router.push(backLink);
    },
  });

  return { getReplyQuery, likeFeatures, deleteCommentMutation };
};
