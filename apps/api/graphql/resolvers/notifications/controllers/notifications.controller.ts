import invariant from "tiny-invariant";
import { COMMENT_PAGINATION_SET_SIZE } from "../../../config";
import { User } from "../../../permissions/IsUserAuthenticated";
import prisma from "../../../utils/data/dbClient";
import generatePostUrl from "../../../utils/data/url";

export interface GetMyNotificationsArgs {
  page?: number;
}

export interface UpdateNotificationTokenArgs {
  token: string;
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
    },
  });

  let hasNextPage =
    (args.page || 1) * COMMENT_PAGINATION_SET_SIZE < notificationsCount;
  let nextPage = (args.page || 1) + 1;

  let allNotifications = await prisma.notification.findMany({
    skip: offset,
    take: COMMENT_PAGINATION_SET_SIZE,
    where: {
      forUserId: user.id,
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
      notificationForReputation: {
        include: {
          reputation: true,
          notification: true,
        },
      },
    },
  });

  return {
    data: allNotifications.map(async (notification) => {
      if (notification.notificationType === "forPost") {
        let baseNotification = notification.notificationForPost;
        return {
          ...baseNotification,
          url: generatePostUrl(baseNotification!.postId!),
        };
      } else if (notification.notificationType === "forComment") {
        let baseNotification = notification.notificationForComment;

        return {
          ...baseNotification,
          url: generatePostUrl(baseNotification!.comment!.post!.id),
        };
      } else if (notification.notificationType === "forReply") {
        let baseNotification = notification.notificationForComment;
        let baseReply = baseNotification?.comment;

        return {
          ...baseNotification,
          url: generatePostUrl(baseReply!.post!.id),
        };
      } else {
        let baseNotification = notification.notificationForReputation;
        let amount = baseNotification!.reputation!.amount;

        return {
          ...baseNotification,
          amount,
        };
      }
    }),
    hasNextPage,
    nextPage,
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

export async function UpdateNotificationToken(
  args: UpdateNotificationTokenArgs,
  user: User
) {
  let me = await prisma.profile.findUnique({
    where: {
      id: user.id,
    },
  });
  invariant(me);

  if (!me.notificationToken.includes(args.token)) {
    await prisma.profile.update({
      where: {
        id: user.id,
      },
      data: {
        notificationToken: [...me.notificationToken, args.token],
      },
    });
  }

  return "ok";
}
