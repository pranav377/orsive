import GetObjOrNotFound from "../../getObjOrNotFound";
import prisma from "../dbClient";

export default async function generateCommentUrl(commentPostId: string) {
  let url: string;
  let post = GetObjOrNotFound(
    await prisma.post.findUnique({
      where: {
        id: commentPostId,
      },
      include: {
        comment: {
          include: {
            post: true,
          },
        },
      },
    })
  );
  let comment = post!.comment;

  let parentPost = GetObjOrNotFound(
    await prisma.post.findUnique({
      where: {
        id: comment!.parentPostId!,
      },
      include: {
        image: true,
        orsic: true,
      },
    })
  );

  let parentPostSlug =
    parentPost!.postType === "image"
      ? parentPost!.image!.slug
      : parentPost!.orsic!.slug;

  if (comment!.parentId) {
    url = `/${parentPost!.postType}/${parentPostSlug}/comments/${
      comment!.parentId
    }/replies/${comment!.post!.id}`;
  } else {
    url = `/${parentPost!.postType}/${parentPostSlug}/comments/${
      comment!.post!.id
    }`;
  }

  return url;
}
