import {
  DECISION_LOST_REPUTATION,
  DECISION_WON_REPUTATION,
} from "../../../../../graphql/config";
import prisma from "../../../../../graphql/utils/data/dbClient";

export default async function sendReputationToMods(
  reportId: string,
  winDecision: "favor" | "against"
) {
  let favors = await prisma.reportFavor.findMany({
    where: {
      reportId,
    },
  });

  let againsts = await prisma.reportAgainst.findMany({
    where: {
      reportId,
    },
  });

  if (winDecision === "favor") {
    await Promise.all(
      favors.map(async (favor) => {
        await prisma.reputationBlockLog.create({
          data: {
            userId: favor.modId,
            amount: DECISION_WON_REPUTATION,
          },
        });
      })
    );

    await Promise.all(
      againsts.map(async (against) => {
        await prisma.reputationBlockLog.create({
          data: {
            userId: against.modId,
            amount: DECISION_LOST_REPUTATION,
          },
        });
      })
    );
  } else {
    await Promise.all(
      againsts.map(async (against) => {
        await prisma.reputationBlockLog.create({
          data: {
            userId: against.modId,
            amount: DECISION_WON_REPUTATION,
          },
        });
      })
    );

    await Promise.all(
      favors.map(async (favor) => {
        await prisma.reputationBlockLog.create({
          data: {
            userId: favor.modId,
            amount: DECISION_LOST_REPUTATION,
          },
        });
      })
    );
  }
}
