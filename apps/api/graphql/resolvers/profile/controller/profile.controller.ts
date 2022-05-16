import { FileUpload } from "graphql-upload";
import { PAGINATION_SET_SIZE } from "../../../config";
import { User } from "../../../permissions/IsUserAuthenticated";
import prisma from "../../../utils/data/dbClient";
import IsUsernameValidForEditProfile from "../../../utils/data/IsUsernameValidForEditProfile";
import validate from "../../../utils/data/validate";
import generateFilename from "../../../utils/files/generateFilename";
import IsImageFileValid from "../../../utils/files/isImageFileValid";
import saveFile from "../../../utils/files/saveFile";
import updateUser from "../../../utils/mepster/user/updateUser";
import GetObjOrNotFound from "../../../utils/objOrNotFound";
import { userOptions } from "../../auth/controllers/auth.controller";
import {
  getPostsData,
  POST_PRISMA_ARGS,
} from "../../post/controllers/post.controller";
import { EDIT_PROFILE_VALIDATOR } from "../validators";

export interface GetProfilePostsArgs {
  username: string;
  page?: number;
}

export interface AmIFollowingArgs {
  username: string;
}

export interface EditProfileArgs {
  input: EditProfileInput;
}

export interface EditProfileInput {
  username?: string;
  name: string;
  avatar?: FileUpload;
  banner?: FileUpload;
  bio?: string;
}

export async function GetProfilePosts(args: GetProfilePostsArgs) {
  let profile = GetObjOrNotFound(
    await prisma.profile.findUnique({
      where: {
        username: args.username,
      },
    })
  );

  let page = (args.page || 1) - 1;
  let offset = page * PAGINATION_SET_SIZE;

  let postsCount = await prisma.post.count({
    where: {
      postType: {
        in: ["image", "orsic"],
      },
      uploadedById: profile!.id,
    },
  });

  let hasNextPage = (args.page || 1) * PAGINATION_SET_SIZE < postsCount;
  let nextPage = (args.page || 1) + 1;

  let profilePosts = await prisma.post.findMany({
    skip: offset,
    take: PAGINATION_SET_SIZE,
    where: {
      uploadedById: profile!.id,
      postType: {
        in: ["image", "orsic"],
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      image: {
        ...POST_PRISMA_ARGS,
      },
      orsic: {
        ...POST_PRISMA_ARGS,
      },
    },
  });

  return {
    data: getPostsData(profilePosts),
    hasNextPage,
    nextPage,
  };
}

export async function AmIFollowing(args: AmIFollowingArgs, user: User) {
  let profile = GetObjOrNotFound(
    await prisma.profile.findUnique({
      where: {
        username: args.username,
      },
    })
  );
  let meFollowingProfile = await prisma.profile.findFirst({
    where: {
      id: user.id,
      following: {
        some: {
          id: profile!.id,
        },
      },
    },
  });

  return !!meFollowingProfile;
}

export async function EditProfile(args: EditProfileArgs, user: User) {
  let data: EditProfileInput = validate(args.input, EDIT_PROFILE_VALIDATOR);

  if (data.username) {
    await IsUsernameValidForEditProfile({ username: data.username, user });
  }
  let avatar,
    banner = null;

  if (data.avatar) {
    const avatarData = await data.avatar;

    await IsImageFileValid(avatarData);

    avatar = await saveFile(
      `avatars/${generateFilename(avatarData.filename)}`,
      avatarData
    );
  }

  if (data.banner) {
    const bannerData = await data.banner;
    await IsImageFileValid(bannerData);
    banner = await saveFile(
      `banners/${generateFilename(bannerData.filename)}`,
      bannerData
    );
  }

  let updatedProfile = await prisma.profile.update({
    where: {
      id: user.id,
    },
    data: {
      name: data.name,
      ...(data.username && { username: data.username }),
      ...(avatar && { avatar }),
      ...(banner && { banner }),
      ...(data.bio && { bio: data.bio }),
    },

    ...userOptions,
  });

  updateUser(updatedProfile);

  return updatedProfile;
}
