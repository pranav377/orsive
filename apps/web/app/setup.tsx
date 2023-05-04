'use client';
import { theme } from './theme';
import {
    StyledEngineProvider,
    ThemeProvider,
    CssBaseline,
} from '@mui/material';
import { Provider as GraphQLProvider } from 'urql';
import { GraphQLClient } from './GraphQLClient';

export default function Setup({ children }: { children: React.ReactNode }) {
    return (
        <GraphQLProvider value={GraphQLClient}>
            <StyledEngineProvider injectFirst>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <body id="__orsive">{children}</body>
                </ThemeProvider>
            </StyledEngineProvider>
        </GraphQLProvider>
    );
}
