import { useQuery } from "@apollo/client";
import { useEffect, useRef } from "react";
import { useUser } from "../../auth/useUser";
import GET_REPORTS_QUERY from "./queries/GetReportsQuery";

export const useModeration = () => {
  const query = useQuery(GET_REPORTS_QUERY, {
    variables: {
      page: 1,
    },
    notifyOnNetworkStatusChange: true,
  });
  const loadMoreElement: any = useRef(null);
  const user = useUser();

  const fetchMore = () => {
    let pageInfo = query.data.getReports;
    if (pageInfo.hasNextPage) {
      query.fetchMore({
        variables: { page: pageInfo.nextPage },
      });
    }
  };

  useEffect(() => {
    if (!query.data || !query.data.getReports.hasNextPage) {
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
    query.data?.getReports?.hasNextPage,
    query.data?.getReports?.nextPage,
  ]);

  return { user, query, loadMoreElement };
};
