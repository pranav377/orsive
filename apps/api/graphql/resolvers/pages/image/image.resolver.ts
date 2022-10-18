import IsUserAuthenticated from "../../../permissions/IsUserAuthenticated";
import {
  AddImagePost,
  AddImagePostArgs,
  DeleteImagePost,
  DeleteImagePostArgs,
  GetImage,
  GetImageArgs,
  UpdateImagePost,
  UpdateImagePostArgs,
} from "./controllers/image.controller";

const IMAGE_RESOLVERS = {
  Mutation: {
    addImagePost(_: void, args: AddImagePostArgs, context: any) {
      IsUserAuthenticated(context);

      return AddImagePost(args, context.getUser());
    },

    updateImagePost(_: void, args: UpdateImagePostArgs, context: any) {
      IsUserAuthenticated(context);

      return UpdateImagePost(args, context.getUser());
    },

    deleteImagePost(_: void, args: DeleteImagePostArgs, context: any) {
      IsUserAuthenticated(context);

      return DeleteImagePost(args, context.getUser());
    },
  },

  Query: {
    getImage(_: void, args: GetImageArgs) {
      return GetImage(args);
    },
  },
};

export default IMAGE_RESOLVERS;
