import slugify from "slugify";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet(
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-",
  14
);

export default function generateSlug(title: string | null | undefined) {
  let slug;

  if (title && title.length > 0) {
    slug = `${nanoid()}-${slugify(title, {strict: true})}`.substring(0, 91);
  } else {
    slug = nanoid(90);
  }

  return slug;
}
