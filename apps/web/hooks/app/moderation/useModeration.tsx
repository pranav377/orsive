import { useQuery } from "@apollo/client";
import { useUser } from "../../auth/useUser";
import { useScrollRestoring } from "../useScrollRestoringBeta";
import GET_REPORTS_QUERY from "./queries/GetReportsQuery";

export const useModeration = () => {
  const query = useQuery(GET_REPORTS_QUERY, {
    variables: {
      page: 1,
    },
    notifyOnNetworkStatusChange: true,
  });
  const user = useUser();

  const fetchMore = () => {
    let pageInfo = query.data.getReports;
    if (pageInfo.hasNextPage) {
      query.fetchMore({
        variables: { page: pageInfo.nextPage },
      });
    }
  };

  const { objIdx, setObj } = useScrollRestoring("moderation");

  return { user, query, fetchMore, objIdx, setObj };
};
