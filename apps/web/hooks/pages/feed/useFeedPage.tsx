import { useQuery } from "@apollo/client";
import { useEffect, useRef, useState } from "react";
import GET_POSTS_QUERY from "../../../app/post/queries/getPostsQuery";

export const useFeedPage = () => {
  const [currPage, setCurrPage] = useState(1);
  const query = useQuery(GET_POSTS_QUERY, {
    variables: {
      page: currPage,
    },
    notifyOnNetworkStatusChange: true,
  });
  const loadMoreElement: any = useRef(null);

  const fetchMore = () => {
    if (query.data.getPosts.hasNextPage) {
      setCurrPage((prevPage) => {
        query.fetchMore({
          variables: { page: prevPage + 1 },
        });

        return prevPage + 1;
      });
    }
  };

  useEffect(() => {
    if (!query.data || !query.data.getPosts.hasNextPage) {
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
  }, [loadMoreElement.current, query.data?.getPosts?.hasNextPage]);

  return { query, fetchMore, loadMoreElement };
};
