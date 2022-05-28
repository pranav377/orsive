import moment from "moment";
import prisma from "../../../../graphql/utils/data/dbClient";
import GetObjOrNotFound from "../../../../graphql/utils/objOrNotFound";
import invariant from "tiny-invariant";
import deletePost from "./utils/deletePost";
import agenda from "../scheduler";

export default async function removePost(postId: string) {
  let deleteTime = moment(new Date()).add(5, "minutes").toDate();

  agenda.define(`delete_${postId}`, async function (job: any) {
    const { id } = job.attrs.data;

    let post = GetObjOrNotFound(
      await prisma.post.findUnique({
        where: {
          id,
        },
      })
    );
    invariant(post);

    await deletePost(post!.id, post!.postType);
  });
  await agenda.start();
  await agenda.schedule(deleteTime, `delete_${postId}`, {
    id: postId,
  });
}
