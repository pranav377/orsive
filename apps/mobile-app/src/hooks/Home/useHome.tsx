import { useQuery } from "@apollo/client";
import GET_POSTS_QUERY from "../../../../../packages/common/queries/post/getPostsQuery";

export const useHome = () => {
  const query = useQuery(GET_POSTS_QUERY, {
    variables: {
      page: 1,
    },
  });

  console.log(query.data);

  return { query };
};
