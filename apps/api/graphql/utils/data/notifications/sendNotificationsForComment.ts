// send notification to the post owner when he/she gets a comment on their post
import prisma from "../dbClient";

export default async function sendNotificationsforComment(
  postOwnerId: string,
  commentId: string
) {
  await prisma.notificationForComment.create({
    data: {
      comment: {
        connect: {
          id: commentId,
        },
      },
      notification: {
        create: {
          forUserId: postOwnerId,
          notificationType: "forComment",
        },
      },
    },
  });
}
