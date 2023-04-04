import prisma from '../../graphql/utils/data/dbClient';
import { EXTRA_POST_ARGS, insertItem, updateItem, deleteItem } from '../post';
import { Image, Post } from '@prisma/client';

class ImageModel {
    async createImage(input: {
        image: string;
        width: number;
        height: number;
        slug: string;
        title?: string;
        userId: string;
    }) {
        let imagePost = await prisma.image.create({
            data: {
                image: input.image,
                width: input.width,
                height: input.height,
                slug: input.slug,
                title: input.title,
                post: {
                    create: {
                        postType: 'image',
                        uploadedById: input.userId,
                    },
                },
            },

            ...EXTRA_POST_ARGS,
        });

        insertItem(
            {
                ItemId: imagePost.post!.id,
            },
            imagePost
        );

        return imagePost;
    }

    async updateImage(
        id: string,
        input: {
            image?: string;
            width?: number;
            height?: number;
            slug: string;
            title?: string;
        }
    ) {
        let imagePost = await prisma.image.update({
            where: {
                id,
            },
            data: {
                ...input,
                post: {
                    update: {
                        updatedAt: new Date(),
                    },
                },
            },
            ...EXTRA_POST_ARGS,
        });

        updateItem(imagePost.post!.id, imagePost);

        return imagePost;
    }

    async deleteImage(
        post: Image & {
            post: Post | null;
        }
    ) {
        deleteItem(post!.post!.id, post);

        await prisma.image.delete({
            where: { slug: post.slug },
        });

        await prisma.comment.deleteMany({
            where: {
                parentPostId: post!.post!.id,
            },
        });
    }
}

const imageModel = new ImageModel();

export default imageModel;
