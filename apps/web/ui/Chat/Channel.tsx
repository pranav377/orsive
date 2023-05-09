'use client';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Typography from '@mui/material/Typography';
import Image from 'next/image';

import { useTheme } from '@mui/material/styles';
import colors from '@/technique/colors';

import ArrowBackIcon from '@mui/icons-material/ArrowBackIosRounded';
import { useRouter } from 'next/navigation';
import relativeDate from '@/technique/relativeDate';
import AvatarActiveBadge from './AvatarActiveBadge';

const channel = {
    id: '4c1f9518-dff9-11ed-b5ea-0242ac120002',
    type: 'single',
    metadata: {
        name: 'Pranava Mohan',
        avatar: 'https://picsum.photos/400/400?random=777',
        isActive: true,
        lastActive: '2022-10-01T12:00:00.000Z',
    },
    unreadCount: 0,
};

export default function Channel() {
    const theme = useTheme();

    const router = useRouter();

    return (
        <Box
            sx={{
                backgroundColor: colors.slate[800],
                display: 'flex',
                alignItems: 'center',
                py: 1,
                px: 0.5,
            }}
        >
            <IconButton onClick={() => router.push('/chat')}>
                <ArrowBackIcon
                    style={{
                        height: theme.spacing(4),
                        width: theme.spacing(4),
                    }}
                />
            </IconButton>
            <ListItem
                sx={{
                    px: 0.5,
                }}
            >
                <ListItemAvatar>
                    {channel.metadata.isActive ? (
                        <AvatarActiveBadge
                            overlap="circular"
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            variant="dot"
                        >
                            <Avatar
                                sx={{
                                    width: theme.spacing(6),
                                    height: theme.spacing(6),
                                }}
                            >
                                <Image
                                    src={`${channel.metadata.avatar}`}
                                    alt={channel.metadata.name}
                                    fill
                                />
                            </Avatar>
                        </AvatarActiveBadge>
                    ) : (
                        <Avatar
                            sx={{
                                width: theme.spacing(6),
                                height: theme.spacing(6),
                            }}
                        >
                            <Image
                                src={`${channel.metadata.avatar}`}
                                alt={channel.metadata.name}
                                fill
                            />
                        </Avatar>
                    )}
                </ListItemAvatar>
                <Box
                    sx={{
                        width: '100%',
                    }}
                >
                    <Typography variant="body1">
                        {channel.metadata.name}
                    </Typography>

                    <Typography variant="body2" color={'text.secondary'}>
                        {channel.metadata.isActive
                            ? 'Active'
                            : `Active ${relativeDate(
                                  new Date(channel.metadata.lastActive)
                              )}`}
                    </Typography>
                </Box>
            </ListItem>
        </Box>
    );
}
