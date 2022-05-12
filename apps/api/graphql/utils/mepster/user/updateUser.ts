import { getOrsicContent } from "../../../resolvers/post/controllers/post.controller";
import prisma from "../../data/dbClient";
import { EXTRA_POST_ARGS } from "../item/insertItem";
import { searchIndex } from "../searchClient";

export default async function updateUser(userDetails: any) {
  const batchSize = 32;

  searchIndex.updateDocuments([
    {
      id: userDetails.id,
      type: "Profile",
      username: userDetails.username,
      name: userDetails.name,
      avatar: userDetails.avatar,
      joined: userDetails.joined,
      _count: { ...userDetails._count },
    },
  ]);

  prisma.image
    .findMany({
      where: {
        post: {
          uploadedById: userDetails.id,
        },
      },

      ...EXTRA_POST_ARGS,
    })
    .then((imagePosts) => {
      searchIndex.addDocumentsInBatches(
        imagePosts.map((imagePost: any) => {
          let basePost = imagePost.post;
          return {
            ...imagePost,
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
          };
        }),
        batchSize
      );
    });

  prisma.orsic
    .findMany({
      where: {
        post: {
          uploadedById: userDetails.id,
        },
      },

      ...EXTRA_POST_ARGS,
    })
    .then((orsicPosts) => {
      searchIndex.addDocumentsInBatches(
        orsicPosts.map((orsicPost: any) => {
          let basePost = orsicPost.post;
          return {
            ...orsicPost,
            ...getOrsicContent(orsicPost.content),
            fullContent: orsicPost.content,
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
          };
        }),
        batchSize
      );
    });
}
