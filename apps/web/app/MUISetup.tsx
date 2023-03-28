'use client';
import { darkTheme } from './theme';
import { ThemeProvider, CssBaseline } from '@mui/material';

export default function MUISetup({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <body>{children}</body>
        </ThemeProvider>
    );
}
