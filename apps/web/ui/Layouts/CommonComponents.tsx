'use client';

import * as yup from 'yup';
import { useTheme } from '@mui/material';
import colors from '@/technique/colors';
import { useFormik } from 'formik';
import ImageField from '@/ui/FormFields/ImageField';
import { useMutation } from '@apollo/client';
import CREATE_IMAGE from '@/graphql/mutations/createImage';
import invariant from 'tiny-invariant';

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
import RichEditor from '@/ui/FormFields/RichEditor';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import ImageIcon from '@mui/icons-material/Image';
import OrsicIcon from '@mui/icons-material/Feed';
import { Dispatch, SetStateAction, useState } from 'react';
import { useRouter } from 'next/navigation';
import CREATE_ORSIC from '@/graphql/mutations/createOrsic';

const actions = [
    { icon: <ImageIcon />, name: 'Image' },
    { icon: <OrsicIcon />, name: 'Orsic' },
];

export default function CommonComponents() {
    return (
        <>
            <CreatePosts />
        </>
    );
}

function CreatePosts() {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('lg'));
    const [createImageOpen, setCreateImageOpen] = useState(false);
    const [createOrsicOpen, setCreateOrsicOpen] = useState(false);

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
                            console.log(action);
                            if (action.name === 'Image') {
                                setCreateImageOpen(true);
                            } else if (action.name === 'Orsic') {
                                setCreateOrsicOpen(true);
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

            <CreateOrsicDialog
                fullScreen={fullScreen}
                open={createOrsicOpen}
                setOpen={setCreateOrsicOpen}
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
    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            image: null,
            description: undefined,
        },
        validationSchema: POST_IMAGE_SCHEMA,
        onSubmit: (values, helpers) => {
            createImage({
                variables: values,
            })
                .then((result) => {
                    invariant(result.data?.createImage);
                    const imagePost = result.data.createImage.post;
                    router.push(`/image/${imagePost.slug}`);
                    formik.resetForm();
                    setOpen(false);
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
                {'Post an Image'}
                <IconButton
                    aria-label="close"
                    onClick={() => setOpen(false)}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
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
                        sx={{
                            mt: 1,
                            maxWidth: (theme) => theme.spacing(96),
                            display: 'block',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                        }}
                        fullWidth
                        label="Description (optional)"
                        name="description"
                        variant="outlined"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                            formik.touched.description &&
                            Boolean(formik.errors.description)
                        }
                        helperText={
                            formik.touched.description &&
                            formik.errors.description
                        }
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

export const POST_ORSIC_SCHEMA = yup.object({
    content: yup.string().required('Content is required'),
});

function CreateOrsicDialog(props: {
    fullScreen: boolean;
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}) {
    const { fullScreen, open, setOpen } = props;

    const [createOrsic] = useMutation(CREATE_ORSIC);
    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            content: '<p>Start Writing from here.</p>',
        },
        validationSchema: POST_ORSIC_SCHEMA,
        onSubmit: (values, helpers) => {
            createOrsic({
                variables: values,
            }).then((result) => {
                invariant(result.data?.createOrsic);
                const orsicPost = result.data.createOrsic.post;
                router.push(`/orsic/${orsicPost.slug}`);
            });
            helpers.setSubmitting(false);
        },
    });

    return (
        <Dialog
            fullScreen={fullScreen}
            fullWidth={true}
            maxWidth={'md'}
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="create-image-dialog-title"
        >
            <DialogTitle id="create-image-dialog-title">
                {'Post an Orsic'}
                <IconButton
                    aria-label="close"
                    onClick={() => setOpen(false)}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent sx={{ p: 1 }}>
                <form
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <RichEditor
                        name="content"
                        setFieldValue={formik.setFieldValue}
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
