import { useRouter } from "next/router";
import { useUser } from "../auth/useUser";

export const useAuthRedirect = () => {
  const user = useUser();
  const router = useRouter();

  if (router.pathname !== "/feed" && user.is) {
    router.push("/feed");
  }
};
