/*The code in this file will be run while deploying. 
Can include db operations, data transfer, data migration, etc.
*/
import prisma from "./graphql/utils/data/dbClient";

(async () => {
  await prisma.notification.deleteMany();
  await prisma.notificationForComment.deleteMany();
  await prisma.notificationForPost.deleteMany();
  await prisma.comment.deleteMany();

  await prisma.post.deleteMany({
    where: {
      postType: "comment",
    },
  });
})();
