'use client';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import routes from './routes';

import { useTheme } from '@mui/material/styles';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import colors from '@/technique/colors';

export const drawerWidth = 240;

export default function SideBar() {
    const theme = useTheme();
    const currentRoute = usePathname();

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                },
                display: {
                    xs: 'none',
                    lg: 'block',
                },
            }}
            PaperProps={{
                sx: {
                    border: 0,
                },
            }}
            id="main-sidebar"
        >
            <Toolbar />
            <Toolbar />
            <Box sx={{ overflow: 'auto' }}>
                <List>
                    {routes.map((route, idx) => (
                        <ListItem key={idx}>
                            <ListItemButton
                                sx={{
                                    p: 1.2,
                                    borderRadius: theme.spacing(4),
                                    '&.Mui-selected': {
                                        backgroundColor: colors.slate[800],
                                    },
                                    '&.Mui-selected:hover': {
                                        backgroundColor: colors.slate[800],
                                    },
                                }}
                                LinkComponent={Link}
                                href={route.route}
                                selected={currentRoute === route.route}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: 1.5,
                                        height: theme.spacing(4),
                                        width: theme.spacing(4),
                                    }}
                                >
                                    {route.icon}
                                </ListItemIcon>
                                <ListItemText
                                    primaryTypographyProps={{
                                        sx: {
                                            fontSize: theme.spacing(2.5),
                                        },
                                    }}
                                    primary={route.name}
                                />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Drawer>
    );
}
