'use client';
import { Editor } from '@tinymce/tinymce-react';
import { useRef } from 'react';

export default function RichEditor() {
    const editorRef = useRef<Editor | null>(null);

    return (
        <>
            <Editor
                apiKey="your-api-key"
                onInit={(evt, editor) => (editorRef.current = editor)}
                initialValue="<p>This is the initial content of the editor.</p>"
                init={{
                    height: '60vh',
                    menubar: false,
                    plugins: ['image', 'link'],
                    toolbar: 'undo redo bold link image | blocks',
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
                }}
            />
        </>
    );
}
