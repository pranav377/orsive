'use client';

import Box from '@mui/material/Box';

export default function Chat() {
    return (
        <Box
            sx={{
                display: 'flex',
                width: '100%',
                height: '100%',
                position: 'fixed',
            }}
        >
            <Box
                sx={{
                    flex: 0.25,
                    backgroundColor: 'red',
                    height: '100%',
                }}
            >
                hi
            </Box>
            <Box
                sx={{
                    flex: 0.75,
                    backgroundColor: 'blue',
                    height: '100%',
                }}
            >
                hi
            </Box>
        </Box>
    );
}
