'use client';
import colors from '@/technique/colors';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBackIosRounded';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/navigation';
import HomeComponentsWrapper from '@/ui/HomeComponentsWrapper';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

const commentsDrawerWidth = '25%';

export default function ImagesPageLayout(props: { children: React.ReactNode }) {
    const { children } = props;
    const theme = useTheme();
    const router = useRouter();

    return (
        <HomeComponentsWrapper>
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
            {children}

            <Drawer
                variant="permanent"
                anchor="right"
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
                PaperProps={{
                    sx: {
                        border: 0,
                    },
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>
                    <List
                        sx={{
                            flex: 1 / 4,
                            height: '100%',
                            overflowY: 'scroll',
                            position: 'sticky',
                            padding: 0,
                        }}
                    ></List>
                </Box>
            </Drawer>
        </HomeComponentsWrapper>
    );
}
