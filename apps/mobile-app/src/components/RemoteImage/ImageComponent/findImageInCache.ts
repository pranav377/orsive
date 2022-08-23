import * as FileSystem from "expo-file-system";

export default async function findImageInCache(uri: string) {
  try {
    let info = await FileSystem.getInfoAsync(uri);
    return { ...info, err: false };
  } catch (error) {
    return {
      exists: false,
      err: true,
      msg: error,
    };
  }
}
