'use client';
import { theme } from './theme';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Provider as GraphQLProvider } from 'urql';
import { GraphQLClient } from './GraphQLClient';
import { SnackbarProvider, closeSnackbar } from 'notistack';

export default function Setup({ children }: { children: React.ReactNode }) {
    return (
        <GraphQLProvider value={GraphQLClient}>
            <StyledEngineProvider injectFirst>
                <ThemeProvider theme={theme}>
                    <SnackbarProvider
                        maxSnack={1}
                        action={(snackbarId) => (
                            <IconButton
                                size="small"
                                aria-label="close"
                                color="inherit"
                                onClick={() => closeSnackbar(snackbarId)}
                            >
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        )}
                    >
                        <CssBaseline />
                        <body id="__orsive">{children}</body>
                    </SnackbarProvider>
                </ThemeProvider>
            </StyledEngineProvider>
        </GraphQLProvider>
    );
}
