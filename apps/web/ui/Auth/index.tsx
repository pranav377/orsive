'use client';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';
import LogoSVG from '@/components/svgs/logo.svg';
import { useTheme } from '@mui/material/styles';
import GoogleSVG from '@/components/svgs/google-color-logo.svg';
import DiscordSVG from '@/components/svgs/discord-color-logo.svg';
import EmailIcon from '@mui/icons-material/Email';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';

export default function Auth() {
    const theme = useTheme();

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: 2,
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100vh',
                }}
            >
                <LogoSVG
                    style={{
                        height: theme.spacing(16),
                        width: theme.spacing(16),
                    }}
                    className="floating"
                />

                <Typography variant="h4">Welcome back to </Typography>
                <Typography variant="h4">Orsive</Typography>

                <Typography variant="body1">
                    We're happy to see you again!
                </Typography>

                <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column' }}>
                    <Button
                        variant="contained"
                        color="whitegrey"
                        sx={{
                            textTransform: 'none',
                            borderRadius: 5,
                            px: 4,
                        }}
                        startIcon={
                            <SvgIcon>
                                <GoogleSVG />
                            </SvgIcon>
                        }
                    >
                        Login with Google
                    </Button>

                    <Button
                        variant="contained"
                        color="slate"
                        sx={{
                            textTransform: 'none',
                            borderRadius: 5,
                            // px: 4,
                            mt: 1,
                        }}
                        startIcon={
                            <SvgIcon>
                                <DiscordSVG />
                            </SvgIcon>
                        }
                    >
                        Login with Discord
                    </Button>

                    <Button
                        variant="contained"
                        sx={{
                            textTransform: 'none',
                            borderRadius: 5,
                            mt: 1,
                        }}
                        startIcon={
                            <EmailIcon
                                sx={
                                    {
                                        // mr: 1.5,
                                    }
                                }
                            />
                        }
                    >
                        Login with E-Mail
                    </Button>

                    <Typography
                        variant="body2"
                        sx={{
                            mt: 1,
                            textAlign: 'center',
                        }}
                    >
                        Or
                    </Typography>

                    <Button
                        variant="outlined"
                        sx={{
                            textTransform: 'none',
                            borderRadius: 5,
                            mt: 1,
                        }}
                    >
                        New here? Sign up
                    </Button>
                </Box>
            </Box>

            <Paper
                sx={{
                    width: '100%',
                    border: 0,
                }}
                component="footer"
                square
                variant="outlined"
            >
                <Container
                    maxWidth="lg"
                    sx={{
                        textAlign: 'center',
                        padding: 2,
                    }}
                >
                    <Typography variant="caption">
                        Copyright ©2023 - Orsive
                    </Typography>
                </Container>
            </Paper>
        </>
    );
}
