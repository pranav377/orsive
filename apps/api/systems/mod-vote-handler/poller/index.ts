import prisma from "../../../graphql/utils/data/dbClient";
import GetObjOrNotFound from "../../../graphql/utils/getObjOrNotFound";
import removePost from "./actions/removePost";
import removeReport from "./actions/removeReport";
import staffDecision from "./actions/staffDecision";
import sendReputationToMods from "./actions/utils/sendReputationToMods";
import getVotes from "./getVotes";

export default async function poller(job: any) {
  const { reportId } = job.attrs.data;
  let report = GetObjOrNotFound(
    await prisma.report.findUnique({
      where: {
        id: reportId,
      },
    })
  );

  let numberOfMods = await prisma.profile.count({
    where: {
      roles: {
        some: {
          name: "Mod",
        },
      },
    },
  });

  const { favors, againsts } = await getVotes(reportId);

  let neutralVotes = numberOfMods - (favors + againsts);
  let shouldStaffDecide = neutralVotes > favors && neutralVotes > againsts;

  if (shouldStaffDecide) {
    // Staff decision
    await staffDecision(reportId);
  } else {
    if (favors > againsts) {
      await sendReputationToMods(reportId, "favor");
      await removeReport(reportId);
    } else if (againsts > favors) {
      await removePost(report!.postId, report!.reason);
      await sendReputationToMods(reportId, "against");
      await removeReport(reportId);
    } else {
      // Staff decision
      await staffDecision(reportId);
    }
  }
}
