import prisma from "../data/dbClient";

export default async function hasUserVoted(reportId: string, userId: string) {
  let hasUserVoted =
    !!(await prisma.reportFavor.findFirst({
      where: {
        reportId: reportId,
        modId: userId,
      },
    })) ||
    !!(await prisma.reportAgainst.findFirst({
      where: {
        reportId: reportId,
        modId: userId,
      },
    }));

  return hasUserVoted;
}
