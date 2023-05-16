'use client';

import Navbar from '@/ui/Navigation/Navbar';
import SideBar, { drawerWidth } from '@/ui/Navigation/SideBar';
import Box from '@mui/material/Box';
import { useMediaQuery, useTheme } from '@mui/material';

function useAppBarHeight(): number {
    const {
        mixins: { toolbar },
        breakpoints,
    } = useTheme();
    const toolbarDesktopQuery = breakpoints.up('sm');
    const toolbarLandscapeQuery = `${breakpoints.up(
        'xs'
    )} and (orientation: landscape)`;
    const isDesktop = useMediaQuery(toolbarDesktopQuery);
    const isLandscape = useMediaQuery(toolbarLandscapeQuery);
    let currentToolbarMinHeight;
    if (isDesktop) {
        currentToolbarMinHeight = toolbar[toolbarDesktopQuery];
    } else if (isLandscape) {
        currentToolbarMinHeight = toolbar[toolbarLandscapeQuery];
    } else {
        currentToolbarMinHeight = toolbar;
    }
    return (
        (
            currentToolbarMinHeight as {
                minHeight: number;
            }
        ).minHeight / 8
    );
}

export default function HomeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const appBarHeight = useAppBarHeight();
    return (
        <>
            <Navbar />
            <SideBar />
            <Box
                sx={{
                    marginLeft: {
                        xs: 0,
                        lg: `${drawerWidth}px`,
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
