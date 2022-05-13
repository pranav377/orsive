/*The code in this file will be run while deploying. 
Can include db operations, data transfer, data migration, etc.
*/

// import prisma from "./graphql/utils/data/dbClient";
// import { EXTRA_POST_ARGS } from "./graphql/utils/mepster/item/insertItem";
import { searchIndex } from "./graphql/utils/mepster/searchClient";

(async () => {
  //   let orsics = await prisma.orsic.findMany({
  //     ...EXTRA_POST_ARGS,
  //   });
  //   let images = await prisma.image.findMany({
  //     ...EXTRA_POST_ARGS,
  //   });

  searchIndex.deleteAllDocuments();

  //   orsics.map((orsic) => {
  //     let basePost = orsic.post;
  //     if (basePost) {
  //       searchIndex.updateDocuments([
  //         {
  //           ...orsic,
  //           type: "Post",
  //           id: basePost.id,
  //           post: {
  //             id: basePost.id,
  //             postType: basePost.postType,
  //             uploadedBy: {
  //               id: basePost.uploadedBy.id,
  //               username: basePost.uploadedBy.username,
  //               name: basePost.uploadedBy.name,
  //               avatar: basePost.uploadedBy.avatar,
  //               joined: basePost.uploadedBy.joined,
  //             },
  //             createdAt: basePost.createdAt,
  //             _count: basePost._count,
  //           },
  //         },
  //       ]);
  //     }
  //   });

  //   images.map((image) => {
  //     let basePost = image.post;
  //     if (basePost) {
  //       searchIndex.updateDocuments([
  //         {
  //           ...image,
  //           type: "Post",
  //           id: basePost.id,
  //           post: {
  //             id: basePost.id,
  //             postType: basePost.postType,
  //             uploadedBy: {
  //               id: basePost.uploadedBy.id,
  //               username: basePost.uploadedBy.username,
  //               name: basePost.uploadedBy.name,
  //               avatar: basePost.uploadedBy.avatar,
  //               joined: basePost.uploadedBy.joined,
  //             },
  //             createdAt: basePost.createdAt,
  //             _count: basePost._count,
  //           },
  //         },
  //       ]);
  //     }
  //   });
})();
