import { HOSTNAME } from "./config";
import { URL } from "react-native-url-polyfill";

export default function urlParser(opUrl: string) {
  if (opUrl.includes("localhost")) {
    let newUrl = new URL(opUrl);

    newUrl.hostname = HOSTNAME;
    return newUrl.href;
  }

  return opUrl;
}
