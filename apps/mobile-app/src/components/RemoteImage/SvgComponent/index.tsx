import { memo, useEffect, useRef, useState } from "react";
import { View } from "react-native";
import { SvgXml } from "react-native-svg";
import { RemoteImageProps } from "..";
import urlParser from "../../../logic/urlParser";
import findSvgInCache from "./findSvgInCache";
import cacheSvgImage from "./cacheSvg";
import SkeletonContent from "@03balogun/react-native-skeleton-content";
import { Tailwind } from "@jeact/colors";
import generateUniqueFileKey from "../generateUniqueFileKey";

function SvgComponentRemoteComponent(props: RemoteImageProps) {
  const remoteImageUri = urlParser(props.uri);
  const uniqueFileKey = generateUniqueFileKey(remoteImageUri);

  const isMounted = useRef(true);

  const [xml, setXml] = useState<string | null>(null);

  useEffect(() => {
    async function loadSvg() {
      let svgXistsInCache = await findSvgInCache(uniqueFileKey);

      if (svgXistsInCache.exists) {
        setXml(svgXistsInCache.data);
      } else {
        let cached = await cacheSvgImage(remoteImageUri, uniqueFileKey);
        if (cached.success) {
          setXml(cached.data);
        }
      }
    }
    loadSvg();
    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <View
      style={{
        width: props.width,
        height: props.height,
      }}
    >
      {xml ? (
        <SvgXml
          xml={xml}
          style={[
            props.style,
            {
              width: "100%",
              height: "100%",
            },
          ]}
        />
      ) : (
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
}

const SvgComponentRemote = memo(SvgComponentRemoteComponent);
export default SvgComponentRemote;
