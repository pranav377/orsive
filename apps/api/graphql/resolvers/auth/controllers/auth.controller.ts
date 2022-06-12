import { customAlphabet, nanoid } from "nanoid";
import validate from "../../../utils/data/validate";
import {
  CHECK_EMAIL_VALIDATOR,
  GET_USER_VALIDATOR,
  OTP_VALIDATOR,
  SETUP_LANGGUAGES_VALIDATOR,
  SIGNIN_VALIDATOR,
  SIGNUP_VALIDATOR,
} from "../validators";
import sendOTP from "../../../utils/email/sendOTP";
import { ApolloError, AuthenticationError } from "apollo-server-express";
import bcrypt from "bcrypt";
import { createAvatar } from "@dicebear/avatars";
import * as style from "@dicebear/avatars-bottts-sprites";
import IsSignUpValid from "../validators/extra/signUpValidator";
import storage from "../../../../storage";
import generateFileUrl from "../../../utils/files/generateFileUrl";
import prisma from "../../../utils/data/dbClient";
import GetObjOrNotFound from "../../../utils/getObjOrNotFound";
import { User } from "../../../permissions/IsUserAuthenticated";
import invariant from "tiny-invariant";
import insertUser from "../../../utils/mepster/user/insertUser";
import getUserReputation from "../../../utils/data/reputation/getUserReputation";
import updateUser from "../../../utils/mepster/user/updateUser";
import sendPasswordResetOTP from "../../../utils/email/sendPasswordResetOTP";
import IsPasswordResetValid from "../validators/extra/passwordResetValidator";
import getUserPermissions from "../../../permissions/getUserPermissions";
import addLabelsForUser from "../../../utils/mepster/user/addLablesForUser";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../../config";

const otp_nanoid = customAlphabet("1234567890", 4);

export interface SignUpArgs {
  input: SignUpInput;
}

export interface SignUpInput {
  username: string;
  email: string;
  password: string;
  name: string;
  otp: string;
}

export interface SignInArgs {
  input: SignInInput;
}

export interface SignInInput {
  email: string;
  password: string;
}

export interface PasswordResetArgs {
  input: PasswordResetInput;
}

export interface PasswordResetInput {
  otp: string;
  email: string;
  new_password: string;
}

export interface GetOTPArgs {
  email: string;
}

export interface GetUserInput {
  username: string;
}

export interface CheckEmailInput {
  email: string;
}

export interface FollowUserInput {
  username: string;
}

export interface SetupLanguagesInput {
  langs: Array<string>;
}

export const userOptions = {
  include: {
    _count: {
      select: {
        followers: true,
        following: true,
      },
    },
  },
};

export const extraUserCreateData = {
  roles: {
    create: {
      name: "Early User",
      weight: 0.5,
    },
  },
};

export function getUserJwtToken(user: any) {
  return jwt.sign({ id: user.id }, JWT_SECRET, {
    expiresIn: "365d",
  });
}

async function simpleSignIn(context: any, email: string, password: string) {
  const { user } = await context.authenticate("graphql-local", {
    email,
    password,
    session: false,
  });

  context.login(user, { session: false });
  const token = getUserJwtToken(user);

  return { ...user, ...(await getUserPermissions(user.id)), token };
}

export async function createFullAvatar() {
  let avatarSvg = createAvatar(style, {
    seed: nanoid(),
  });

  let fileRelativeUrl = await storage.create(
    `avatars/${nanoid()}-avatar.svg`,
    avatarSvg,
    "image/svg+xml"
  );
  let avatar = generateFileUrl(fileRelativeUrl);

  return avatar;
}

export async function SignUp(args: SignUpArgs, context: any) {
  const data: SignUpInput = validate(args.input, SIGNUP_VALIDATOR);

  await IsSignUpValid(data.email, data.username, data.otp);

  const hashed = await bcrypt.hash(data.password, 10);

  let avatar = await createFullAvatar();

  try {
    const user = await prisma.profile.create({
      data: {
        username: data.username,
        email: data.email,
        name: data.name,
        password: hashed,
        avatar: avatar,
        ...extraUserCreateData,
      },
      ...userOptions,
    });

    insertUser(
      {
        UserId: user.id,
      },
      user
    );

    return simpleSignIn(context, data.email, data.password);
  } catch (err) {
    throw new AuthenticationError("Error creating account");
  }
}

