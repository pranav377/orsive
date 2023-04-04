import { FileUpload } from 'graphql-upload';
import { User } from '../../../../permissions/IsUserAuthenticated';
import IsUserOwner from '../../../../permissions/IsUserOwner';
import prisma from '../../../../utils/data/dbClient';
import generateFilename from '../../../../utils/files/generateFilename';
import generateSlug from '../../../../utils/data/generateSlug';
import validate from '../../../../utils/data/validate';
import {
    ADD_IMAGE_POST_VALIDATOR,
    IMAGE_VALIDATOR,
    UPDATE_IMAGE_POST_VALIDATOR,
} from '../validators';
import GetObjOrNotFound from '../../../../utils/getObjOrNotFound';
import IsImageFileValid from '../../../../utils/files/isImageFileValid';
import saveFile from '../../../../utils/files/saveFile';
import probe from 'probe-image-size';
import { POSTS_BUILD_LIMIT } from '../../../../config';
import imageModel from '../../../../../models/post/ImageModel';

export interface AddImagePostArgs {
    input: AddImageInput;
}

export interface UpdateImagePostArgs {
    input: UpdateImageInput;
}

export interface AddImageInput {
    image: FileUpload;
    title?: string;
}

export interface UpdateImageInput {
    image?: FileUpload;
    title?: string;
    slug: string;
}

export interface GetImageArgs {
    slug: string;
}

export interface DeleteImagePostArgs {
    slug: string;
}

export async function AddImagePost(args: AddImagePostArgs, user: User) {
    let data: AddImageInput = validate(args.input, ADD_IMAGE_POST_VALIDATOR);
    const imageData = await data.image;

    await IsImageFileValid(imageData);

    let image = await saveFile(
        `images/${generateFilename(imageData.filename)}`,
        imageData
    );

    let slug = generateSlug(data.title);

    let { width, height } = await probe(imageData.createReadStream());

    let imagePost = await imageModel.createImage({
        image,
        title: data.title,
        width,
        height,
        slug,
        userId: user.id,
    });

    return imagePost;
}

export async function GetImage(args: GetImageArgs) {
    let data: GetImageArgs = validate(args, IMAGE_VALIDATOR);
    let image = await prisma.image.findUnique({
        where: {
            slug: data.slug,
        },

        include: {
            post: {
                include: {
                    uploadedBy: true,
                },
            },
        },
    });

    return GetObjOrNotFound(image, 'Image not found');
}

export async function UpdateImagePost(args: UpdateImagePostArgs, user: User) {
    let data: UpdateImageInput = validate(
        args.input,
        UPDATE_IMAGE_POST_VALIDATOR
    );

    let oldPost = GetObjOrNotFound(
        await prisma.image.findUnique({
            where: {
                slug: data.slug,
            },
            include: {
                post: true,
            },
        })
    );
    IsUserOwner(user, oldPost);

    let image;
    let width, height;
    let newSlug = generateSlug(data.title);

    if (data.image) {
        let imageData = await data.image;
        await IsImageFileValid(imageData);
        image = await saveFile(
            `images/${generateFilename(imageData.filename)}`,
            imageData
        );
        const result = await probe(imageData.createReadStream());
        width = result.width;
        height = result.height;
    }

    let imagePost = await imageModel.updateImage(oldPost.id, {
        image,
        width,
        height,
        slug: newSlug,
        title: data.title,
    });

    return imagePost;
}

export async function DeleteImagePost(args: DeleteImagePostArgs, user: User) {
    let data: DeleteImagePostArgs = validate(args, IMAGE_VALIDATOR);

    let imagePost = GetObjOrNotFound(
        await prisma.image.findUnique({
            where: {
                slug: data.slug,
            },
            include: {
                post: true,
            },
        })
    );

    IsUserOwner(user, imagePost);

    await imageModel.deleteImage(imagePost);

    return 'success';
}

export async function GetBuildImageList() {
    let images = await prisma.image.findMany({
        take: POSTS_BUILD_LIMIT,
        orderBy: {
            post: {
                createdAt: 'desc',
            },
        },
    });

    return images.map((image) => image.slug);
}
