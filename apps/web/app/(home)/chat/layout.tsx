'use client';

import colors from '@/logic/colors';
import Channels from '@/ui/chat/Channels';

export default function ChatLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Channels />
            <main
                style={{
                    marginLeft: '25%',
                    backgroundColor: colors.slate[700],
                    height: '100%',
                }}
            >
                {children}
            </main>
        </>
    );
}
