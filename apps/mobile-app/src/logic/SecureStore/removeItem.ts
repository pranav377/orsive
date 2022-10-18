import { deleteItemAsync } from "expo-secure-store";

export default async function removeItem(key: string) {
  return await deleteItemAsync(key);
}
