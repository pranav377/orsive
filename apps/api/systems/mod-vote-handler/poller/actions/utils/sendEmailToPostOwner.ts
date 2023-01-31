import { ReportReason } from '@prisma/client';
import prisma from '../../../../../graphql/utils/data/dbClient';
import generatePostUrl from '../../../../../graphql/utils/data/url';
import emailApi from '../../../../../graphql/utils/email/client';

const REASON_MAP = {
    sus_spam: 'Suspicious/Spam',
    sensitive_content: 'displaying Sensitive Content',
    harmful: 'Abusive/Harmful',
};

export default async function sendEmailToPostOwner(
    postId: string,
    userId: string,
    reportReason: ReportReason
) {
    let user = await prisma.profile.findUnique({
        where: {
            id: userId,
        },
    });

    let postURL = await generatePostUrl(postId);
    let reason = REASON_MAP[reportReason];

    let params = { username: user!.username, postURL, reason };

    emailApi.sendTransacEmail({
        to: [
            {
                email: user!.email,
            },
        ],
        templateId: 4,
        params,
    });
}
