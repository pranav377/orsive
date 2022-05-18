import LinkifyContent from "../../app/LinkifyContent";
import Link from "next/link";
import Ripples from "../../app/Ripple";
import { useLike } from "../../../hooks/app/like/useLike";
import ExtraButtons from "../extra/ExtraButtons";
import DELETE_ORSIC_POST_MUTATION from "../../../app/post/orsic/mutations/deleteOrsicPostMutation";
import { useMutation } from "@apollo/client";
import GET_POSTS_QUERY from "../../../app/post/queries/getPostsQuery";
import GET_PROFILE_POSTS from "../../../app/profile/queries/getProfilePostsQuery";
import AvatarArea from "../extra/AvatarArea";
import ContentParser from "../../app/ContentParser";
import TextContent from "../../app/TextContent";

export default function OrsicPostCard(props: {
  post: any;
  searchResult?: boolean;
}) {
  let post = props.post;
  const likeFeatures = useLike(post, props.searchResult);

  const [deleteOrsicPost] = useMutation(DELETE_ORSIC_POST_MUTATION, {
    variables: {
      slug: post.slug,
    },
    refetchQueries: [GET_POSTS_QUERY, GET_PROFILE_POSTS],
  });

  let postUrl = `/orsic/${post.slug}`;

  return (
    <Ripples>
      <div className="bg-slate-900 rounded-md p-2 flex flex-col w-[90vw] md:max-w-3xl my-2">
        <AvatarArea
          uploadedBy={post.post.uploadedBy}
          delete={deleteOrsicPost}
        />
        <div className="w-full">
          <Link href={postUrl} passHref scroll={false}>
            <a>
              <div>
                {post.title && (
                  <span className="font-semibold text-2xl text-break">
                    {post.title}
                  </span>
                )}
                <LinkifyContent>
                  <TextContent>{ContentParser(post.content)}</TextContent>
                </LinkifyContent>
                {post.truncated && (
                  <div className="w-full p-1 bg-slate-700 hover:bg-slate-800 transition-all duration-300 font-semibold text-center rounded-b-xl">
                    Read More
                  </div>
                )}
              </div>
            </a>
          </Link>
          <ExtraButtons postUrl={postUrl} {...likeFeatures} />
        </div>
      </div>
    </Ripples>
  );
}
