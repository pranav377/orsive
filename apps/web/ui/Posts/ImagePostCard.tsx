'use client';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import colors from '@/technique/colors';
import Image from 'next/image';
import { useTheme } from '@mui/material/styles';
import Linkify from 'react-linkify';
import Link from 'next/link';

export default function ImagePostCard() {
    const theme = useTheme();

    return (
        <>
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
                        <Avatar aria-label="Pranava Mohan (pranav377)">
                            <Image
                                src="https://cdn.orsive.com/avatars/6R-L4VXiYH-FnrBsSCCXR-20220520_200235.jpg"
                                alt="Pranava Mohan (pranav377)"
                                fill
                            />
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title="Pranava Mohan"
                    subheader="@pranav377"
                />

                <CardMedia>
                    <Image
                        src={
                            'https://cdn.orsive.com/images/zmhOcqdZ4bdx-B1BxMD-u-P_20221218_120632.jpg'
                        }
                        alt="Paella dish"
                        width={4556}
                        height={2010}
                        style={{ width: '100%', height: 'auto' }}
                        placeholder="blur"
                        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAAC"
                    />
                </CardMedia>

                <CardContent>
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
                        {/* <Typography variant="body1" color="text.secondary">
                            Aur Kya, https://www.youtube.com/watch?v=Z1xYQZ5wGgk
                        </Typography> */}
                    </Linkify>
                    {/* <Link href="/chat">Chat</Link> */}
                </CardContent>
            </Card>
        </>
    );
}
