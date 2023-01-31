import { PostType } from '@prisma/client';
import prisma from '../../../../../graphql/utils/data/dbClient';
import deleteItem from '../../../../../graphql/utils/mepster/item/deleteItem';

export default async function (postId: string, postType: PostType) {
    switch (postType) {
        case 'comment':
            let comment = await prisma.comment.findFirst({
                where: {
                    post: {
                        id: postId,
                    },
                },
                include: {
                    post: true,
                },
            });

            if (!comment?.parentId) {
                await prisma.comment.deleteMany({
                    where: {
                        parentId: comment!.id,
                    },
                });
            }

            await prisma.comment.delete({
                where: {
                    id: comment!.id,
                },
            });

            break;

        case 'image':
            let image = await prisma.image.findFirst({
                where: {
                    post: {
                        id: postId,
                    },
                },
                include: {
                    post: true,
                },
            });

            deleteItem(image!.post!.id, image);

            await prisma.image.delete({
                where: { slug: image!.slug },
            });

            await prisma.comment.deleteMany({
                where: {
                    parentPostId: image!.post!.id,
                },
            });

            break;

        case 'orsic':
            let orsic = await prisma.orsic.findFirst({
                where: {
                    post: {
                        id: postId,
                    },
                },
                include: {
                    post: true,
                },
            });

            deleteItem(orsic!.post!.id, orsic);

            await prisma.orsic.delete({
                where: { slug: orsic!.slug },
            });

            await prisma.comment.deleteMany({
                where: {
                    parentPostId: orsic!.post!.id,
                },
            });

            break;
    }
}
