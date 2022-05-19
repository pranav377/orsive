import ReplyBox from "../../../components/post/comments/replyBox";
import { GetStaticPaths, GetStaticProps } from "next";
import { client } from "../../_app";
import GET_ORSIC_POST_QUERY from "../../../app/post/orsic/queries/getOrsicPostQuery";
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

interface OrsicPostType {
  title: string | null;
  content: string;
  slug: string;
  post: {
    id: string;
    uploadedBy: UploadedBy;
    createdAt: string;
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
            <span className="pl-5 font-bold text-xl">
              Go to{" "}
              <Link href={"/feed"} passHref>
                <a className="text-blue-500 hover:text-blue-700">Feed</a>
              </Link>
            </span>
          }
        />
        <Layout>
          <div className="flex flex-col w-full items-center mt-20 ">
            <div className="flex flex-col bg-slate-900 rounded-none w-[98%] md:max-w-3xl md:rounded-md my-2">
              <AvatarArea
                url={postUrl}
                uploadedBy={post.post.uploadedBy}
                delete={deleteOrsicPost}
              />

              {post.title && (
                <span className="font-semibold text-2xl text-break p-2">
                  {post.title}
                </span>
              )}
              <LinkifyContent>
                <TextContent>{ContentParser(post.content)}</TextContent>
              </LinkifyContent>
              <Moment
                className="self-end text-gray-300 p-2"
                date={post.post.createdAt}
                format="MMM DD, YYYY"
              />
              <ExtraButtons {...likeFeatures} />
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
  return { paths: [], fallback: true };
};
