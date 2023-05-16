'use client';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

const LoadingComponent = () => (
    <Box
        sx={{
            display: 'flex',
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
        }}
    >
        <CircularProgress />
    </Box>
);

export default LoadingComponent;
