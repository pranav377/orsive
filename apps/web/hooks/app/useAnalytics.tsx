import { useRouter } from "next/router";
import { useEffect } from "react";

export const useAnalytics = () => {
  const router = useRouter();

  const handleRouteChange = (url: string) => {
    //@ts-ignore
    window.gtag("config", `'${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}'`, {
      page_path: url,
    });
  };

  useEffect(() => {
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);
};
