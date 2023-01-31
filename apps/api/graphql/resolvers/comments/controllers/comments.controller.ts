import { COMMENT_PAGINATION_SET_SIZE } from '../../../config';
import { User } from '../../../permissions/IsUserAuthenticated';
import IsUserOwner from '../../../permissions/IsUserOwner';
import getRepliesCount from '../../../utils/data/comments/getRepliesCount';
import prisma from '../../../utils/data/dbClient';
import sendNotificationsforComment from '../../../utils/data/notifications/sendNotificationsForComment';
import sendNotificationsforReply from '../../../utils/data/notifications/sendNotificationsForReply';
import generateCommentUrl from '../../../utils/data/url/generateCommentUrl';
import validateAsync from '../../../utils/data/validateAsync';
import GetObjOrNotFound from '../../../utils/getObjOrNotFound';
import { POST_PRISMA_ARGS } from '../../post/controllers/post.controller';
import {
    CREATE_COMMENT_VALIDATOR,
    CREATE_REPLY_VALIDATOR,
} from '../validators';

export interface GetCommentsArgs {
    post_id: string;
    page?: number;
}

export interface GetRepliesArgs {
    parent_id: string;
    page?: number;
}

export interface CreateCommentArgs {
    input: CreateCommentInput;
}

export interface CreateCommentInput {
    content: string;
    post_id: string;
}

export interface CreateReplyArgs {
    input: CreateReplyInput;
}

export interface CreateReplyInput {
    content: string;
    parent_id: string;
}

export interface GetMyCommentsArgs {
    post_id: string;
}

export interface GetCommentArgs {
    comment_id: string;
}

export async function GetComments(args: GetCommentsArgs, user: User | null) {
    let page = (args.page || 1) - 1;
    let offset = page * COMMENT_PAGINATION_SET_SIZE;

    let commentsCount = await prisma.comment.count({
        where: { parentPostId: args.post_id, parentId: null },
    });

    let hasNextPage =
        (args.page || 1) * COMMENT_PAGINATION_SET_SIZE < commentsCount;
    let nextPage = (args.page || 1) + 1;

    let comments = await prisma.comment.findMany({
        skip: offset,
        take: COMMENT_PAGINATION_SET_SIZE,
        where: {
            parentPostId: args.post_id,
            parentId: null,
            ...(user && {
                post: {
                    uploadedById: {
                        not: user.id,
                    },
                },
            }),
        },
        orderBy: {
            post: {
                likes: {
                    _count: 'desc',
                },
            },
        },
        ...POST_PRISMA_ARGS,
    });

    return {
        data: comments.map((comment) => {
            return {
                ...comment,
                replies: getRepliesCount(comment.post!.id),
            };
        }),
        hasNextPage,
        nextPage,
    };
}

export async function GetReplies(args: GetRepliesArgs) {
    let page = (args.page || 1) - 1;
    let offset = page * COMMENT_PAGINATION_SET_SIZE;

    let repliesCount = await prisma.comment.count({
        where: { parentId: args.parent_id },
    });

    let hasNextPage =
        (args.page || 1) * COMMENT_PAGINATION_SET_SIZE < repliesCount;
    let nextPage = (args.page || 1) + 1;

    let replies = await prisma.comment.findMany({
        skip: offset,
        take: COMMENT_PAGINATION_SET_SIZE,
        where: {
            parentId: args.parent_id,
        },
        orderBy: {
            post: {
                createdAt: 'asc',
            },
        },
        ...POST_PRISMA_ARGS,
    });

    return {
        data: replies,
        hasNextPage,
        nextPage,
    };
}

export async function CreateComment(args: CreateCommentArgs, user: User) {
    let data: CreateCommentInput = await validateAsync(
        args.input,
        CREATE_COMMENT_VALIDATOR
    );

    let parentPost = GetObjOrNotFound(
        await prisma.post.findFirst({
            where: {
                id: data.post_id,
                postType: {
                    in: ['image', 'orsic'],
                },
            },
            include: {
                image: true,
                orsic: true,
            },
        })
    );

    let comment = await prisma.comment.create({
        data: {
            content: data.content,
            parentPostId: data.post_id,
            parentId: null,
            post: {
                create: {
                    uploadedById: user.id,
                    postType: 'comment',
                },
            },
        },
        ...POST_PRISMA_ARGS,
    });

    if (parentPost!.uploadedById !== comment.post!.uploadedById) {
        sendNotificationsforComment(
            parentPost!.uploadedById,
            comment.id,
            // @ts-ignore
            parentPost!.postType,
            parentPost!.postType === 'image'
                ? parentPost!.image!.slug
                : parentPost!.orsic!.slug
        );
    }

    return { ...comment, replies: 0 };
}

export async function CreateReply(args: CreateReplyArgs, user: User) {
    let data: CreateReplyInput = await validateAsync(
        args.input,
        CREATE_REPLY_VALIDATOR
    );

    let parentComment = GetObjOrNotFound(
        await prisma.comment.findFirst({
            where: {
                post: {
                    id: data.parent_id,
                },
            },
            include: {
                post: true,
            },
        }),
        'Parent comment not found.'
    );

    let comment = await prisma.comment.create({
        data: {
            content: data.content,
            parentId: data.parent_id,
            parentPostId: parentComment!.parentPostId,
            post: {
                create: {
                    postType: 'comment',
                    uploadedById: user.id,
                },
            },
        },
        ...POST_PRISMA_ARGS,
    });

    let url = await generateCommentUrl(comment.post!.id);

    if (parentComment!.post!.uploadedById !== comment.post!.uploadedById) {
        sendNotificationsforReply(
            parentComment!.post!.uploadedById,
            comment.id,
            url
        );
    }

    return comment;
}

export async function GetMyComments(args: GetMyCommentsArgs, user: User) {
    let comments = await prisma.post.findMany({
        where: {
            comment: {
                parentPostId: args.post_id,
                parentId: null,
            },
            uploadedById: user.id,
        },
        orderBy: {
            likes: {
                _count: 'desc',
            },
        },

        include: {
            comment: {
                ...POST_PRISMA_ARGS,
            },
        },
    });

    return comments.map((comment) => {
        return {
            ...comment.comment,
            replies: getRepliesCount(comment.comment!.post!.id),
        };
    });
}

export async function GetComment(args: GetCommentArgs) {
    let comment = await prisma.post.findFirst({
        where: {
            comment: {
                post: {
                    id: args.comment_id,
                },
            },
        },
        include: {
            comment: {
                ...POST_PRISMA_ARGS,
            },
        },
    });

    return {
        ...comment!.comment,
        replies: getRepliesCount(comment!.comment!.post!.id),
    };
}

export async function GetReply(args: GetCommentArgs) {
    let reply = await prisma.comment.findFirst({
        where: {
            post: {
                id: args.comment_id,
            },
        },
        include: {
            post: {
                include: {
                    uploadedBy: true,
                },
            },
        },
    });

    return reply;
}

export async function DeleteComment(args: GetCommentArgs, user: User) {
    let comment = GetObjOrNotFound(
        await prisma.comment.findFirst({
            where: {
                post: {
                    id: args.comment_id,
                },
            },
            include: {
                post: true,
            },
        })
    );

    IsUserOwner(user, comment);

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

    return 'success';
}
