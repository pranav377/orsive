import { useRouter } from 'next/router';
import IndividualReplyPage from '../../../../../../components/post/comments/IndividualReplyPage';
import { useSingleReplyPage } from '../../../../../../hooks/pages/comments/useSingleReplyPage';

export default function SingleReplyPage() {
    const router = useRouter();
    let backLink = `/image/${router.query['image_slug']}/comments/${router.query['comment_slug']}`;
    const { getReplyQuery, likeFeatures, deleteCommentMutation } =
        useSingleReplyPage(backLink, router);

    return (
        <IndividualReplyPage
            backLink={backLink}
            deleteCommentMutation={deleteCommentMutation}
            getReplyQuery={getReplyQuery}
            likeFeatures={likeFeatures}
        />
    );
}
