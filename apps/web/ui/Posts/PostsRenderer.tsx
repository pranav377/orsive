'use client';

import Box from '@mui/material/Box';
import ImagePostCard from '@/ui/Posts/ImagePostCard';

export default function PostsRenderer() {
    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    py: 0.4,
                    pb: 7,
                }}
            >
                <ImagePostCard />
                <ImagePostCard />
                <ImagePostCard />
            </Box>
        </>
    );
}
