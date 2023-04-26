'use client';

import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { useTheme } from '@mui/material/styles';

import LogoSVG from '@/components/svgs/logo.svg';
import Wave1 from '@/components/svgs/LandingPage/wave1.svg';

const navItems = ['Explore', 'Terms of use', 'Privacy'];

export default function LandingPageDisplay() {
    return (
        <>
            <Box
                sx={{
                    background:
                        'linear-gradient(180deg, rgba(19, 58, 194, 0.056) 0%, rgba(37, 57, 235, 0.63) 100%)',
                    width: '100%',
                    height: '100%',
                    position: 'relative',
                }}
            >
                <LandingPageNavbar />

                <Box
                    sx={{
                        display: 'flex',
                        top: '20%',
                        position: 'relative',
                        px: 8,
                    }}
                >
                    <Box
                        sx={{
                            flex: 0.4,
                        }}
                    >
                        <Typography variant="h2">Orsive</Typography>
                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: 300,
                            }}
                        >
                            making every moment
                        </Typography>
                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: 300,
                            }}
                        >
                            count
                        </Typography>

                        <Box
                            sx={{
                                display: 'flex',
                                gap: 3,
                                mt: 4,
                            }}
                        >
                            <Button
                                variant="contained"
                                sx={{
                                    textTransform: 'none',
                                    px: 4,
                                }}
                                color="slate"
                                size="medium"
                            >
                                <Typography
                                    sx={{
                                        fontWeight: 400,
                                    }}
                                    variant="h6"
                                >
                                    Join
                                </Typography>
                            </Button>

                            <Button
                                sx={{
                                    textTransform: 'none',
                                    px: 4,
                                }}
                                variant="contained"
                                color="whitegrey"
                                size="medium"
                            >
                                <Typography
                                    sx={{
                                        fontWeight: 400,
                                    }}
                                    variant="h6"
                                >
                                    Login
                                </Typography>
                            </Button>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            flex: 0.6,
                        }}
                    >
                        <DeviceMockup />
                    </Box>
                </Box>

                <Box
                    sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: '100%',
                        overflow: 'hidden',
                        lineHeight: 0,
                    }}
                >
                    <Wave1 />
                </Box>
            </Box>
        </>
    );
}

function LandingPageNavbar() {
    const theme = useTheme();

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar
                position="sticky"
                elevation={0}
                sx={{
                    background: 'none',
                }}
            >
                <Toolbar>
                    <LogoSVG
                        style={{
                            height: theme.spacing(6),
                            width: theme.spacing(6),
                        }}
                    />

                    <Box
                        sx={{
                            marginLeft: 'auto',
                            display: { xs: 'none', sm: 'block' },
                        }}
                    >
                        {navItems.map((item, idx) => (
                            <Button
                                key={idx}
                                sx={{
                                    color: '#fff',
                                    textTransform: 'none',
                                    mx: 2,
                                    fontWeight: 400,
                                }}
                            >
                                {item}
                            </Button>
                        ))}
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

function DeviceMockup() {
    const theme = useTheme();
    return <></>;
}
