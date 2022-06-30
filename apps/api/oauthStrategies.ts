import { nanoid } from "nanoid";
import { Strategy as DiscordStrategy } from "passport-discord";
import {
  Profile,
  Strategy as GoogleStrategy,
  VerifyCallback,
} from "passport-google-oauth20";
import slugify from "slugify";
import {
  createFullAvatar,
  extraUserCreateData,
  userOptions,
} from "./graphql/resolvers/auth/controllers/auth.controller";
import prisma from "./graphql/utils/data/dbClient";
import insertUser from "./graphql/utils/mepster/user/insertUser";

let discordScopes = ["identify", "email"];
let googleScopes = ["profile", "email"];

export const discordStrat = new DiscordStrategy(
  {
    clientID: process.env.DISCORD_CLIENT_ID || " ",
    clientSecret: process.env.DISCORD_CLIENT_SECRET || " ",
    callbackURL: process.env.DISCORD_CALLBACK_URL || " ",
    scope: discordScopes,
  },
  async function (_accessToken, _refreshToken, profile, cb) {
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
      const newUser = await prisma.profile.create({
        data: {
          discordId: profile.id,
          username: slugify(`${profile.username}${profile.discriminator}`),
          name: profile.username,
          email: profile.email,
          avatar: profile.avatar
            ? `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png`
            : await createFullAvatar(),
          banner: profile.banner,
          password: nanoid(77),
          authMethod: "discord",
          ...extraUserCreateData,
        },
        ...userOptions,
      });

      insertUser(
        {
          UserId: newUser.id,
        },
        newUser
      );
      cb(null, newUser);
    } else {
      cb(new Error("No email found"));
    }
  }
);

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
    const newUser = await prisma.profile.create({
      data: {
        googleId: profile.id,
        username: slugify(`${profile.displayName}${profile.id}`),
        name: profile.displayName,
        email: profile.emails[0].value,
        avatar: await createFullAvatar(),
        password: nanoid(77),
        authMethod: "google",
        ...extraUserCreateData,
      },
      ...userOptions,
    });

    insertUser(
      {
        UserId: newUser.id,
      },
      newUser
    );
    cb(null, newUser);
  } else {
    cb(null, new Error("No email found"));
  }
}

export const googleStrat = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID || " ",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || " ",
    callbackURL: "/auth/google/callback",
    scope: googleScopes,
  },
  googleAccountCreate
);

export const googleAndroidStrat = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID || " ",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || " ",
    callbackURL: "/auth/google-android/callback",
    scope: googleScopes,
  },
  googleAccountCreate
);
