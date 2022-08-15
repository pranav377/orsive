import { useImage } from "../../../hooks/Image/useImage";
import PostHeader from "../../../components/Headers/PostHeader";
import { Dimensions, ScrollView, View } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import AvatarArea from "../../../components/Post/AvatarArea";
import { SLATE_900 } from "../../../components/Palette";
import SkeletonContent from "@03balogun/react-native-skeleton-content";
import { Tailwind } from "@jeact/colors";
import { TextInput } from "react-native-paper";
import RemoteImage from "../../../components/RemoteImage";
import OrsicLoader from "../../../components/Loaders/OrsicLoader";

export default function ImageScreen() {
  const { imageQuery, uploadedBy } = useImage();
  return (
    <>
      <PostHeader displayName="Image" />
      <ScrollView contentContainerStyle={imageQuery.loading ? { flex: 1 } : {}}>
        <AvatarArea
          uploadedBy={uploadedBy}
          style={{
            marginVertical: RFValue(10),
            marginBottom: RFValue(5),
          }}
        />
        {imageQuery.loading && (
          <>
            <OrsicLoader />
          </>
        )}
        {imageQuery.data && (
          <>
            <RemoteImage
              uri={imageQuery.data.getImage.image}
              style={{
                aspectRatio:
                  imageQuery.data.getImage.width /
                  imageQuery.data.getImage.height,
                resizeMode: "contain",
                borderRadius: RFValue(10),
                maxHeight: Dimensions.get("window").height * 0.9,
                marginLeft: "auto",
                marginRight: "auto",
                margin: RFValue(5),
              }}
            ></RemoteImage>
          </>
        )}
      </ScrollView>
      <View
        style={{
          backgroundColor: SLATE_900,
          padding: RFValue(10),
        }}
      >
        {imageQuery.loading ? (
          <SkeletonContent
            isLoading
            boneColor={Tailwind.gray[800]}
            highlightColor={Tailwind.gray[900]}
            animationType="shiver"
            containerStyle={{}}
            layout={[
              {
                flexDirection: "row",
                children: [{ width: "100%", height: RFValue(40) }],
              },
            ]}
          ></SkeletonContent>
        ) : (
          <TextInput
            mode="flat"
            style={{ fontSize: RFValue(12), height: RFValue(40) }}
            placeholder="What do you think?"
          />
        )}
      </View>
    </>
  );
}
