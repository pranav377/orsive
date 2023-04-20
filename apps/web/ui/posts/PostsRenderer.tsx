'use client';

import Box from '@mui/material/Box';
import ImagePostCard from '@/ui/posts/ImagePostCard';

export default function PostsRenderer() {
    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <ImagePostCard />
                <ImagePostCard />
                <ImagePostCard />
            </Box>
        </>
    );
}
