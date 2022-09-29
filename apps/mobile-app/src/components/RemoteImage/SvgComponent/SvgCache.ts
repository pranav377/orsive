import AsyncStorage from "@react-native-async-storage/async-storage";
import { Cache } from "react-native-cache";

const SvgCache = new Cache({
  namespace: "SvgCache",
  policy: {
    maxEntries: 50000,
    stdTTL: 0,
  },
  backend: AsyncStorage,
});

export default SvgCache;
