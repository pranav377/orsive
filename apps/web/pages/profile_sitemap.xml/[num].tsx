import { getServerSideSitemap } from "next-sitemap";
import { GetServerSideProps } from "next";
import { client } from "../_app";
import GET_PROFILE_SITEMAP_QUERY from "../../logic/sitemap/GetProfileSitemapQuery";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const siteURL = process.env.NEXT_PUBLIC_SITE_URL;
  let pageNum: any = ctx.query["num"];

  const profileSitemap = (
    await client.query({
      query: GET_PROFILE_SITEMAP_QUERY,
      variables: { page: parseInt(pageNum) },
    })
  ).data.getProfileSitemap;

  return getServerSideSitemap(
    ctx,
    profileSitemap.map((profileUrl: string) => {
      return {
        loc: `${siteURL}${profileUrl}`,
      };
    })
  );
};

export default function ProfileSitemap() {}
