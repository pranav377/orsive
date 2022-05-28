import moment from "moment";
import schedule from "node-schedule";
import prisma from "../../graphql/utils/data/dbClient";
import GetObjOrNotFound from "../../graphql/utils/objOrNotFound";
import poller from "./poller";

export default async function VoteScheduler(reportId: string) {
  let report = GetObjOrNotFound(
    await prisma.report.findUnique({
      where: {
        id: reportId,
      },
    })
  );

  let pollTime = moment(report!.createdAt).add(3, "days").toDate();

  schedule.scheduleJob(pollTime, poller.bind(null, reportId));
}
