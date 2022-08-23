import { memo, useEffect, useRef, useState } from "react";
import { RemoteImageProps } from "..";
import urlParser from "../../../logic/urlParser";
import * as FileSystem from "expo-file-system";
import findImageInCache from "./findImageInCache";
import cacheImage from "./cacheImage";
import { Image } from "react-native";
import SkeletonContent from "@03balogun/react-native-skeleton-content";
import { Tailwind } from "@jeact/colors";
import generateUniqueFileKey from "../generateUniqueFileKey";

function ImageComponentRemoteComponent(props: RemoteImageProps) {
  const remoteImageUri = urlParser(props.uri);

  const uniqueFileKey = generateUniqueFileKey(remoteImageUri, true);

  const isMounted = useRef(true);

  const [uri, setUri] = useState<string | undefined>();

  useEffect(() => {
    async function loadImg() {
      const cacheFileUri = `${FileSystem.cacheDirectory}${uniqueFileKey}`;

      let imgXistsInCache = await findImageInCache(cacheFileUri);
      if (imgXistsInCache.exists) {
        setUri(cacheFileUri);
      } else {
        let cached = await cacheImage(remoteImageUri, cacheFileUri);
        if (cached.path) {
          setUri(cached.path);
        }
      }
    }
    loadImg();
    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <>
      {uri ? (
        <Image
          {...props}
          source={{ uri: uri }}
          style={[
            props.style,
            {
              width: props.width,
              height: props.height,
              resizeMode: "cover",
            },
          ]}
        />
      ) : (
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

const ImageComponentRemote = memo(ImageComponentRemoteComponent);
export default ImageComponentRemote;
