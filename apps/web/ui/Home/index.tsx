'use client';

import useHandleOAuthRedirect from '@/hooks/new/auth/useHandleOAuthRedirect';
import PostsRenderer from '@/ui/Posts/PostsRenderer';
import HomeComponentsWrapper from '@/ui/HomeComponentsWrapper';

export default function Home() {
    useHandleOAuthRedirect();
    return (
        <HomeComponentsWrapper>
            <PostsRenderer />
        </HomeComponentsWrapper>
    );
}
