'use client';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import colors from '@/logic/colors';
import Image from 'next/image';
import { useTheme } from '@mui/material/styles';

export default function ImagePostCard() {
    const theme = useTheme();

    return (
        <>
            <Card
                raised
                sx={{
                    maxWidth: theme.spacing(96),
                    width: '100%',
                    borderRadius: 2,
                    backgroundColor: colors.slate[900],
                }}
            >
                <CardHeader
                    avatar={
                        <Avatar
                            sx={{ bgcolor: colors.red[500] }}
                            aria-label="recipe"
                        >
                            R
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title="Shrimp and Chorizo Paella"
                    subheader="September 14, 2016"
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
                    />
                </CardMedia>

                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        This impressive paella is a perfect party dish and a fun
                        meal to cook together with your guests. Add 1 cup of
                        frozen peas along with the mussels, if you like.
                    </Typography>
                </CardContent>
            </Card>
        </>
    );
}
