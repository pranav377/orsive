import { COMMENT_PAGINATION_SET_SIZE } from "../../../config";
import { User } from "../../../permissions/IsUserAuthenticated";
import prisma from "../../../utils/data/dbClient";

export interface GetMyNotificationsArgs {
  page?: number;
}

const EXTRA_NOTIFICATIONS_POST_ARGS = {
  include: {
    notification: true,
    post: {
      include: {
        uploadedBy: true,
        image: true,
        orsic: true,
      },
    },
  },
};

const EXTRA_NOTIFICATIONS_COMMENT_ARGS = {
  include: {
    notification: true,
    comment: {
      include: {
        post: {
          include: {
            uploadedBy: true,
            image: true,
            orsic: true,
          },
        },
      },
    },
  },
};

export async function GetMyNotifications(
  user: User,
  args: GetMyNotificationsArgs
) {
  let page = (args.page || 1) - 1;
  let offset = page * COMMENT_PAGINATION_SET_SIZE;

  let notificationsCount = await prisma.notification.count({
    where: {
      forUserId: user.id,
      notificationForPost: {
        post: {
          isNot: null,
        },
      },
      notificationForComment: {
        comment: {
          isNot: null,
        },
      },
    },
  });

  let hasNextPage =
    (args.page || 1) * COMMENT_PAGINATION_SET_SIZE < notificationsCount;

  return {
    data: (
      await prisma.notification.findMany({
        skip: offset,
        take: COMMENT_PAGINATION_SET_SIZE,
        where: {
          forUserId: user.id,
          notificationForPost: {
            post: {
              isNot: null,
            },
          },
          notificationForComment: {
            comment: {
              isNot: null,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        include: {
          notificationForPost: {
            ...EXTRA_NOTIFICATIONS_POST_ARGS,
          },
          notificationForComment: {
            ...EXTRA_NOTIFICATIONS_COMMENT_ARGS,
          },
        },
      })
    ).map(async (notification) => {
      if (notification.notificationType === "forPost") {
        let baseNotification = notification.notificationForPost;

        let slug = "";

        switch (baseNotification?.post?.postType) {
          case "image":
            slug = baseNotification.post.image?.slug!;
            break;

          case "orsic":
            slug = baseNotification.post.orsic?.slug!;
            break;
        }

        return {
          ...notification.notificationForPost,
          url: `/${baseNotification?.post?.postType}/${slug}`,
        };
      } else if (notification.notificationType === "forComment") {
        let baseNotification = notification.notificationForComment;
        let baseComment = baseNotification?.comment;
        let parentPost = await prisma.post.findUnique({
          where: {
            id: baseComment!.parentPostId!,
          },
          include: {
            image: true,
            orsic: true,
          },
        });

        let slug = "";

        switch (parentPost?.postType) {
          case "image":
            slug = `/image/${parentPost.image?.slug}/comments/${baseComment?.id}`;
            break;

          case "orsic":
            slug = `/orsic/${parentPost.orsic?.slug}/comments/${baseComment?.id}`;
            break;
        }

        return { ...baseNotification, url: slug };
      } else {
        let baseNotification = notification.notificationForComment;
        let baseReply = baseNotification?.comment;
        let parentPost = await prisma.post.findUnique({
          where: {
            id: baseReply?.parentPostId!,
          },
          include: {
            image: true,
            orsic: true,
          },
        });

        let slug = "";

        switch (parentPost?.postType) {
          case "image":
            slug = `/image/${parentPost.image?.slug}/comments/${baseReply?.parentId}/replies/${baseReply?.id}`;
            break;

          case "orsic":
            slug = `/orsic/${parentPost.orsic?.slug}/comments/${baseReply?.parentId}/replies/${baseReply?.id}`;
            break;
        }

        return { ...baseNotification, url: slug };
      }
    }),
    hasNextPage,
  };
}

export async function MakeNotificationsRead(user: User) {
  await prisma.notification.updateMany({
    where: {
      forUserId: user.id,
    },

    data: {
      seen: true,
    },
  });

  return "ok";
}
