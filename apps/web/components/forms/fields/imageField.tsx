import { PhotographIcon, XIcon } from '@heroicons/react/solid';
import { useRef, useState } from 'react';

export default function ImageField(props: {
    errors: any;
    setFieldValue: any;
    name: string;
    label: string;
    previewImage: string | null;
    imageClassname: string;
}) {
    let inputField = useRef<HTMLInputElement>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(
        props.previewImage
    );

    return (
        <div className="mt-8 flex justify-center">
            <div className={'w-full rounded-lg bg-slate-800 shadow-xl'}>
                <div className={'m-4'}>
                    <label className="mb-2 inline-block text-gray-200">
                        {props.label}
                    </label>
                    <div
                        className={`flex w-full items-center justify-center ${
                            previewImage ? 'hidden' : 'block'
                        }`}
                    >
                        <label className="flex h-32 w-full flex-col border-4 border-dashed">
                            <div className="flex flex-col items-center justify-center pt-7">
                                <PhotographIcon className="h-12 w-12 text-gray-400 " />
                                <p className="pt-1 text-sm tracking-wider text-gray-400">
                                    Select a photo
                                </p>
                            </div>
                            <input
                                onChange={(event: any) => {
                                    const [file] = event.target.files;
                                    props.setFieldValue(props.name, file);
                                    if (file) {
                                        setPreviewImage(
                                            URL.createObjectURL(file)
                                        );
                                    }
                                }}
                                ref={inputField}
                                type="file"
                                accept="image/*"
                                className="opacity-0"
                            />
                        </label>
                    </div>
                    {props.errors[props.name] && (
                        <p className="text-sm font-medium text-red-600">
                            {props.errors[props.name]}
                        </p>
                    )}
                </div>
                <div
                    className={`flex flex-col items-center p-2 ${
                        previewImage ? 'opacity-100' : 'opacity-0'
                    }`}
                >
                    <XIcon
                        onClick={() => {
                            setPreviewImage(null);
                            props.setFieldValue(props.name, null);
                            if (inputField.current) {
                                inputField.current.value = '';
                            }
                        }}
                        className={`h-7 w-7 ${
                            previewImage && 'cursor-pointer'
                        } m-2 self-end`}
                    />
                    <img
                        alt={props.name}
                        className={props.imageClassname}
                        src={previewImage!}
                    />
                </div>
            </div>
        </div>
    );
}

ImageField.defaultProps = {
    previewImage: null,
    imageClassname: '',
};
