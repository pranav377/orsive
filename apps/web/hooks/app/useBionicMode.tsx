import { useSelector } from "react-redux";
import { RootState } from "../../store";

export const useBionicMode = () => {
  const bionicMode = useSelector((state: RootState) => state.app.bionicMode);

  return bionicMode;
};
