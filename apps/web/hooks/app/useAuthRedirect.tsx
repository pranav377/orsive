import { useRouter } from "next/router";
import { useEffect } from "react";
import { USER_COOKIE_KEY } from "../../config";
import { useUser } from "../auth/useUser";

export const useAuthRedirect = () => {
  const user = useUser();
  const router = useRouter();

  useEffect(() => {
    if (
      router.pathname !== "/feed" &&
      (user.is || getCook(USER_COOKIE_KEY, document.cookie) === "true")
    ) {
      router.push("/feed");
    }
  });
};

function getCook(cookiename: string, cookieString: string) {
  var cookiestring = RegExp(cookiename + "=[^;]+").exec(cookieString);
  return decodeURIComponent(
    !!cookiestring ? cookiestring.toString().replace(/^[^=]+./, "") : ""
  );
}
