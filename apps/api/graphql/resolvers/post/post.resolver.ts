import { GetPosts, GetPostsArgs } from './controllers/post.controller';

const POST_RESOLVERS = {
    PostUnion: {
        __resolveType(obj: any) {
            if (obj.post.postType === 'image') {
                return 'Image';
            }

            if (obj.post.postType === 'orsic') {
                return 'Orsic';
            }

            return null; // GraphQLError is thrown
        },
    },

    AllPostUnion: {
        __resolveType(obj: any) {
            if (obj.post.postType === 'image') {
                return 'Image';
            }

            if (obj.post.postType === 'orsic') {
                return 'Orsic';
            }

            if (obj.post.postType === 'comment' && !obj.parentId) {
                return 'Comment';
            }

            if (obj.post.postType === 'comment' && obj.parentId) {
                return 'Reply';
            }

            return null; // GraphQLError is thrown
        },
    },

    Query: {
        getPosts(_: void, args: GetPostsArgs, context: any) {
            return GetPosts(context.getUser(), args);
        },
    },
};

export default POST_RESOLVERS;
