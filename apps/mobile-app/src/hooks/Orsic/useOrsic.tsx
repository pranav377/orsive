import { useQuery } from "@apollo/client";
import { useSelector } from "react-redux";
import GET_ORSIC_POST_QUERY from "../../../../../packages/common/queries/orsic/getOrsicPostQuery";
import { RootState } from "../../store";
import { useNavigationParams } from "../useNavigationParams";

export const useOrsic = () => {
  const params = useNavigationParams("Orsic");

  const orsicQuery = useQuery(GET_ORSIC_POST_QUERY, {
    variables: {
      slug: params["slug"],
    },
    skip: !params["slug"],
  });

  const uploadedBy = useSelector(
    (state: RootState) => state.currentPost.uploadedBy
  );

  return { orsicQuery, uploadedBy };
};
