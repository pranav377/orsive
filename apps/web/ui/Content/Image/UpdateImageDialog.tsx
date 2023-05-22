'use client';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import LoadingButton from '@mui/lab/LoadingButton';
import AddIcon from '@mui/icons-material/Add';
import { Dispatch, SetStateAction, memo } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useMutation, useQuery } from '@apollo/client';
import UPDATE_IMAGE from '@/graphql/mutations/updateImage';
import ImageField from '@/ui/FormFields/ImageField';
import GET_IMAGE from '@/graphql/queries/getImage';
import LoadingComponent from '@/ui/LoadingComponent';
import { useRouter } from 'next/navigation';

export const UPDATE_IMAGE_SCHEMA = yup.object({
    description: yup.string().max(255, 'Description is too long').nullable(),
    image: yup.mixed(),
});

function UpdateImageDialogComponent(props: {
    slug: string;
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}) {
    const { slug, open, setOpen } = props;

    // remove cache
    const imageQuery = useQuery(GET_IMAGE, {
        variables: {
            slug,
        },
        onCompleted(data) {
            if (data.getImage) {
                formik.setFieldValue('description', data.getImage.description);
            }
        },
        skip: !open,
        notifyOnNetworkStatusChange: true,
        fetchPolicy: 'no-cache',
    });
    const router = useRouter();
    const image = imageQuery.data?.getImage;

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('lg'));
    const [updateImage] = useMutation(UPDATE_IMAGE);

    const formik = useFormik({
        initialValues: {
            slug: slug,
            image: undefined,
            description: '',
        },
        validationSchema: UPDATE_IMAGE_SCHEMA,
        onSubmit: (values, helpers) => {
            updateImage({
                variables: values,
            })
                .then((result) => {
                    formik.resetForm();
                    router.refresh();
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
            {imageQuery.loading && <LoadingComponent />}
            {image && (
                <>
                    <DialogTitle id="create-image-dialog-title">
                        {'Update Image'}
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
                                defaultPreviewImage={image.image}
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
                </>
            )}
        </Dialog>
    );
}

const UpdateImageDialog = memo(UpdateImageDialogComponent);
export default UpdateImageDialog;
