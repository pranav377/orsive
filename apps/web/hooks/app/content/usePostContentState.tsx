import { useSelector } from "react-redux";
import { initialState } from "../../../app/store/store";

export const usePostContentState = () => {
  const postContentState = useSelector(
    (state: typeof initialState) => state.content
  );

  return postContentState;
};
