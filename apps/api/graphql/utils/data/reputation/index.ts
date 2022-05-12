import { REPUTATION_FOR_DISLIKE, REPUTATION_FOR_LIKE } from "../../../config";
import prisma from "../dbClient";
import getUserReputation from "./getUserReputation";

export async function likeReputation(
  uploadedById: string,
  likeId: string,
  userId: string
) {
  if (userId !== uploadedById) {
    await prisma.reputationBlockLog.create({
      data: {
        userId: uploadedById,
        amount: REPUTATION_FOR_LIKE,
        likeId,
      },
    });
  }
}

export async function dislikeReputation(
  uploadedById: string,
  dislikeId: string,
  userId: string
) {
  let userCurrentReputation = await getUserReputation(uploadedById);

  if (
    userCurrentReputation + REPUTATION_FOR_DISLIKE >= 0 &&
    userId !== uploadedById
  ) {
    await prisma.reputationBlockLog.create({
      data: {
        userId: uploadedById,
        amount: REPUTATION_FOR_DISLIKE,
        dislikeId,
      },
    });
  }
}
