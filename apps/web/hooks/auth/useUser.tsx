import { useSelector } from "react-redux";
import { initialState } from "../../app/store/store";

export const useUser = () => {
  const user = useSelector((state: typeof initialState) => state.user);

  return user;
};
