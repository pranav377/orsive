import { ApolloError } from 'apollo-server-express';
import { CHECK_USERNAME_VALIDATOR } from '../../resolvers/auth/validators';
import prisma from './dbClient';
import validate from './validate';

interface IsUsernameValidArgs {
    username: string;
}

export default async function IsUsernameValid(args: IsUsernameValidArgs) {
    let data: IsUsernameValidArgs = validate(args, CHECK_USERNAME_VALIDATOR);

    let existingUser = await prisma.profile.findUnique({
        where: {
            username: data.username,
        },
    });

    let purifiedUsername = data.username.replace(/[^a-zA-Z0-9-_~]/g, '');

    if (existingUser || purifiedUsername !== data.username) {
        throw new ApolloError('Username is not valid');
    } else {
        return data.username;
    }
}
