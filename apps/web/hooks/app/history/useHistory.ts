import { useMutation } from "@apollo/client";
import { useEffect } from "react";
import ADD_HISTORY_MUTATION from "../../../app/history/addHistoryMutation";
import { useUser } from "../../auth/useUser";

export const useHistory = (post: any) => {
  const [addHistory] = useMutation(ADD_HISTORY_MUTATION);
  const user = useUser();

  useEffect(() => {
    if (user.is && post) {
      addHistory({
        variables: {
          post_id: post.post.id,
        },
      });
    }
  }, [user, post]);
};
