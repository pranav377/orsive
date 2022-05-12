import { getServerSideSitemapIndex } from "next-sitemap";
import { GetServerSideProps } from "next";
import { client } from "../_app";
import NUM_POST_SITEMAPS_QUERY from "../../app/sitemap/NumPostSitemapsQuery";
import NUM_PROFILE_SITEMAPS_QUERY from "../../app/sitemap/NumProfileSitemapsQuery";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const siteURL = process.env.NEXT_PUBLIC_SITE_URL;

  const numPostSitemaps = (
    await client.query({ query: NUM_POST_SITEMAPS_QUERY })
  ).data.numPostSitemaps;

  const numProfileSitemaps = (
    await client.query({ query: NUM_PROFILE_SITEMAPS_QUERY })
  ).data.numProfileSitemaps;

  let extraSitemaps: Array<string> = [];

  for (let index = 0; index < numPostSitemaps; index++) {
    extraSitemaps.push(`${siteURL}/post_sitemap.xml/${index + 1}`);
  }

  for (let index = 0; index < numProfileSitemaps; index++) {
    extraSitemaps.push(`${siteURL}/profile_sitemap.xml/${index + 1}`);
  }

  return getServerSideSitemapIndex(ctx, [
    `${siteURL}/page_sitemap.xml`,
    ...extraSitemaps,
  ]);
};

export default function SitemapIndex() {}
