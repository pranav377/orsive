import React, { DetailedHTMLProps, ButtonHTMLAttributes } from "react";

interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: React.ReactNode;
  darkText?: Boolean;
}

export default function Button(props: ButtonProps) {
  const { className, children, ...rest } = props;

  return (
    <>
      <button
        {...rest}
        className={`${
          props.darkText ? "text-gray-600" : "text-white"
        } font-medium p-2 rounded-md disabled:bg-gray-500 ${className}`}
      >
        {children}
      </button>
    </>
  );
}
