import { useSelector } from "react-redux";
import { initialState } from "../../app/store/store";

export const useBionicMode = () => {
  const bionicMode = useSelector(
    (state: typeof initialState) => state.app.bionicMode
  );

  return bionicMode;
};
