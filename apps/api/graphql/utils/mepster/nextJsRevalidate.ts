import axios from "axios";

const nextJsClient = axios.create({
  baseURL: process.env.NEXTJS_API_URL,
});

export default async function NextJsRevalidate(
  type: "image" | "orsic",
  slug: string
) {
  nextJsClient.get("/revalidate", {
    params: {
      secret: process.env.NEXTJS_REVALIDATE_KEY,
      type,
      slug,
    },
  });
}
