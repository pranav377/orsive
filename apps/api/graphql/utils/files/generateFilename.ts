import { nanoid } from "nanoid";

export default function generateFilename(filename: string) {
  return `${nanoid()}-${filename}`;
}
