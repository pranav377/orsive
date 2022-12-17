// send notification to the post owner when he/she gets a comment on their post. send only if owner and comment owner are not same
import prisma from "../dbClient";

const THRESHOLD = 300;

async function sendNotification(
  postOwnerId: string,
  commentId: string,
  _commentUploadedById: string,
  percentage: number,
  _url: string
) {
  let random = Math.floor(Math.random() * 101);
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
  commentId: string,
  postType: "image" | "orsic",
  postSlug: string
) {
  let comment = await prisma.comment.findUnique({
    where: {
      id: commentId,
    },
    include: {
      post: true,
    },
  });

  let postCommentsCount = await prisma.comment.count({
    where: {
      parentPostId: comment!.parentPostId,
      parentId: null,
    },
  });

  let percentage = (THRESHOLD / postCommentsCount) * 100;
  let url = `/${postType}/${postSlug}/comments/${comment!.post!.id}`;

  await sendNotification(
    postOwnerId,
    commentId,
    comment!.post!.uploadedById,
    percentage,
    url
  );
}
