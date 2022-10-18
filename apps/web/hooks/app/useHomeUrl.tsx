import { useUser } from "../auth/useUser";

export const useHomeUrl = () => {
  const user = useUser();

  if (user.is) {
    return "/feed";
  } else {
    return "/";
  }
};
