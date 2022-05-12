import { User } from "../../../permissions/IsUserAuthenticated";
import prisma from "../../../utils/data/dbClient";
import { getLikeStatus } from "../../../utils/data/like/getLikeStatus";
import {
  dislikeReputation,
  likeReputation,
} from "../../../utils/data/reputation";
import validate from "../../../utils/data/validate";
import insertFeedback from "../../../utils/mepster/insertFeedback";
import removeFeedback from "../../../utils/mepster/removeFeedback";
import GetObjOrNotFound from "../../../utils/objOrNotFound";
import { ADD_LIKE_VALIDATOR } from "../validators";

export interface AddLikeArgs {
  input: AddLikeInput;
}

export interface AddLikeInput {
  id: string;
  like_type: LikeType;
}

export interface LikeStatusInput {
  post_id: string;
}

type LikeType = "like" | "dislike";

export async function AddLike(args: AddLikeArgs, user: User) {
  let data: AddLikeInput = validate(args.input, ADD_LIKE_VALIDATOR);

  const post = GetObjOrNotFound(
    await prisma.post.findUnique({
      where: {
        id: data.id,
      },
    }),
    "Post not found"
  );

  let { alreadyLikeStatus, alreadyLiked, alreadyDisliked } =
    await getLikeStatus(data.id, user.id);

  if (alreadyLikeStatus !== "nope") {
    if (alreadyLikeStatus === data.like_type) {
      removeFeedback(user.id, data.id);

      if (alreadyLiked) {
        await prisma.like.delete({
          where: {
            id: alreadyLiked.id,
          },
        });
      } else {
        await prisma.dislike.delete({
          where: {
            id: alreadyDisliked!.id,
          },
        });
      }
    } else {
      if (data.like_type === "like") {
        insertFeedback(user.id, data.id, "like");
        await prisma.dislike.delete({
          where: {
            id: alreadyDisliked!.id,
          },
        });
        let userLike = await prisma.like.create({
          data: {
            postId: data.id,
            userId: user.id,
          },
        });

        await likeReputation(post!.uploadedById, userLike.id, user.id);
      } else {
        removeFeedback(user.id, data.id);
        await prisma.like.delete({
          where: {
            id: alreadyLiked!.id,
          },
        });
        let userDislike = await prisma.dislike.create({
          data: {
            postId: data.id,
            userId: user.id,
          },
        });
        await dislikeReputation(post!.uploadedById, userDislike.id, user.id);
      }
    }
  } else {
    if (data.like_type === "like") {
      insertFeedback(user.id, data.id, "like");

      let userLike = await prisma.like.create({
        data: {
          userId: user.id,
          postId: data.id,
        },
      });

      await likeReputation(post!.uploadedById, userLike.id, user.id);
    } else {
      let userDislike = await prisma.dislike.create({
        data: {
          userId: user.id,
          postId: data.id,
        },
      });

      await dislikeReputation(post!.uploadedById, userDislike.id, user.id);
    }
  }

  return "success";
}

export async function GetLikes(args: LikeStatusInput) {
  return await prisma.like.count({
    where: {
      postId: args.post_id,
    },
  });
}
