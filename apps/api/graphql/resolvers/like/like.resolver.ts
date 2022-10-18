import IsUserAuthenticated from "../../permissions/IsUserAuthenticated";
import { getLikeStatus } from "../../utils/data/like/getLikeStatus";
import {
  AddLikeArgs,
  AddLike,
  LikeStatusInput,
  GetLikes,
} from "./controllers/like.controller";

const LIKE_RESOLVERS = {
  Mutation: {
    addLike(_: void, args: AddLikeArgs, context: any) {
      IsUserAuthenticated(context);

      return AddLike(args, context.getUser());
    },
  },

  Query: {
    async likeStatus(_: void, args: LikeStatusInput, context: any) {
      IsUserAuthenticated(context);

      return await (
        await getLikeStatus(args.post_id, context.getUser().id)
      ).alreadyLikeStatus;
    },

    getLikes(_: void, args: LikeStatusInput) {
      return GetLikes(args);
    },
  },
};

export default LIKE_RESOLVERS;
