// send notification to the post owner when he/she gets a comment on their post. send only if owner and comment owner are not same
import prisma from "../dbClient";

const THRESHOLD = 300;

function sendNotification(
  postOwnerId: string,
  commentId: string,
  percentage: number
) {
  var random = Math.floor(Math.random() * 101);
  if (random <= percentage) {
    return prisma.notificationForComment.create({
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
  } else {
    return null;
  }
}

export default async function sendNotificationsforComment(
  postOwnerId: string,
  commentId: string
) {
  let comment = await prisma.comment.findUnique({
    where: {
      id: commentId,
    },
  });

  let postCommentsCount = await prisma.comment.count({
    where: {
      parentPostId: comment!.parentPostId,
      parentId: null,
    },
  });

  let percentage = (THRESHOLD / postCommentsCount) * 100;

  await sendNotification(postOwnerId, commentId, percentage);
}
