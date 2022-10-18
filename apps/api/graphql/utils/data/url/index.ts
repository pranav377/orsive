import GetObjOrNotFound from "../../getObjOrNotFound";
import prisma from "../dbClient";
import generateCommentUrl from "./generateCommentUrl";
import generateContentPostUrl from "./generateContentPostUrl";

export default async function generatePostUrl(postId: string) {
  let post = GetObjOrNotFound(
    await prisma.post.findUnique({
      where: {
        id: postId,
      },
    })
  );

  if (post!.postType === "comment") {
    return generateCommentUrl(postId);
  } else {
    return generateContentPostUrl(postId);
  }
}
