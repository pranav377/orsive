import recommenderClient from "../client";
import NextJsRevalidate from "../nextJsRevalidate";
import { searchIndex } from "../searchClient";

export default function deleteItem(itemId: string, post: any) {
  let basePost = post.post;

  searchIndex.deleteDocument(itemId);
  recommenderClient.delete(`/item/${itemId}/`);
  NextJsRevalidate(basePost.postType, post.slug);
}
