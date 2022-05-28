import moment from "moment";
import prisma from "../../../../graphql/utils/data/dbClient";
import schedule from "node-schedule";
import GetObjOrNotFound from "../../../../graphql/utils/objOrNotFound";
import invariant from "tiny-invariant";
import deletePost from "./utils/deletePost";

export default async function removePost(postId: string) {
  let deleteTime = moment(new Date()).add(5, "minutes").toDate();

  schedule.scheduleJob(
    deleteTime,
    async function (id: string) {
      let post = GetObjOrNotFound(
        await prisma.post.findUnique({
          where: {
            id,
          },
        })
      );
      invariant(post);

      await deletePost(post!.id, post!.postType);
    }.bind(null, postId)
  );
}
