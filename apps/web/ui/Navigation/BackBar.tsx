'use client';
import ArrowBackIcon from '@mui/icons-material/ArrowBackRounded';
import IconButton from '@mui/material/IconButton';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { useTheme } from '@mui/material/styles';

export default function BackBar(props: {
    onBackClick: () => any;
    children?: React.ReactNode;
}) {
    const theme = useTheme();

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar
                    elevation={0}
                    sx={{
                        background: 'none',
                        mt: 1,
                    }}
                >
                    <Toolbar>
                        <IconButton onClick={props.onBackClick}>
                            <ArrowBackIcon
                                style={{
                                    height: theme.spacing(6),
                                    width: theme.spacing(6),
                                }}
                            />
                        </IconButton>

                        {props.children}
                    </Toolbar>
                </AppBar>
            </Box>
        </>
    );
}
