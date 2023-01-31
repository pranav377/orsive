import prisma from '../../../../graphql/utils/data/dbClient';
import generatePostUrl from '../../../../graphql/utils/data/url';
import emailApi from '../../../../graphql/utils/email/client';
import GetObjOrNotFound from '../../../../graphql/utils/getObjOrNotFound';

export default async function staffDecision(reportId: string) {
    const report = GetObjOrNotFound(
        await prisma.report.findUnique({
            where: {
                id: reportId,
            },
        })
    );

    let postURL = await generatePostUrl(report!.postId);
    let staffMembers = await prisma.profile.findMany({
        where: {
            roles: {
                some: {
                    name: 'Staff',
                },
            },
        },
        orderBy: {
            joined: 'asc',
        },
    });

    let staffEmails = staffMembers.map((member) => {
        return {
            email: member.email,
        };
    });

    emailApi.sendTransacEmail({
        to: staffEmails,
        templateId: 5,
        params: {
            postURL,
        },
    });
}
