'use client';
import Box from '@mui/material/Box';
import { GraphQLClient } from '@/app/GraphQLClient';
import EDITOR_IMAGE_UPLOAD from '@/graphql/mutations/editorImageUpload';
import { Editor } from '@tinymce/tinymce-react';
import { useRef, useState } from 'react';
import invariant from 'tiny-invariant';
import colors from '@/technique/colors';
import LoadingComponent from '@/ui/LoadingComponent';

export default function RichEditor(props: {
    setFieldValue: any;
    name: string;
}) {
    const { setFieldValue, name } = props;
    const editorRef = useRef<any>(null);
    const [loading, setLoading] = useState(true);

    return (
        <Box
            sx={{
                height: '60vh',
                overflow: 'hidden',
            }}
        >
            {loading && <RichEditorSkeleton />}
            <Editor
                apiKey={process.env.NEXT_PUBLIC_TINY_API_KEY || 'dummy-api-key'}
                onInit={(evt, editor) => {
                    editorRef.current = editor;
                    setLoading(false);
                }}
                initialValue="<p>Start writing from here.</p>"
                onEditorChange={() => {
                    setFieldValue(name, editorRef.current.getContent());
                }}
                init={{
                    height: '100%',
                    menubar: false,
                    plugins: ['image', 'link'],
                    toolbar: 'bold link image | blocks',
                    contextmenu: false,
                    block_formats:
                        'Paragraph=p; Header 1=h1; Header 2=h2; Header 3=h3',
                    content_style: `
            ::-webkit-scrollbar {
              width: 0.2rem;
            }
            
            ::-webkit-scrollbar-track {
              background: #0f172a;
            }
            
            ::-webkit-scrollbar-thumb {
              background: #2563eb;
            }

            img {
              max-width: 100%;
            }
            `,
                    skin: 'oxide-dark',
                    content_css: 'dark',

                    file_picker_types: 'image',
                    image_dimensions: false,
                    images_upload_handler: async (blobInfo) =>
                        new Promise((resolve, reject) => {
                            let image = blobInfo.blob();

                            GraphQLClient.mutate({
                                mutation: EDITOR_IMAGE_UPLOAD,
                                variables: {
                                    image,
                                },
                            })
                                .then((data) => {
                                    invariant(data.data?.editorImageUpload);
                                    resolve(
                                        data.data.editorImageUpload['file']
                                    );
                                })
                                .catch(() => {
                                    reject({
                                        message: 'An error occurred',
                                        remove: true,
                                    });
                                });
                        }),
                }}
            />
        </Box>
    );
}

function RichEditorSkeleton() {
    return (
        <Box
            sx={{
                height: '100%',
                backgroundColor: colors.slate[900],
                borderRadius: 2,
            }}
        >
            <LoadingComponent />
        </Box>
    );
}
