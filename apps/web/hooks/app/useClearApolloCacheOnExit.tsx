import { useEffect } from "react";
import { client } from "../../pages/_app";

export const useClearApolloCacheOnExit = () => {
  useEffect(() => {
    return function cleanup() {
      client.cache.reset();
    };
  }, []);
};
