import { ApolloError } from "apollo-server-express";
import moment from "moment";
import prisma from "../../../../utils/data/dbClient";
import GetObjOrNotFound from "../../../../utils/getObjOrNotFound";

export default async function IsPasswordResetValid(
  email: string,
  user_generated_otp: string
) {
  GetObjOrNotFound(
    await prisma.profile.findFirst({
      where: {
        email,
        authMethod: "local",
      },
    })
  );

  let userOTP = await prisma.passwordResetOTP.findMany({
    where: {
      email,
    },
    orderBy: {
      created_at: "desc",
    },
  });

  if (!(userOTP && userOTP[0])) {
    throw new ApolloError("OTP not generated for user!");
  }

  let otp = userOTP[0];

  if (!(otp.otp === user_generated_otp)) {
    throw new ApolloError("OTP is not same!");
  }

  const isTimeValid = !!moment(new Date()).isBefore(
    moment(userOTP[0].created_at).add(5, "minutes")
  );

  if (!isTimeValid) {
    throw new ApolloError("OTP expired!");
  }
}
