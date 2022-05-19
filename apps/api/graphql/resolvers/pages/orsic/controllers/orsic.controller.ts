import { User } from "../../../../permissions/IsUserAuthenticated";
import IsUserOwner from "../../../../permissions/IsUserOwner";
import prisma from "../../../../utils/data/dbClient";
import generateSlug from "../../../../utils/data/generateSlug";
import validate from "../../../../utils/data/validate";
import GetObjOrNotFound from "../../../../utils/objOrNotFound";
import {
  ADD_ORSIC_POST_VALIDATOR,
  DELETE_ORSIC_POST_VALIDATOR,
  GET_ORSIC_POST_VALIDATOR,
  UPDATE_ORSIC_POST_VALIDATOR,
} from "../validators";
import insertItem, {
  EXTRA_POST_ARGS,
} from "../../../../utils/mepster/item/insertItem";
import updateItem from "../../../../utils/mepster/item/updateItem";
import deleteItem from "../../../../utils/mepster/item/deleteItem";
import { JSDOM } from "jsdom";

export interface AddOrsicPostArgs {
  input: AddOrsicPostInput;
}
export interface UpdateOrsicPostArgs {
  input: UpdateOrsicPostInput;
}

export interface AddOrsicPostInput {
  title?: string;
  content: string;
}

export interface UpdateOrsicPostInput {
  title?: string;
  content: string;
  slug: string;
}

export interface GetOrsicPostArgs {
  slug: string;
}

export interface DeleteOrsicPostArgs {
  slug: string;
}

function getFirstImage(content: string) {
  const dom = new JSDOM(content, { includeNodeLocations: true });
  return dom?.window?.document?.querySelector("img")?.getAttribute("src");
}

export async function AddOrsicPost(args: AddOrsicPostArgs, user: User) {
  let data: AddOrsicPostInput = validate(args.input, ADD_ORSIC_POST_VALIDATOR);

  let slug = generateSlug(data.title);

  let orsicPost = await prisma.orsic.create({
    data: {
      title: data.title,
      content: data.content,
      slug: slug,

      post: {
        create: {
          postType: "orsic",
          uploadedById: user.id,
        },
      },
    },
    ...EXTRA_POST_ARGS,
  });
  insertItem(
    {
      ItemId: orsicPost.post!.id,
    },
    orsicPost
  );

  return orsicPost;
}

export async function GetOrsicPost(args: GetOrsicPostArgs) {
  let data: GetOrsicPostArgs = validate(args, GET_ORSIC_POST_VALIDATOR);

  let orsic: any = GetObjOrNotFound(
    await prisma.orsic.findUnique({
      where: {
        slug: data.slug,
      },

      include: {
        post: {
          include: {
            uploadedBy: true,
            _count: {
              select: {
                dislikes: true,
                likes: true,
              },
            },
          },
        },
      },
    })
  );

  orsic = {
    ...orsic,
    image: getFirstImage(orsic.content) || orsic.post.uploadedBy.avatar,
  };

  return orsic;
}

export async function UpdateOrsicPost(args: UpdateOrsicPostArgs, user: User) {
  let data: UpdateOrsicPostInput = validate(
    args.input,
    UPDATE_ORSIC_POST_VALIDATOR
  );

  let oldPost = GetObjOrNotFound(
    await prisma.orsic.findUnique({
      where: {
        slug: data.slug,
      },
      include: {
        post: true,
      },
    })
  );
  IsUserOwner(user, oldPost);

  let newSlug = generateSlug(data.title);

  let post = await prisma.orsic.update({
    where: {
      slug: data.slug,
    },

    data: {
      title: data.title,
      content: data.content,
      slug: newSlug,
    },

    include: {
      post: {
        include: {
          uploadedBy: true,
          _count: {
            select: {
              dislikes: true,
              likes: true,
            },
          },
        },
      },
    },
  });

  updateItem(post.post!.id, post);

  return post;
}

export async function DeleteOrsicPost(args: DeleteOrsicPostArgs, user: User) {
  let data: DeleteOrsicPostArgs = validate(args, DELETE_ORSIC_POST_VALIDATOR);

  let post = GetObjOrNotFound(
    await prisma.orsic.findUnique({
      where: {
        slug: data.slug,
      },
      include: {
        post: {
          include: {
            uploadedBy: true,
            _count: {
              select: {
                dislikes: true,
                likes: true,
              },
            },
          },
        },
      },
    })
  );

  IsUserOwner(user, post);

  deleteItem(post!.post!.id, post);

  await prisma.orsic.delete({
    where: { slug: data.slug },
  });

  await prisma.comment.deleteMany({
    where: {
      parentPostId: post!.post!.id,
    },
  });

  return "success";
}
