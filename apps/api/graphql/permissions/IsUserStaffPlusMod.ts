import { Role } from '@prisma/client';
import { ForbiddenError } from 'apollo-server-express';

export default async function IsUserStaffPlusMod(context: any) {
    if (!context.isAuthenticated()) {
        throw new ForbiddenError(
            'User is not authenticated to perform this operation.'
        );
    } else {
        let user = context.getUser();

        let hasStaffPlusMod =
            user.roles.filter(
                (role: Role) => role.name === 'Staff' || role.name === 'Mod'
            ).length === 2;

        if (!hasStaffPlusMod) {
            throw new ForbiddenError(
                "User doesn't have both Staff and Mod roles."
            );
        }
    }
}
