import { memo } from 'react';
import ImagePostCard from './cards/ImagePostCard';
import OrsicPostCard from './cards/OrsicPostCard';

function PostListRendererComponent(props: {
    post: any;
    objIdx: number;
    setObj: (objIdx: number) => void;
}) {
    const post = props.post;
    if (post.__typename === 'Image') {
        return (
            <ImagePostCard
                post={post}
                onClick={() => {
                    props.setObj(props.objIdx);
                }}
            />
        );
    }
    if (post.__typename === 'Orsic') {
        return (
            <OrsicPostCard
                post={post}
                onClick={() => {
                    props.setObj(props.objIdx);
                }}
            />
        );
    }

    return null;
}

const PostListRenderer = memo(PostListRendererComponent);
export default PostListRenderer;
