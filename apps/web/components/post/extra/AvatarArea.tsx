import { UploadedBy } from "../../app/types";
import Link from "next/link";
import Options from "./Options";
import Image from "next/image";

export default function AvatarArea(props: {
  uploadedBy: UploadedBy;
  delete: () => Promise<any>;
  url: string;
  canEdit?: boolean;
  postId: string;
}) {
  return (
    <div className=" p-4 w-full flex relative">
      <Image
        src={props.uploadedBy.avatar}
        height={48}
        width={48}
        className="rounded-full"
        objectFit="cover"
        objectPosition="center"
        priority
      />
      <div className="flex flex-col ml-2 w-10/12 text-sm md:text-base">
        <p className="font-semibold">{props.uploadedBy.name}</p>
        <Link href={`/${props.uploadedBy.username}`} passHref>
          <a className="w-fit">
            <span className="font-normal text-gray-300 hover:underline">
              ${props.uploadedBy.username}
            </span>
          </a>
        </Link>
      </div>
      <span style={{ minWidth: "2rem", maxWidth: "3rem" }} className="w-1/12">
        <Options
          canEdit={props.canEdit}
          url={props.url}
          delete={props.delete}
          uploadedByUsername={props.uploadedBy.username}
          postId={props.postId}
        />
      </span>
    </div>
  );
}
