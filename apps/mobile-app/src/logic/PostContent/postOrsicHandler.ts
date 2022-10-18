import { store } from "../../store";
import { PostContentActions } from "../../store/slices/PostContent/postContentSlice";
import { client } from "../client";
import ADD_ORSIC_POST_MUTATION from "../../../../../packages/common/mutations/PostContent/orsic/addOrsicPostMutation";

export default async function postOrsicHandler() {
  const orsic = store.getState().postContent.orsic;

  let result = await client.mutate({
    mutation: ADD_ORSIC_POST_MUTATION,
    variables: {
      content: orsic.content,
      title: !orsic.title ? undefined : orsic.title,
    },
  });

  store.dispatch(PostContentActions.setOrsic({ content: "", title: null }));

  return result;
}
