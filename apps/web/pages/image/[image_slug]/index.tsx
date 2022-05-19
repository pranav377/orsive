import ReplyBox from "../../../components/post/comments/replyBox";
import { GetStaticPaths, GetStaticProps } from "next";
import { client } from "../../_app";
import GET_IMAGE_POST_QUERY from "../../../app/post/image/queries/getImagePostQuery";
import { useImagePost } from "../../../hooks/pages/image/useImagePost";
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
import Image from "next/image";
import { generatePlaceholder } from "../../../components/app/ContentParser";
import TextContent from "../../../components/app/TextContent";

interface ImagePostType {
  title: string | null;
  image: string;
  width: number;
  height: number;
  slug: string;
  post: {
    id: string;
    uploadedBy: UploadedBy;
    createdAt: string;
    updatedAt?: string;
  };
}

function getTitle(title: string | null, createdAt: string, name: string) {
  if (title) {
    if (title.length > 40) {
      return `${title.substring(0, 40) + "..."} | Orsive`;
    } else {
      return `${title} | Orsive`;
    }
  } else {
    return `${moment(createdAt).format(
      "MMM DD, YYYY"
    )} - ${name} posted an Image with Orsive`;
  }
}

export default function ImagePost(props: { post: ImagePostType | null }) {
  const { router, likeFeatures, deleteImagePost } = useImagePost(props.post);

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
    let postUrl = `/image/${post.slug}`;
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
            type: "image",
            description: `${post.post.uploadedBy.name} posted an image on Orsive`,
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
            <div className="flex flex-col bg-slate-900 rounded-none w-full md:max-w-3xl md:rounded-md my-2">
              <AvatarArea
                canEdit
                url={postUrl}
                uploadedBy={post.post.uploadedBy}
                delete={deleteImagePost}
              />

              {post.title && (
                <LinkifyContent>
                  <TextContent className="text-break p-2 md:p-4">
                    {post.title}
                  </TextContent>
                </LinkifyContent>
              )}
              <div
                className="p-2"
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Image
                  alt="user's posted photo"
                  placeholder="blur"
                  blurDataURL={generatePlaceholder(
                    post.width.toString(),
                    post.height.toString()
                  )}
                  src={post.image}
                  width={post.width}
                  height={post.height}
                />
              </div>
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
      query: GET_IMAGE_POST_QUERY,
      variables: {
        slug: context.params!["image_slug"],
      },
    });

    const post = response.data.getImage;

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
