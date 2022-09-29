import { Tailwind } from "@jeact/colors";
import { KeyboardAvoidingView, View } from "react-native";
import { RichEditor } from "react-native-pell-rich-editor";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { RootState } from "../../../store";
import { PostContentActions } from "../../../store/slices/PostContent/postContentSlice";

export default function PostOrsic(props: {
  editor: React.RefObject<RichEditor>;
}) {
  const dispatch = useDispatch();
  const orsicContent = useSelector(
    (state: RootState) => state.postContent.orsic
  );

  return (
    <KeyboardAvoidingView behavior={"height"} style={{ flex: 1 }}>
      <RichEditor
        disabled={false}
        editorStyle={{
          backgroundColor: "black",
          color: "white",
          placeholderColor: Tailwind.gray[400],
        }}
        ref={props.editor}
        style={{
          flex: 1,
        }}
        onChange={(text) => {
          dispatch(
            PostContentActions.setOrsic({
              content: text,
            })
          );
        }}
        placeholder={"What do you think?"}
        pasteAsPlainText={true}
        initialContentHTML={orsicContent.content}
        initialFocus
      />
    </KeyboardAvoidingView>
  );
}
