import { useQuery } from "@apollo/client";
import { useEffect, useRef, useState } from "react";
import GET_REPLIES_QUERY from "../../../components/post/comments/queries/getRepliesQuery";
import { useClearApolloCacheOnExit } from "../useClearApolloCacheOnExit";

export const useReplies = (parentId: string) => {
  const [currPage, setCurrPage] = useState(1);
  const allRepliesQuery = useQuery(GET_REPLIES_QUERY, {
    variables: {
      parentId,
      page: currPage,
    },
  });

  const loadMoreElement: any = useRef(null);

  const fetchMore = () => {
    let pageInfo = allRepliesQuery.data.getReplies;
    if (pageInfo.hasNextPage) {
      setCurrPage((prevPage) => {
        allRepliesQuery.fetchMore({
          variables: { parentId, page: prevPage + 1 },
        });

        return prevPage + 1;
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
  }, [loadMoreElement.current, allRepliesQuery.data?.getReplies?.hasNextPage]);

  useClearApolloCacheOnExit();

  return { allRepliesQuery, loadMoreElement };
};
