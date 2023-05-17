'use client';
import DesktopComponents from '@/ui/Layouts/DesktopComponents';
import useAppBarHeight from '@/hooks/new/useAppBarHeight';
import Box from '@mui/material/Box';
import { desktopSidebarWidth } from '@/ui/Navigation/DesktopSidebar';

export default function HomeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const appBarHeight = useAppBarHeight();
    return (
        <>
            <DesktopComponents />
            <Box
                sx={{
                    marginLeft: {
                        xs: 0,
                        lg: `${desktopSidebarWidth}px`,
                    },
                    position: 'relative',
                    height: '100%',
                    paddingTop: (theme) => appBarHeight,
                }}
            >
                {children}
            </Box>
        </>
    );
}
