'use client';

import { BubbleMenu, EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

export default function RichEditor() {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [1, 2],
                },
            }),
        ],
        content: '<p>Hello World! 🌎️</p>',
        autofocus: true,
    });

    return (
        <>
            {editor && (
                <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
                    <button
                        onClick={() =>
                            editor.chain().focus().toggleBold().run()
                        }
                        className={editor.isActive('bold') ? 'is-active' : ''}
                    >
                        bold
                    </button>
                    <button
                        onClick={() =>
                            editor.chain().focus().toggleItalic().run()
                        }
                        className={editor.isActive('italic') ? 'is-active' : ''}
                    >
                        italic
                    </button>
                    <button
                        onClick={() =>
                            editor.chain().focus().toggleStrike().run()
                        }
                        className={editor.isActive('strike') ? 'is-active' : ''}
                    >
                        strike
                    </button>
                </BubbleMenu>
            )}
            <EditorContent editor={editor} />
        </>
    );
}
