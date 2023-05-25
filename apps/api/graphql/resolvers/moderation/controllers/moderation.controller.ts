import { ApolloError } from 'apollo-server-express';
import { User } from '../../../permissions/IsUserAuthenticated';
import prisma from '../../../utils/data/dbClient';
import { ReportReason } from '@prisma/client';
import VoteScheduler from '../../../../systems/mod-vote-handler/voteScheduler';
import GetObjOrNotFound from '../../../utils/getObjOrNotFound';
import agenda from '../../../../systems/mod-vote-handler/poller/scheduler';
import {
    getPostData,
    POST_PRISMA_ARGS,
} from '../../post/controllers/post.controller';
import moment from 'moment';
import { PAGINATION_SET_SIZE } from '../../../config';
import deleteItem from '../../../utils/mepster/item/deleteItem';
import deleteUserFromGorseAndSearch from '../../../utils/mepster/user/deleteUserFromGorseAndSearch';

export interface AddReportInterface {
    post_id: string;
    reason: ReportReason;
}

export interface ReportHandleInterface {
    post_id: string;
}

export interface UserHandleInterface {
    username: string;
}

export interface GetReportsArgs {
    page?: number;
}

export async function GetReports(args: GetReportsArgs) {
    let page = (args.page || 1) - 1;
    let offset = page * PAGINATION_SET_SIZE;

    let reportsCount = await prisma.report.count();

    let hasNextPage = (args.page || 1) * PAGINATION_SET_SIZE < reportsCount;
    let nextPage = (args.page || 1) + 1;

    let reports = await prisma.report.findMany({
        skip: offset,
        take: PAGINATION_SET_SIZE,
        orderBy: {
            createdAt: 'desc',
        },
        include: {
            post: {
                include: {
                    image: {
                        ...POST_PRISMA_ARGS,
                    },
                    orsic: {
                        ...POST_PRISMA_ARGS,
                    },
                    comment: {
                        ...POST_PRISMA_ARGS,
                    },
                },
            },
        },
    });

    return {
        data: reports.map(async (report) => {
            return {
                id: report.id,
                post: getPostData(report.post),
                votingEnds: moment(report.createdAt).add(3, 'days').toDate(),
            };
        }),
        hasNextPage,
        nextPage,
    };
}

export async function AddReport(args: AddReportInterface, user: User) {
    let reportAlreadyExists = !!(await prisma.report.findFirst({
        where: {
            postId: args.post_id,
        },
    }));

    if (reportAlreadyExists) {
        throw new ApolloError('Report already exists!');
    }

    const report = await prisma.report.create({
        data: {
            reason: args.reason,
            postId: args.post_id,
            userId: user.id,
        },
    });

    VoteScheduler(report.id);

    return 'ok';
}

export async function DeleteReport(args: ReportHandleInterface, user: User) {
    let userReport = GetObjOrNotFound(
        await prisma.report.findFirst({
            where: {
                postId: args.post_id,
                userId: user.id,
            },
        })
    );

    await prisma.report.delete({
        where: {
            id: userReport!.id,
        },
    });
    await agenda.cancel({
        $where: {
            name: `report_${userReport!.id}`,
        },
    });
    return 'ok';
}

export async function DeletePost(args: ReportHandleInterface) {
    const post = GetObjOrNotFound(
        await prisma.post.findUnique({
            where: {
                id: args.post_id,
            },
            include: {
                comment: true,
                image: true,
                orsic: true,
            },
        })
    );

    switch (post.postType) {
        case 'image': {
            let imagePost = GetObjOrNotFound(
                await prisma.image.findUnique({
                    where: {
                        slug: post.image!.slug,
                    },
                    include: {
                        post: true,
                    },
                })
            );

            deleteItem(imagePost!.post!.id, imagePost);

            await prisma.image.delete({
                where: { slug: imagePost.slug },
            });

            await prisma.comment.deleteMany({
                where: {
                    parentPostId: imagePost!.post!.id,
                },
            });
        }

        case 'orsic': {
            let orsicPost = GetObjOrNotFound(
                await prisma.orsic.findUnique({
                    where: {
                        slug: post.orsic!.slug,
                    },
                    include: {
                        post: true,
                    },
                })
            );

            deleteItem(orsicPost!.post!.id, orsicPost);

            await prisma.orsic.delete({
                where: { slug: orsicPost.slug },
            });

            await prisma.comment.deleteMany({
                where: {
                    parentPostId: orsicPost!.post!.id,
                },
            });
        }

        case 'comment': {
            let comment = GetObjOrNotFound(
                await prisma.comment.findFirst({
                    where: {
                        post: {
                            id: args.post_id,
                        },
                    },
                    include: {
                        post: true,
                    },
                })
            );

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
        }
    }
    return 'success';
}

export async function DeleteUser(args: UserHandleInterface) {
    const user = GetObjOrNotFound(
        await prisma.profile.findUnique({
            where: {
                username: args.username,
            },
        })
    );

    const userOrsics = await prisma.orsic.findMany({
        where: {
            post: {
                uploadedById: user.id,
            },
        },
        include: {
            post: true,
        },
    });

    await Promise.all(
        userOrsics.map(async (orsic) => {
            await DeletePost({
                post_id: orsic.post!.id,
            });
        })
    );

    const userImages = await prisma.image.findMany({
        where: {
            post: {
                uploadedById: user.id,
            },
        },
        include: {
            post: true,
        },
    });

    await Promise.all(
        userImages.map(async (image) => {
            await DeletePost({
                post_id: image.post!.id,
            });
        })
    );

    const userComments = await prisma.comment.findMany({
        where: {
            post: {
                uploadedById: user.id,
            },
        },
        include: {
            post: true,
        },
    });

    await Promise.all(
        userComments.map(async (comment) => {
            await DeletePost({
                post_id: comment.post!.id,
            });
        })
    );

    await prisma.notification.deleteMany({
        where: {
            forUserId: user.id,
        },
    });

    await prisma.profile.delete({
        where: {
            username: args.username,
        },
    });

    deleteUserFromGorseAndSearch(user.id);

    return 'success';
}
