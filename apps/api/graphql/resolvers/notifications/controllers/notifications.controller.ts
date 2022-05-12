import { COMMENT_PAGINATION_SET_SIZE } from "../../../config";
import { User } from "../../../permissions/IsUserAuthenticated";
import prisma from "../../../utils/data/dbClient";

export interface GetMyNotificationsArgs {
  page?: number;
}

const EXTRA_NOTIFICATIONS_ARGS = {
  include: {
    notification: true,
    post: {
      include: {
        uploadedBy: true,
        _count: {
          select: {
            dislikes: true,
            likes: true,
          },
        },
        image: true,
        orsic: true,
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
        },
        orderBy: {
          createdAt: "desc",
        },
        include: {
          notificationForPost: {
            ...EXTRA_NOTIFICATIONS_ARGS,
          },
        },
      })
    ).map((notification) => {
      const baseNotification = notification.notificationForPost;

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
