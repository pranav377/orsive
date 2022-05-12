import IsUserAuthenticated from "../../permissions/IsUserAuthenticated";
import {
  GetMyNotifications,
  GetMyNotificationsArgs,
  MakeNotificationsRead,
} from "./controllers/notifications.controller";

export const NOTIFICATIONS_RESOLVERS = {
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
