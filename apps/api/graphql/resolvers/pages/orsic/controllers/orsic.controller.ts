import { User } from '../../../../permissions/IsUserAuthenticated';
import IsUserOwner from '../../../../permissions/IsUserOwner';
import prisma from '../../../../utils/data/dbClient';
import generateSlug from '../../../../utils/data/generateSlug';
import validate from '../../../../utils/data/validate';
import GetObjOrNotFound from '../../../../utils/getObjOrNotFound';
import {
    ADD_ORSIC_POST_VALIDATOR,
    DELETE_ORSIC_POST_VALIDATOR,
    GET_ORSIC_POST_VALIDATOR,
    UPDATE_ORSIC_POST_VALIDATOR,
} from '../validators';
import { JSDOM } from 'jsdom';
import validateAsync from '../../../../utils/data/validateAsync';
import { POSTS_BUILD_LIMIT } from '../../../../config';
import orsicModel from '../../../../../models/post/OrsicModel';

export interface AddOrsicPostArgs {
    input: AddOrsicPostInput;
}
export interface UpdateOrsicPostArgs {
    input: UpdateOrsicPostInput;
}

export interface AddOrsicPostInput {
    title?: string;
    content: string;
}

export interface UpdateOrsicPostInput {
    title?: string;
    content: string;
    slug: string;
}

export interface GetOrsicPostArgs {
    slug: string;
}

export interface DeleteOrsicPostArgs {
    slug: string;
}

function getFirstImage(content: string) {
    const dom = new JSDOM(content, { includeNodeLocations: true });
    return dom?.window?.document?.querySelector('img')?.getAttribute('src');
}

export async function AddOrsicPost(args: AddOrsicPostArgs, user: User) {
    let data: AddOrsicPostInput = await validateAsync(
        args.input,
        ADD_ORSIC_POST_VALIDATOR
    );
    let slug = generateSlug(data.title);

    let orsicPost = await orsicModel.createOrsic({
        ...data,
        slug,
        userId: user.id,
    });

    return orsicPost;
}

export async function GetOrsicPost(args: GetOrsicPostArgs) {
    let data: GetOrsicPostArgs = validate(args, GET_ORSIC_POST_VALIDATOR);

    let orsic: any = GetObjOrNotFound(
        await prisma.orsic.findUnique({
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
        })
    );

    orsic = {
        ...orsic,
        image: getFirstImage(orsic.content) || orsic.post.uploadedBy.avatar,
    };

    return orsic;
}

export async function UpdateOrsicPost(args: UpdateOrsicPostArgs, user: User) {
    let data: UpdateOrsicPostInput = await validateAsync(
        args.input,
        UPDATE_ORSIC_POST_VALIDATOR
    );

    let oldPost = GetObjOrNotFound(
        await prisma.orsic.findUnique({
            where: {
                slug: data.slug,
            },
            include: {
                post: true,
            },
        })
    );
    IsUserOwner(user, oldPost);

    let newSlug = generateSlug(data.title);

    let orsicPost = await orsicModel.updateOrsic(oldPost.id, {
        title: data.title,
        content: data.content,
        slug: newSlug,
        userId: user.id,
    });

    return orsicPost;
}

export async function DeleteOrsicPost(args: DeleteOrsicPostArgs, user: User) {
    let data: DeleteOrsicPostArgs = validate(args, DELETE_ORSIC_POST_VALIDATOR);

    let post = GetObjOrNotFound(
        await prisma.orsic.findUnique({
            where: {
                slug: data.slug,
            },
            include: {
                post: true,
            },
        })
    );

    IsUserOwner(user, post);

    await orsicModel.deleteOrsic(post);

    return 'success';
}

export async function GetBuildOrsicList() {
    let orsics = await prisma.orsic.findMany({
        take: POSTS_BUILD_LIMIT,
        orderBy: {
            post: {
                createdAt: 'desc',
            },
        },
    });

    return orsics.map((orsic) => orsic.slug);
}
