'use client';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ImageIcon from '@mui/icons-material/Image';
import CloseIcon from '@mui/icons-material/Close';
import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { SUPPORTED_IMAGE_EXTENSIONS } from '@/config';

export default function ImageField(props: {
    setFieldValue: any;
    name: string;
    defaultPreviewImage?: string;
}) {
    const { setFieldValue, name, defaultPreviewImage } = props;
    const [previewImage, setPreviewImage] = useState<string | null>(
        defaultPreviewImage ? defaultPreviewImage : null
    );
    const fileInputRef = useRef<HTMLInputElement>(null);

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
                                <motion.img
                                    style={{
                                        height: '100%',
                                        width: 'auto',
                                        objectFit: 'cover',
                                    }}
                                    src={previewImage}
                                    alt="user selected image"
                                    initial={{
                                        opacity: 0,
                                    }}
                                    animate={{
                                        opacity: 1,
                                    }}
                                    exit={{
                                        opacity: 0,
                                    }}
                                />
                            </>
                        ) : (
                            <motion.div
                                initial={{
                                    opacity: 0,
                                }}
                                animate={{
                                    opacity: 1,
                                }}
                                exit={{
                                    opacity: 0,
                                }}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    height: '100%',
                                    width: '100%',
                                }}
                            >
                                <ImageIcon
                                    sx={{
                                        height: '25%',
                                        width: '25%',
                                    }}
                                />
                                Select an Image
                            </motion.div>
                        )}
                    </Box>
                </Box>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept={SUPPORTED_IMAGE_EXTENSIONS}
                    style={{
                        display: 'none',
                    }}
                    onChange={(event: any) => {
                        const [file] = event.target.files;
                        setFieldValue(name, file);
                        if (file) {
                            setPreviewImage(URL.createObjectURL(file));
                        }
                    }}
                />
            </label>
            {previewImage && (
                <motion.div
                    initial={{
                        opacity: 0,
                    }}
                    animate={{
                        opacity: 1,
                    }}
                    exit={{
                        opacity: 0,
                    }}
                    style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                    }}
                >
                    <IconButton
                        onClick={() => {
                            setPreviewImage(null);
                            setFieldValue(name, null);
                            if (fileInputRef.current) {
                                fileInputRef.current.value = '';
                            }
                        }}
                    >
                        <CloseIcon></CloseIcon>
                    </IconButton>
                </motion.div>
            )}
        </div>
    );
}
