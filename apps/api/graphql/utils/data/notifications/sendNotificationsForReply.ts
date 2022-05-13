// send notification to the comment owner when he/she gets a reply on their comment

import prisma from "../dbClient";

export default async function sendNotificationsforReply(
  commentOwnerId: string,
  replyId: string
) {
  await prisma.notificationForComment.create({
    data: {
      comment: {
        connect: {
          id: replyId,
        },
      },
      notification: {
        create: {
          forUserId: commentOwnerId,
          notificationType: "forReply",
        },
      },
    },
  });
}
