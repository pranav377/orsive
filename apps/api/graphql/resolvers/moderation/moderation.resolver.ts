import IsUserAuthenticated from '../../permissions/IsUserAuthenticated';
import IsUserMod from '../../permissions/IsUserMod';
import IsUserStaffPlusMod from '../../permissions/IsUserStaffPlusMod';
import hasUserVotedPostId from '../../utils/report/hasUserVotedPostId';
import {
    AddReport,
    AddReportInterface,
    DeletePost,
    DeleteReport,
    DeleteUser,
    GetReports,
    GetReportsArgs,
    ReportHandleInterface,
    UserHandleInterface,
} from './controllers/moderation.controller';

const MODERATION_RESOLVERS = {
    Query: {
        getReports(_: void, args: GetReportsArgs, context: any) {
            IsUserMod(context);

            return GetReports(args);
        },

        voteStatus(_: void, args: ReportHandleInterface, context: any) {
            IsUserMod(context);

            return hasUserVotedPostId(args.post_id, context.getUser().id);
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
        deletePost(_: void, args: ReportHandleInterface, context: any) {
            IsUserMod(context);

            return DeletePost(args);
        },
        deleteUser(_: void, args: UserHandleInterface, context: any) {
            IsUserMod(context);

            return DeleteUser(args);
        },
    },
};

export default MODERATION_RESOLVERS;
