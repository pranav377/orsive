import { useQuery } from "@apollo/client";
import { useEffect, useRef, useState } from "react";
import GET_PROFILE_POSTS from "../../../app/profile/queries/getProfilePostsQuery";
import { ProfileType } from "../../../pages/[profile_slug]";
import { useClearApolloCacheOnExit } from "../../app/useClearApolloCacheOnExit";

export const useProfilePosts = (profile: ProfileType) => {
  const [currPage, setCurrPage] = useState(1);
  const query = useQuery(GET_PROFILE_POSTS, {
    variables: {
      page: currPage,
      username: profile.username,
    },
  });
  const loadMoreElement: any = useRef(null);

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

  useEffect(() => {
    if (!query.data || !query.data.getProfilePosts.hasNextPage) {
      return;
    }
    const observer = new IntersectionObserver((entries) =>
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          fetchMore();
        }
      })
    );
    const el = loadMoreElement.current;

    observer.observe(el);
    return () => {
      observer.unobserve(el);
    };
  }, [
    loadMoreElement.current,
    query.data?.getProfilePosts?.hasNextPage,
    query.data?.getProfilePosts?.nextPage,
  ]);

  useClearApolloCacheOnExit("getProfilePosts");

  return { query, fetchMore, loadMoreElement };
};
