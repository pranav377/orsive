import GetObjOrNotFound from "../../objOrNotFound";
import prisma from "../dbClient";

export default async function generateContentPostUrl(postId: string) {
  let url: string;

  let post = GetObjOrNotFound(
    await prisma.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        image: true,
        orsic: true,
      },
    })
  );

  url = `/${post!.postType}/${
    post!.postType === "image" ? post!.image!.slug : post!.orsic!.slug
  }`;

  return url;
}
