import { store } from "../../store";
import { PostContentActions } from "../../store/slices/PostContent/postContentSlice";
import { client } from "../client";
import ADD_IMAGE_POST_MUTATION from "../../../../../packages/common/mutations/PostContent/image/addImagePostMutation";
import { ReactNativeFile } from "apollo-upload-client";
import mime from "mime";

export default async function postImageHandler() {
  const image = store.getState().postContent.image;
  let imageData = image.image;
  let filename = imageData.uri.substring(imageData.uri.lastIndexOf("/") + 1);
  let mimeType = mime.getType(filename) || "image/*";

  let result = await client.mutate({
    mutation: ADD_IMAGE_POST_MUTATION,
    variables: {
      image: new ReactNativeFile({
        ...imageData,
        type: mimeType,
      }),
      title: !image.title ? undefined : image.title,
    },
  });

  store.dispatch(
    PostContentActions.setImage({
      title: null,
    })
  );

  return result;
}
