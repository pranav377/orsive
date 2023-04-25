import { PostType } from '@prisma/client';
import prisma from '../../../../../graphql/utils/data/dbClient';
import imageModel from '../../../../../models/post/ImageModel';
import orsicModel from '../../../../../models/post/OrsicModel';

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

            await imageModel.deleteImage(image!);

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

            await orsicModel.deleteOrsic(orsic!);

            break;
    }
}
