'use client';

import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import colors from '@/logic/colors';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import relativeDate from '@/logic/relativeDate';

const channelsDrawerWidth = '25%';

export default function Channels() {
    return (
        <Drawer
            variant="permanent"
            anchor="left"
            sx={{
                width: channelsDrawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-root': {
                    position: 'absolute',
                },
                [`& .MuiDrawer-paper`]: {
                    width: channelsDrawerWidth,
                    boxSizing: 'border-box',
                    position: 'absolute',
                    backgroundColor: colors.slate[800],
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
            <Box sx={{ overflow: 'auto' }}>
                <List
                    sx={{
                        flex: 1 / 4,
                        height: '100%',
                        overflowY: 'scroll',
                        position: 'sticky',
                    }}
                >
                    {channels.map((channel, index) => (
                        <ListItemButton
                            key={index}
                            component={Link}
                            href={channel.id}
                        >
                            <ListItemAvatar>
                                <Avatar
                                    alt="Profile Picture"
                                    src={channel.metadata.avatar}
                                />
                            </ListItemAvatar>
                            <Box
                                sx={{
                                    width: '100%',
                                }}
                            >
                                <Typography variant="body1">
                                    {channel.metadata.name}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        display: '-webkit-box',
                                        overflow: 'hidden',
                                        WebkitBoxOrient: 'vertical',
                                        WebkitLineClamp: 1,
                                        wordBreak: 'break-all',
                                    }}
                                    color={
                                        channel.unreadCount > 0
                                            ? 'text.primary'
                                            : 'text.secondary'
                                    }
                                >
                                    {channel.type === 'single'
                                        ? `${channel.lastMessage.content}`
                                        : `${channel.lastMessage.by.name}: ${channel.lastMessage.content}`}
                                </Typography>

                                <Typography
                                    variant="body2"
                                    sx={{
                                        textAlign: 'left',
                                    }}
                                    color={'text.secondary'}
                                >
                                    {channel.unreadCount > 0 ? (
                                        <>
                                            Sent{' '}
                                            {relativeDate(
                                                new Date(
                                                    channel.lastMessage.timestamp
                                                )
                                            )}
                                        </>
                                    ) : (
                                        <>Seen</>
                                    )}
                                </Typography>
                            </Box>
                        </ListItemButton>
                    ))}
                </List>
            </Box>
        </Drawer>
    );
}

const channels = [
    {
        id: '4c1f9518-dff9-11ed-b5ea-0242ac120002',
        type: 'single',
        metadata: {
            name: 'Pranava Mohan',
            avatar: 'https://avatars.githubusercontent.com/u/47032027?v=4',
            isActive: true,
        },
        lastMessage: {
            content: 'Hey, how are you doing?',
            timestamp: '2021-08-01T18:25:43.511Z',
            by: {
                id: '5f9f1c5c-7b1e-4b9f-8c1a-1c5c7b1e4b9f',
                name: 'Pranava Mohan',
            },
        },
        unreadCount: 0,
    },
    {
        id: '5b804b9c-dff9-11ed-b5ea-0242ac120002',
        type: 'group',
        metadata: {
            name: 'Tech Club',
            avatar: 'https://avatars.githubusercontent.com/u/47032027?v=4',
        },
        lastMessage: {
            content: 'Yooo, did you see the new episode of Rick and Morty?',
            timestamp: '2021-08-01T18:25:43.511Z',
            by: {
                id: '5f9s1c5c-7b1e-6b9f-8c1a-1c5t7b1e4b9f',
                name: 'Alex Smith',
            },
        },
        unreadCount: 2,
    },
    {
        id: '672c9d10-dff9-11ed-b5ea-0242ac120002',
        type: 'group',
        metadata: {
            name: 'Music Club',
            avatar: 'https://avatars.githubusercontent.com/u/47032027?v=4',
        },
        lastMessage: {
            content:
                'hehehehehehehehehehemhehehehhehhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh Yooo, did you see the new episode of Rick and Morty?',
            timestamp: '2021-08-01T18:25:43.511Z',
            by: {
                id: '7f9s1c5c-7e1e-6b9f-8c1a-1c5t7b1e4b9f',
                name: 'Ben Awad',
            },
        },
        unreadCount: 7,
    },
];
