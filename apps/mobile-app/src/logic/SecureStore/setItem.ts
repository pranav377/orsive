import { setItemAsync } from "expo-secure-store";

export default async function setItem(key: string, value: string) {
  return await setItemAsync(key, value);
}
