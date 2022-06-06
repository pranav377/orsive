import IsUserAuthenticated from "../../permissions/IsUserAuthenticated";
import {
  GetMyNotifications,
  GetMyNotificationsArgs,
  MakeNotificationsRead,
  UpdateNotificationToken,
  UpdateNotificationTokenArgs,
} from "./controllers/notifications.controller";

export const NOTIFICATIONS_RESOLVERS = {
  Notification: {
    __resolveType(notification: any) {
      if (notification.notification.notificationType === "forPost") {
        return "NotificationForPost";
      }

      if (
        notification.notification.notificationType === "forComment" ||
        notification.notification.notificationType === "forReply"
      ) {
        return "NotificationForComment";
      }

      if (notification.notification.notificationType === "forReputation") {
        return "NotificationForReputation";
      }

      return null; // GraphQLError is thrown
    },
  },

  Query: {
    getMyNotifications(_: void, args: GetMyNotificationsArgs, context: any) {
      IsUserAuthenticated(context);

      return GetMyNotifications(context.getUser(), args);
    },
  },
  Mutation: {
    makeNotificationsRead(_: void, _args: any, context: any) {
      IsUserAuthenticated(context);

      return MakeNotificationsRead(context.getUser());
    },
    updateNotificationToken(
      _: void,
      args: UpdateNotificationTokenArgs,
      context: any
    ) {
      IsUserAuthenticated(context);

      return UpdateNotificationToken(args, context.getUser());
    },
  },
};
