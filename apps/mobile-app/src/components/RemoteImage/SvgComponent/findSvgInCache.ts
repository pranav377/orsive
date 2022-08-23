import SvgCache from "./SvgCache";

export default async function findSvgInCache(
  uniqueFileKey: string
): Promise<{ exists: boolean; data: string | null }> {
  try {
    let xml = await SvgCache.get(uniqueFileKey);
    return {
      exists: xml ? true : false,
      data: xml || null,
    };
  } catch {
    return { exists: false, data: null };
  }
}
