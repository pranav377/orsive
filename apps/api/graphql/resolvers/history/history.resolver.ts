import IsUserAuthenticated from "../../permissions/IsUserAuthenticated";
import { AddHistory, AddHistoryArgs } from "./controller/history.controller";

const HISTORY_RESOLVERS = {
  Mutation: {
    addHistory(_: void, args: AddHistoryArgs, context: any) {
      IsUserAuthenticated(context);

      return AddHistory(args, context.getUser());
    },
  },
};

export default HISTORY_RESOLVERS;
