/*The code in this file will be run while deploying. 
Can include db operations, data transfer, data migration, etc.
*/
import prisma from "./graphql/utils/data/dbClient";

(async () => {
  let comments = await prisma.comment.findMany();

  comments.map(async (comment) => {
    if (comment.parentId) {
      let parentComment = await prisma.comment.findUnique({
        where: {
          id: comment.parentId,
        },
      });

      if (parentComment) {
        await prisma.comment.update({
          where: {
            id: comment.id,
          },
          data: {
            parentPostId: parentComment.parentPostId!,
          },
        });
      } else {
        await prisma.comment.delete({
          where: {
            id: comment.id,
          },
        });
      }
    }
  });
})();
