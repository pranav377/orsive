import parse, { HTMLReactParserOptions, Element } from "html-react-parser";
import Image from "next/image";

const options: HTMLReactParserOptions = {
  replace: (domNode) => {
    if (domNode instanceof Element && domNode.attribs) {
      if (domNode.tagName === "img") {
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Image
              src={domNode.attribs.src}
              width={domNode.attribs.width || 400}
              height={domNode.attribs.height || 400}
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
