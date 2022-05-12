import prisma from "../dbClient";

export default function getRepliesCount(commentPostId: string) {
  return prisma.comment.count({
    where: {
      parentId: commentPostId,
    },
  });
}
