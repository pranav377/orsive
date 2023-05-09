'use client';

import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import Fab from '@mui/material/Fab';
import SvgIcon from '@mui/material/SvgIcon';

import AddIcon from '@mui/icons-material/Add';
import { useTheme } from '@mui/material';
import routes from './routes';

export default function BottomBar() {
    const theme = useTheme();
    const [value, setValue] = React.useState('recents');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <Paper
            sx={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                display: {
                    lg: 'none',
                },
            }}
            elevation={1}
        >
            <BottomNavigation value={value} onChange={handleChange}>
                {routes.map((route, idx) => (
                    <BottomNavigationAction
                        key={idx}
                        label={route.name}
                        value={route.name}
                        icon={<SvgIcon>{route.icon}</SvgIcon>}
                    />
                ))}
            </BottomNavigation>
            {/* use speeddial in future */}
            <Fab
                color="primary"
                aria-label="add post"
                sx={{
                    position: 'absolute',
                    bottom: 60,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 1,
                    boxShadow: theme.shadows[6],
                }}
            >
                <AddIcon />
            </Fab>
        </Paper>
    );
}
