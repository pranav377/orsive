'use client';

import colors from '@/technique/colors';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBackIosRounded';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/navigation';
import Drawer from '@mui/material/Drawer';
import Image from 'next/image';
import { ImageType } from '@/gql/graphql';

const commentsDrawerWidth = 300;

export default function ContentImage(props: { image: ImageType }) {
    const theme = useTheme();
    const router = useRouter();

    return (
        <>
            <Box
                sx={{
                    backgroundColor: colors.slate[800],
                    display: 'flex',
                    alignItems: 'center',
                    py: 1,
                    px: 0.5,
                }}
            >
                <IconButton
                    onClick={() => {
                        if (window && window.history.length > 2) {
                            router.back();
                        } else {
                            router.push('/home');
                        }
                    }}
                >
                    <ArrowBackIcon
                        style={{
                            height: theme.spacing(4),
                            width: theme.spacing(4),
                        }}
                    />
                </IconButton>
            </Box>

            {/* Main Components here */}

            <Drawer
                variant="permanent"
                anchor="right"
                open
                sx={{
                    width: commentsDrawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-root': {
                        position: 'absolute',
                    },
                    [`& .MuiDrawer-paper`]: {
                        width: commentsDrawerWidth,
                        boxSizing: 'border-box',
                        position: 'absolute',
                        backgroundColor: colors.slate[800],
                    },
                    display: {
                        xs: 'none',
                        lg: 'block',
                    },
                }}
                SlideProps={{
                    style: {
                        transition: 'none !important',
                    },
                }}
                PaperProps={{
                    sx: {
                        border: 0,
                    },
                }}
            ></Drawer>
        </>
    );
}
