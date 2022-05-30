import IsUserAuthenticated from "../../permissions/IsUserAuthenticated";
import IsUserMod from "../../permissions/IsUserMod";
import {
  AddReport,
  AddReportInterface,
  DeleteReport,
  GetReports,
  GetReportsArgs,
  ReportAgainst,
  ReportFavor,
  ReportHandleInterface,
} from "./controllers/moderation.controller";

const MODERATION_RESOLVERS = {
  Query: {
    getReports(_: void, args: GetReportsArgs, context: any) {
      IsUserMod(context);

      return GetReports(args);
    },
  },

  Mutation: {
    // Reports
    addReport(_: void, args: AddReportInterface, context: any) {
      IsUserAuthenticated(context);

      return AddReport(args, context.getUser());
    },
    deleteReport(_: void, args: ReportHandleInterface, context: any) {
      IsUserAuthenticated(context);

      return DeleteReport(args, context.getUser());
    },

    // Report voting for mods
    reportFavor(_: void, args: ReportHandleInterface, context: any) {
      IsUserMod(context);

      return ReportFavor(args, context.getUser());
    },

    reportAgainst(_: void, args: ReportHandleInterface, context: any) {
      IsUserMod(context);

      return ReportAgainst(args, context.getUser());
    },
  },
};

export default MODERATION_RESOLVERS;
