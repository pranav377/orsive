import clip from 'text-clipper';
import { PAGINATION_SET_SIZE } from '../../../config';
import { User } from '../../../permissions/IsUserAuthenticated';
import getRepliesCount from '../../../utils/data/comments/getRepliesCount';
import prisma from '../../../utils/data/dbClient';
import generateCommentUrl from '../../../utils/data/url/generateCommentUrl';
import getRecommendations from '../../../utils/mepster/getRecommendations';

export interface GetPostsArgs {
    page?: number;
}

export const POST_PRISMA_ARGS = {
    include: {
        post: {
            include: {
                uploadedBy: true,
            },
        },
    },
};

export function getOrsicContent(content: string) {
    let contentLength = content.length;

    if (contentLength > 300) {
        return {
            truncated: true,
            content: clip(content, 300, { html: true, maxLines: 10 }),
        };
    } else {
        return {
            truncated: false,
            content,
        };
    }
}

export function getPostData(post: any) {
    switch (post.postType) {
        case 'image':
            return post.image;
        case 'orsic':
            let content = post.orsic!.content;
            return { ...post.orsic, ...getOrsicContent(content) };
        case 'comment':
            let comment = post.comment;
            if (!comment.parentId) {
                return {
                    ...comment,
                    replies: getRepliesCount(comment.post!.id),
                    url: generateCommentUrl(comment.post!.id),
                };
            } else {
                return {
                    ...comment,
                    url: generateCommentUrl(comment.post!.id),
                };
            }

        default:
            return null;
    }
}

export function getPostsData(posts: Array<any>) {
    return posts.map((post) => {
        return getPostData(post);
    });
}

export async function GetPosts(user: User | null, args: GetPostsArgs) {
    let page = (args.page || 1) - 1;
    let offset = page * PAGINATION_SET_SIZE;

    let postsCount = await prisma.post.count({
        where: {
            postType: {
                in: ['image', 'orsic'],
            },
        },
    });

    let hasNextPage = (args.page || 1) * PAGINATION_SET_SIZE < postsCount;
    let nextPage = (args.page || 1) + 1;

    let recommendations = await getRecommendations(user?.id, offset);
    let posts = await prisma.post.findMany({
        where: {
            id: {
                in: recommendations,
            },
            postType: {
                in: ['image', 'orsic'],
            },
            ...(user && {
                dislikes: {
                    every: {
                        userId: {
                            not: user.id,
                        },
                    },
                },
            }),
        },
        include: {
            image: {
                ...POST_PRISMA_ARGS,
            },
            orsic: {
                ...POST_PRISMA_ARGS,
            },
        },

        orderBy: { createdAt: 'desc' },
    });

    return {
        data: getPostsData(posts),
        hasNextPage,
        nextPage,
    };
}
