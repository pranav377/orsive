import * as FileSystem from "expo-file-system";

export default async function cacheImage(uri: string, cacheUri: string) {
  try {
    const downloadImage = FileSystem.createDownloadResumable(
      uri,
      cacheUri,
      {},
      () => {}
    );
    const downloaded = await downloadImage.downloadAsync();

    return {
      cached: true,
      err: false,
      path: downloaded?.uri,
    };
  } catch (error) {
    return {
      cached: false,
      err: true,
      msg: error,
    };
  }
}
