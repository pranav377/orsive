'use client';

import { PaletteColorOptions, createTheme } from '@mui/material/styles';
import colors from '@/logic/colors';

declare module '@mui/material/styles' {
    interface CustomPalette {
        slate: PaletteColorOptions;
        whitegrey: PaletteColorOptions;
    }
    interface Palette extends CustomPalette {}
    interface PaletteOptions extends CustomPalette {}
}

declare module '@mui/material/Button' {
    interface ButtonPropsColorOverrides {
        slate: true;
        whitegrey: true;
    }
}

const { palette } = createTheme();

const createColor = (mainColor: string) =>
    palette.augmentColor({ color: { main: mainColor } });

export const theme = createTheme({
    palette: {
        mode: 'dark',

        background: {
            paper: colors.slate[900],
        },

        slate: createColor(colors.slate[900]),
        whitegrey: createColor(colors.gray[100]),

        primary: {
            light: colors.blue[500],
            main: colors.blue[600],
            dark: colors.blue[700],
        },
    },

    typography: {
        fontFamily: 'var(--orsive-roboto-font)',
    },
});
