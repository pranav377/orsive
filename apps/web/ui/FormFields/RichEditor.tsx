'use client';
import { GraphQLClient } from '@/app/GraphQLClient';
import EDITOR_IMAGE_UPLOAD from '@/graphql/mutations/editorImageUpload';
import { Editor } from '@tinymce/tinymce-react';
import { useRef } from 'react';
import invariant from 'tiny-invariant';

export default function RichEditor(props: {
    setFieldValue: any;
    name: string;
}) {
    const { setFieldValue, name } = props;
    const editorRef = useRef<any>(null);

    return (
        <>
            <Editor
                apiKey={process.env.NEXT_PUBLIC_TINY_API_KEY || 'dummy-api-key'}
                onInit={(evt, editor) => (editorRef.current = editor)}
                initialValue="<p>Start writing from here.</p>"
                onEditorChange={() => {
                    setFieldValue(name, editorRef.current.getContent());
                }}
                init={{
                    height: '60vh',
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
        </>
    );
}
