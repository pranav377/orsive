import Joi from "joi";
import { JSDOM } from "jsdom";
import xss, { whiteList } from "xss";

export default function validateHTMLContent(
  value: string,
  helpers: Joi.CustomHelpers<any>
) {
  const dom = new JSDOM();

  let container = dom.window.document.createElement("body");
  container.innerHTML = value;

  let div = container.getElementsByTagName("div");
  for (let index = 0; index < div.length; ++index) {
    div[index].innerHTML = div[index].innerHTML.replace(/\&nbsp;/g, "");
  }

  value = container.innerHTML;

  if (value.length < 7) {
    return helpers.error("any.invalid");
  }

  const sanitized = xss(value, {
    whiteList: {
      ...whiteList,
      img: ["alt", "src"],
    },
  });

  return sanitized;
}
