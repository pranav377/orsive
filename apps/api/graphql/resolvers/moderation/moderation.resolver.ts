import IsUserAuthenticated from "../../permissions/IsUserAuthenticated";
import IsUserMod from "../../permissions/IsUserMod";
import {
  AddReport,
  AddReportInterface,
  DeleteReport,
  GetReports,
  GetReportsArgs,
} from "./controllers/moderation.controller";

const MODERATION_RESOLVERS = {
  Query: {
    getReports(_: void, args: GetReportsArgs, context: any) {
      IsUserMod(context);

      return GetReports(args);
    },
  },

  Mutation: {
    addReport(_: void, args: AddReportInterface, context: any) {
      IsUserAuthenticated(context);

      return AddReport(args, context.getUser());
    },
    deleteReport(_: void, args: AddReportInterface, context: any) {
      IsUserAuthenticated(context);

      return DeleteReport(args, context.getUser());
    },
  },
};

export default MODERATION_RESOLVERS;
