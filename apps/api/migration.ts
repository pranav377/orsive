/*The code in this file will be run while deploying. 
Can include db operations, data transfer, data migration, etc.
*/
import prisma from "./graphql/utils/data/dbClient";

(async () => {
  await prisma.comment.deleteMany();
})();
