import { useSelector } from "react-redux";
import { initialState } from "../../app/store/store";

export const useAppState = () => {
  const appState = useSelector((state: typeof initialState) => state.app);

  return appState;
};
