import { useQuery } from "@apollo/client";
import { useEffect, useRef, useState } from "react";
import GET_COMMENTS_QUERY from "../../../components/post/comments/queries/getCommentsQuery";
import GET_MY_COMMENTS_QUERY from "../../../components/post/comments/queries/getMyCommentsQuery";
import { useClearApolloCacheOnExit } from "../useClearApolloCacheOnExit";

export const useComments = (postId: string) => {
  const [currPage, setCurrPage] = useState(1);
  const allCommentsQuery = useQuery(GET_COMMENTS_QUERY, {
    variables: {
      postId,
      page: currPage,
    },
    notifyOnNetworkStatusChange: true,
  });

  const myCommentsQuery = useQuery(GET_MY_COMMENTS_QUERY, {
    variables: {
      postId,
    },
  });

  const loadMoreElement: any = useRef(null);

  const fetchMore = () => {
    let pageInfo = allCommentsQuery.data.getComments;
    if (pageInfo.hasNextPage) {
      setCurrPage((prevPage) => {
        allCommentsQuery.fetchMore({
          variables: { postId, page: prevPage + 1 },
        });

        return prevPage + 1;
      });
    }
  };

  useEffect(() => {
    if (
      !allCommentsQuery.data ||
      !allCommentsQuery.data.getComments.hasNextPage
    ) {
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
    allCommentsQuery.data?.getComments?.hasNextPage,
  ]);

  useClearApolloCacheOnExit("getComments");

  return { allCommentsQuery, myCommentsQuery, loadMoreElement };
};
