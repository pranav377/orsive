import IsUserAuthenticated from '../../permissions/IsUserAuthenticated';
import {
    GetProfilePosts,
    AmIFollowingArgs,
    GetProfilePostsArgs,
    AmIFollowing,
    EditProfile,
    EditProfileArgs,
    GetFollowingPostsArgs,
    GetFollowingPosts,
} from './controller/profile.controller';

const PROFILE_RESOLVERS = {
    Query: {
        getProfilePosts(_: void, args: GetProfilePostsArgs) {
            return GetProfilePosts(args);
        },

        getFollowingPosts(_: void, args: GetFollowingPostsArgs, context: any) {
            IsUserAuthenticated(context);

            return GetFollowingPosts(args, context.getUser());
        },

        amIFollowing(_: void, args: AmIFollowingArgs, context: any) {
            IsUserAuthenticated(context);

            return AmIFollowing(args, context.getUser());
        },
    },

    Mutation: {
        editProfile(_: void, args: EditProfileArgs, context: any) {
            IsUserAuthenticated(context);

            return EditProfile(args, context.getUser());
        },
    },
};

export default PROFILE_RESOLVERS;
