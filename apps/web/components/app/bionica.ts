import { bionicReading } from "bionic-reading";
import { html2json, json2html } from "html2json";

export default function Bionica(html: string) {
  let data = html2json(html);

  return bionicReading(html);
}
