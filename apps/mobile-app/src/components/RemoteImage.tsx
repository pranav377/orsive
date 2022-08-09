import SkeletonContent from "@03balogun/react-native-skeleton-content";
import { Tailwind } from "@jeact/colors";
import { useState } from "react";
import { Dimensions, Image, ImageStyle, StyleProp, View } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { SvgUri } from "react-native-svg";
import urlParser from "../logic/urlParser";

interface RemoteImageProps {
  uri: string;
  width?: number;
  height?: number;
  style?: StyleProp<ImageStyle>;
}

export default function RemoteImage(props: RemoteImageProps) {
  const uri = urlParser(props.uri);
  const [loading, setLoading] = useState(true);

  if (uri.includes(".svg")) {
    return (
      <View
        style={{
          width: props.width,
          height: props.height,
        }}
      >
        <SvgUri
          {...props}
          onLoad={() => setLoading(false)}
          uri={uri}
          style={[
            props.style,
            {
              width: !loading ? "100%" : 0,
              height: !loading ? "100%" : 0,
            },
          ]}
        />
        {loading && (
          <SkeletonContent
            isLoading
            boneColor={Tailwind.gray[800]}
            highlightColor={Tailwind.gray[900]}
            animationType="shiver"
            layout={[
              {
                width: "100%",
                height: "100%",
                ...(props.style as {}),
              },
            ]}
          ></SkeletonContent>
        )}
      </View>
    );
  } else {
    return (
      <>
        <Image
          {...props}
          source={{ uri: uri }}
          onLoadEnd={() => setLoading(false)}
          style={[
            props.style,
            {
              width: !loading ? props.width : 0,
              height: !loading ? props.height : 0,
              resizeMode: "cover",
            },
          ]}
        />
        {loading && (
          <SkeletonContent
            containerStyle={props.style}
            isLoading
            boneColor={Tailwind.gray[800]}
            highlightColor={Tailwind.gray[900]}
            animationType="shiver"
            layout={[
              {
                width: "100%",
                height: "100%",
              },
            ]}
          ></SkeletonContent>
        )}
      </>
    );
  }
}
