import prisma from "../dbClient";

export async function getLikeStatus(postId: string, userId: string) {
  let alreadyLikeStatus: "like" | "dislike" | "nope" = "nope";

  let alreadyLiked = await prisma.like.findFirst({
    where: {
      postId,
      userId,
    },
  });

  if (alreadyLiked) {
    alreadyLikeStatus = "like";
  }

  let alreadyDisliked = await prisma.dislike.findFirst({
    where: {
      postId,
      userId,
    },
  });

  if (alreadyDisliked) {
    alreadyLikeStatus = "dislike";
  }

  return { alreadyLikeStatus, alreadyLiked, alreadyDisliked };
}
