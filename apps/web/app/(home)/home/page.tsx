import PostsRenderer from '@/ui/Posts/PostsRenderer';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Home | Orsive',
    description: 'Your curated list of content from amazing people :)',
};

export default function Feed() {
    return (
        <div>
            <PostsRenderer />
        </div>
    );
}
