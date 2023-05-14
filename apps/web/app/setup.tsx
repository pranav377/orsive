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
import { useEffect } from 'react';
import useAppState from '@/state/appState';

export default function Setup({ children }: { children: React.ReactNode }) {
    const appState = useAppState();

    useEffect(() => {
        // @ts-ignore
        if (document.startViewTransition) {
            appState.setViewTransitions(true);
        } else {
            appState.setViewTransitions(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <ApolloProvider client={GraphQLClient}>
            <CheckAuth />
            <StyledEngineProvider injectFirst>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <body id="__orsive">
                        <SetupComplete />
                        <SnackbarProvider
                            maxSnack={1}
                            action={(snackbarId) => (
                                <Button
                                    color="secondary"
                                    size="small"
                                    onClick={() => closeSnackbar(snackbarId)}
                                >
                                    Dismiss
                                </Button>
                            )}
                        >
                            {children}
                        </SnackbarProvider>
                    </body>
                </ThemeProvider>
            </StyledEngineProvider>
        </ApolloProvider>
    );
}
