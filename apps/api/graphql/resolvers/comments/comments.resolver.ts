import IsUserAuthenticated from '../../permissions/IsUserAuthenticated';
import {
    CreateComment,
    CreateCommentArgs,
    CreateReply,
    CreateReplyArgs,
    DeleteComment,
    GetComment,
    GetCommentArgs,
    GetComments,
    GetCommentsArgs,
    GetMyComments,
    GetReplies,
    GetRepliesArgs,
    GetReply,
} from './controllers/comments.controller';

const COMMENTS_RESOLVERS = {
    Query: {
        getComments(_: void, args: GetCommentsArgs, context: any) {
            return GetComments(args, context.getUser());
        },

        getReplies(_: void, args: GetRepliesArgs) {
            return GetReplies(args);
        },

        getMyComments(_: void, args: any, context: any) {
            IsUserAuthenticated(context);

            return GetMyComments(args, context.getUser());
        },

        getComment(_: void, args: GetCommentArgs) {
            return GetComment(args);
        },

        getReply(_: void, args: GetCommentArgs) {
            return GetReply(args);
        },
    },

    Mutation: {
        createComment(_: void, args: CreateCommentArgs, context: any) {
            IsUserAuthenticated(context);

            return CreateComment(args, context.getUser());
        },
        createReply(_: void, args: CreateReplyArgs, context: any) {
            IsUserAuthenticated(context);

            return CreateReply(args, context.getUser());
        },
        deleteComment(_: void, args: GetCommentArgs, context: any) {
            IsUserAuthenticated(context);

            return DeleteComment(args, context.getUser());
        },
    },
};

export default COMMENTS_RESOLVERS;
