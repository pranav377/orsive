'use client';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';

import LogoSVG from '@/components/svgs/logo.svg';
import { useTheme } from '@mui/material/styles';
import Link from 'next/link';

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
                            height: theme.spacing(5),
                            width: theme.spacing(5),
                        }}
                    />
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
