import { useNavigationState } from "@react-navigation/native";

export const useNavigationParams = (ScreenName: string, defaultParams = {}) => {
  const rootNavigationState = useNavigationState((state) => state.routes);

  const params: any =
    rootNavigationState.filter((route) => route.name == ScreenName)[0].params ||
    defaultParams;

  return params;
};
