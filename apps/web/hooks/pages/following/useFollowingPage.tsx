import { useQuery } from "@apollo/client";
import { useEffect, useRef } from "react";
import GET_FOLLOWING_POSTS_QUERY from "../../../logic/following/queries/getFollowingPostsQuery";
import { useUser } from "../../auth/useUser";

export const useFollowingPage = () => {
  const query = useQuery(GET_FOLLOWING_POSTS_QUERY, {
    variables: {
      page: 1,
    },
    notifyOnNetworkStatusChange: true,
  });
  const user = useUser();
  const loadMoreElement: any = useRef(null);

  const fetchMore = () => {
    let pageInfo = query.data.getFollowingPosts;
    if (pageInfo.hasNextPage) {
      query.fetchMore({
        variables: { page: pageInfo.nextPage },
      });
    }
  };

  useEffect(() => {
    if (!query.data || !query.data.getFollowingPosts.hasNextPage) {
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
    query.data?.getFollowingPosts?.hasNextPage,
    query.data?.getFollowingPosts?.nextPage,
  ]);

  return { query, loadMoreElement, user };
};
