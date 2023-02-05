import React from 'react';

export default function PostCards(props: { children: React.ReactNode }) {
    return (
        <div
            aria-label="group of cards"
            tabIndex={0}
            className="w-full p-2 py-8 focus:outline-none"
        >
            {props.children}
        </div>
    );
}
