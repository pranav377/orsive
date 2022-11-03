import { useDispatch, useSelector } from "react-redux";
import { INFINITE_SCROLL_SCREENS } from "../../config";
import { RootState } from "../../store";
import { AppStateActions } from "../../store/slices/appSlice";

export const useScrollRestoringBeta = (screen: INFINITE_SCROLL_SCREENS) => {
  const scrollRestoringState = useSelector(
    (state: RootState) => state.app.scrollRestoring
  );
  const dispatch = useDispatch();

  const setObj = (objId: string) => {
    dispatch(
      AppStateActions.setScrollRestoring({
        screen,
        objId,
      })
    );
  };

  return { objId: scrollRestoringState[screen], setObj };
};
