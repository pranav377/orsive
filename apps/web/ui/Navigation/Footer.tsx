import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function Footer(props: { fixed?: boolean }) {
    return (
        <>
            <Box
                sx={{
                    width: '100%',
                    border: 0,
                    ...(props.fixed && {
                        position: 'fixed',
                        bottom: 0,
                    }),
                }}
                component="footer"
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: 2,
                        mt: 4,
                    }}
                >
                    <Button
                        color="whitegrey"
                        sx={{
                            textTransform: 'none',
                        }}
                    >
                        Terms of Service
                    </Button>
                    <Button
                        color="whitegrey"
                        sx={{
                            textTransform: 'none',
                        }}
                    >
                        Privacy
                    </Button>
                    <Button
                        color="whitegrey"
                        sx={{
                            textTransform: 'none',
                        }}
                    >
                        GitHub
                    </Button>
                </Box>
                <Container
                    maxWidth="lg"
                    sx={{
                        textAlign: 'center',
                        padding: 2,
                    }}
                >
                    <Typography variant="caption">
                        Copyright ©2023 - Orsive
                    </Typography>
                </Container>
            </Box>
        </>
    );
}
