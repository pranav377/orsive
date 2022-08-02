import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import GET_ORSIC_POST_QUERY from "../../../../../../packages/common/queries/orsic/getOrsicPostQuery";
import UPDATE_ORSIC_POST_MUTATION from "../../../../components/forms/content/post-orsic/mutation_schema/updateOrsicPostMutation";
import { useHideBars } from "../../../app/useHideBars";
import { useUser } from "../../../auth/useUser";

export const useEditOrsic = () => {
  useHideBars();
  const router = useRouter();
  const postSlug = router.query["orsic_slug"];
  const getOrsicQuery = useQuery(GET_ORSIC_POST_QUERY, {
    variables: {
      slug: postSlug,
    },
    onError: () => {
      router.push("/feed");
    },
  });
  const user = useUser();

  useEffect(() => {
    if (user.is && getOrsicQuery.data) {
      if (
        user.username !== getOrsicQuery.data.getOrsic.post.uploadedBy.username
      ) {
        router.push("/feed");
      }
    }
  }, [user, getOrsicQuery.data]);

  const [updateOrsicPost] = useMutation(UPDATE_ORSIC_POST_MUTATION);

  return { getOrsicQuery, updateOrsicPost, user, router, postSlug };
};
