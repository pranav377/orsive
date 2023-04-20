'use client';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Avatar from '@mui/material/Avatar';
import Image from 'next/image';
import Grid from '@mui/material/Grid';
import Badge from '@mui/material/Badge';
import { styled, useTheme } from '@mui/material/styles';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import {
    Search,
    SearchIcon,
    SearchIconWrapper,
    StyledInputBase,
} from '@/ui/navigation/Search';
import { useState } from 'react';

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

function randomColor() {
    let hex = Math.floor(Math.random() * 0xffffff);
    let color = '#' + hex.toString(16);

    return color;
}

export default function ChatDefault() {
    const theme = useTheme();

    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box
            sx={{
                p: 1.5,
                height: '100%',
                overflow: 'scroll',
            }}
        >
            <Tabs
                value={value}
                onChange={handleChange}
                aria-label="Online and Stories tabs"
            >
                <Tab label="Online" />
                <Tab label="Stories" />
            </Tabs>

            <Search
                sx={{
                    height: (theme) => theme.spacing(4),
                    my: 2,
                    marginRight: 0,
                    marginLeft: 0,
                }}
            >
                <SearchIconWrapper>
                    <SearchIcon
                        sx={{
                            height: 0.7,
                        }}
                    />
                </SearchIconWrapper>
                <StyledInputBase
                    placeholder="Search"
                    inputProps={{ 'aria-label': 'search' }}
                />
            </Search>

            <Grid container spacing={2}>
                {onlineFriends.map((friend, idx) => (
                    <Grid
                        item
                        key={idx}
                        sx={
                            {
                                // mt: idx % 2 === 0 ? 0 : 1.5,
                            }
                        }
                    >
                        <Avatar
                            key={idx}
                            sx={{
                                width: theme.spacing(8),
                                height: theme.spacing(8),
                                // boxShadow: theme.shadows[6],
                                border: 2,
                                borderColor: randomColor(),
                                mt: idx % 2 === 0 ? 0 : 1.5,
                            }}
                        >
                            <Image
                                src={`${friend.avatar}?random=${idx}`}
                                alt={friend.name}
                                fill
                            />
                        </Avatar>
                    </Grid>
                ))}
            </Grid>

            <Fab
                color="primary"
                aria-label="add a new channel (single or group)"
                sx={{
                    position: 'fixed',
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
