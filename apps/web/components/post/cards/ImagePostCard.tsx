import LinkifyContent from "../../app/LinkifyContent";
import Link from "next/link";
import Ripples from "../../app/Ripple";
import { useLike } from "../../../hooks/app/like/useLike";
import ExtraButtons from "../extra/ExtraButtons";
import DELETE_IMAGE_POST_MUTATION from "../../../logic/post/image/mutations/deleteImagePostMutation";
import { useMutation } from "@apollo/client";
import GET_POSTS_QUERY from "../../../../../packages/common/queries/post/getPostsQuery";
import GET_PROFILE_POSTS from "../../../logic/profile/queries/getProfilePostsQuery";
import AvatarArea from "../extra/AvatarArea";
import Image from "next/image";
import { generatePlaceholder } from "../../app/ContentParser";
import TextContent from "../../app/TextContent";
import { memo } from "react";

function ImagePostCardComponent(props: { post: any }) {
  let post = props.post;
  const likeFeatures = useLike(post);

  const [deleteImagePost] = useMutation(DELETE_IMAGE_POST_MUTATION, {
    variables: {
      slug: post.slug,
    },
    refetchQueries: [GET_POSTS_QUERY, GET_PROFILE_POSTS],
  });

  let postUrl = `/image/${post.slug}`;

  return (
    <Ripples>
      <div className="bg-slate-900 rounded-md p-5 flex flex-col w-[90vw] md:max-w-3xl my-2">
        <AvatarArea
          postId={post.post.id}
          canEdit
          url={postUrl}
          uploadedBy={post.post.uploadedBy}
          delete={deleteImagePost}
        />
        <div className="w-full">
          <Link href={postUrl} passHref scroll={false}>
            <a>
              <LinkifyContent>
                <TextContent className="p-2 text-break">
                  {post.title}
                </TextContent>
              </LinkifyContent>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Image
                  placeholder="blur"
                  blurDataURL={generatePlaceholder(
                    post.width.toString(),
                    post.height.toString()
                  )}
                  src={post.image}
                  width={post.width}
                  height={post.height}
                  alt="User Uploaded Image"
                />
              </div>
            </a>
          </Link>
          <ExtraButtons url={postUrl} postUrl={postUrl} {...likeFeatures} />
        </div>
      </div>
    </Ripples>
  );
}

const ImagePostCard = memo(ImagePostCardComponent);
export default ImagePostCard;
