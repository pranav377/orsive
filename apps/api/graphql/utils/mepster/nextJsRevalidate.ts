import axios from "axios";
import { NEXTJS_API_URL, NEXTJS_REVALIDATE_KEY } from "../../config";

const nextJsClient = axios.create({
  baseURL: NEXTJS_API_URL,
});

export default async function NextJsRevalidate(
  type: "image" | "orsic",
  slug: string
) {
  nextJsClient.get("/revalidate", {
    params: {
      secret: NEXTJS_REVALIDATE_KEY,
      type,
      slug,
    },
  });
}
