'use client';
import { theme } from './theme';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import { GraphQLClient } from './GraphQLClient';
import { SnackbarProvider, closeSnackbar } from 'notistack';
import CheckAuth from '@/ui/Auth/CheckAuth';
import SetupComplete from '@/ui/Auth/SetupComplete';
import { ApolloProvider } from '@apollo/client';
import { AnimatePresence } from 'framer-motion';

export default function Setup({ children }: { children: React.ReactNode }) {
    return (
        <ApolloProvider client={GraphQLClient}>
            <CheckAuth />
            <StyledEngineProvider injectFirst>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <AnimatePresence>
                        <body id="__orsive">
                            <SetupComplete />
                            <SnackbarProvider
                                maxSnack={1}
                                action={(snackbarId) => (
                                    <Button
                                        color="secondary"
                                        size="small"
                                        onClick={() =>
                                            closeSnackbar(snackbarId)
                                        }
                                    >
                                        Dismiss
                                    </Button>
                                )}
                            >
                                {children}
                            </SnackbarProvider>
                        </body>
                    </AnimatePresence>
                </ThemeProvider>
            </StyledEngineProvider>
        </ApolloProvider>
    );
}
