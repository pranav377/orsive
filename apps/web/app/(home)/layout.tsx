'use client';

import Navbar from '@/ui/Navigation/Navbar';
import BottomBar from '@/ui/Navigation/BottomBar';
import SideBar, { drawerWidth } from '@/ui/Navigation/SideBar';
import Box from '@mui/material/Box';

import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import ImageIcon from '@mui/icons-material/Image';
import OrsicIcon from '@mui/icons-material/Feed';
import { useTheme } from '@mui/material';
import colors from '@/technique/colors';

const actions = [
    { icon: <ImageIcon />, name: 'Image' },
    { icon: <OrsicIcon />, name: 'Orsic' },
];

export default function HomeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const theme = useTheme();
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
                        (theme.mixins.toolbar.minHeight as number) / 7,
                }}
            >
                {children}
                <SpeedDial
                    ariaLabel="Create Posts"
                    sx={{
                        position: 'fixed',
                        right: '50%',
                        transform: 'translateX(50%)',
                        bottom: 64,
                        [theme.breakpoints.up('lg')]: {
                            right: 32,
                            bottom: 32,
                            transform: 'none',
                        },
                    }}
                    icon={<SpeedDialIcon />}
                    direction="up"
                >
                    {actions.map((action) => (
                        <SpeedDialAction
                            key={action.name}
                            icon={action.icon}
                            tooltipTitle={action.name}
                            tooltipOpen
                            TooltipClasses={{
                                tooltip: 'red',
                            }}
                            FabProps={{
                                sx: {
                                    bgcolor: colors.slate[800],
                                    '&:hover': {
                                        bgcolor: colors.slate[800],
                                    },
                                },
                            }}
                        />
                    ))}
                </SpeedDial>
            </Box>

            <BottomBar />
        </>
    );
}
