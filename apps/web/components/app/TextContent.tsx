import { ReactNode } from "react";

export default function TextContent(props: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`text-content prose text-gray-200 prose-strong:lg:text-2xl prose-strong:md:text-xl prose-strong:text-lg  prose-invert md:prose-lg lg:prose-xl ${props.className}`}
    >
      {props.children}
    </div>
  );
}
