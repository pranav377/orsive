import { useSelector } from "react-redux";
import type { RootState } from "../../../store";

export const usePostContentState = () => {
  const postContentState = useSelector((state: RootState) => state.content);

  return postContentState;
};
