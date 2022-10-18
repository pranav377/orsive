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
        const reputation = await prisma.reputationBlockLog.create({
          data: {
            userId: favor.modId,
            amount: DECISION_WON_REPUTATION,
          },
        });

        await prisma.notificationForReputation.create({
          data: {
            reputation: {
              connect: {
                id: reputation.id,
              },
            },
            notification: {
              create: {
                forUserId: favor.modId,
                notificationType: "forReputation",
              },
            },
          },
        });
      })
    );

    await Promise.all(
      againsts.map(async (against) => {
        const reputation = await prisma.reputationBlockLog.create({
          data: {
            userId: against.modId,
            amount: DECISION_LOST_REPUTATION,
          },
        });

        await prisma.notificationForReputation.create({
          data: {
            reputation: {
              connect: {
                id: reputation.id,
              },
            },
            notification: {
              create: {
                forUserId: against.modId,
                notificationType: "forReputation",
              },
            },
          },
        });
      })
    );
  } else {
    await Promise.all(
      againsts.map(async (against) => {
        const reputation = await prisma.reputationBlockLog.create({
          data: {
            userId: against.modId,
            amount: DECISION_WON_REPUTATION,
          },
        });

        await prisma.notificationForReputation.create({
          data: {
            reputation: {
              connect: {
                id: reputation.id,
              },
            },
            notification: {
              create: {
                forUserId: against.modId,
                notificationType: "forReputation",
              },
            },
          },
        });
      })
    );

    await Promise.all(
      favors.map(async (favor) => {
        const reputation = await prisma.reputationBlockLog.create({
          data: {
            userId: favor.modId,
            amount: DECISION_LOST_REPUTATION,
          },
        });

        await prisma.notificationForReputation.create({
          data: {
            reputation: {
              connect: {
                id: reputation.id,
              },
            },
            notification: {
              create: {
                forUserId: favor.modId,
                notificationType: "forReputation",
              },
            },
          },
        });
      })
    );
  }
}
