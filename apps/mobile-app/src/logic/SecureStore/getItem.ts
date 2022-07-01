import { getItemAsync } from "expo-secure-store";

export default async function setItem(key: string) {
  return await getItemAsync(key);
}
