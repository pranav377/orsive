import { useSelector } from "react-redux";
import { RootState } from "../../store";

export const useUser = () => {
  const user = useSelector((state: RootState) => state.auth);

  return user;
};
