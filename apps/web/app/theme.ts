'use client';

import { createTheme } from '@mui/material/styles';
import colors from '@/logic/colors';

export const theme = createTheme({
    palette: {
        mode: 'dark',

        background: {
            paper: colors.slate[900],
        },
    },

    typography: {
        fontFamily: 'var(--orsive-roboto-font)',
    },
});
