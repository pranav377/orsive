import { useRouter } from "next/router";
import { useSingleCommentPage } from "../../../../../hooks/pages/comments/useSingleCommentPage";
import IndividualCommentPage from "../../../../../components/post/comments/IndividualCommentPage";

export default function SingleCommentPage() {
  const router = useRouter();
  let backLink = `/orsic/${router.query["orsic_slug"]}`;

  const { getCommentQuery, likeFeatures, deleteCommentMutation } =
    useSingleCommentPage(backLink, router);

  return (
    <IndividualCommentPage
      backLink={backLink}
      deleteCommentMutation={deleteCommentMutation}
      getCommentQuery={getCommentQuery}
      likeFeatures={likeFeatures}
    />
  );
}
