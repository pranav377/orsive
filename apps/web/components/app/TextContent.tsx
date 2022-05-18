import { ReactNode } from "react";

export default function TextContent(props: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`text-content prose text-gray-100 prose-a:text-blue-600 prose-invert md:prose-lg lg:prose-xl ${props.className}`}
    >
      {props.children}
    </div>
  );
}
