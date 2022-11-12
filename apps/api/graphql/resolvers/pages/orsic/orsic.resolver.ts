import IsUserAuthenticated from "../../../permissions/IsUserAuthenticated";
import {
  AddOrsicPost,
  AddOrsicPostArgs,
  DeleteOrsicPost,
  DeleteOrsicPostArgs,
  GetBuildOrsicList,
  GetOrsicPost,
  GetOrsicPostArgs,
  UpdateOrsicPost,
  UpdateOrsicPostArgs,
} from "./controllers/orsic.controller";

const ORSIC_RESOLVERS = {
  Query: {
    getOrsic(_: void, args: GetOrsicPostArgs) {
      return GetOrsicPost(args);
    },
    getBuildOrsicList() {
      return GetBuildOrsicList();
    },
  },

  Mutation: {
    addOrsicPost(_: void, args: AddOrsicPostArgs, context: any) {
      IsUserAuthenticated(context);

      return AddOrsicPost(args, context.getUser());
    },

    updateOrsicPost(_: void, args: UpdateOrsicPostArgs, context: any) {
      IsUserAuthenticated(context);

      return UpdateOrsicPost(args, context.getUser());
    },

    deleteOrsicPost(_: void, args: DeleteOrsicPostArgs, context: any) {
      IsUserAuthenticated(context);

      return DeleteOrsicPost(args, context.getUser());
    },
  },
};

export default ORSIC_RESOLVERS;
