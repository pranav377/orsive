import { nanoid } from 'nanoid';
import {
    Strategy as DiscordStrategy,
    Profile as DiscordProfile,
} from 'passport-discord';
import { VerifyCallback as DiscordVerifyCallback } from 'passport-oauth2';
import {
    Profile,
    Strategy as GoogleStrategy,
    VerifyCallback,
} from 'passport-google-oauth20';
import slugify from 'slugify';
import { createFullAvatar } from './graphql/resolvers/auth/controllers/auth.controller';
import userModel, { userOptions } from './models/user/UserModel';
import prisma from './graphql/utils/data/dbClient';

import {
    DISCORD_CLIENT_ID,
    DISCORD_CLIENT_SECRET,
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
} from './graphql/config';

let discordScopes = ['identify', 'email'];
let googleScopes = ['profile', 'email'];

async function googleAccountCreate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
    cb: VerifyCallback
) {
    if (profile.emails) {
        const matchingUser = await prisma.profile.findUnique({
            where: {
                googleId: profile.id,
            },
            ...userOptions,
        });
        if (matchingUser) {
            cb(null, matchingUser);
            return;
        }

        const newUser = await userModel.createUser({
            googleId: profile.id,
            username: slugify(`${profile.displayName}${profile.id}`),
            name: profile.displayName,
            email: profile.emails[0].value,
            avatar: await createFullAvatar(),
            password: nanoid(77),
            authMethod: 'google',
        });

        cb(null, newUser);
    } else {
        cb(null, new Error('No email found'));
    }
}

async function discordAccountCreate(
    _accessToken: string,
    _refreshToken: string,
    profile: DiscordProfile,
    cb: DiscordVerifyCallback
) {
    if (profile.email) {
        const matchingUser = await prisma.profile.findUnique({
            where: {
                discordId: profile.id,
            },
            ...userOptions,
        });
        if (matchingUser) {
            cb(null, matchingUser);
            return;
        }

        const newUser = await userModel.createUser({
            discordId: profile.id,
            username: slugify(`${profile.username}${profile.discriminator}`),
            name: profile.username,
            email: profile.email,
            avatar: profile.avatar
                ? `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png`
                : await createFullAvatar(),
            banner: profile.banner,
            password: nanoid(77),
            authMethod: 'discord',
        });

        cb(null, newUser);
    } else {
        cb(new Error('No email found'));
    }
}

export const googleStrat = new GoogleStrategy(
    {
        clientID: GOOGLE_CLIENT_ID || ' ',
        clientSecret: GOOGLE_CLIENT_SECRET || ' ',
        callbackURL: '/auth/google/callback',
        scope: googleScopes,
    },
    googleAccountCreate
);

export const googleAndroidStrat = new GoogleStrategy(
    {
        clientID: GOOGLE_CLIENT_ID || ' ',
        clientSecret: GOOGLE_CLIENT_SECRET || ' ',
        callbackURL: '/auth/google-android/callback',
        scope: googleScopes,
    },
    googleAccountCreate
);

export const discordStrat = new DiscordStrategy(
    {
        clientID: DISCORD_CLIENT_ID || ' ',
        clientSecret: DISCORD_CLIENT_SECRET || ' ',
        callbackURL: '/auth/discord/callback',
        scope: discordScopes,
    },
    discordAccountCreate
);

export const discordAndroidStrat = new DiscordStrategy(
    {
        clientID: DISCORD_CLIENT_ID || ' ',
        clientSecret: DISCORD_CLIENT_SECRET || ' ',
        callbackURL: '/auth/discord-android/callback',
        scope: discordScopes,
    },
    discordAccountCreate
);
