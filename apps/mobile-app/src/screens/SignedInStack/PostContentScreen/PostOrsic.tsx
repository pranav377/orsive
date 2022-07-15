import { Tailwind } from "@jeact/colors";
import { useState } from "react";
import { TextInput, View } from "react-native";
import { Text } from "react-native-paper";
import { RFValue } from "react-native-responsive-fontsize";
import { PhotographIcon } from "react-native-heroicons/outline";

interface Block {
  name: "paragraph" | "image";
  value: string;
}

export default function PostOrsic() {
  const [editorState, setEditorState] = useState<Array<Block>>([]);

  return (
    <View style={{ padding: RFValue(5), flex: 1 }}>
      <TextInput
        multiline
        placeholder="Write here"
        placeholderTextColor={Tailwind.gray[400]}
        style={{ color: "white" }}
        autoFocus
        onChangeText={(text) => {
          let allText = text.split(/(\n)/g);
          let allBlocks: Array<Block> = allText.map((oldText) => {
            return {
              name: "paragraph",
              value: oldText,
            };
          });

          setEditorState(allBlocks);
        }}
      >
        {editorState.map((block, idx) => (
          <Text key={idx}>{block.value}</Text>
        ))}
      </TextInput>
      <PhotographIcon color="white" style={{ marginTop: "auto" }} />
    </View>
  );
}
