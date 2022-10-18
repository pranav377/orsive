import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import DELETE_IMAGE_POST_MUTATION from "../../../app/post/image/mutations/deleteImagePostMutation";
import GET_POSTS_QUERY from "../../../../../packages/common/queries/post/getPostsQuery";
import GET_PROFILE_POSTS from "../../../app/profile/queries/getProfilePostsQuery";
import { useHistory } from "../../app/history/useHistory";
import { useLike } from "../../app/like/useLike";
import { useHideBars } from "../../app/useHideBars";

export const useImagePost = (post: any) => {
  useHideBars();
  useHistory(post);

  const likeFeatures = useLike(post);

  const router = useRouter();

  const [deleteImagePost] = useMutation(DELETE_IMAGE_POST_MUTATION, {
    variables: {
      slug: post?.slug,
    },
    refetchQueries: [GET_POSTS_QUERY, GET_PROFILE_POSTS],
    onCompleted: () => {
      router.push("/feed");
    },
  });

  return { router, likeFeatures, deleteImagePost };
};
