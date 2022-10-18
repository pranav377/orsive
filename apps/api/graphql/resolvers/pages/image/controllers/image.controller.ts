import { FileUpload } from "graphql-upload";
import { User } from "../../../../permissions/IsUserAuthenticated";
import IsUserOwner from "../../../../permissions/IsUserOwner";
import prisma from "../../../../utils/data/dbClient";
import generateFilename from "../../../../utils/files/generateFilename";
import generateSlug from "../../../../utils/data/generateSlug";
import validate from "../../../../utils/data/validate";
import {
  ADD_IMAGE_POST_VALIDATOR,
  IMAGE_VALIDATOR,
  UPDATE_IMAGE_POST_VALIDATOR,
} from "../validators";
import GetObjOrNotFound from "../../../../utils/getObjOrNotFound";
import IsImageFileValid from "../../../../utils/files/isImageFileValid";
import saveFile from "../../../../utils/files/saveFile";
import insertItem, {
  EXTRA_POST_ARGS,
} from "../../../../utils/mepster/item/insertItem";
import updateItem from "../../../../utils/mepster/item/updateItem";
import deleteItem from "../../../../utils/mepster/item/deleteItem";
import probe from "probe-image-size";

export interface AddImagePostArgs {
  input: AddImageInput;
}

export interface UpdateImagePostArgs {
  input: UpdateImageInput;
}

export interface AddImageInput {
  image: FileUpload;
  title?: string;
}

export interface UpdateImageInput {
  image?: FileUpload;
  title?: string;
  slug: string;
}

export interface GetImageArgs {
  slug: string;
}

export interface DeleteImagePostArgs {
  slug: string;
}

export async function AddImagePost(args: AddImagePostArgs, user: User) {
  let data: AddImageInput = validate(args.input, ADD_IMAGE_POST_VALIDATOR);
  const imageData = await data.image;

  await IsImageFileValid(imageData);

  let image = await saveFile(
    `images/${generateFilename(imageData.filename)}`,
    imageData
  );

  let slug = generateSlug(data.title);

  let { width, height } = await probe(imageData.createReadStream());

  let imagePost = await prisma.image.create({
    data: {
      image,
      width,
      height,
      slug,
      title: data.title,
      post: {
        create: {
          postType: "image",
          uploadedById: user.id,
        },
      },
    },

    ...EXTRA_POST_ARGS,
  });

  insertItem(
    {
      ItemId: imagePost.post!.id,
    },
    imagePost
  );

  return imagePost;
}

export async function GetImage(args: GetImageArgs) {
  let data: GetImageArgs = validate(args, IMAGE_VALIDATOR);
  let image = await prisma.image.findUnique({
    where: {
      slug: data.slug,
    },

    include: {
      post: {
        include: {
          uploadedBy: true,
        },
      },
    },
  });

  return GetObjOrNotFound(image, "Image not found");
}

export async function UpdateImagePost(args: UpdateImagePostArgs, user: User) {
  let data: UpdateImageInput = validate(
    args.input,
    UPDATE_IMAGE_POST_VALIDATOR
  );

  let oldPost = GetObjOrNotFound(
    await prisma.image.findUnique({
      where: {
        slug: data.slug,
      },
      include: {
        post: true,
      },
    })
  );
  IsUserOwner(user, oldPost);

  let image;
  let width, height;
  let newSlug = generateSlug(data.title);

  if (data.image) {
    let imageData = await data.image;
    await IsImageFileValid(imageData);
    image = await saveFile(
      `images/${generateFilename(imageData.filename)}`,
      imageData
    );
    const result = await probe(imageData.createReadStream());
    width = result.width;
    height = result.height;
  }

  let post = await prisma.image.update({
    where: {
      slug: data.slug,
    },
    data: {
      ...(image && {
        image,
        width,
        height,
      }),
      slug: newSlug,
      title: data.title,
      post: {
        update: {
          updatedAt: new Date(),
        },
      },
    },
    include: {
      post: {
        include: {
          uploadedBy: true,
        },
      },
    },
  });

  updateItem(post.post!.id, post);

  return post;
}

export async function DeleteImagePost(args: DeleteImagePostArgs, user: User) {
  let data: DeleteImagePostArgs = validate(args, IMAGE_VALIDATOR);

  let post = GetObjOrNotFound(
    await prisma.image.findUnique({
      where: {
        slug: data.slug,
      },
      include: {
        post: true,
      },
    })
  );

  IsUserOwner(user, post);

  deleteItem(post!.post!.id, post);

  await prisma.image.delete({
    where: { slug: data.slug },
  });

  await prisma.comment.deleteMany({
    where: {
      parentPostId: post!.post!.id,
    },
  });

  return "success";
}
