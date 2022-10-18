import { getOrsicContent } from "../../../resolvers/post/controllers/post.controller";
import sendNotificationsForPost from "../../data/notifications/sendNotificationsForPost";
import recommenderClient from "../client";
import { searchIndex } from "../searchClient";

interface ItemType {
  ItemId: string;
  Categories?: Array<string>;
  Timestamp?: Date;
}

export const EXTRA_POST_ARGS = {
  include: {
    post: {
      include: {
        uploadedBy: true,
        _count: {
          select: {
            dislikes: true,
            likes: true,
          },
        },
      },
    },
  },
};

export default function insertItem(item: ItemType, post: any) {
  let basePost = post.post;
  sendNotificationsForPost(
    basePost.uploadedBy.id,
    basePost.id,
    basePost.postType,
    post.slug
  );
  searchIndex.addDocuments([
    {
      ...post,
      ...(basePost.postType === "orsic" && {
        ...getOrsicContent(post.content),
        fullContent: post.content,
      }),
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
  recommenderClient.post("/item/", {
    ...item,
    Timestamp: new Date().toISOString(),
    Categories: ["Post"],
  });
}
