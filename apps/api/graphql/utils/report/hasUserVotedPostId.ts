import prisma from "../data/dbClient";

export default async function hasUserVotedPostId(
  postId: string,
  userId: string
) {
  let hasUserVoted =
    !!(await prisma.reportFavor.findFirst({
      where: {
        report: {
          postId: postId,
        },
        modId: userId,
      },
    })) ||
    !!(await prisma.reportAgainst.findFirst({
      where: {
        report: {
          postId: postId,
        },
        modId: userId,
      },
    }));

  return hasUserVoted;
}
