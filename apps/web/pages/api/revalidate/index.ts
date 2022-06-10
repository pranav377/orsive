import { NextApiRequest, NextApiResponse } from "next";
import { withSentry } from "@sentry/nextjs";

/*
  Request Objects {
    secret: string
    slug: string
    type: "image" | "orsic" | "profile"
  }
 */
async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { secret, slug, type } = req.query;

  if (secret !== process.env.REVALIDATE_KEY) {
    return res.status(401).json({ message: "Invalid token" });
  }

  try {
    if (type !== "profile") {
      await res.unstable_revalidate(`/${type}/${slug}`);
    } else {
      await res.unstable_revalidate(`/${slug}`);
    }
    return res.json({ revalidated: true });
  } catch (err) {
    return res.status(500).send("Error revalidating");
  }
}

export default withSentry(handler);
