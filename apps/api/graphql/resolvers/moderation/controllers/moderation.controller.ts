import { ApolloError } from "apollo-server-express";
import { User } from "../../../permissions/IsUserAuthenticated";
import prisma from "../../../utils/data/dbClient";
import { ReportReason } from "@prisma/client";
import VoteScheduler from "../../../../systems/mod-vote-handler/voteScheduler";
import GetObjOrNotFound from "../../../utils/getObjOrNotFound";
import agenda from "../../../../systems/mod-vote-handler/poller/scheduler";

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

export async function GetReports(_args: GetReportsArgs) {
  return { data: [], hasNextPage: false, nextPage: 2 };
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

  let voteAlreadyExists =
    !!(await prisma.reportFavor.findFirst({
      where: {
        reportId: report!.id,
        modId: user.id,
      },
    })) ||
    !!(await prisma.reportAgainst.findFirst({
      where: {
        reportId: report!.id,
        modId: user.id,
      },
    }));

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

  let voteAlreadyExists =
    !!(await prisma.reportFavor.findFirst({
      where: {
        reportId: report!.id,
        modId: user.id,
      },
    })) ||
    !!(await prisma.reportAgainst.findFirst({
      where: {
        reportId: report!.id,
        modId: user.id,
      },
    }));

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
