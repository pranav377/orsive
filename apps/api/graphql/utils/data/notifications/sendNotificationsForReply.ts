// send notification to the comment owner when he/she gets a reply on their comment. Send only if owner and reply owner are not same

import prisma from "../dbClient";
import NotificationClient from "./client";

const THRESHOLD = 100;

async function sendNotification(
  commentOwnerId: string,
  replyId: string,
  replyUploadedById: string,
  percentage: number,
  url: string
) {
  var random = Math.floor(Math.random() * 101);
  if (random <= percentage) {
    let commentOwner = await prisma.profile.findUnique({
      where: {
        id: commentOwnerId,
      },
    });

    let repliedBy = await prisma.profile.findUnique({
      where: {
        id: replyUploadedById,
      },
    });

    if (process.env.NODE_ENV === "production") {
      await Promise.all(
        commentOwner!.notificationToken?.map(async (notificationToken) => {
          await NotificationClient.post("", {
            to: notificationToken,
            data: {
              title: "New Reply",
              body: `${repliedBy!.name} replied on your comment`,
              for: commentOwner!.username,
              url,
            },
          });
        })
      );
    }

    return prisma.notificationForComment.create({
      data: {
        commentId: replyId,
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
  replyId: string,
  url: string
) {
  let reply = await prisma.comment.findUnique({
    where: {
      id: replyId,
    },
    include: {
      post: true,
    },
  });

  let allRepliesCount = await prisma.comment.count({
    where: {
      parentId: reply!.parentId,
    },
  });

  let percentage = (THRESHOLD / allRepliesCount) * 100;

  await sendNotification(
    commentOwnerId,
    replyId,
    reply!.post!.uploadedById,
    percentage,
    url
  );
}
