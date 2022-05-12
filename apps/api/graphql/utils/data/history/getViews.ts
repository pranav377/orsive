import { PostType } from "@prisma/client";
import prisma from "../dbClient";

export default function GetViews(postType: PostType, postId: string) {
  return prisma.history.count({
    where: {
      postType,
      postId,
    },
  });
}
