import { useEffect } from "react";
import { useDispatch } from "react-redux";
import APP_CASES from "../../app/store/reducers/app/cases";

export const useHideBars = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: APP_CASES.HIDE_BARS });

    return function () {
      dispatch({ type: APP_CASES.SHOW_BARS });
    };
  });
};
