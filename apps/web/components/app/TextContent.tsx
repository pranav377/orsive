import { ReactNode } from 'react';

export default function TextContent(props: {
    children: ReactNode;
    className?: string;
}) {
    return (
        <div
            className={`text-content prose prose-invert prose-strong:text-lg md:prose-lg prose-strong:md:text-xl  lg:prose-xl prose-strong:lg:text-2xl text-gray-200 ${props.className}`}
        >
            {props.children}
        </div>
    );
}
