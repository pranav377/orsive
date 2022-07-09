import { useQuery } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import GET_POSTS_QUERY from "../../../../../packages/common/queries/post/getPostsQuery";

export const useHome = () => {
  const query = useQuery(GET_POSTS_QUERY, {
    variables: {
      page: 1,
    },
  });
  const [fabState, setFabState] = useState({ open: false });
  const { navigate } = useNavigation();

  return { query, fabState, setFabState, navigate };
};
