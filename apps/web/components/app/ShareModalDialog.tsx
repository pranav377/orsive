import ModalDialog from "./Dialog";
import { ShareIcon } from "@heroicons/react/solid";

import {
  FacebookShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";

import {
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  WhatsappIcon,
  TelegramIcon,
} from "react-share";

export default function ShareModal(props: {
  shareOpen: boolean;
  setShareOpen: any;
  url: string;
}) {
  const postUrl = `${process.env.NEXT_PUBLIC_SITE_URL}${props.url}`;
  return (
    <>
      <ModalDialog
        open={props.shareOpen}
        setOpen={props.setShareOpen}
        icon={
          <ShareIcon className="h-6 w-6 text-blue-600" aria-hidden="true" />
        }
        content={
          <>
            <div className="flex gap-1">
              <TwitterShareButton url={postUrl}>
                <TwitterIcon round className="w-12" />
              </TwitterShareButton>
              <LinkedinShareButton url={postUrl}>
                <LinkedinIcon round className="w-12" />
              </LinkedinShareButton>
              <FacebookShareButton url={postUrl}>
                <FacebookIcon round className="w-12" />
              </FacebookShareButton>
              <WhatsappShareButton url={postUrl}>
                <WhatsappIcon round className="w-12" />
              </WhatsappShareButton>
              <TelegramShareButton url={postUrl}>
                <TelegramIcon round className="w-12" />
              </TelegramShareButton>
            </div>
            <div className="flex justify-center">
              <div className="mt-3 w-full">
                <input
                  type="text"
                  className="
        form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-gray-100 bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        overflow-x-scroll
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
      "
                  value={postUrl}
                  readOnly
                />
              </div>
            </div>
          </>
        }
        heading="Spread the love💖"
      />
    </>
  );
}
