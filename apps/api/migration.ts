/*The code in this file will be run while deploying. 
Can include db operations, data transfer, data migration, etc.
*/

import { userOptions } from "./graphql/resolvers/auth/controllers/auth.controller";
import { getOrsicContent } from "./graphql/resolvers/post/controllers/post.controller";
import prisma from "./graphql/utils/data/dbClient";
import { EXTRA_POST_ARGS } from "./graphql/utils/mepster/item/insertItem";
import { searchIndex } from "./graphql/utils/mepster/searchClient";

(async () => {
  let orsics = await prisma.orsic.findMany({
    ...EXTRA_POST_ARGS,
  });
  let images = await prisma.image.findMany({
    ...EXTRA_POST_ARGS,
  });
  let users = await prisma.profile.findMany({ ...userOptions });

  orsics.map(async (orsic) => {
    let basePost = orsic.post;
    if (basePost) {
      await searchIndex.addDocuments([
        {
          ...orsic,
          ...(basePost.postType === "orsic" && {
            ...getOrsicContent(orsic.content),
            fullContent: orsic.content,
          }),
          type: "Post",
          id: basePost.id,
          post: {
            id: basePost.id,
            postType: basePost.postType,
            uploadedBy: {
              id: basePost.uploadedBy.id,
              username: basePost.uploadedBy.username,
              name: basePost.uploadedBy.name,
              avatar: basePost.uploadedBy.avatar,
              joined: basePost.uploadedBy.joined,
            },
            createdAt: basePost.createdAt,
            _count: basePost._count,
          },
        },
      ]);
    }
  });

  images.map(async (image) => {
    let basePost = image.post;
    if (basePost) {
      await searchIndex.addDocuments([
        {
          ...image,
          type: "Post",
          id: basePost.id,
          post: {
            id: basePost.id,
            postType: basePost.postType,
            uploadedBy: {
              id: basePost.uploadedBy.id,
              username: basePost.uploadedBy.username,
              name: basePost.uploadedBy.name,
              avatar: basePost.uploadedBy.avatar,
              joined: basePost.uploadedBy.joined,
            },
            createdAt: basePost.createdAt,
            _count: basePost._count,
          },
        },
      ]);
    }
  });

  users.map(async (profile) => {
    await searchIndex.addDocuments([
      {
        id: profile.id,
        type: "Profile",
        username: profile.username,
        name: profile.name,
        avatar: profile.avatar,
        joined: profile.joined,
        _count: { ...profile._count },
      },
    ]);
  });
})();
