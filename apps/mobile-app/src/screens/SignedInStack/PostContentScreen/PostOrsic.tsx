import { Tailwind } from "@jeact/colors";
import { useState } from "react";
import { Image, TextInput, View } from "react-native";
import { Text } from "react-native-paper";
import { RFValue } from "react-native-responsive-fontsize";
import { PhotographIcon } from "react-native-heroicons/solid";
import * as ImagePicker from "expo-image-picker";

interface Block {
  name: "paragraph" | "image";
  value: string;
  number: number;
  data?: any;
}

export default function PostOrsic() {
  const [allEditorBlocks, setEditorBlocks] = useState<Array<Block>>([]);
  const [lastIndex, setLastIndex] = useState(0);

  return (
    <View style={{ padding: RFValue(5), flex: 1 }}>
      <TextInput
        multiline
        placeholder="Write here"
        placeholderTextColor={Tailwind.gray[400]}
        style={{ color: "white" }}
        autoFocus
        onChangeText={(text) => {
          let allBlocks: Array<Block> = [];
          let allText = text.split(/(\n)/g);

          allText.map((oldText) => {
            setLastIndex((prevIndex) => {
              allBlocks.push({
                name: "paragraph",
                value: oldText,
                number: prevIndex + 1,
              });

              return prevIndex + 1;
            });
          });

          setEditorBlocks(allBlocks);
        }}
      >
        {allEditorBlocks.map((block, idx) => {
          return (
            <Text key={idx} style={{ color: "white" }}>
              {block.value}
            </Text>
          );
        })}
      </TextInput>
      <View style={{ marginTop: "auto", padding: RFValue(5) }}>
        <PhotographIcon
          onPress={async () => {
            let result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
            });

            if (!result.cancelled) {
              const response = await fetch(result.uri);
              const image = await response.blob();
            }
          }}
          color="white"
        />
      </View>
    </View>
  );
}
