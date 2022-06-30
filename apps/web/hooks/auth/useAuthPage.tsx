import { useHideBars } from "../app/useHideBars";
import { useQueryState } from "next-usequerystate";
import { useEffect, useState } from "react";
import { useAuthRedirect } from "../app/useAuthRedirect";
import { useRouter } from "next/router";
import tryOpeningLinkOnMobile from "../../utils/tryOpeningLinkOnMobile";

export const useAuthPage = () => {
  const router = useRouter();
  const [queryState] = useQueryState("page");
  const [currPage, setCurrPage] = useState("login");
  useEffect(() => {
    queryState && setCurrPage(queryState);
  }, [queryState]);

  useEffect(() => {
    if (router.query && router.query["token"]) {
      tryOpeningLinkOnMobile(`Auth?token=${router.query["token"]}`);
    }
  }, [router.query]);

  useHideBars();

  useAuthRedirect();

  return { currPage, setCurrPage };
};
