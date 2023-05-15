'use client';
import colors from '@/technique/colors';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBackIosRounded';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/navigation';
import HomeComponentsWrapper from '@/ui/HomeComponentsWrapper';

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
        </HomeComponentsWrapper>
    );
}
