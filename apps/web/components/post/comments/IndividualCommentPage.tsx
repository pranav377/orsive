import {
  ApolloCache,
  DefaultContext,
  MutationFunctionOptions,
  QueryResult,
} from "@apollo/client";
import { NextSeo } from "next-seo";
import Moment from "react-moment";
import Divider from "../../app/Divider";
import { Layout } from "../../app/Layout";
import LinkifyContent from "../../app/LinkifyContent";
import Spinner from "../../app/Spinner";
import TopBar from "../../app/TopBar";
import AvatarArea from "../extra/AvatarArea";
import ExtraButtons from "../extra/ExtraButtons";
import getCommentTitle from "./getCommentTitle";
import Replies from "./replies";
import ReplyBox from "./replyBox";
import Link from "next/link";
import ContentParser from "../../app/ContentParser";
import Comp404 from "../../app/404";
import TextContent from "../../app/TextContent";

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
      type: "like" | "dislike" | "nope" | undefined;
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
          <div className="flex items-center justify-center h-[85vh]">
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
            <span className="pl-5 font-bold text-lg flex">
              <span>Replying</span>
              <span className="ml-1">to</span>
              <Link href={props.backLink} passHref>
                <a className="text-blue-500 hover:text-blue-700 ml-1">Post</a>
              </Link>
            </span>
          }
        />
        <Layout>
          <div className="flex flex-col w-full items-center mt-20 ">
            <div className="flex flex-col bg-slate-900 rounded-md p-5 w-[90vw] md:max-w-3xl my-2">
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
                className="self-end text-gray-300 p-2"
                date={post.post.createdAt}
                format="MMM DD, YYYY"
              />
              <ExtraButtons url={postUrl} {...props.likeFeatures} />
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
