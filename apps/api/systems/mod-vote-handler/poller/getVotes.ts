import prisma from "../../../graphql/utils/data/dbClient";

export default async function getVotes(reportId: string) {
  let favors = await prisma.reportFavor.count({
    where: {
      reportId,
    },
  });

  let againsts = await prisma.reportAgainst.count({
    where: {
      reportId,
    },
  });

  return { favors, againsts };
}
