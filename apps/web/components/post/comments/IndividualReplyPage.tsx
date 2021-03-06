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
import Link from "next/link";
import ContentParser from "../../app/ContentParser";
import Comp404 from "../../app/404";
import TextContent from "../../app/TextContent";

export default function IndividualReplyPage(props: {
  getReplyQuery: QueryResult<
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
  if (props.getReplyQuery.loading) {
    return (
      <>
        <TopBar backLink={props.backLink} loading />
        <Layout title="Orsive">
          <div className="flex items-center justify-center h-[85vh]">
            <Spinner />
          </div>
        </Layout>
      </>
    );
  }

  if (props.getReplyQuery.data) {
    let post = props.getReplyQuery.data.getReply;
    let postUrl = `${props.backLink}/replies/${post.post.id}`;
    return (
      <>
        <NextSeo
          title={getCommentTitle(
            post.post.createdAt,
            post.post.uploadedBy.name,
            "Reply"
          )}
        />
        <TopBar
          backLink={props.backLink}
          content={
            <span className="pl-5 font-bold text-lg flex">
              <span>Replying</span>
              <span className="ml-1">to</span>
              <Link href={props.backLink} passHref>
                <a className="text-blue-500 hover:text-blue-700 ml-1">
                  Comment
                </a>
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
          </div>
        </Layout>
      </>
    );
  }

  if (props.getReplyQuery.error) {
    return (
      <>
        <Comp404 />
      </>
    );
  }

  return null;
}
