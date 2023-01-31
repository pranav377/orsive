import { SITEMAP_PAGINATION_LIMIT } from '../../config';
import prisma from '../../utils/data/dbClient';

export interface GetSitemapArgs {
    page: number;
}

export async function NumPostSitemaps() {
    let postsCount = await prisma.post.count({
        where: {
            postType: {
                in: ['image', 'orsic'],
            },
        },
    });

    let num_pages = Math.ceil(postsCount / SITEMAP_PAGINATION_LIMIT);

    return num_pages;
}

export async function NumProfileSitemaps() {
    let profilesCount = await prisma.profile.count();

    let num_pages = Math.ceil(profilesCount / SITEMAP_PAGINATION_LIMIT);

    return num_pages;
}

export async function GetPostSitemap(args: GetSitemapArgs) {
    let page = (args.page || 1) - 1;
    let offset = page * SITEMAP_PAGINATION_LIMIT;

    let posts = await prisma.post.findMany({
        skip: offset,
        take: SITEMAP_PAGINATION_LIMIT,
        orderBy: {
            createdAt: 'desc',
        },
        where: {
            postType: {
                in: ['image', 'orsic'],
            },
        },
        include: {
            image: true,
            orsic: true,
        },
    });

    return posts.map((post) => {
        return generatePostUrl(post);
    });
}

function generatePostUrl(post: any) {
    switch (post.postType) {
        case 'image':
            return `/image/${post.image.slug}`;
        case 'orsic':
            return `/orsic/${post.orsic.slug}`;
        default:
            return '';
    }
}

export async function GetProfileSitemap(args: GetSitemapArgs) {
    let page = (args.page || 1) - 1;
    let offset = page * SITEMAP_PAGINATION_LIMIT;

    let profiles = await prisma.profile.findMany({
        skip: offset,
        take: SITEMAP_PAGINATION_LIMIT,
        orderBy: {
            joined: 'desc',
        },
    });

    return profiles.map((profile) => {
        return `/${profile.username}`;
    });
}
