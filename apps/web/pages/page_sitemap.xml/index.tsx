import { getServerSideSitemap } from "next-sitemap";
import { GetServerSideProps } from "next";

const paths = ["/", "/auth", "/feed", "/notifications", "/search"];

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const siteURL = process.env.NEXT_PUBLIC_SITE_URL;

  const staticPages = paths.map((staticPagePath) => {
    return { loc: `${siteURL}${staticPagePath}` };
  });

  return getServerSideSitemap(ctx, staticPages);
};

export default function PageSitemap() {}
