'use client';

import colors from '@/technique/colors';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBackIosRounded';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/navigation';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Image from 'next/image';
import { ImageType } from '@/gql/graphql';
import useAppBarHeight from '@/hooks/new/useAppBarHeight';
import { desktopSidebarWidth } from '@/ui/Navigation/DesktopSidebar';

const commentsDrawerWidth = 300;

export default function ContentImage(props: { image: ImageType }) {
    const theme = useTheme();
    const router = useRouter();
    const { image } = props;
    const appBarHeight = useAppBarHeight();

    return (
        <>
            <Box
                sx={{
                    flexGrow: 1,
                    paddingBottom: appBarHeight,
                }}
            >
                <AppBar
                    position="fixed"
                    elevation={0}
                    sx={{
                        left: {
                            lg: desktopSidebarWidth,
                        },
                        top: {
                            lg: appBarHeight * 8,
                        },
                        zIndex: theme.zIndex.drawer + 1,
                    }}
                >
                    <Toolbar>
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
                    </Toolbar>
                </AppBar>
            </Box>

            {/* Main Components here */}

            <Box
                sx={{
                    aspectRatio: `${image.width}/${image.height}`,
                    maxHeight: theme.breakpoints.values.sm,
                    maxWidth: '100%',
                    width: 'auto',
                    position: 'relative',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    mt: 1,
                }}
            >
                <Image
                    src={image.image}
                    alt={
                        image.description ||
                        `Image posted by ${image.post.user.username}`
                    }
                    fill
                    style={{
                        objectFit: 'contain',
                    }}
                />
            </Box>
        </>
    );
}
