// send notification to the post owner when he/she gets a comment on their post. send only if owner and comment owner are not same
import { NODE_ENV } from "../../../config";
import prisma from "../dbClient";
import NotificationClient from "./client";

const THRESHOLD = 300;

async function sendNotification(
  postOwnerId: string,
  commentId: string,
  commentUploadedById: string,
  percentage: number,
  url: string
) {
  let random = Math.floor(Math.random() * 101);
  if (random <= percentage) {
    let postOwner = await prisma.profile.findUnique({
      where: {
        id: postOwnerId,
      },
    });

    let commentedBy = await prisma.profile.findUnique({
      where: {
        id: commentUploadedById,
      },
    });

    if (NODE_ENV === "production") {
      await Promise.all(
        postOwner!.notificationToken?.map(async (notificationToken) => {
          await NotificationClient.post("", {
            to: notificationToken,
            data: {
              title: "New Comment",
              body: `${commentedBy!.name} commented on your post`,
              for: postOwner!.username,
              url,
            },
          });
        })
      );
    }

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
