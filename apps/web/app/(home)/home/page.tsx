import Home from '@/ui/Home';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Home | Orsive',
    description: 'Your curated list of content from amazing people :)',
};

export default function HomePage() {
    return <Home />;
}
