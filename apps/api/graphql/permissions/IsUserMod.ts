import { Role } from '@prisma/client';
import { ForbiddenError } from 'apollo-server-express';

export default function IsUserMod(context: any) {
    if (!context.isAuthenticated()) {
        throw new ForbiddenError(
            'User is not authenticated to perform this operation.'
        );
    } else {
        let user = context.getUser();
        let hasMod = user.roles.filter((role: Role) => role.name === 'Mod')[0];

        if (!hasMod) {
            throw new ForbiddenError('User is not a Mod.');
        }
    }
}
