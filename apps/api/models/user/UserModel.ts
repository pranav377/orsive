import { getOrsicContent } from '../../graphql/resolvers/post/controllers/post.controller';
import prisma from '../../graphql/utils/data/dbClient';
import recommenderClient from '../../graphql/utils/mepster/client';
import { searchIndex } from '../../graphql/utils/mepster/searchClient';

export const extraUserCreateData = {
    roles: {
        create: {
            name: 'Early User',
            weight: 0.5,
        },
    },
};

export const userOptions = {
    include: {
        _count: {
            select: {
                followers: true,
                following: true,
            },
        },
    },
};

export const EXTRA_POST_ARGS = {
    include: {
        post: {
            include: {
                uploadedBy: true,
                _count: {
                    select: {
                        dislikes: true,
                        likes: true,
                    },
                },
            },
        },
    },
};

class UserModel {
    async createUser(input: {
        username: string;
        email: string;
        name: string;
        password: string;
        avatar: string;
    }) {
        const user = await prisma.profile.create({
            data: {
                ...input,
                ...extraUserCreateData,
            },
            ...userOptions,
        });

        await searchIndex.addDocuments([
            {
                id: user.id,
                type: 'Profile',
                username: user.username,
                name: user.name,
                avatar: user.avatar,
                joined: user.joined,
                _count: { ...user._count },
            },
        ]);

        await recommenderClient.post('/user/', {
            UserId: user.id,
        });

        return user;
    }

    async updateuser(
        id: string,
        input: {
            username?: string;
            email?: string;
            name?: string;
            avatar?: string;
            banner?: string | null;
            bio?: string;
        }
    ) {
        let user = await prisma.profile.update({
            where: {
                id,
            },
            data: input,
            ...userOptions,
        });

        const batchSize = 32;

        searchIndex.updateDocuments([
            {
                id: user.id,
                type: 'Profile',
                username: user.username,
                name: user.name,
                avatar: user.avatar,
                joined: user.joined,
                _count: { ...user._count },
            },
        ]);

        prisma.image
            .findMany({
                where: {
                    post: {
                        uploadedById: user.id,
                    },
                },

                ...EXTRA_POST_ARGS,
            })
            .then((imagePosts) => {
                searchIndex.addDocumentsInBatches(
                    imagePosts.map((imagePost: any) => {
                        let basePost = imagePost.post;
                        return {
                            ...imagePost,
                            type: 'Post',
                            id: basePost.id,
                            post: {
                                id: basePost.id,
                                postType: basePost.postType,
                                uploadedBy: {
                                    id: basePost.uploadedBy.id,
                                    username: basePost.uploadedBy.username,
                                    name: basePost.uploadedBy.name,
                                    avatar: basePost.uploadedBy.avatar,
                                    joined: basePost.uploadedBy.joined,
                                },
                                createdAt: basePost.createdAt,
                                _count: basePost._count,
                            },
                        };
                    }),
                    batchSize
                );
            });

        prisma.orsic
            .findMany({
                where: {
                    post: {
                        uploadedById: user.id,
                    },
                },

                ...EXTRA_POST_ARGS,
            })
            .then((orsicPosts) => {
                searchIndex.addDocumentsInBatches(
                    orsicPosts.map((orsicPost: any) => {
                        let basePost = orsicPost.post;
                        return {
                            ...orsicPost,
                            ...getOrsicContent(orsicPost.content),
                            fullContent: orsicPost.content,
                            type: 'Post',
                            id: basePost.id,
                            post: {
                                id: basePost.id,
                                postType: basePost.postType,
                                uploadedBy: {
                                    id: basePost.uploadedBy.id,
                                    username: basePost.uploadedBy.username,
                                    name: basePost.uploadedBy.name,
                                    avatar: basePost.uploadedBy.avatar,
                                    joined: basePost.uploadedBy.joined,
                                },
                                createdAt: basePost.createdAt,
                                _count: basePost._count,
                            },
                        };
                    }),
                    batchSize
                );
            });

        return user;
    }
}

const userModel = new UserModel();

export default userModel;
