import prisma from '../dbClient';

export default async function getUserReputation(userId: string) {
    let reputation = await prisma.reputationBlockLog.aggregate({
        where: {
            userId,
        },
        _sum: {
            amount: true,
        },
    });

    return reputation._sum.amount || 0;
}
