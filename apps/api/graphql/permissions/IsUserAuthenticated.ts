import { ForbiddenError } from 'apollo-server-express';

export default function IsUserAuthenticated(context: any) {
    if (!context.isAuthenticated()) {
        throw new ForbiddenError(
            'User is not authenticated to perform this operation.'
        );
    }
}

export interface User {
    id: string;
    username: string;
    email: string;
    name: string;
    avatar: string;
    banner: string | null;
    bio: string;
    joined: Date;
    _count: {
        followers: number;
        following: number;
    };
}
