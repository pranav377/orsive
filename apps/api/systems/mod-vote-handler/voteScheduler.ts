import moment from "moment";
import prisma from "../../graphql/utils/data/dbClient";
import GetObjOrNotFound from "../../graphql/utils/objOrNotFound";
import poller from "./poller";
import agenda from "./poller/scheduler";

export default async function VoteScheduler(reportId: string) {
  let report = GetObjOrNotFound(
    await prisma.report.findUnique({
      where: {
        id: reportId,
      },
    })
  );

  let pollTime = moment(report!.createdAt).add(3, "days").toDate();

  agenda.define(`report_${reportId}`, poller);
  await agenda.start();
  await agenda.schedule(pollTime, `report_${reportId}`, {
    reportId,
  });
}
