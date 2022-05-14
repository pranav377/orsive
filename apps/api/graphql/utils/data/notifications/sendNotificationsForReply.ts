// send notification to the comment owner when he/she gets a reply on their comment. Send only if owner and reply owner are not same

import prisma from "../dbClient";

const THRESHOLD = 100;

function sendNotification(
  commentOwnerId: string,
  replyId: string,
  percentage: number
) {
  var random = Math.floor(Math.random() * 101);
  if (random <= percentage) {
    return prisma.notificationForComment.create({
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
  } else {
    return null;
  }
}

export default async function sendNotificationsforReply(
  commentOwnerId: string,
  replyId: string
) {
  let reply = await prisma.comment.findUnique({
    where: {
      id: replyId,
    },
  });

  let allRepliesCount = await prisma.comment.count({
    where: {
      parentId: reply!.parentId,
    },
  });

  let percentage = (THRESHOLD / allRepliesCount) * 100;

  sendNotification(commentOwnerId, replyId, percentage);
}
