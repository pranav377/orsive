import { ApolloError } from "apollo-server-express";
import { User } from "../../../permissions/IsUserAuthenticated";
import prisma from "../../../utils/data/dbClient";

export interface AddReportInterface {
  post_id: string;
}

export interface GetReportsArgs {
  page?: number;
}

export async function GetReports(_args: GetReportsArgs) {
  return { data: [], hasNextPage: false };
}

export async function AddReport(args: AddReportInterface, user: User) {
  let reportAlreadyExists = await prisma.report.findFirst({
    where: {
      postId: args.post_id,
      userId: user.id,
    },
  });

  if (reportAlreadyExists) {
    throw new ApolloError("Report already exists!");
  }

  await prisma.report.create({
    data: {
      postId: args.post_id,
      userId: user.id,
    },
  });

  return "ok";
}

export async function DeleteReport(args: AddReportInterface, user: User) {
  let userReport = await prisma.report.findFirst({
    where: {
      postId: args.post_id,
      userId: user.id,
    },
  });

  if (userReport) {
    await prisma.report.delete({
      where: {
        id: userReport.id,
      },
    });
    return "ok";
  } else {
    throw new ApolloError("Report doesn't exist");
  }
}
