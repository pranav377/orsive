import { memo } from "react";
import { StyleProp, ImageStyle } from "react-native";
import ImageComponentRemote from "./ImageComponent";
import SvgComponentRemote from "./SvgComponent";

export interface RemoteImageProps {
  uri: string;
  width?: number;
  height?: number;
  style?: StyleProp<ImageStyle>;
}

const RemoteImageComponent = (props: RemoteImageProps) => {
  if (props.uri.includes(".svg")) {
    return <SvgComponentRemote {...props} />;
  } else {
    return <ImageComponentRemote {...props} />;
  }
};

const RemoteImage = memo(RemoteImageComponent);
export default RemoteImage;
