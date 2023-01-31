import { ApolloError } from 'apollo-server-express';
import { User } from '../../permissions/IsUserAuthenticated';
import prisma from './dbClient';

interface IsUsernameValidArgs {
    username: string;
    user: User;
}

export default async function IsUsernameValidForEditProfile(
    data: IsUsernameValidArgs
) {
    let existingUser = await prisma.profile.findFirst({
        where: {
            username: data.username,
            id: {
                not: data.user.id,
            },
        },
    });

    let purifiedUsername = data.username.replace(/[^a-zA-Z0-9-_~]/g, '');

    if (existingUser || purifiedUsername !== data.username) {
        throw new ApolloError('Username is not valid');
    } else {
        return data.username;
    }
}
