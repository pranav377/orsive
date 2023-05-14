'use client';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ImageIcon from '@mui/icons-material/Image';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import useAnimate from '@/hooks/new/useAnimate';

export default function ImageField(props: {
    setFieldValue: any;
    name: string;
}) {
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const { animate } = useAnimate();

    return (
        <div
            style={{
                position: 'relative',
            }}
        >
            <label>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Box
                        sx={{
                            my: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: 300,
                            width: 400,
                            p: 1,
                            backgroundImage: previewImage
                                ? undefined
                                : `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='24' ry='24' stroke='white' stroke-width='7' stroke-dasharray='20' stroke-dashoffset='0' stroke-linecap='butt'/%3e%3c/svg%3e")`,
                            borderRadius: 2,
                        }}
                    >
                        {previewImage ? (
                            <>
                                <img
                                    style={{
                                        height: '100%',
                                        width: 'auto',
                                        objectFit: 'cover',
                                    }}
                                    src={previewImage}
                                    alt="user selected image"
                                />
                            </>
                        ) : (
                            <>
                                <ImageIcon
                                    sx={{
                                        height: '25%',
                                        width: '25%',
                                    }}
                                />
                                Select an Image
                            </>
                        )}
                    </Box>
                </Box>
                <input
                    type="file"
                    accept="image/*"
                    style={{
                        display: 'none',
                    }}
                    onChange={(event: any) => {
                        animate(() => {
                            const [file] = event.target.files;
                            props.setFieldValue(props.name, file);
                            if (file) {
                                setPreviewImage(URL.createObjectURL(file));
                            }
                        });
                    }}
                />
            </label>
            {previewImage && (
                <IconButton
                    sx={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                    }}
                    onClick={() => {
                        animate(() => {
                            setPreviewImage(null);
                            props.setFieldValue(props.name, null);
                        });
                    }}
                >
                    <CloseIcon></CloseIcon>
                </IconButton>
            )}
        </div>
    );
}