export async function SignIn(args: SignInArgs, context: any) {
  const data: SignInInput = validate(args.input, SIGNIN_VALIDATOR);

  let email = data.email;
  let password = data.password;

  return simpleSignIn(context, email, password);
}

export async function PasswordReset(args: PasswordResetArgs) {
  const data = args.input;

  await IsPasswordResetValid(data.email, data.otp);

  const hashed = await bcrypt.hash(data.new_password, 10);

  await prisma.profile.update({
    where: {
      email: data.email,
    },
    data: {
      password: hashed,
    },
  });

  return "Password reset successful!";
}

export async function GetOTP(args: GetOTPArgs) {
  const data: GetOTPArgs = validate(args, OTP_VALIDATOR);

  let randomOTP = otp_nanoid();

  await prisma.oTP.create({
    data: {
      email: data.email,
      otp: randomOTP,
    },
  });

  sendOTP(data.email, randomOTP);
}

export async function GetPasswordResetOTP(args: GetOTPArgs) {
  const data: GetOTPArgs = validate(args, OTP_VALIDATOR);
  GetObjOrNotFound(
    await prisma.profile.findFirst({
      where: {
        email: data.email,
        authMethod: "local",
      },
    }),
    "User not found"
  );

  let randomOTP = otp_nanoid(9);

  await prisma.passwordResetOTP.create({
    data: {
      email: data.email,
      otp: randomOTP,
    },
  });

  sendPasswordResetOTP(data.email, randomOTP);

  return "ok";
}

export async function GetUser(args: GetUserInput) {
  const data = validate(args, GET_USER_VALIDATOR);

  let user: any = GetObjOrNotFound(
    await prisma.profile.findUnique({
      where: {
        username: data.username,
      },

      include: {
        _count: {
          select: {
            followers: true,
            following: true,
          },
        },

        roles: {
          orderBy: {
            weight: "desc",
          },
        },
      },
    }),
    "User not found"
  );

  user!.reputation = getUserReputation(user!.id);

  user!.roles = user!.roles
    .map((role: { name: string; weight: number }) => {
      return role.name;
    })
    .slice(0, 3);

  return user;
}

export async function CheckEmail(args: CheckEmailInput) {
  let data: CheckEmailInput = validate(args, CHECK_EMAIL_VALIDATOR);

  let user = await prisma.profile.findUnique({
    where: {
      email: data.email,
    },
  });

  if (!user) {
    return data.email;
  } else {
    throw new ApolloError("User already exists!");
  }
}

export async function FollowUser(args: FollowUserInput, user: User) {
  let data: FollowUserInput = validate(args, GET_USER_VALIDATOR);

  let userToFollow = GetObjOrNotFound(
    await prisma.profile.findUnique({
      where: {
        username: data.username,
      },
    }),
    "User not found"
  );
  invariant(userToFollow);

  if (user.id === userToFollow.id) {
    throw new ApolloError("You cannot follow yourself!");
  }

  let following = await prisma.profile.findFirst({
    where: {
      id: user.id,
      following: {
        some: {
          id: userToFollow.id,
        },
      },
    },
  });

  if (following) {
    await prisma.profile.update({
      where: {
        id: user.id,
      },
      data: {
        following: {
          disconnect: {
            id: userToFollow.id,
          },
        },
      },
    });
  } else {
    await prisma.profile.update({
      where: {
        id: user.id,
      },
      data: {
        following: {
          connect: {
            id: userToFollow.id,
          },
        },
      },
    });
  }

  updateUser(
    await prisma.profile.findUnique({
      where: {
        username: data.username,
      },
      ...userOptions,
    })
  );

  return "success";
}

export async function Me(user: User) {
  let userUnreadNotifications = !!(await prisma.notification.findFirst({
    where: {
      forUserId: user.id,
      seen: false,
    },
  }));

  return {
    ...user,
    unreadNotifications: userUnreadNotifications,
    ...(await getUserPermissions(user.id)),
  };
}

export async function SetupLanguages(args: SetupLanguagesInput, user: User) {
  let data: SetupLanguagesInput = validate(args, SETUP_LANGGUAGES_VALIDATOR);
  const langLabels = data.langs.map((lang) => `Language:${lang}`);

  await addLabelsForUser(langLabels, user.id);
  await prisma.profile.update({
    where: {
      id: user.id,
    },
    data: {
      setupComplete: true,
    },
  });

  return "ok";
}
