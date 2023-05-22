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
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import CardMedia from '@mui/material/CardMedia';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CardContent from '@mui/material/CardContent';
import Linkify from 'react-linkify';
import Link from 'next/link';
import Typography from '@mui/material/Typography';
import relativeDate from '@/technique/relativeDate';
import HomeComponentsWrapper from '@/ui/HomeComponentsWrapper';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import useUserState from '@/state/userState';
import UpdateImageDialog from './UpdateImageDialog';

export default function ContentImage(props: { image: ImageType }) {
    const theme = useTheme();
    const router = useRouter();
    const { image } = props;
    const appBarHeight = useAppBarHeight();
    const uploadedByUser = image.post.user;

    const [optionsAnchorEl, setOptionsAnchorEl] = useState<null | HTMLElement>(
        null
    );

    const currUserId = useUserState((user) => user.id);

    const closeOptionsMenu = () => {
        setOptionsAnchorEl(null);
    };

    const [updateImageOpen, setUpdateImageOpen] = useState(false);

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

                        <Typography
                            variant="h6"
                            component="div"
                            sx={{
                                flexGrow: 1,
                                ml: 1,
                            }}
                        >
                            {image.description ||
                                `Image posted by ${image.post.user.username}`}
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Box>

            <HomeComponentsWrapper>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        mt: 0.5,
                    }}
                >
                    <Card
                        sx={{
                            maxWidth: theme.spacing(96),
                            width: '100%',
                            borderRadius: 1,
                            background: colors.slate[950],
                            boxShadow: 0,
                            my: 1,
                        }}
                    >
                        <CardHeader
                            avatar={
                                <Avatar
                                    aria-label={`${uploadedByUser.name} (${uploadedByUser.username})`}
                                >
                                    <Image
                                        src={uploadedByUser.avatar}
                                        alt={`${uploadedByUser.name} (${uploadedByUser.username})`}
                                        fill
                                    />
                                </Avatar>
                            }
                            action={
                                <IconButton
                                    aria-label="options menu"
                                    onClick={(e) => {
                                        setOptionsAnchorEl(e.currentTarget);
                                    }}
                                >
                                    <MoreVertIcon />
                                </IconButton>
                            }
                            title={uploadedByUser.name}
                            subheader={`@${uploadedByUser.username}`}
                        />

                        <Menu
                            id="menu-appbar"
                            anchorEl={optionsAnchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(optionsAnchorEl)}
                            onClose={closeOptionsMenu}
                        >
                            <MenuItem onClick={closeOptionsMenu}>
                                Share
                            </MenuItem>
                            {currUserId === uploadedByUser.id && (
                                <MenuItem
                                    onClick={() => {
                                        setUpdateImageOpen(true);
                                        closeOptionsMenu();
                                    }}
                                >
                                    Edit
                                </MenuItem>
                            )}
                        </Menu>

                        <UpdateImageDialog
                            open={updateImageOpen}
                            setOpen={setUpdateImageOpen}
                            slug={image.post.slug}
                        />

                        <CardMedia>
                            <Image
                                src={image.image}
                                alt="Paella dish"
                                width={image.width}
                                height={image.height}
                                style={{ width: '100%', height: 'auto' }}
                                placeholder="blur"
                                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAAC"
                            />
                        </CardMedia>

                        <CardContent>
                            {image.description && (
                                <Linkify
                                    componentDecorator={(
                                        decoratedHref,
                                        decoratedText,
                                        key
                                    ) => (
                                        <Link
                                            key={key}
                                            href={decoratedHref}
                                            rel="noopener noreferrer"
                                        >
                                            {decoratedText}
                                        </Link>
                                    )}
                                >
                                    <Typography
                                        variant="body1"
                                        color="text.primary"
                                    >
                                        {image.description}
                                    </Typography>
                                </Linkify>
                            )}

                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{
                                    textAlign: 'right',
                                }}
                            >
                                Posted{' '}
                                {relativeDate(new Date(image.post.insertedAt))}
                            </Typography>
                        </CardContent>
                    </Card>
                </Box>
            </HomeComponentsWrapper>
        </>
    );
}
