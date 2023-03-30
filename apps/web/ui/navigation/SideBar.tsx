'use client';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Icon from '@mui/material/Icon';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

import HomeIcon from '@/components/svgs/home/home.svg';
import NotificationsIcon from '@/components/svgs/home/notifications.svg';
import ChatIcon from '@/components/svgs/home/chat.svg';
import RoomsIcon from '@/components/svgs/home/rooms.svg';
import { useTheme } from '@mui/material/styles';

const drawerWidth = 240;

export default function SideBar() {
    const theme = useTheme();
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
        >
            <Toolbar />
            <Toolbar />
            <Box sx={{ overflow: 'auto' }}>
                <List>
                    <ListItem>
                        <ListItemButton
                            sx={{
                                p: 1.5,
                                borderRadius: theme.spacing(4),
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: 1.5,
                                    height: theme.spacing(4),
                                    width: theme.spacing(4),
                                }}
                            >
                                <HomeIcon />
                            </ListItemIcon>
                            <ListItemText
                                primaryTypographyProps={{
                                    sx: {
                                        fontSize: theme.spacing(2.5),
                                    },
                                }}
                                primary={'Home'}
                            />
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton
                            sx={{
                                p: 1.5,
                                borderRadius: theme.spacing(4),
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: 1.5,
                                    height: theme.spacing(4),
                                    width: theme.spacing(4),
                                }}
                            >
                                <NotificationsIcon />
                            </ListItemIcon>
                            <ListItemText
                                primaryTypographyProps={{
                                    sx: {
                                        fontSize: theme.spacing(2.5),
                                    },
                                }}
                                primary={'Notifications'}
                            />
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton
                            sx={{
                                p: 1.5,
                                borderRadius: theme.spacing(4),
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: 1.5,
                                    height: theme.spacing(4),
                                    width: theme.spacing(4),
                                }}
                            >
                                <ChatIcon />
                            </ListItemIcon>
                            <ListItemText
                                primaryTypographyProps={{
                                    sx: {
                                        fontSize: theme.spacing(2.5),
                                    },
                                }}
                                primary={'Chat'}
                            />
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton
                            sx={{
                                p: 1.5,
                                borderRadius: theme.spacing(4),
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: 1.5,
                                    height: theme.spacing(4),
                                    width: theme.spacing(4),
                                }}
                            >
                                <RoomsIcon />
                            </ListItemIcon>
                            <ListItemText
                                primaryTypographyProps={{
                                    sx: {
                                        fontSize: theme.spacing(2.5),
                                    },
                                }}
                                primary={'Rooms'}
                            />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Box>
        </Drawer>
    );
}
