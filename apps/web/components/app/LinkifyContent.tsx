import React from "react";
import Link from "next/link";
import Linkify from "react-linkify";

export default function LinkifyContent(props: { children: React.ReactNode }) {
  return (
    <>
      <Linkify
        componentDecorator={(decoratedHref, decoratedText, key) => (
          <Link key={key} href={decoratedHref} passHref>
            <a
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-700"
            >
              {decoratedText}
            </a>
          </Link>
        )}
      >
        {props.children}
      </Linkify>
    </>
  );
}

export function NotificationLinkifyContent(props: { children: any }) {
  return (
    <>
      <Linkify
        componentDecorator={(decoratedHref, decoratedText, key) => (
          <Link key={key} href={decoratedHref} passHref>
            <a
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-700"
            >
              <p className="w-2/4 whitespace-nowrap overflow-hidden text-ellipsis">
                {decoratedText}
              </p>
            </a>
          </Link>
        )}
      >
        {props.children}
      </Linkify>
    </>
  );
}
