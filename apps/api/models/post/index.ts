import { getOrsicContent } from '../../graphql/resolvers/post/controllers/post.controller';
import recommenderClient from '../../graphql/utils/mepster/client';
import { searchIndex } from '../../graphql/utils/mepster/searchClient';
import sendNotificationsForPost from '../../graphql/utils/data/notifications/sendNotificationsForPost';
import NextJsRevalidate from '../../graphql/utils/mepster/nextJsRevalidate';

export const EXTRA_POST_ARGS = {
    include: {
        post: {
            include: {
                uploadedBy: true,
                _count: {
                    select: {
                        dislikes: true,
                        likes: true,
                    },
                },
            },
        },
    },
};

interface ItemType {
    ItemId: string;
    Categories?: Array<string>;
    Timestamp?: Date;
}

export function insertItem(item: ItemType, post: any) {
    let basePost = post.post;
    sendNotificationsForPost(
        basePost.uploadedBy.id,
        basePost.id,
        basePost.postType,
        post.slug
    );
    searchIndex.addDocuments([
        {
            ...post,
            ...(basePost.postType === 'orsic' && {
                ...getOrsicContent(post.content),
                fullContent: post.content,
            }),
            type: 'Post',
            id: basePost.id,
            post: {
                id: basePost.id,
                postType: basePost.postType,
                uploadedBy: {
                    id: basePost.uploadedBy.id,
                    username: basePost.uploadedBy.username,
                    name: basePost.uploadedBy.name,
                    avatar: basePost.uploadedBy.avatar,
                    joined: basePost.uploadedBy.joined,
                },
                createdAt: basePost.createdAt,
                _count: basePost._count,
            },
        },
    ]);
    recommenderClient.post('/item/', {
        ...item,
        Timestamp: new Date().toISOString(),
        Categories: ['Post'],
    });
}

export function updateItem(itemId: string, post: any) {
    let basePost = post.post;
    searchIndex.updateDocuments([
        {
            ...post,
            type: 'Post',
            id: basePost.id,
            post: {
                id: basePost.id,
                postType: basePost.postType,
                uploadedBy: {
                    id: basePost.uploadedBy.id,
                    username: basePost.uploadedBy.username,
                    name: basePost.uploadedBy.name,
                    avatar: basePost.uploadedBy.avatar,
                    joined: basePost.uploadedBy.joined,
                },
                createdAt: basePost.createdAt,
                _count: basePost._count,
            },
        },
    ]);

    recommenderClient.patch(`/item/${itemId}/`, {
        Timestamp: new Date().toISOString(),
    });
}

export function deleteItem(itemId: string, post: any) {
    let basePost = post.post;

    searchIndex.deleteDocument(itemId);
    recommenderClient.delete(`/item/${itemId}/`);
    NextJsRevalidate(basePost.postType, post.slug);
}
