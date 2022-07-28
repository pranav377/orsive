import { useRef } from "react";
import { RichEditor } from "react-native-pell-rich-editor";

export default function PostOrsic() {
  const editor = useRef<RichEditor>(null);

  return (
    <>
      <RichEditor
        disabled={false}
        editorStyle={{
          backgroundColor: "black",
          color: "white",
          placeholderColor: "white",
        }}
        ref={editor}
        style={{
          minHeight: 300,
          flex: 1,
        }}
        initialHeight={400}
        placeholder={"What do you think?"}
        pasteAsPlainText={true}
      />
    </>
  );
}
