import { useQuery } from "@apollo/client";
import { useEffect, useRef, useState } from "react";
import GET_PROFILE_POSTS from "../../../logic/profile/queries/getProfilePostsQuery";
import { ProfileType } from "../../../pages/[profile_slug]";
import { useClearApolloCacheOnExit } from "../../app/useClearApolloCacheOnExit";
import { useScrollRestoring } from "../../app/useScrollRestoringBeta";

export const useProfilePosts = (profile: ProfileType) => {
  const query = useQuery(GET_PROFILE_POSTS, {
    variables: {
      page: 1,
      username: profile.username,
    },
  });

  const fetchMore = () => {
    if (query.data.getProfilePosts.hasNextPage) {
      query.fetchMore({
        variables: {
          page: query.data.getProfilePosts.nextPage,
          username: profile.username,
        },
      });
    }
  };

  const { objIdx, setObj } = useScrollRestoring("profile");

  useClearApolloCacheOnExit("getProfilePosts");

  return { query, fetchMore, objIdx, setObj };
};
