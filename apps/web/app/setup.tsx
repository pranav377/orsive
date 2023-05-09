'use client';
import { theme } from './theme';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import { Provider as GraphQLProvider } from 'urql';
import { GraphQLClient } from './GraphQLClient';
import { SnackbarProvider, closeSnackbar } from 'notistack';
import CheckAuth from '@/ui/Auth/CheckAuth';
import SetupComplete from '@/ui/Auth/SetupComplete';

export default function Setup({ children }: { children: React.ReactNode }) {
    return (
        <GraphQLProvider value={GraphQLClient}>
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
        </GraphQLProvider>
    );
}
