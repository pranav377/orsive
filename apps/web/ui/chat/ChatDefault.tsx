'use client';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Image from 'next/image';
import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import { styled, useTheme } from '@mui/material/styles';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));

export default function ChatDefault() {
    const theme = useTheme();
    return (
        <Box sx={{ p: 1.5, position: 'relative', height: '100%' }}>
            <Typography variant="h5">Online</Typography>

            <Stack direction="row" spacing={2}>
                {onlineFriends.map((friend, idx) => (
                    <>
                        <StyledBadge
                            overlap="circular"
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            variant="dot"
                        >
                            <Avatar
                                key={idx}
                                sx={{
                                    width: theme.spacing(10),
                                    height: theme.spacing(10),
                                }}
                            >
                                <Image
                                    src={friend.avatar}
                                    alt={friend.name}
                                    fill
                                />
                            </Avatar>
                        </StyledBadge>
                    </>
                ))}
            </Stack>

            <Fab
                color="primary"
                aria-label="add a new channel (single or group)"
                sx={{
                    position: 'absolute',
                    bottom: 20,
                    right: '5%',
                    zIndex: 1,
                    boxShadow: theme.shadows[6],
                }}
            >
                <AddIcon />
            </Fab>
        </Box>
    );
}

const onlineFriends = [
    {
        name: 'Remy Sharp',
        avatar: 'https://picsum.photos/400/400',
    },
    {
        name: 'Travis Howard',
        avatar: 'https://picsum.photos/400/400',
    },
    {
        name: 'Cindy Baker',
        avatar: 'https://picsum.photos/400/400',
    },
];
