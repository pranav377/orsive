import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import DELETE_ORSIC_POST_MUTATION from "../../../app/post/orsic/mutations/deleteOrsicPostMutation";
import GET_POSTS_QUERY from "../../../app/post/queries/getPostsQuery";
import GET_PROFILE_POSTS from "../../../app/profile/queries/getProfilePostsQuery";
import { useHistory } from "../../app/history/useHistory";
import { useLike } from "../../app/like/useLike";
import { useHideBars } from "../../app/useHideBars";

export const useOrsicPost = (post: any) => {
  useHideBars();
  useHistory(post);

  const likeFeatures = useLike(post, true);

  const router = useRouter();

  const [deleteOrsicPost] = useMutation(DELETE_ORSIC_POST_MUTATION, {
    variables: {
      slug: post?.slug,
    },
    refetchQueries: [GET_POSTS_QUERY, GET_PROFILE_POSTS],
    onCompleted: () => {
      router.push("/feed");
    },
  });

  return { router, likeFeatures, deleteOrsicPost };
};
