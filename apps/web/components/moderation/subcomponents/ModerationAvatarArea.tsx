import Image from 'next/image';
import Link from 'next/link';
import { UploadedBy } from '../../app/types';

export default function ModerationAvatarArea(props: {
    uploadedBy: UploadedBy;
}) {
    return (
        <div className=" relative flex w-full p-4">
            <Image
                src={props.uploadedBy.avatar}
                alt={props.uploadedBy.username}
                height={48}
                width={48}
                className="rounded-full"
                objectFit="cover"
                objectPosition="center"
                priority
            />
            <div className="ml-2 flex w-10/12 flex-col text-sm md:text-base">
                <p className="font-semibold">{props.uploadedBy.name}</p>
                <Link
                    href={`/${props.uploadedBy.username}`}
                    passHref
                    className="w-fit"
                >
                    <span className="font-normal text-gray-300 hover:underline">
                        ${props.uploadedBy.username}
                    </span>
                </Link>
            </div>
            <span
                style={{ minWidth: '2rem', maxWidth: '3rem' }}
                className="w-1/12"
            >
                {/* <Options
          canEdit={props.canEdit}
          url={props.url}
          delete={props.delete}
          uploadedByUsername={props.uploadedBy.username}
          postId={props.postId}
        /> */}
            </span>
        </div>
    );
}
