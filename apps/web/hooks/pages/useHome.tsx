import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { USER_COOKIE_KEY } from "../../config";
import { getCook } from "../app/useAuthRedirect";
import { useUser } from "../auth/useUser";

export const useHome = () => {
  const user = useUser();
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user.is || getCook(USER_COOKIE_KEY, document.cookie) === "true") {
      router.push("/feed");
    } else {
      setLoading(false);
    }
  }, [user]);

  return { loading };
};
