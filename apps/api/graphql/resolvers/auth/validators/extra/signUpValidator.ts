import { ApolloError } from "apollo-server-express";
import prisma from "../../../../utils/data/dbClient";
import IsUsernameValid from "../../../../utils/data/IsUsernameValid";

export default async function IsSignUpValid(
  email: string,
  username: string,
  user_generated_otp: string
) {
  let isUserAlreadyPresent = await (
    await prisma.profile.findMany({
      where: {
        OR: [{ email: email }, { username: username }],
      },
    })
  )[0];

  let userOTP = await prisma.oTP.findMany({
    where: {
      email: email,
    },
    orderBy: {
      created_at: "desc",
    },
  });

  await IsUsernameValid({ username });

  if (isUserAlreadyPresent) {
    throw new ApolloError("User already Exists!");
  }

  if (!(userOTP && userOTP[0])) {
    throw new ApolloError("OTP not generated for user!");
  }

  let otp = userOTP[0];

  if (!(otp.otp === user_generated_otp)) {
    throw new ApolloError("OTP is not same!");
  }
}
