import { UploadedBy } from "../../components/types";
import { store } from "../../store";
import { CurrentPostActions } from "../../store/slices/app/currentPostSlice";

// this function should be executed every time a post is clicked
export default function postClickMiddleware(
  slug: string,
  uploadedBy: UploadedBy
) {
  store.dispatch(
    CurrentPostActions.setPost({
      slug,
      uploadedBy,
    })
  );
}
