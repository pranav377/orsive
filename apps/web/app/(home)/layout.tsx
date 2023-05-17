'use client';
import DesktopComponents from '@/ui/Layouts/DesktopComponents';
import useAppBarHeight from '@/hooks/new/useAppBarHeight';
import Box from '@mui/material/Box';
import { desktopSidebarWidth } from '@/ui/Navigation/DesktopSidebar';
import CommonComponents from '@/ui/Layouts/CommonComponents';
import { usePathname } from 'next/navigation';
import MobileComponents from '@/ui/Layouts/MobileComponents';

const showMobileComponentsRoutes = ['/home', '/notifications'];

export default function HomeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const appBarHeight = useAppBarHeight();
    const currRoute = usePathname();
    return (
        <>
            {/* desktop components will always be visible in desktop. mobile components are specific to routes as they shouldn't be shown in certain pages in mobile devices. eg:- orsic, images, etc. */}
            <DesktopComponents />
            {showMobileComponentsRoutes.includes(currRoute || '') && (
                <MobileComponents />
            )}
            <Box
                sx={{
                    marginLeft: {
                        xs: 0,
                        lg: `${desktopSidebarWidth}px`,
                    },
                    position: 'relative',
                    height: '100%',
                    // paddingTop: appBarHeight,
                }}
            >
                {children}
            </Box>
            <CommonComponents />
        </>
    );
}
