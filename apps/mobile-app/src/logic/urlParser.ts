import { HOSTNAME } from "./config";

export default function urlParser(url: string) {
  if (__DEV__ && url.includes("localhost")) {
    let newUrl = new URL(url);

    newUrl.hostname = HOSTNAME;

    return newUrl.href;
  } else {
    return url;
  }
}
