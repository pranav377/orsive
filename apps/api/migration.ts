/*The code in this file will be run while deploying. 
Can include db operations, data transfer, data migration, etc.
*/
import { userOptions } from './models/user/UserModel';
import { getOrsicContent } from './graphql/resolvers/post/controllers/post.controller';
import prisma from './graphql/utils/data/dbClient';
import { EXTRA_POST_ARGS } from './models/user/UserModel';
import { searchIndex } from './graphql/utils/mepster/searchClient';

async function imagesMigrate() {
    let allImages = await prisma.image.findMany({
        ...EXTRA_POST_ARGS,
    });

    let images = allImages.map((image) => {
        let basePost = image.post;
        if (basePost) {
            return {
                ...image,
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
        }
    });

    searchIndex.addDocuments(images);
}

async function orsicsMigrate() {
    let allOrsics = await prisma.orsic.findMany({
        ...EXTRA_POST_ARGS,
    });

    let orsics = allOrsics.map((orsic) => {
        let basePost = orsic.post;
        if (basePost) {
            return {
                ...orsic,
                ...getOrsicContent(orsic.content),
                fullContent: orsic.content,
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
        }
    });

    searchIndex.addDocuments(orsics);
}

async function usersMigrate() {
    let allUsers = await prisma.profile.findMany({
        ...userOptions,
    });

    let users = allUsers.map((user) => {
        return {
            id: user.id,
            type: 'Profile',
            username: user.username,
            name: user.name,
            avatar: user.avatar,
            joined: user.joined,
            _count: { ...user._count },
        };
    });

    searchIndex.addDocuments(users);
}

imagesMigrate();
orsicsMigrate();
usersMigrate();
