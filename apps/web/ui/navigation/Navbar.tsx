'use client';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';

import LogoSVG from '@/components/svgs/logo.svg';
import { useTheme, styled, alpha } from '@mui/material/styles';
import Link from 'next/link';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.spacing(10),
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
    width: '100%',
    maxWidth: theme.spacing(100),
    [theme.breakpoints.up('lg')]: {
        minWidth: theme.spacing(100),
        width: 'auto',
        marginRight: 'auto',
        marginLeft: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    paddingLeft: theme.spacing(1),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(0.5, 0.6, 0.5, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(2.5)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('lg')]: {
            width: '20ch',
        },
    },
}));

export default function Navbar() {
    const theme = useTheme();
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
                    <Search sx={{ height: (theme) => theme.spacing(4) }}>
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
                </Toolbar>
            </AppBar>
        </Box>
    );
}
