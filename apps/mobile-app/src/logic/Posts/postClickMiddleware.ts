import { UploadedBy } from "../../components/types";
import { store } from "../../store";
import { CurrentPostActions } from "../../store/slices/app/currentPostSlice";

// this function should be executed every time a post is clicked / going to be viewed
export default function postClickMiddleware(
  slug: string,
  uploadedBy: UploadedBy,
  postId: string
) {
  store.dispatch(
    CurrentPostActions.setPost({
      slug,
      uploadedBy,
      postId,
    })
  );
}
