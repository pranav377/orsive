import recommenderClient from "../client";
import NextJsRevalidate from "../nextJsRevalidate";
import { searchIndex } from "../searchClient";

export default function updateItem(itemId: string, post: any) {
  let basePost = post.post;
  searchIndex.updateDocuments([
    {
      ...post,
      type: "Post",
      id: basePost.id,
      post: {
        id: basePost.id,
        postType: basePost.postType,
        uploadedBy: {
          id: basePost.uploadedBy.id,
          username: basePost.uploadedBy.username,
          name: basePost.uploadedBy.name,
          avatar: basePost.uploadedBy.avatar,
          joined: basePost.uploadedBy.joined,
        },
        createdAt: basePost.createdAt,
        _count: basePost._count,
      },
    },
  ]);

  recommenderClient.patch(`/item/${itemId}/`, {
    Timestamp: new Date().toISOString(),
  });
  NextJsRevalidate(basePost.postType, post.slug);
}
