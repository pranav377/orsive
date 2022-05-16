import { useQuery } from "@apollo/client";
import { useEffect, useRef, useState } from "react";
import GET_REPLIES_QUERY from "../../../components/post/comments/queries/getRepliesQuery";
import { useClearApolloCacheOnExit } from "../useClearApolloCacheOnExit";

export const useReplies = (parentId: string) => {
  const allRepliesQuery = useQuery(GET_REPLIES_QUERY, {
    variables: {
      parentId,
      page: 1,
    },
  });

  const loadMoreElement: any = useRef(null);

  const fetchMore = () => {
    let pageInfo = allRepliesQuery.data.getReplies;
    if (pageInfo.hasNextPage) {
      allRepliesQuery.fetchMore({
        variables: { parentId, page: pageInfo.nextPage },
      });
    }
  };

  useEffect(() => {
    if (!allRepliesQuery.data || !allRepliesQuery.data.getReplies.hasNextPage) {
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
    allRepliesQuery.data?.getReplies?.hasNextPage,
    allRepliesQuery.data?.getReplies?.nextPage,
  ]);

  useClearApolloCacheOnExit("getReplies");

  return { allRepliesQuery, loadMoreElement };
};
