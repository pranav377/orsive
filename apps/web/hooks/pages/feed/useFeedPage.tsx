import { useQuery } from "@apollo/client";
import { useEffect, useRef } from "react";
import GET_POSTS_QUERY from "../../../../../packages/common/queries/post/getPostsQuery";

export const useFeedPage = () => {
  const query = useQuery(GET_POSTS_QUERY, {
    variables: {
      page: 1,
    },
    notifyOnNetworkStatusChange: true,
  });
  const loadMoreElement: any = useRef(null);

  const fetchMore = () => {
    let pageInfo = query.data.getPosts;
    if (pageInfo.hasNextPage) {
      query.fetchMore({
        variables: { page: pageInfo.nextPage },
      });
    }
  };

  // useEffect(() => {
  //   if (!query.data || !query.data.getPosts.hasNextPage) {
  //     return;
  //   }
  //   const observer = new IntersectionObserver((entries) =>
  //     entries.forEach((entry) => {
  //       if (entry.isIntersecting) {
  //         fetchMore();
  //       }
  //     })
  //   );
  //   const el = loadMoreElement.current;

  //   observer.observe(el);
  //   return () => {
  //     observer.unobserve(el);
  //   };
  // }, [
  //   loadMoreElement.current,
  //   query.data?.getPosts?.hasNextPage,
  //   query.data?.getPosts?.nextPage,
  // ]);

  return { query, loadMoreElement, fetchMore };
};
