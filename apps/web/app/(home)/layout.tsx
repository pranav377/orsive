'use client';

import Navbar from '@/ui/navigation/Navbar';
import BottomBar from '@/ui/navigation/BottomBar';
import SideBar, { drawerWidth } from '@/ui/navigation/SideBar';
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
            <Toolbar />
            <Box
                sx={{
                    marginLeft: {
                        xs: 0,
                        lg: `${drawerWidth}px`,
                    },
                    height: '100%',
                }}
            >
                {children}
            </Box>
            <SideBar />
            <BottomBar />
        </>
    );
}
