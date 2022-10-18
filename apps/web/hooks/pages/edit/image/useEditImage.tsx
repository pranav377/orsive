import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import GET_IMAGE_POST_QUERY from "../../../../../../packages/common/queries/image/getImagePostQuery";
import UPDATE_IMAGE_POST_MUTATION from "../../../../components/forms/content/post-image/mutation_schema/updateImagePostMutation";
import { useHideBars } from "../../../app/useHideBars";
import { useUser } from "../../../auth/useUser";

export const useEditImage = () => {
  useHideBars();
  const router = useRouter();
  const postSlug = router.query["image_slug"];
  const getImageQuery = useQuery(GET_IMAGE_POST_QUERY, {
    variables: {
      slug: postSlug,
    },
    onError: () => {
      router.push("/feed");
    },
  });
  const user = useUser();

  useEffect(() => {
    if (user.is && getImageQuery.data) {
      if (
        user.username !== getImageQuery.data.getImage.post.uploadedBy.username
      ) {
        router.push("/feed");
      }
    }
  }, [user, getImageQuery.data]);

  const [updateImagePost] = useMutation(UPDATE_IMAGE_POST_MUTATION);

  return { getImageQuery, updateImagePost, user, router, postSlug };
};
