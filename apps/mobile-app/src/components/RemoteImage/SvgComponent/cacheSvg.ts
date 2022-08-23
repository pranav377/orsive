import SvgCache from "./SvgCache";

export default async function cacheSvgImage(
  svgUri: string,
  uniqueFileKey: string
) {
  try {
    let xml = await fetch(svgUri).then((response) => response.text());

    await SvgCache.set(uniqueFileKey, xml);
    return {
      success: true,
      data: xml,
    };
  } catch {
    return {
      success: false,
      data: null,
    };
  }
}
