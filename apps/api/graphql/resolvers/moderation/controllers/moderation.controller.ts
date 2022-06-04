import { ApolloError } from "apollo-server-express";
import { User } from "../../../permissions/IsUserAuthenticated";
import prisma from "../../../utils/data/dbClient";
import { ReportReason } from "@prisma/client";
import VoteScheduler from "../../../../systems/mod-vote-handler/voteScheduler";
import GetObjOrNotFound from "../../../utils/getObjOrNotFound";
import agenda from "../../../../systems/mod-vote-handler/poller/scheduler";
import removeReport from "../../../../systems/mod-vote-handler/poller/actions/removeReport";
import sendReputationToMods from "../../../../systems/mod-vote-handler/poller/actions/utils/sendReputationToMods";
import removePost from "../../../../systems/mod-vote-handler/poller/actions/removePost";
import {
  getPostData,
  POST_PRISMA_ARGS,
} from "../../post/controllers/post.controller";
import moment from "moment";
import { PAGINATION_SET_SIZE } from "../../../config";
import hasUserVoted from "../../../utils/report/hasUserVoted";

export interface AddReportInterface {
  post_id: string;
  reason: ReportReason;
}

export interface ReportHandleInterface {
  post_id: string;
}

export interface GetReportsArgs {
  page?: number;
}

export async function GetReports(args: GetReportsArgs) {
  let page = (args.page || 1) - 1;
  let offset = page * PAGINATION_SET_SIZE;

  let reportsCount = await prisma.report.count();

  let hasNextPage = (args.page || 1) * PAGINATION_SET_SIZE < reportsCount;
  let nextPage = (args.page || 1) + 1;

  let reports = await prisma.report.findMany({
    skip: offset,
    take: PAGINATION_SET_SIZE,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      post: {
        include: {
          image: {
            ...POST_PRISMA_ARGS,
          },
          orsic: {
            ...POST_PRISMA_ARGS,
          },
          comment: {
            ...POST_PRISMA_ARGS,
          },
        },
      },
    },
  });

  return {
    data: reports.map(async (report) => {
      return {
        id: report.id,
        post: getPostData(report.post),
        votingEnds: moment(report.createdAt).add(3, "days").toDate(),
      };
    }),
    hasNextPage,
    nextPage,
  };
}

export async function AddReport(args: AddReportInterface, user: User) {
  let reportAlreadyExists = !!(await prisma.report.findFirst({
    where: {
      postId: args.post_id,
    },
  }));

  if (reportAlreadyExists) {
    throw new ApolloError("Report already exists!");
  }

  const report = await prisma.report.create({
    data: {
      reason: args.reason,
      postId: args.post_id,
      userId: user.id,
    },
  });

  VoteScheduler(report.id);

  return "ok";
}

export async function DeleteReport(args: ReportHandleInterface, user: User) {
  let userReport = GetObjOrNotFound(
    await prisma.report.findFirst({
      where: {
        postId: args.post_id,
        userId: user.id,
      },
    })
  );

  await prisma.report.delete({
    where: {
      id: userReport!.id,
    },
  });
  await agenda.cancel({
    $where: {
      name: `report_${userReport!.id}`,
    },
  });
  return "ok";
}

export async function ReportFavor(args: ReportHandleInterface, user: User) {
  let report = GetObjOrNotFound(
    await prisma.report.findFirst({
      where: {
        postId: args.post_id,
      },
    })
  );

  let voteAlreadyExists = await hasUserVoted(report!.id, user.id);

  if (!voteAlreadyExists) {
    await prisma.reportFavor.create({
      data: {
        reportId: report!.id,
        modId: user.id,
      },
    });

    return "ok";
  } else {
    throw new ApolloError("You have already voted!");
  }
}

export async function ReportAgainst(args: ReportHandleInterface, user: User) {
  let report = GetObjOrNotFound(
    await prisma.report.findFirst({
      where: {
        postId: args.post_id,
      },
    })
  );

  let voteAlreadyExists = await hasUserVoted(report!.id, user.id);

  if (!voteAlreadyExists) {
    await prisma.reportAgainst.create({
      data: {
        reportId: report!.id,
        modId: user.id,
      },
    });

    return "ok";
  } else {
    throw new ApolloError("You have already voted!");
  }
}

export async function ImmediateStaffFavorReport(args: ReportHandleInterface) {
  let report = GetObjOrNotFound(
    await prisma.report.findFirst({
      where: {
        postId: args.post_id,
      },
    })
  );

  await removeReport(report!.id);
  await sendReputationToMods(report!.id, "favor");
}

export async function ImmediateStaffAgainstReport(args: ReportHandleInterface) {
  let report = GetObjOrNotFound(
    await prisma.report.findFirst({
      where: {
        postId: args.post_id,
      },
    })
  );

  await removePost(report!.postId, report!.reason);
  await removeReport(report!.id);
  await sendReputationToMods(report!.id, "against");
}
