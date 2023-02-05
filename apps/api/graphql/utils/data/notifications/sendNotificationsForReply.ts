// send notification to the comment owner when he/she gets a reply on their comment. Send only if owner and reply owner are not same

import prisma from '../dbClient';

const THRESHOLD = 100;

async function sendNotification(
    commentOwnerId: string,
    replyId: string,
    _replyUploadedById: string,
    percentage: number,
    _url: string
) {
    var random = Math.floor(Math.random() * 101);
    if (random <= percentage) {
        return prisma.notificationForComment.create({
            data: {
                commentId: replyId,
                notification: {
                    create: {
                        forUserId: commentOwnerId,
                        notificationType: 'forReply',
                    },
                },
            },
        });
    } else {
        return null;
    }
}

export default async function sendNotificationsforReply(
    commentOwnerId: string,
    replyId: string,
    url: string
) {
    let reply = await prisma.comment.findUnique({
        where: {
            id: replyId,
        },
        include: {
            post: true,
        },
    });

    let allRepliesCount = await prisma.comment.count({
        where: {
            parentId: reply!.parentId,
        },
    });

    let percentage = (THRESHOLD / allRepliesCount) * 100;

    await sendNotification(
        commentOwnerId,
        replyId,
        reply!.post!.uploadedById,
        percentage,
        url
    );
}
