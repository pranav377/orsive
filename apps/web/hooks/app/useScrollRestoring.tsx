import { useContext, useEffect } from "react";
import { ScrollContext } from "../../pages/_app";

export const useScrollRestoring = () => {
  // const { scrollRef }: any = useContext(ScrollContext);
  // useEffect(() => {
  //   window.scrollTo(0, scrollRef.current.scrollPos);
  //   const handleScrollPos = () => {
  //     scrollRef.current.scrollPos = window.scrollY;
  //   };
  //   window.addEventListener("scroll", handleScrollPos);
  //   return () => {
  //     window.removeEventListener("scroll", handleScrollPos);
  //   };
  // });
};
