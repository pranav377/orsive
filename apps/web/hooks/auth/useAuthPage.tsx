import { useHideBars } from "../app/useHideBars";
import { useQueryState } from "next-usequerystate";
import { useEffect, useState } from "react";
import { useAuthRedirect } from "../app/useAuthRedirect";

export const useAuthPage = () => {
  const [queryState] = useQueryState("page");
  const [currPage, setCurrPage] = useState("login");
  useEffect(() => {
    queryState && setCurrPage(queryState);
  }, [queryState]);

  useHideBars();

  useAuthRedirect();

  return { currPage, setCurrPage };
};
