import IsUserAuthenticated from "../../permissions/IsUserAuthenticated";
import {
  GetMyNotifications,
  GetMyNotificationsArgs,
  MakeNotificationsRead,
} from "./controllers/notifications.controller";

export const NOTIFICATIONS_RESOLVERS = {
  Notification: {
    __resolveType(notification: any) {
      if (notification.notificationType === "forPost") {
        return "NotificationForPost";
      }

      if (
        notification.notificationType === "forComment" ||
        notification.notificationType === "forReply"
      ) {
        return "NotificationForComment";
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
  },
};
