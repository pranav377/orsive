import { useHideBars } from "../app/useHideBars";
import { useQueryState } from "next-usequerystate";
import { useEffect, useState } from "react";
import { useAuthRedirect } from "../app/useAuthRedirect";
import { useRouter } from "next/router";
import { setUser } from "../../components/app/AppMiddleware";
import toast from "react-hot-toast";

export const useAuthPage = () => {
  const router = useRouter();
  const [queryState] = useQueryState("page");
  const [currPage, setCurrPage] = useState("login");
  useEffect(() => {
    queryState && setCurrPage(queryState);
  }, [queryState]);

  useEffect(() => {
    if (router.query && router.query["token"]) {
      const data: any = router.query;

      toast
        .promise(
          (async () => {
            localStorage.setItem("token", data.token);
            setUser({
              ...data,
              setupComplete: data["setupComplete"] === "true",
            });
            router.push("/feed");
          })(),
          {
            loading: "Signing In....",
            success: <p>Signed in Successfully🚀🚀</p>,
            error: "Something went wrong. Try again",
          }
        )
        .then(() => {})
        .catch((error) => {
          console.log(error);
        });
    }
  }, [router.query]);

  useHideBars();

  useAuthRedirect();

  return { currPage, setCurrPage };
};
