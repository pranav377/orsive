import prisma from "../../../graphql/utils/data/dbClient";
import GetObjOrNotFound from "../../../graphql/utils/objOrNotFound";
import removePost from "./actions/removePost";
import removeReport from "./actions/removeReport";
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
  } else {
    if (favors > againsts) {
      // Post is not removed
      await removeReport(reportId);
      await sendReputationToMods(reportId, "favor");
    } else if (againsts > favors) {
      await removePost(report!.postId);
      await removeReport(reportId);
      await sendReputationToMods(reportId, "against");
    } else {
      // Staff decision -- send mail to all staff members
    }
  }
}
