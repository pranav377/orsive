import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import FOLLOW_PROFILE_MUTATION from "../../../../components/forms/profile/mutations/followProfileMutation";
import AM_I_FOLLOWING_QUERY from "../../../../components/forms/profile/queries/amIFollowingQuery";
import { client } from "../../../../pages/_app";
import { useUser } from "../../../auth/useUser";

export const useProfileButton = (username: string) => {
  const [amIFollowing, setAmIFollowing] = useState(false);
  const dispatch = useDispatch();
  const user = useUser();

  useEffect(() => {
    if (user.is) {
      client
        .query({
          query: AM_I_FOLLOWING_QUERY,
          variables: { username },
        })
        .then((response) => {
          setAmIFollowing(response.data.amIFollowing);
        });
    }
  }, [user]);

  function followProfile() {
    toast
      .promise(
        client.mutate({
          mutation: FOLLOW_PROFILE_MUTATION,
          variables: {
            username,
          },
        }),
        {
          loading: "Loading...",
          success: "Action completed",
          error: "An error occurred",
        }
      )
      .then(() => {
        setAmIFollowing((prevStatus) => !prevStatus);
      });
  }

  return { dispatch, user, amIFollowing, followProfile };
};
