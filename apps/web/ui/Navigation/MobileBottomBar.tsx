'use client';

import { useEffect, useState } from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import SvgIcon from '@mui/material/SvgIcon';
import Link from 'next/link';
import routes from './routes';
import { usePathname } from 'next/navigation';

export default function MobileBottomBar() {
    const currentRoute = usePathname();
    const [value, setValue] = useState(currentRoute);

    useEffect(() => setValue(currentRoute), [currentRoute]);

    return (
        <>
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
                <BottomNavigation value={value}>
                    {routes.map((route, idx) => (
                        <BottomNavigationAction
                            LinkComponent={Link}
                            href={route.route}
                            key={idx}
                            label={route.name}
                            value={route.route}
                            icon={<SvgIcon>{route.icon}</SvgIcon>}
                        />
                    ))}
                </BottomNavigation>
            </Paper>
        </>
    );
}
