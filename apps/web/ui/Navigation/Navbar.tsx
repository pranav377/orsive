'use client';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Image from 'next/image';

import LogoSVG from '@/components/svgs/logo.svg';
import { useTheme } from '@mui/material/styles';
import {
    Search,
    SearchIcon,
    SearchIconWrapper,
    StyledInputBase,
} from '@/ui/Navigation/Search';
import Link from 'next/link';
import useUserState from '@/state/userState';
import { CircularProgress } from '@mui/material';

export default function Navbar() {
    const theme = useTheme();
    const currUser = useUserState();
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar
                position="fixed"
                elevation={0}
                sx={{
                    zIndex: theme.zIndex.drawer + 1,
                }}
            >
                <Toolbar>
                    <LogoSVG
                        style={{
                            height: theme.spacing(6),
                            width: theme.spacing(6),
                        }}
                    />
                    <Search
                        sx={{
                            height: (theme) => theme.spacing(4),
                            [theme.breakpoints.up('lg')]: {
                                // marginRight: 'auto',
                                // marginLeft: 'auto',
                                left: '50%',
                                transform: 'translateX(-50%)',
                            },
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

                    {currUser.is === 'loading' && (
                        <>
                            <CircularProgress
                                sx={{
                                    ml: 'auto',
                                }}
                            />
                        </>
                    )}

                    {currUser.is === 'unauthenticated' && (
                        <Button
                            variant="contained"
                            sx={{
                                ml: 'auto',
                            }}
                            LinkComponent={Link}
                            href="/auth"
                            color="primary"
                        >
                            Login
                        </Button>
                    )}

                    {currUser.is === 'authenticated' && (
                        <IconButton sx={{ p: 0 }}>
                            <Avatar
                                aria-label={`${currUser.name} (${currUser.username})`}
                            >
                                <Image
                                    src={currUser.avatar}
                                    alt={currUser.name}
                                    fill
                                />
                            </Avatar>
                        </IconButton>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
}
