import PostHeader from "../../../components/Headers/PostHeader";
import { Dimensions, View } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { Text, TextInput } from "react-native-paper";
import { useOrsic } from "../../../hooks/Orsic/useOrsic";
import { SLATE_900 } from "../../../components/Palette";
import OrsicLoader from "../../../components/Loaders/OrsicLoader";
import AvatarArea from "../../../components/Post/AvatarArea";
import SkeletonContent from "@03balogun/react-native-skeleton-content";
import { Tailwind } from "@jeact/colors";
import RenderHTML from "react-native-render-html";
import { ScrollView } from "react-native-gesture-handler";

export default function OrsicScreen() {
  const { orsicQuery, uploadedBy } = useOrsic();
  return (
    <>
      <PostHeader displayName="Orsic" />
      <ScrollView
        style={{ marginTop: RFValue(10) }}
        contentContainerStyle={orsicQuery.loading ? { flex: 1 } : {}}
      >
        <AvatarArea uploadedBy={uploadedBy} />
        {orsicQuery.loading && <OrsicLoader />}
        {orsicQuery.data && (
          <>
            <View
              style={{
                padding: RFValue(5),
                paddingTop: 0,
              }}
            >
              <RenderHTML
                contentWidth={Dimensions.get("window").width}
                source={{
                  html: `<div style="color: white;">
          ${orsicQuery.data.getOrsic.content}
          </div>`,
                }}
              />
            </View>
          </>
        )}
      </ScrollView>
      <View
        style={{
          backgroundColor: SLATE_900,
          padding: RFValue(10),
        }}
      >
        {orsicQuery.loading ? (
          <SkeletonContent
            isLoading
            boneColor={Tailwind.gray[700]}
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
