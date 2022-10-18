import parse, { HTMLReactParserOptions, Element } from "html-react-parser";
import Image from "next/image";

const convertImage = (w: number, h: number) => `
  <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
      <linearGradient id="g">
        <stop stop-color="#333" offset="20%" />
        <stop stop-color="#222" offset="50%" />
        <stop stop-color="#333" offset="70%" />
      </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="#333" />
    <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
    <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
  </svg>`;

const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

export function generatePlaceholder(width: string, height: string) {
  return `data:image/svg+xml;base64,${toBase64(
    convertImage(parseInt(width), parseInt(height))
  )}`;
}

const options: HTMLReactParserOptions = {
  replace: (domNode) => {
    if (domNode instanceof Element && domNode.attribs) {
      if (domNode.tagName === "img") {
        let width = domNode.attribs.width || "400";
        let height = domNode.attribs.height || "400";
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Image
              placeholder="blur"
              blurDataURL={generatePlaceholder(width, height)}
              src={domNode.attribs.src}
              width={width}
              height={height}
            />
          </div>
        );
      }
    }
  },
};

export default function ContentParser(html: string) {
  return parse(html, options);
}
