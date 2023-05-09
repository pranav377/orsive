'use client';

import Navbar from '@/ui/Navigation/Navbar';
import BottomBar from '@/ui/Navigation/BottomBar';
import SideBar, { drawerWidth } from '@/ui/Navigation/SideBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';

export default function HomeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
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
                    paddingTop: (theme) => theme.mixins.toolbar.minHeight / 7,
                }}
            >
                {children}
            </Box>
            <BottomBar />
        </>
    );
}
