import { UploadedBy } from '../../app/types';
import Link from 'next/link';
import Options from './Options';
import Image from 'next/image';

export default function AvatarArea(props: {
    uploadedBy: UploadedBy;
    delete: () => Promise<any>;
    url: string;
    canEdit?: boolean;
    postId: string;
}) {
    return (
        <div className=" relative flex w-full p-2">
            <div className="relative h-12 w-12 ">
                <Image
                    alt={props.uploadedBy.username}
                    src={props.uploadedBy.avatar}
                    fill
                    className="rounded-full object-cover object-center"
                    priority
                />
            </div>
            <div className="ml-2 flex w-10/12 flex-col text-sm md:text-base">
                <p className="font-semibold">{props.uploadedBy.name}</p>
                <Link href={`/${props.uploadedBy.username}`} className="w-fit">
                    <span className="font-normal text-gray-300 hover:underline">
                        ${props.uploadedBy.username}
                    </span>
                </Link>
            </div>
            <span
                style={{ minWidth: '2rem', maxWidth: '3rem' }}
                className="w-1/12"
            >
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
