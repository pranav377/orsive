'use client';
import DesktopComponents from '@/ui/Layouts/DesktopComponents';
import Box from '@mui/material/Box';
import { desktopSidebarWidth } from '@/ui/Navigation/DesktopSidebar';
import MainUploadPostsSpeedDial from '@/ui/Layouts/MainUploadPostsSpeedDial';
import { usePathname } from 'next/navigation';
import MobileNavbar from '@/ui/Navigation/MobileNavbar';
import MobileBottomBar from '@/ui/Navigation/MobileBottomBar';

const showMobileComponentsRoutes = ['/home', '/notifications'];
const showCommonComponentsRoutes = ['/home', '/notifications'];

export default function HomeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const currRoute = usePathname();
    return (
        <>
            {/* desktop components will always be visible in desktop. mobile components are specific to routes as they shouldn't be shown in certain pages in mobile devices. eg:- orsic, images, etc. */}
            <DesktopComponents />
            {showMobileComponentsRoutes.includes(currRoute || '') && (
                <MobileNavbar />
            )}
            <Box
                sx={{
                    marginLeft: {
                        xs: 0,
                        lg: `${desktopSidebarWidth}px`,
                    },
                    position: 'relative',
                    height: '100%',
                }}
            >
                {children}
            </Box>

            {showMobileComponentsRoutes.includes(currRoute || '') && (
                <MobileBottomBar />
            )}
            {showCommonComponentsRoutes.includes(currRoute || '') && (
                <MainUploadPostsSpeedDial />
            )}
        </>
    );
}
