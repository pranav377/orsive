'use client';
import { theme } from './theme';
import {
    StyledEngineProvider,
    ThemeProvider,
    CssBaseline,
} from '@mui/material';

export default function MUISetup({ children }: { children: React.ReactNode }) {
    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <body id="__orsive">{children}</body>
            </ThemeProvider>
        </StyledEngineProvider>
    );
}
