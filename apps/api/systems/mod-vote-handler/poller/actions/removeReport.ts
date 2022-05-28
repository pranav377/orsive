import prisma from "../../../../graphql/utils/data/dbClient";

export default async function removeReport(reportId: string) {
  await prisma.report.delete({
    where: {
      id: reportId,
    },
  });
}
