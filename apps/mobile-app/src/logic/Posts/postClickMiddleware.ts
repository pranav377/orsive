import { store } from "../../store";
import { CurrentPostActions } from "../../store/slices/app/currentPostSlice";

// this function should be executed every time a post is clicked
export default function postClickMiddleware(post: any) {
  if (post && post.slug && post.post) {
    store.dispatch(
      CurrentPostActions.setPost({
        slug: post.slug,
        uploadedBy: post.post.uploadedBy,
      })
    );
  }
}
