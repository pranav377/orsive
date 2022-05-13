// send notification to the post owner when he/she gets a comment on their post. send only if owner and comment owner are not same
import prisma from "../dbClient";

export default async function sendNotificationsforComment(
  postOwnerId: string,
  commentId: string
) {
  await prisma.notificationForComment.create({
    data: {
      commentId,
      notification: {
        create: {
          forUserId: postOwnerId,
          notificationType: "forComment",
        },
      },
    },
  });
}
