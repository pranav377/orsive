import { useQuery } from "@apollo/client";
import { useNavigationParams } from "../useNavigationParams";
import GET_IMAGE_POST_QUERY from "../../../../../packages/common/queries/image/getImagePostQuery";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

export const useImage = () => {
  const params = useNavigationParams("Image");

  const imageQuery = useQuery(GET_IMAGE_POST_QUERY, {
    variables: {
      slug: params["slug"],
    },
    skip: !params["slug"],
  });

  const uploadedBy = useSelector(
    (state: RootState) => state.currentPost.uploadedBy
  );

  return { imageQuery, uploadedBy };
};
