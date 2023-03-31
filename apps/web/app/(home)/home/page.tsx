import { Metadata } from 'next';
import ImagePostCard from '@/ui/posts/ImagePostCard';

export const metadata: Metadata = {
    title: 'Home | Orsive',
    description: 'Your curated list of content from amazing people :)',
};

export default function Feed() {
    return (
        <div>
            <ImagePostCard />
        </div>
    );
}
