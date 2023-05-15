'use client';

import Navbar from '@/ui/Navigation/Navbar';
import BottomBar from '@/ui/Navigation/BottomBar';
import SideBar, { drawerWidth } from '@/ui/Navigation/SideBar';
import Box from '@mui/material/Box';

import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import AddIcon from '@mui/icons-material/Add';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import useMediaQuery from '@mui/material/useMediaQuery';
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';
import TextField from '@mui/material/TextField';

import ImageIcon from '@mui/icons-material/Image';
import OrsicIcon from '@mui/icons-material/Feed';
import * as yup from 'yup';
import { useTheme } from '@mui/material';
import colors from '@/technique/colors';
import { Dispatch, SetStateAction, useState } from 'react';
import { useFormik } from 'formik';
import ImageField from '@/ui/FormFields/ImageField';
import { useMutation } from '@apollo/client';
import CREATE_IMAGE from '@/graphql/mutations/createImage';

const actions = [
    { icon: <ImageIcon />, name: 'Image' },
    { icon: <OrsicIcon />, name: 'Orsic' },
];

export default function HomeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Navbar />
            <SideBar />
            <Box
                sx={{
                    marginLeft: {
                        xs: 0,
                        lg: `${drawerWidth}px`,
                    },
                    position: 'relative',
                    height: '100%',
                    paddingTop: (theme) =>
                        (theme.mixins.toolbar.minHeight as number) / 7.5,
                }}
            >
                {children}
            </Box>
            <CreatePosts />
            <BottomBar />
        </>
    );
}

function CreatePosts() {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [createImageOpen, setCreateImageOpen] = useState(false);

    return (
        <>
            <SpeedDial
                ariaLabel="Create Posts"
                sx={{
                    position: 'fixed',
                    right: '50%',
                    transform: 'translateX(50%)',
                    bottom: 64,
                    [theme.breakpoints.up('lg')]: {
                        right: 32,
                        bottom: 32,
                        transform: 'none',
                    },
                }}
                icon={<SpeedDialIcon />}
                direction="up"
            >
                {actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        tooltipOpen
                        TooltipClasses={{
                            tooltip: 'red',
                        }}
                        onClick={() => {
                            if (action.name === 'Image') {
                                setCreateImageOpen(true);
                            }
                        }}
                        FabProps={{
                            sx: {
                                bgcolor: colors.slate[800],
                                '&:hover': {
                                    bgcolor: colors.slate[800],
                                },
                            },
                        }}
                    />
                ))}
            </SpeedDial>

            <CreateImageDialog
                fullScreen={fullScreen}
                open={createImageOpen}
                setOpen={setCreateImageOpen}
            />
        </>
    );
}

export const POST_IMAGE_SCHEMA = yup.object({
    description: yup.string().max(255, 'Description is too long'),
    image: yup.mixed().required('Image is required'),
});

function CreateImageDialog(props: {
    fullScreen: boolean;
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}) {
    const { fullScreen, open, setOpen } = props;
    const [createImage] = useMutation(CREATE_IMAGE);

    const formik = useFormik({
        initialValues: {
            image: null,
        },
        validationSchema: POST_IMAGE_SCHEMA,
        onSubmit: (values, helpers) => {
            createImage({
                variables: values,
            })
                .then((result) => {
                    console.log(result.data);
                })
                .finally(() => helpers.setSubmitting(false));
        },
    });

    return (
        <Dialog
            fullScreen={fullScreen}
            fullWidth={true}
            maxWidth={'sm'}
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="create-image-dialog-title"
        >
            <DialogTitle id="create-image-dialog-title">
                {'Post an image'}
            </DialogTitle>
            <DialogContent sx={{ p: 1 }}>
                <form
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <ImageField
                        setFieldValue={formik.setFieldValue}
                        name="image"
                    />
                    <TextField
                        sx={{ mt: 1 }}
                        label="Description (optional)"
                        name="description"
                        variant="outlined"
                    />
                </form>
            </DialogContent>
            <DialogActions>
                <LoadingButton
                    onClick={() => formik.submitForm()}
                    variant="contained"
                    startIcon={<AddIcon />}
                    loading={formik.isSubmitting}
                    disabled={formik.isSubmitting}
                >
                    Post
                </LoadingButton>
            </DialogActions>
        </Dialog>
    );
}
