import { textVide } from "text-vide";
import { Parser, ParseToken } from "html-tokenizer";

export default function Bionica(html: string) {
  const tokens = Parser.parse(html);
  return renderer([...tokens]);
}

function renderer(tokens: ParseToken[]) {
  let html_strings: Array<string> = [];
  for (let token of tokens) {
    switch (token.type) {
      case "open":
        let attributes = ``;
        Object.entries(token.attributes).map((value) => {
          if (value[0] && value[1]) {
            attributes = `${attributes} ${value[0]}=${value[1]}`;
          }
        });

        let openTag = `<${token.name}${attributes}${
          token.selfClosing ? " />" : ">"
        }`;

        html_strings.push(openTag);
        break;

      case "close":
        let closeTag = `</${token.name}>`;
        html_strings.push(closeTag);
        break;

      case "text":
        if (token.text === "\n") break;
        let content = textVide(token.text, {
          sep: ["<strong>", "</strong>"],
        });
        html_strings.push(content);
        break;
    }
  }

  return html_strings.join("").replaceAll("<br>", "");
}
