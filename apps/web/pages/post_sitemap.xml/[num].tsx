import { getServerSideSitemap } from 'next-sitemap';
import { GetServerSideProps } from 'next';
import { client } from '../_app';
import GET_POST_SITEMAP_QUERY from '../../logic/sitemap/GetPostSitemapQuery';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const siteURL = process.env.NEXT_PUBLIC_SITE_URL;
    let pageNum: any = ctx.query['num'];

    const postSitemap = (
        await client.query({
            query: GET_POST_SITEMAP_QUERY,
            variables: { page: parseInt(pageNum) },
        })
    ).data.getPostSitemap;

    return getServerSideSitemap(
        ctx,
        postSitemap.map((postUrl: string) => {
            return {
                loc: `${siteURL}${postUrl}`,
            };
        })
    );
};

export default function PostSitemap() {}
