import {
    ApolloCache,
    DefaultContext,
    MutationFunctionOptions,
    QueryResult,
} from '@apollo/client';
import { NextSeo } from 'next-seo';
import Moment from 'react-moment';
import Divider from '../../app/Divider';
import { Layout } from '../../app/Layout';
import LinkifyContent from '../../app/LinkifyContent';
import Spinner from '../../app/Spinner';
import TopBar from '../../app/TopBar';
import AvatarArea from '../extra/AvatarArea';
import ExtraButtons from '../extra/ExtraButtons';
import getCommentTitle from './getCommentTitle';
import Replies from './replies';
import ReplyBox from './replyBox';
import Link from 'next/link';
import ContentParser from '../../app/ContentParser';
import Comp404 from '../../app/404';
import TextContent from '../../app/TextContent';

export default function IndividualCommentPage(props: {
    getCommentQuery: QueryResult<
        any,
        {
            commentId: string | string[] | undefined;
        }
    >;
    backLink: string;
    deleteCommentMutation: (
        options?:
            | MutationFunctionOptions<
                  any,
                  {
                      commentId: string | string[] | undefined;
                  },
                  DefaultContext,
                  ApolloCache<any>
              >
            | undefined
    ) => Promise<any>;
    likeFeatures: {
        likeStatus: {
            postId: string;
            type: 'like' | 'dislike' | 'nope' | undefined;
            likes: number;
        };
        like: () => Promise<void>;
        dislike: () => Promise<void>;
    };
}) {
    if (props.getCommentQuery.loading) {
        return (
            <>
                <TopBar backLink={props.backLink} loading />
                <Layout title="Orsive">
                    <div className="flex h-[85vh] items-center justify-center">
                        <Spinner />
                    </div>
                </Layout>
                <ReplyBox type="reply" loading={true} />
            </>
        );
    }

    if (props.getCommentQuery.data) {
        let post = props.getCommentQuery.data.getComment;
        let postUrl = `${props.backLink}/comments/${post.post.id}`;
        return (
            <>
                <NextSeo
                    title={getCommentTitle(
                        post.post.createdAt,
                        post.post.uploadedBy.name
                    )}
                />
                <TopBar
                    backLink={props.backLink}
                    content={
                        <span className="flex pl-5 text-lg font-bold">
                            <span>Replying</span>
                            <span className="ml-1">to</span>
                            <Link
                                href={props.backLink}
                                passHref
                                className="ml-1 text-blue-500 hover:text-blue-700"
                            >
                                Post
                            </Link>
                        </span>
                    }
                />
                <Layout>
                    <div className="mt-20 flex w-full flex-col items-center ">
                        <div className="my-2 flex w-[90vw] flex-col rounded-md bg-slate-900 p-5 md:max-w-3xl">
                            <AvatarArea
                                postId={post.post.id}
                                url={postUrl}
                                uploadedBy={post.post.uploadedBy}
                                delete={props.deleteCommentMutation}
                            />

                            <LinkifyContent>
                                <TextContent className="p-2">
                                    {ContentParser(post.content)}
                                </TextContent>
                            </LinkifyContent>
                            <Moment
                                className="self-end p-2 text-gray-300"
                                date={post.post.createdAt}
                                format="MMM DD, YYYY"
                            />
                            <ExtraButtons
                                url={postUrl}
                                {...props.likeFeatures}
                            />
                        </div>

                        <Divider />

                        <Replies parentId={post.post.id} parentUrl={postUrl} />
                    </div>
                </Layout>
                <ReplyBox type="reply" pId={post.post.id} />
            </>
        );
    }

    if (props.getCommentQuery.error) {
        return (
            <>
                <Comp404 />
            </>
        );
    }

    return null;
}
