import ReplyBox from "../../../components/post/comments/replyBox";
import { GetStaticPaths, GetStaticProps } from "next";
import { client } from "../../_app";
import GET_ORSIC_POST_QUERY from "../../../../../packages/common/queries/orsic/getOrsicPostQuery";
import { useOrsicPost } from "../../../hooks/pages/orsic/useOrsicPost";
import LinkifyContent from "../../../components/app/LinkifyContent";
import Moment from "react-moment";
import moment from "moment";
import Spinner from "../../../components/app/Spinner";
import { NextSeo } from "next-seo";
import { UploadedBy } from "../../../components/app/types";
import ExtraButtons from "../../../components/post/extra/ExtraButtons";
import AvatarArea from "../../../components/post/extra/AvatarArea";
import Divider from "../../../components/app/Divider";
import Comments from "../../../components/post/comments";
import TopBar from "../../../components/app/TopBar";
import { Layout } from "../../../components/app/Layout";
import Link from "next/link";
import ContentParser from "../../../components/app/ContentParser";
import TextContent from "../../../components/app/TextContent";
import BionicMode from "../../../components/app/BionicMode";
import Bionica from "../../../components/app/bionica";
import { useBionicMode } from "../../../hooks/app/useBionicMode";
import { GET_BUILD_ORSIC_LIST_QUERY } from "../../../logic/post/orsic/queries/getBuildOrsicListQuery";

interface OrsicPostType {
  title: string | null;
  content: string;
  slug: string;
  post: {
    id: string;
    uploadedBy: UploadedBy;
    createdAt: string;
    updatedAt?: string;
  };
  image: string;
}

function getTitle(title: string | null, createdAt: string, name: string) {
  if (title) {
    return `${title} | Orsive`;
  } else {
    return `${moment(createdAt).format(
      "MMM DD, YYYY"
    )} - ${name} posted an Orsic with Orsive`;
  }
}

export default function OrsicPost(props: { post: OrsicPostType | null }) {
  const { router, likeFeatures, deleteOrsicPost } = useOrsicPost(props.post);
  const bionicMode = useBionicMode();

  if (router.isFallback) {
    return (
      <>
        <TopBar loading />
        <Layout title="Orsive">
          <div className="flex items-center justify-center h-[85vh]">
            <Spinner />
          </div>
        </Layout>
        <ReplyBox type="comment" loading={true} />
      </>
    );
  }

  if (props.post) {
    let post = props.post;
    let postUrl = `/orsic/${post.slug}`;
    return (
      <>
        <NextSeo
          title={getTitle(
            post.title,
            post.post.createdAt,
            post.post.uploadedBy.name
          )}
          openGraph={{
            url: `https://www.orsive.com${postUrl}`,
            title: getTitle(
              post.title,
              post.post.createdAt,
              post.post.uploadedBy.name
            ),
            type: "article",
            description: `${post.post.uploadedBy.name} posted an Orsic with Orsive`,
            article: {
              publishedTime: post.post.createdAt,
            },
            images: [
              {
                url: post.image,
              },
            ],
          }}
        />
        <TopBar
          content={
            <div className="flex items-center w-full">
              <span className="pl-5 font-bold text-xl">
                Go to{" "}
                <Link
                  href={"/feed"}
                  passHref
                  className="text-blue-500 hover:text-blue-700"
                >
                  Feed
                </Link>
              </span>
              <div className="ml-auto">
                <BionicMode />
              </div>
            </div>
          }
        />
        <Layout>
          <div className="flex flex-col w-full items-center mt-20 ">
            <div className="flex flex-col bg-slate-900 rounded-none w-[98%] md:max-w-3xl md:rounded-md my-2">
              <AvatarArea
                postId={post.post.id}
                canEdit
                url={postUrl}
                uploadedBy={post.post.uploadedBy}
                delete={deleteOrsicPost}
              />

              {post.title && (
                <h1 className="font-semibold text-gray-100 text-2xl text-break p-2">
                  {post.title}
                </h1>
              )}
              <LinkifyContent>
                <TextContent>
                  {ContentParser(
                    bionicMode ? Bionica(post.content) : post.content
                  )}
                </TextContent>
              </LinkifyContent>
              {post.post.updatedAt && (
                <span className="self-end text-gray-300 pr-2 mt-2 text-sm">
                  Edited on{" "}
                  <Moment date={post.post.updatedAt} format="MMM DD, YYYY" />
                </span>
              )}
              <span className="self-end text-gray-300 pr-2 text-sm">
                Created on{" "}
                <Moment date={post.post.createdAt} format="MMM DD, YYYY" />
              </span>
              <ExtraButtons url={postUrl} {...likeFeatures} />
            </div>

            <Divider />

            <Comments postId={post.post.id} postUrl={postUrl} />
          </div>
        </Layout>
        <ReplyBox type="comment" pId={post.post.id} postUrl={postUrl} />
      </>
    );
  }

  return null;
}

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    let response = await client.query({
      query: GET_ORSIC_POST_QUERY,
      variables: {
        slug: context.params!["orsic_slug"],
      },
    });

    const post = response.data.getOrsic;

    return {
      props: {
        post,
      },
      revalidate: 120,
    };
  } catch {
    return { notFound: true };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  let buildOrsicListData = await client.query({
    query: GET_BUILD_ORSIC_LIST_QUERY,
  });

  let buildOrsicList: Array<string> = buildOrsicListData.data.getBuildOrsicList;
  return {
    paths: buildOrsicList.map((orsic_slug) => {
      return {
        params: {
          orsic_slug,
        },
      };
    }),
    fallback: true,
  };
};
