import { Image, ImageStyle, StyleProp, View } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { SvgUri } from "react-native-svg";

interface RemoteImageProps {
  uri: string;
  width?: number;
  height?: number;
  style?: StyleProp<ImageStyle>;
}

export default function RemoteImage(props: RemoteImageProps) {
  if (props.uri.includes(".svg")) {
    return (
      <View
        style={{
          width: props.width,
          height: props.height,
        }}
      >
        <SvgUri
          {...props}
          style={[
            props.style,
            {
              width: "100%",
              height: "100%",
            },
          ]}
        />
      </View>
    );
  } else {
    return (
      <Image
        {...props}
        source={{ uri: props.uri }}
        style={[
          props.style,
          {
            width: props.width,
            height: props.height,
            resizeMode: "cover",
          },
        ]}
      />
    );
  }
}
