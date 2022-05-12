import React from "react";

export default function PostCards(props: { children: React.ReactNode }) {
  return (
    <div
      aria-label="group of cards"
      tabIndex={0}
      className="focus:outline-none py-8 w-full p-2"
    >
      {props.children}
    </div>
  );
}
