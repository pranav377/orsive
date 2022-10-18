import { PhotographIcon, XIcon } from "@heroicons/react/solid";
import { useRef, useState } from "react";

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
    <div className="flex justify-center mt-8">
      <div className={"rounded-lg shadow-xl bg-slate-800 w-full"}>
        <div className={"m-4"}>
          <label className="inline-block mb-2 text-gray-200">
            {props.label}
          </label>
          <div
            className={`flex items-center justify-center w-full ${
              previewImage ? "hidden" : "block"
            }`}
          >
            <label className="flex flex-col w-full h-32 border-4 border-dashed">
              <div className="flex flex-col items-center justify-center pt-7">
                <PhotographIcon className="w-12 h-12 text-gray-400 " />
                <p className="pt-1 text-sm tracking-wider text-gray-400">
                  Select a photo
                </p>
              </div>
              <input
                onChange={(event: any) => {
                  const [file] = event.target.files;
                  props.setFieldValue(props.name, file);
                  if (file) {
                    setPreviewImage(URL.createObjectURL(file));
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
            <p className="text-red-600 text-sm font-medium">
              {props.errors[props.name]}
            </p>
          )}
        </div>
        <div
          className={`p-2 flex flex-col items-center ${
            previewImage ? "opacity-100" : "opacity-0"
          }`}
        >
          <XIcon
            onClick={() => {
              setPreviewImage(null);
              props.setFieldValue(props.name, null);
              if (inputField.current) {
                inputField.current.value = "";
              }
            }}
            className={`w-7 h-7 ${
              previewImage && "cursor-pointer"
            } self-end m-2`}
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
  imageClassname: "",
};
