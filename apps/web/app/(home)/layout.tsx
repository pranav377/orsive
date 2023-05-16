'use client';

import Navbar from '@/ui/Navigation/Navbar';
import SideBar, { drawerWidth } from '@/ui/Navigation/SideBar';
import Box from '@mui/material/Box';
import { usePathname } from 'next/navigation';

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
                    paddingTop: (theme) =>
                        (theme.mixins.toolbar.minHeight as number) / 7.5,
                }}
            >
                {children}
            </Box>
        </>
    );
}
