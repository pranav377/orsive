import { getItemAsync } from "expo-secure-store";

export default async function getItem(key: string) {
  return await getItemAsync(key);
}
