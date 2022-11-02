import { memo } from "react";
import ImagePostCard from "./cards/ImagePostCard";
import OrsicPostCard from "./cards/OrsicPostCard";

function PostListRendererComponent(props: { post: any }) {
  const post = props.post;
  if (post.__typename === "Image") {
    return <ImagePostCard post={post} key={post.post.id} />;
  }
  if (post.__typename === "Orsic") {
    return <OrsicPostCard post={post} key={post.post.id} />;
  }

  return null;
}

const PostListRendererBeta = memo(PostListRendererComponent);
export default PostListRendererBeta;
