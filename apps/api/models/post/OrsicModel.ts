import prisma from '../../graphql/utils/data/dbClient';
import { EXTRA_POST_ARGS, insertItem, updateItem, deleteItem } from '../post';
import { Orsic, Post } from '@prisma/client';

class OrsicModel {
    async createOrsic(input: {
        title?: string;
        content: string;
        slug: string;
        userId: string;
    }) {
        let orsicPost = await prisma.orsic.create({
            data: {
                title: input.title,
                content: input.content,
                slug: input.slug,

                post: {
                    create: {
                        postType: 'orsic',
                        uploadedById: input.userId,
                    },
                },
            },
            ...EXTRA_POST_ARGS,
        });

        insertItem(
            {
                ItemId: orsicPost.post!.id,
            },
            orsicPost
        );

        return orsicPost;
    }

    async updateOrsic(
        id: string,
        input: {
            title?: string;
            content: string;
            slug: string;
            userId: string;
        }
    ) {
        let orsicPost = await prisma.orsic.update({
            where: {
                id,
            },

            data: {
                title: input.title,
                content: input.content,
                slug: input.slug,
                post: {
                    update: {
                        updatedAt: new Date(),
                    },
                },
            },

            ...EXTRA_POST_ARGS,
        });

        updateItem(orsicPost.post!.id, orsicPost);

        return orsicPost;
    }

    async deleteOrsic(
        post: Orsic & {
            post: Post | null;
        }
    ) {
        deleteItem(post!.post!.id, post);

        await prisma.orsic.delete({
            where: { id: post.id },
        });

        await prisma.comment.deleteMany({
            where: {
                parentPostId: post!.post!.id,
            },
        });
    }
}

const orsicModel = new OrsicModel();

export default orsicModel;
