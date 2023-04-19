'use client';

import Box from '@mui/material/Box';
import Channels from '@/ui/chat/Channels';

export default function ChatLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Channels />
            <main style={{ marginLeft: '25%' }}>{children}</main>
        </>
    );
}
