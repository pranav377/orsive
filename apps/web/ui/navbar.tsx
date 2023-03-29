'use client';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import LogoSVG from '@/components/svgs/logo.svg';
import { useTheme } from '@mui/material/styles';

export default function Navbar() {
    const theme = useTheme();
    return (
        <Box style={{ flexGrow: 1 }}>
            <AppBar position="static" elevation={0}>
                <Toolbar>
                    {/* <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        style={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton> */}
                    <LogoSVG
                        style={{
                            height: theme.spacing(4),
                            width: theme.spacing(4),
                        }}
                    />
                    <Typography
                        variant="h6"
                        component="div"
                        style={{ flexGrow: 1 }}
                    >
                        Orsive Icon
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
