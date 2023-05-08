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
import Footer from '@/ui/Navigation/Footer';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import login from '@/technique/auth/login';
import { DISCORD_AUTH_URL } from '@/config';
import { GOOGLE_AUTH_URL } from '@/config';

export default function Auth() {
    const theme = useTheme();

    const authParams = useSearchParams();

    const router = useRouter();

    useEffect(() => {
        if (authParams) {
            let userAndToken = Object.fromEntries(authParams);

            if (userAndToken.token) {
                login({
                    user: {
                        id: userAndToken.id,
                        name: userAndToken.name,
                        username: userAndToken.username,
                        avatar: userAndToken.avatar,
                    },
                    token: userAndToken.token,
                });
            }
        }
    }, [authParams]);

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
                        height: theme.spacing(14),
                        width: theme.spacing(14),
                        marginBottom: theme.spacing(1),
                    }}
                    className="floating"
                />

                <Typography variant="h4">Welcome back to Orsive</Typography>

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
                        onClick={() => {
                            router.push(GOOGLE_AUTH_URL);
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
                        onClick={() => {
                            router.push(DISCORD_AUTH_URL);
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
                        onClick={() => {
                            router.push('/auth/email');
                        }}
                        startIcon={<EmailIcon />}
                    >
                        Login with E-Mail
                    </Button>
                </Box>
            </Box>

            <Footer />
        </>
    );
}
