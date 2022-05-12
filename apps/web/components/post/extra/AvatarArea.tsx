import { UploadedBy } from "../../app/types";
import Link from "next/link";
import Options from "./Options";

export default function AvatarArea(props: {
  uploadedBy: UploadedBy;
  delete: () => Promise<any>;
}) {
  return (
    <div className=" p-4 w-full flex relative">
      <img
        style={{
          minWidth: "2rem",
        }}
        src={props.uploadedBy.avatar}
        className="flex rounded-full object-cover object-center w-1/12"
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
          delete={props.delete}
          uploadedByUsername={props.uploadedBy.username}
        />
      </span>
    </div>
  );
}
