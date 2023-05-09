'use client';

import useHandleOAuthRedirect from '@/hooks/new/auth/useHandleOAuthRedirect';
import PostsRenderer from '@/ui/Posts/PostsRenderer';

export default function Home() {
    useHandleOAuthRedirect();
    return (
        <div>
            <PostsRenderer />
        </div>
    );
}
