import { useRichTextEditor } from "../../hooks/app/useRichTextEditor";
import { Editor } from "@tinymce/tinymce-react";
import Spinner from "./Spinner";
import { client } from "../../pages/_app";
import EDITOR_IMAGE_UPLOAD_MUTATION from "../../app/editor/editorImageUploadMutation";
import parse, { HTMLReactParserOptions, Element } from "html-react-parser";
import { renderToString } from "react-dom/server";

export default function RichEditor(props: {
  value: string;
  initialValue?: string;
  onChange: (data: string) => void;
  darkBg?: boolean;
}) {
  const { editorInstance, loading, setLoading } = useRichTextEditor(
    props.onChange
  );

  return (
    <>
      <div className="overflow-hidden h-[60vh]">
        {loading && <RichEditorSkeleton dark={props.darkBg} />}
        <Editor
          apiKey={process.env.NEXT_PUBLIC_TINY_API_KEY}
          onInit={(evt, editor) => {
            editorInstance.current = editor;
            setLoading(false);
          }}
          initialValue={props.initialValue}
          onChange={() => {
            props.onChange(editorInstance.current.getContent());
          }}
          init={{
            height: "60vh",
            menubar: false,
            plugins: ["image", "link"],
            toolbar: "undo redo bold link image | blocks",
            contextmenu: false,
            block_formats: "Paragraph=p; Header 1=h1; Header 2=h2; Header 3=h3",
            content_style: `
            ::-webkit-scrollbar {
              width: 0.2rem;
            }
            
            ::-webkit-scrollbar-track {
              background: #0f172a;
            }
            
            ::-webkit-scrollbar-thumb {
              background: #2563eb;
            }

            img {
              max-width: 100%;
            }
            `,
            skin: "oxide-dark",
            content_css: "dark",

            // image upload handling
            file_picker_types: "image",
            image_dimensions: false,
            images_upload_handler: async (blobInfo) =>
              new Promise((resolve, reject) => {
                let file = blobInfo.blob();

                client
                  .mutate({
                    mutation: EDITOR_IMAGE_UPLOAD_MUTATION,
                    variables: {
                      file,
                    },
                  })
                  .then((data) => {
                    resolve(data.data.editorImageUpload["file"]);
                  })
                  .catch(() => {
                    reject({ message: "An error occurred", remove: true });
                  });
              }),
          }}
        />
      </div>
    </>
  );
}

export function RichEditorSkeleton(props: { dark?: boolean }) {
  return (
    <div
      className={`rounded-lg ${
        props.dark ? "bg-slate-900" : "bg-slate-800"
      } bg-slate-800 flex items-center justify-center`}
      style={{ minHeight: "60vh" }}
    >
      <Spinner />
    </div>
  );
}

const contentParserOptions: HTMLReactParserOptions = {
  replace: (domNode) => {
    if (domNode instanceof Element && domNode.attribs) {
      if (domNode.tagName === "img") {
        let src = domNode.attribs.src;
        return <img src={src} />;
      }
    }
  },
};

export function RichEditorContentParser(html: string) {
  // @ts-ignore
  return renderToString(parse(html, contentParserOptions));
}
