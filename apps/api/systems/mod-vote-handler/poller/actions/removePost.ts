import moment from 'moment';
import prisma from '../../../../graphql/utils/data/dbClient';
import GetObjOrNotFound from '../../../../graphql/utils/getObjOrNotFound';
import invariant from 'tiny-invariant';
import deletePost from './utils/deletePost';
import agenda from '../scheduler';
import { ReportReason } from '@prisma/client';
import sendEmailToPostOwner from './utils/sendEmailToPostOwner';

export default async function removePost(postId: string, reason: ReportReason) {
    let post = GetObjOrNotFound(
        await prisma.post.findUnique({
            where: {
                id: postId,
            },
            include: {
                uploadedBy: true,
            },
        })
    );

    sendEmailToPostOwner(postId, post!.uploadedById, reason);

    let deleteTime = moment(new Date()).add(5, 'minutes').toDate();

    agenda.define(`delete_${postId}`, async function (job: any) {
        const { id } = job.attrs.data;

        let post = GetObjOrNotFound(
            await prisma.post.findUnique({
                where: {
                    id,
                },
            })
        );
        invariant(post);

        await deletePost(post!.id, post!.postType);
    });
    await agenda.start();
    await agenda.schedule(deleteTime, `delete_${postId}`, {
        id: postId,
    });
}
