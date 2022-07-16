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
  data?: any;
  timestamp: Date;
}

interface TextBlock {
  name: "paragraph";
  value: string;
}

interface ImageBlock {
  name: "image";
  value: string;
  data: {
    width: number;
    height: number;
  };
}

export default function PostOrsic() {
  const [textBlocks, setTextBlocks] = useState<Array<TextBlock>>([]);

  return (
    <View style={{ padding: RFValue(5), flex: 1 }}>
      <TextInput
        multiline
        placeholder="Write here"
        placeholderTextColor={Tailwind.gray[400]}
        style={{ color: "white" }}
        autoFocus
        onChangeText={(text) => {
          console.log(text);
          let allText = text.split(/(\n)/g);
          let allBlocks: Array<TextBlock> = allText.map((oldText) => {
            return {
              name: "paragraph",
              value: oldText,
            };
          });

          setTextBlocks(allBlocks);
        }}
      >
        {textBlocks.map((block, idx) => {
          return <Text key={idx}>{block.value}</Text>;
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
